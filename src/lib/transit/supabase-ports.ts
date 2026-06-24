import { createClient } from "@/lib/supabase/client";
import { getAstDateString } from "@/lib/transit/countdown-math";

export type PortLoadDailyRow = {
  island: "STT" | "STX" | "STJ" | "WI";
  service_date: string;
  scheduled_capacity: number | null;
  ship_count: number;
  coverage_ratio: number | null;
  band: "quiet" | "elevated" | "busy" | "high-impact";
  last_verified_at: string | null;
  source_name: string | null;
};

export type PortLoadSummary = {
  serviceDate: string;
  totalScheduledCapacity: number;
  shipCount: number;
  capacityCoverageRatio: number | null;
  rows: PortLoadDailyRow[];
  lastVerifiedAt: string | null;
  sourceName: string | null;
};

export type CrowdTrafficLevel = "quiet" | "elevated" | "busy" | "high-impact";

export function classifyCrowdTraffic(load: number): {
  level: CrowdTrafficLevel;
  label: string;
} {
  if (load < 5000) {
    return { level: "quiet", label: "Quiet Port Day" };
  }

  if (load < 10000) {
    return { level: "elevated", label: "Elevated Port Day" };
  }

  if (load < 15000) {
    return { level: "busy", label: "Busy Port Day" };
  }

  return { level: "high-impact", label: "High-Impact Cruise Day" };
}

export async function fetchPortLoadDaily(
  serviceDate?: string,
  island?: PortLoadDailyRow["island"],
): Promise<PortLoadSummary> {
  const supabase = createClient();
  const date = serviceDate ?? getAstDateString(new Date());

  let query = supabase
    .from("port_load_daily")
    .select(
      "island, service_date, scheduled_capacity, ship_count, coverage_ratio, band, last_verified_at, source_name",
    )
    .eq("service_date", date);

  if (island) {
    query = query.eq("island", island);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to load port load daily: ${error.message}`);
  }

  const rows = (data ?? []) as PortLoadDailyRow[];
  const totalScheduledCapacity = rows.reduce(
    (sum, row) => sum + (row.scheduled_capacity ?? 0),
    0,
  );
  const shipCount = rows.reduce((sum, row) => sum + row.ship_count, 0);
  const capacityKnownShipCount = rows.reduce(
    (sum, row) => sum + row.ship_count * (row.coverage_ratio ?? 0),
    0,
  );
  const capacityCoverageRatio =
    shipCount > 0
      ? capacityKnownShipCount / shipCount
      : null;

  const lastVerifiedAt = rows.reduce<string | null>((latest, row) => {
    if (!row.last_verified_at) return latest;
    if (!latest) return row.last_verified_at;
    return row.last_verified_at > latest ? row.last_verified_at : latest;
  }, null);

  const sourceName =
    rows.find((row) => row.source_name)?.source_name ?? "VIPA Cruise Schedule";

  return {
    serviceDate: date,
    totalScheduledCapacity,
    shipCount,
    capacityCoverageRatio,
    rows,
    lastVerifiedAt,
    sourceName,
  };
}

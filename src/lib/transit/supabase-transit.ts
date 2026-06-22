import { createClient } from "@/lib/supabase/client";
import {
  RED_HOOK_CRUZ_BAY_ROUTE_SLUG,
  expandFerryServices,
  getAstDateString,
  addAstDays,
} from "@/lib/transit/countdown-math";
import type {
  FerryRouteSummary,
  FerryServiceExceptionRow,
  FerryServiceRow,
  RedHookCruzBaySchedule,
} from "@/lib/transit/types";

const RED_HOOK_TERMINAL_SLUG = "red-hook";
const CRUZ_BAY_TERMINAL_SLUG = "cruz-bay";

type FerryRouteRow = {
  id: string;
  slug: string;
  display_name: string;
  operational_status: FerryRouteSummary["operationalStatus"];
  source_url: string;
  source_name: string;
  last_verified_at: string;
  origin_terminal_id: string;
  destination_terminal_id: string;
};

type FerryTerminalRow = {
  id: string;
  name: string;
  slug: string;
};

export async function fetchRedHookCruzBaySchedule(
  now: Date = new Date(),
): Promise<RedHookCruzBaySchedule | null> {
  const supabase = createClient();

  const { data: terminals, error: terminalsError } = await supabase
    .from("ferry_terminals")
    .select("id, name, slug")
    .in("slug", [RED_HOOK_TERMINAL_SLUG, CRUZ_BAY_TERMINAL_SLUG]);

  if (terminalsError) {
    throw new Error(`Failed to load ferry terminals: ${terminalsError.message}`);
  }

  const terminalRows = (terminals ?? []) as FerryTerminalRow[];
  const redHook = terminalRows.find(
    (terminal) => terminal.slug === RED_HOOK_TERMINAL_SLUG,
  );
  const cruzBay = terminalRows.find(
    (terminal) => terminal.slug === CRUZ_BAY_TERMINAL_SLUG,
  );

  if (!redHook || !cruzBay) {
    return null;
  }

  const { data: route, error: routeError } = await supabase
    .from("ferry_routes")
    .select(
      "id, slug, display_name, operational_status, source_url, source_name, last_verified_at, origin_terminal_id, destination_terminal_id",
    )
    .eq("slug", RED_HOOK_CRUZ_BAY_ROUTE_SLUG)
    .eq("origin_terminal_id", redHook.id)
    .eq("destination_terminal_id", cruzBay.id)
    .eq("is_public", true)
    .maybeSingle();

  if (routeError) {
    throw new Error(`Failed to load ferry route: ${routeError.message}`);
  }

  if (!route) {
    return null;
  }

  const routeRow = route as FerryRouteRow;

  const { data: services, error: servicesError } = await supabase
    .from("ferry_services")
    .select(
      "id, route_id, days_of_week, departure_time, valid_from, valid_to, operational_status, source_url, last_verified_at",
    )
    .eq("route_id", routeRow.id);

  if (servicesError) {
    throw new Error(`Failed to load ferry services: ${servicesError.message}`);
  }

  const serviceRows = (services ?? []) as FerryServiceRow[];
  const serviceIds = serviceRows.map((service) => service.id);

  let exceptionRows: FerryServiceExceptionRow[] = [];

  if (serviceIds.length > 0) {
    const startDate = getAstDateString(now);
    const endDate = addAstDays(startDate, 7);

    const { data: exceptions, error: exceptionsError } = await supabase
      .from("ferry_service_exceptions")
      .select("service_id, service_date, status, override_departure_time")
      .in("service_id", serviceIds)
      .gte("service_date", startDate)
      .lte("service_date", endDate);

    if (exceptionsError) {
      throw new Error(
        `Failed to load ferry service exceptions: ${exceptionsError.message}`,
      );
    }

    exceptionRows = (exceptions ?? []) as FerryServiceExceptionRow[];
  }

  const records = expandFerryServices(serviceRows, exceptionRows, now);

  return {
    route: {
      id: routeRow.id,
      slug: routeRow.slug,
      displayName: routeRow.display_name,
      operationalStatus: routeRow.operational_status,
      sourceUrl: routeRow.source_url,
      sourceName: routeRow.source_name,
      lastVerifiedAt: routeRow.last_verified_at,
      originName: redHook.name,
      destinationName: cruzBay.name,
    },
    records,
  };
}

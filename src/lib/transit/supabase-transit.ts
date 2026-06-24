import { createClient } from "@/lib/supabase/client";
import {
  RED_HOOK_CRUZ_BAY_ROUTE_SLUG,
  expandFerryServices,
  getAstDateString,
  addAstDays,
} from "@/lib/transit/countdown-math";
import type {
  FerryRouteSchedule,
  FerryRouteSummary,
  FerryServiceExceptionRow,
  FerryServiceRow,
  RedHookCruzBaySchedule,
} from "@/lib/transit/types";

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

function isPlaceholderSource(value: string | null | undefined): boolean {
  return !value || /(^https?:\/\/example\.com\b|placeholder|sample-only)/i.test(value);
}

export async function fetchRedHookCruzBaySchedule(
  now: Date = new Date(),
): Promise<RedHookCruzBaySchedule | null> {
  return fetchFerryScheduleByRouteSlug(RED_HOOK_CRUZ_BAY_ROUTE_SLUG, now);
}

export async function fetchFerryScheduleByRouteSlug(
  routeSlug: string,
  now: Date = new Date(),
): Promise<FerryRouteSchedule | null> {
  const supabase = createClient();

  const { data: route, error: routeError } = await supabase
    .from("ferry_routes")
    .select(
      "id, slug, display_name, operational_status, source_url, source_name, last_verified_at, origin_terminal_id, destination_terminal_id",
    )
    .eq("slug", routeSlug)
    .eq("is_public", true)
    .maybeSingle();

  if (routeError) {
    throw new Error(`Failed to load ferry route: ${routeError.message}`);
  }

  if (!route) {
    return null;
  }

  const routeRow = route as FerryRouteRow;

  const { data: terminals, error: terminalsError } = await supabase
    .from("ferry_terminals")
    .select("id, name, slug")
    .in("id", [routeRow.origin_terminal_id, routeRow.destination_terminal_id]);

  if (terminalsError) {
    throw new Error(`Failed to load ferry terminals: ${terminalsError.message}`);
  }

  const terminalRows = (terminals ?? []) as FerryTerminalRow[];
  const origin = terminalRows.find(
    (terminal) => terminal.id === routeRow.origin_terminal_id,
  );
  const destination = terminalRows.find(
    (terminal) => terminal.id === routeRow.destination_terminal_id,
  );

  if (!origin || !destination) {
    return null;
  }

  const { data: services, error: servicesError } = await supabase
    .from("ferry_services")
    .select(
      "id, route_id, days_of_week, departure_time, valid_from, valid_to, operational_status, source_url, last_verified_at",
    )
    .eq("route_id", routeRow.id);

  if (servicesError) {
    throw new Error(`Failed to load ferry services: ${servicesError.message}`);
  }

  const routeUsesPlaceholderSource = isPlaceholderSource(routeRow.source_url);
  const serviceRows = ((services ?? []) as FerryServiceRow[]).filter(
    (service) => !routeUsesPlaceholderSource && !isPlaceholderSource(service.source_url),
  );
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
      sourceName: routeUsesPlaceholderSource
        ? "Source pending verification"
        : routeRow.source_name,
      lastVerifiedAt: routeUsesPlaceholderSource ? "" : routeRow.last_verified_at,
      originName: origin.name,
      destinationName: destination.name,
    },
    records,
  };
}

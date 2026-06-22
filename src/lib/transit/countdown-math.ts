import { SITE_TIMEZONE } from "@/lib/env";
import type {
  CountdownUnits,
  FerryScheduleDTO,
  FerryServiceExceptionRow,
  FerryServiceRow,
  NextBoatDisplay,
  NextDeparture,
  WeekendRule,
} from "@/lib/transit/types";

export const AST_OFFSET = "-04:00";
export const RED_HOOK_CRUZ_BAY_ROUTE_SLUG = "red-hook-to-cruz-bay";

export function normalizeTime(value: string): `${number}:${number}:${number}` {
  const parts = value.split(":");
  const hours = parts[0]?.padStart(2, "0") ?? "00";
  const minutes = parts[1]?.padStart(2, "0") ?? "00";
  const seconds = parts[2]?.padStart(2, "0") ?? "00";
  return `${hours}:${minutes}:${seconds}` as `${number}:${number}:${number}`;
}

export function getAstDateString(now: Date): `${number}-${number}-${number}` {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now) as `${number}-${number}-${number}`;
}

export function addAstDays(
  date: `${number}-${number}-${number}`,
  days: number,
): `${number}-${number}-${number}` {
  const anchor = Date.parse(`${date}T12:00:00${AST_OFFSET}`) + days * 86_400_000;
  return getAstDateString(new Date(anchor));
}

export function isWeekendAst(serviceDate: string): boolean {
  const day = new Date(`${serviceDate}T12:00:00${AST_OFFSET}`).getUTCDay();
  return day === 0 || day === 6;
}

export function getAstDayOfWeek(serviceDate: string): number {
  const day = new Date(`${serviceDate}T12:00:00${AST_OFFSET}`).getUTCDay();
  return day === 0 ? 7 : day;
}

export function deriveWeekendRule(daysOfWeek: number[]): WeekendRule {
  const days = new Set(daysOfWeek);
  const hasWeekend = days.has(6) || days.has(7);
  const hasWeekday = [1, 2, 3, 4, 5].some((day) => days.has(day));

  if (!hasWeekday && hasWeekend) return "weekend-only";
  if (hasWeekday && !hasWeekend) return "weekday-only";
  return "normal";
}

export function weekendRuleAllows(rule: WeekendRule, weekend: boolean): boolean {
  if (rule === "excluded") return false;
  if (rule === "weekend-only") return weekend;
  if (rule === "weekday-only") return !weekend;
  return true;
}

function toDepartureEpochMs(
  serviceDate: string,
  departureTime: string,
): number {
  return Date.parse(`${serviceDate}T${normalizeTime(departureTime)}${AST_OFFSET}`);
}

export function expandFerryServices(
  services: FerryServiceRow[],
  exceptions: FerryServiceExceptionRow[],
  now: Date = new Date(),
): FerryScheduleDTO[] {
  const startDate = getAstDateString(now);
  const dates = Array.from({ length: 8 }, (_, index) =>
    addAstDays(startDate, index),
  );

  const exceptionMap = new Map<string, FerryServiceExceptionRow>();
  for (const exception of exceptions) {
    exceptionMap.set(`${exception.service_id}:${exception.service_date}`, exception);
  }

  const records: FerryScheduleDTO[] = [];

  for (const service of services) {
    const weekendRule = deriveWeekendRule(service.days_of_week);

    for (const serviceDate of dates) {
      if (serviceDate < service.valid_from) continue;
      if (service.valid_to && serviceDate > service.valid_to) continue;
      if (!service.days_of_week.includes(getAstDayOfWeek(serviceDate))) continue;

      const exception = exceptionMap.get(`${service.id}:${serviceDate}`);
      const status = (exception?.status ?? service.operational_status) as
        | "scheduled"
        | "delayed"
        | "cancelled"
        | "suspended";

      records.push({
        id: `${service.id}:${serviceDate}`,
        routeId: service.route_id,
        serviceDate,
        departureTime: normalizeTime(service.departure_time),
        overrideDepartureTime: exception?.override_departure_time
          ? normalizeTime(exception.override_departure_time)
          : null,
        status,
        weekendRule,
        sourceUrl: service.source_url,
        lastVerifiedAt: service.last_verified_at,
      });
    }
  }

  return records;
}

export function findNextDeparture(
  records: FerryScheduleDTO[],
  now: Date = new Date(),
): NextDeparture | null {
  const nowMs = now.getTime();

  return records.reduce<NextDeparture | null>((minimum, record) => {
    if (record.status === "cancelled" || record.status === "suspended") {
      return minimum;
    }

    if (
      !weekendRuleAllows(record.weekendRule, isWeekendAst(record.serviceDate))
    ) {
      return minimum;
    }

    const localTime = record.overrideDepartureTime ?? record.departureTime;
    const departureEpochMs = toDepartureEpochMs(record.serviceDate, localTime);
    const differenceMs = departureEpochMs - nowMs;

    if (!Number.isFinite(departureEpochMs) || differenceMs <= 0) {
      return minimum;
    }

    const candidate = { ...record, departureEpochMs, differenceMs };
    return minimum === null || differenceMs < minimum.differenceMs
      ? candidate
      : minimum;
  }, null);
}

export function findFirstDepartureOnDate(
  records: FerryScheduleDTO[],
  serviceDate: `${number}-${number}-${number}`,
  now: Date = new Date(),
): NextDeparture | null {
  const nowMs = now.getTime();

  const departures = records
    .filter((record) => record.serviceDate === serviceDate)
    .filter(
      (record) => record.status !== "cancelled" && record.status !== "suspended",
    )
    .filter((record) =>
      weekendRuleAllows(record.weekendRule, isWeekendAst(record.serviceDate)),
    )
    .map((record) => {
      const localTime = record.overrideDepartureTime ?? record.departureTime;
      const departureEpochMs = toDepartureEpochMs(record.serviceDate, localTime);
      return {
        ...record,
        departureEpochMs,
        differenceMs: departureEpochMs - nowMs,
      };
    })
    .sort((left, right) => left.departureEpochMs - right.departureEpochMs);

  return departures[0] ?? null;
}

export function getCountdownUnits(differenceMs: number): CountdownUnits {
  const totalSeconds = Math.max(0, Math.floor(differenceMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds, totalSeconds };
}

export function formatTime12h(time: string): string {
  const [hourPart, minutePart] = normalizeTime(time).split(":");
  const hour24 = Number(hourPart);
  const minutes = minutePart ?? "00";
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${minutes} ${period}`;
}

export function resolveNextBoatDisplay(
  records: FerryScheduleDTO[],
  now: Date = new Date(),
): NextBoatDisplay {
  const next = findNextDeparture(records, now);
  if (next) {
    return {
      type: "countdown",
      departure: next,
      units: getCountdownUnits(next.differenceMs),
    };
  }

  const tomorrow = addAstDays(getAstDateString(now), 1);
  const firstTomorrow = findFirstDepartureOnDate(records, tomorrow, now);

  if (firstTomorrow) {
    const departureTime =
      firstTomorrow.overrideDepartureTime ?? firstTomorrow.departureTime;

    return {
      type: "tomorrow",
      label: `First Boat Tomorrow @ ${formatTime12h(departureTime)}`,
      departure: firstTomorrow,
    };
  }

  return { type: "none" };
}

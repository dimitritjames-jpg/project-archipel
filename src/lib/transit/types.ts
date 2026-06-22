export type OperationalStatus =
  | "scheduled"
  | "delayed"
  | "cancelled"
  | "suspended"
  | "unknown";

export type WeekendRule = "normal" | "weekend-only" | "weekday-only" | "excluded";

export type FerryScheduleDTO = {
  id: string;
  routeId: string;
  serviceDate: `${number}-${number}-${number}`;
  departureTime: `${number}:${number}:${number}`;
  overrideDepartureTime?: `${number}:${number}:${number}` | null;
  status: "scheduled" | "delayed" | "cancelled" | "suspended";
  weekendRule: WeekendRule;
  sourceUrl: string;
  lastVerifiedAt: string;
};

export type NextDeparture = FerryScheduleDTO & {
  departureEpochMs: number;
  differenceMs: number;
};

export type CountdownUnits = {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
};

export type NextBoatDisplay =
  | {
      type: "countdown";
      departure: NextDeparture;
      units: CountdownUnits;
    }
  | {
      type: "tomorrow";
      label: string;
      departure: NextDeparture;
    }
  | { type: "none" };

export type FerryRouteSummary = {
  id: string;
  slug: string;
  displayName: string;
  operationalStatus: OperationalStatus;
  sourceUrl: string;
  sourceName: string;
  lastVerifiedAt: string;
  originName: string;
  destinationName: string;
};

export type FerryServiceRow = {
  id: string;
  route_id: string;
  days_of_week: number[];
  departure_time: string;
  valid_from: string;
  valid_to: string | null;
  operational_status: OperationalStatus;
  source_url: string;
  last_verified_at: string;
};

export type FerryServiceExceptionRow = {
  service_id: string;
  service_date: string;
  status: OperationalStatus;
  override_departure_time: string | null;
};

export type RedHookCruzBaySchedule = {
  route: FerryRouteSummary;
  records: FerryScheduleDTO[];
};

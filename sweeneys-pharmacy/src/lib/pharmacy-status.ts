/**
 * getPharmacyStatus — pure helper for StatusPill
 *
 * Returns the current open/closing-soon/closed state of the pharmacy
 * based on the HOURS config in site.ts and the current time in
 * Europe/Dublin timezone.
 *
 * This function is pure and testable: pass a `now` Date to override
 * the system clock (useful for Vitest).
 *
 * Rules:
 *   - Timezone is always Europe/Dublin (handles IST +1 / GMT +0 DST)
 *   - Bank holiday dates in BANK_HOLIDAYS override the day-of-week schedule
 *   - "Closing soon" = within CLOSING_SOON_MINUTES minutes of closing time
 *   - Never uses visitor's browser clock for the time zone; uses Intl.DateTimeFormat
 *
 * IMPORTANT: This helper is imported into a "use client" component only.
 * Do not import it at the server-component level in layout.tsx or page.tsx.
 */

import {
  HOURS,
  BANK_HOLIDAYS,
  CLOSING_SOON_MINUTES,
  type DayHours,
} from "@/content/site";

export type PharmacyStatus =
  | { state: "open"; closes: string; closesAt: number } // closesAt = minutes since midnight
  | { state: "soon"; closes: string; closesAt: number }
  | { state: "closed"; opensDay: string; opensAt: string };

type DayKey = keyof typeof HOURS;

const DAY_KEYS: DayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/** Parse "HH:MM" to minutes since midnight */
function parseTime(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Format minutes-since-midnight as "9am", "9:30am", "9pm" */
function formatMins(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h < 12 ? "am" : "pm";
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return m === 0 ? `${hour12}${suffix}` : `${hour12}:${String(m).padStart(2, "0")}${suffix}`;
}

/** Format a Date in Europe/Dublin to a YYYY-MM-DD string */
function dublinDateString(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Dublin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/**
 * Return the day-of-week index (0=Sun … 6=Sat) in Europe/Dublin
 * for a given Date.
 */
function dublinDayOfWeek(d: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Dublin",
    weekday: "short",
  }).formatToParts(d);
  const weekdayStr = parts.find((p) => p.type === "weekday")?.value ?? "";
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[weekdayStr] ?? 0;
}

/** Return hours-and-minutes in Europe/Dublin as {h, m} */
function dublinHM(d: Date): { h: number; m: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Dublin",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { h, m };
}

/** True when the Dublin calendar date of `d` is a listed bank holiday. */
export function isBankHoliday(d: Date = new Date()): boolean {
  return BANK_HOLIDAYS.includes(dublinDateString(d));
}

/**
 * Get the DayHours for a given Date in Europe/Dublin.
 * Bank holidays override the day-of-week schedule.
 */
function getDayHours(d: Date): DayHours {
  if (isBankHoliday(d)) {
    return HOURS.bankHoliday;
  }
  const dow = dublinDayOfWeek(d);
  return HOURS[DAY_KEYS[dow]];
}

/**
 * Return a human-readable day name for the next opening.
 * Simplified: "today" / "tomorrow" / day name.
 */
function nextOpenLabel(fromDate: Date): { day: string; time: string } {
  for (let offset = 1; offset <= 7; offset++) {
    const candidate = new Date(fromDate.getTime() + offset * 24 * 60 * 60 * 1000);
    const dayHours = getDayHours(candidate);
    if (!("closed" in dayHours)) {
      const dayKey = dublinDayOfWeek(candidate);
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const label =
        offset === 1 ? "tomorrow" : dayNames[dayKey].toLowerCase();
      return { day: label, time: formatMins(parseTime(dayHours.open)) };
    }
  }
  // Fallback — should not happen given current hours
  return { day: "soon", time: "9am" };
}

/**
 * Main exported function.
 * @param now — override for testing; defaults to `new Date()`
 */
export function getPharmacyStatus(now: Date = new Date()): PharmacyStatus {
  const dayHours = getDayHours(now);
  const { h, m } = dublinHM(now);
  const currentMins = h * 60 + m;

  if ("closed" in dayHours) {
    const { day, time } = nextOpenLabel(now);
    return { state: "closed", opensDay: day, opensAt: time };
  }

  const openMins = parseTime(dayHours.open);
  const closeMins = parseTime(dayHours.close);

  if (currentMins < openMins || currentMins >= closeMins) {
    // Currently closed
    if (currentMins < openMins) {
      // Opens later today
      return {
        state: "closed",
        opensDay: "today",
        opensAt: formatMins(openMins),
      };
    }
    const { day, time } = nextOpenLabel(now);
    return { state: "closed", opensDay: day, opensAt: time };
  }

  const closingLabel = formatMins(closeMins);

  if (currentMins >= closeMins - CLOSING_SOON_MINUTES) {
    return { state: "soon", closes: closingLabel, closesAt: closeMins };
  }

  return { state: "open", closes: closingLabel, closesAt: closeMins };
}

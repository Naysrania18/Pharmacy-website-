import { HOURS, type DayHours } from "@/content/site";

export interface HoursRow {
  label: string;
  hours: string;
  /** Day indices (0 = Sunday) this row covers; empty for bank holidays. */
  days: readonly number[];
}

/** "09:30" -> "9:30am", "21:00" -> "9pm" */
export function formatClock(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${suffix}` : `${hour12}:${String(m).padStart(2, "0")}${suffix}`;
}

export function formatDayHours(day: DayHours): string {
  return "closed" in day ? "Closed" : `${formatClock(day.open)} to ${formatClock(day.close)}`;
}

/** Collapses Monday–Friday when identical, then lists the remaining days. */
export function groupWeekHours(): HoursRow[] {
  const weekdays = [HOURS.monday, HOURS.tuesday, HOURS.wednesday, HOURS.thursday, HOURS.friday];
  const first = formatDayHours(weekdays[0]);
  const uniform = weekdays.every((d) => formatDayHours(d) === first);

  const weekdayRows: HoursRow[] = uniform
    ? [{ label: "Monday to Friday", hours: first, days: [1, 2, 3, 4, 5] }]
    : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((label, i) => ({
        label,
        hours: formatDayHours(weekdays[i]),
        days: [i + 1],
      }));

  return [
    ...weekdayRows,
    { label: "Saturday", hours: formatDayHours(HOURS.saturday), days: [6] },
    { label: "Sunday", hours: formatDayHours(HOURS.sunday), days: [0] },
    { label: "Bank holidays", hours: formatDayHours(HOURS.bankHoliday), days: [] },
  ];
}

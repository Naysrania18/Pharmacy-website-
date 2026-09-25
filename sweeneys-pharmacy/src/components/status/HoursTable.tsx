"use client";

import { useEffect, useState } from "react";
import { groupWeekHours } from "@/lib/hours-format";
import { isBankHoliday } from "@/lib/pharmacy-status";

const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Weekly hours as a ledger. Highlights today's row once mounted (Dublin time). */
export function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  const [bankHoliday, setBankHoliday] = useState(false);

  useEffect(() => {
    const short = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Dublin", weekday: "short" }).format(new Date());
    setToday(WEEKDAY_INDEX[short] ?? null);
    setBankHoliday(isBankHoliday());
  }, []);

  const rows = groupWeekHours();

  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">Opening hours</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Hours</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const isToday = today !== null && (bankHoliday ? row.days.length === 0 : row.days.includes(today));
          return (
            <tr key={row.label} className={`border-b border-hairline last:border-0 ${isToday ? "bg-[#F6E9C4]" : ""}`}>
              <th scope="row" className="py-3 pl-4 pr-3 font-display text-lg font-medium text-ink sm:text-xl">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {row.label}
                  {isToday && (
                    <span className="rounded-full bg-ink px-2.5 py-0.5 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-brass">
                      Today
                    </span>
                  )}
                </span>
              </th>
              <td className="tabular whitespace-nowrap py-3 pl-3 pr-4 text-right text-base font-bold text-ink sm:text-lg">{row.hours}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

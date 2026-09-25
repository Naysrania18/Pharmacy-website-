"use client";

import React, { useEffect, useState } from "react";
import { HOURS, BANK_HOLIDAY_HOURS, DayHours } from "@/content/site";

function formatDayHours(hours: DayHours): string {
  if ("closed" in hours) return "Closed";
  return `${hours.open} to ${hours.close}`;
}

export function HoursTable() {
  const [todayDayIndex, setTodayDayIndex] = useState<number | null>(null);

  useEffect(() => {
    const dublinDayStr = new Intl.DateTimeFormat("en-IE", {
      timeZone: "Europe/Dublin",
      weekday: "short",
    }).format(new Date());

    const map: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    if (dublinDayStr in map) {
      setTodayDayIndex(map[dublinDayStr]);
    }
  }, []);

  const rows = [
    { label: "Monday", index: 1, hours: formatDayHours(HOURS.monday) },
    { label: "Tuesday", index: 2, hours: formatDayHours(HOURS.tuesday) },
    { label: "Wednesday", index: 3, hours: formatDayHours(HOURS.wednesday) },
    { label: "Thursday", index: 4, hours: formatDayHours(HOURS.thursday) },
    { label: "Friday", index: 5, hours: formatDayHours(HOURS.friday) },
    { label: "Saturday", index: 6, hours: formatDayHours(HOURS.saturday) },
    { label: "Sunday", index: 0, hours: formatDayHours(HOURS.sunday) },
    { label: "Bank Holidays", index: -1, hours: `${BANK_HOLIDAY_HOURS.open} to ${BANK_HOLIDAY_HOURS.close} (TODO_CONFIRM)` },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10 bg-surface">
      <table className="w-full text-left text-sm border-collapse">
        <caption className="sr-only">Sweeney&apos;s Late Night Pharmacy Opening Hours</caption>
        <thead>
          <tr className="border-b border-ink/10 bg-sage/30 text-ink font-semibold">
            <th scope="col" className="py-3 px-4">Day</th>
            <th scope="col" className="py-3 px-4">Opening Hours</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/5 text-body tabular-nums font-mono">
          {rows.map((row) => {
            const isToday = todayDayIndex !== null && todayDayIndex === row.index;
            return (
              <tr
                key={row.label}
                className={`transition-colors ${
                  isToday
                    ? "bg-teal/10 font-bold text-ink border-l-4 border-l-teal"
                    : "hover:bg-sage/10"
                }`}
              >
                <th scope="row" className="py-3 px-4 font-sans font-medium text-ink flex items-center gap-2">
                  <span>{row.label}</span>
                  {isToday && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal text-surface font-sans">
                      Today
                    </span>
                  )}
                </th>
                <td className="py-3 px-4">{row.hours}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

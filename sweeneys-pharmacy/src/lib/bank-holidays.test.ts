import { describe, expect, it } from "vitest";
import { BANK_HOLIDAYS } from "@/content/site";
import { isBankHoliday } from "./pharmacy-status";

describe("isBankHoliday", () => {
  it("is true on a listed date in Dublin time", () => {
    // Easter Monday 2026, midday UTC
    expect(isBankHoliday(new Date("2026-04-06T12:00:00Z"))).toBe(true);
  });
  it("uses Dublin, not UTC, for the date (late evening IST is still the same day)", () => {
    // 23:30 IST on 2026-04-06 is 22:30 UTC, still the 6th in both
    expect(isBankHoliday(new Date("2026-04-06T22:30:00Z"))).toBe(true);
    // 00:30 IST on 2026-04-07 is 23:30 UTC on the 6th: Dublin says the 7th
    expect(isBankHoliday(new Date("2026-04-06T23:30:00Z"))).toBe(false);
  });
  it("is false on an ordinary day", () => {
    expect(isBankHoliday(new Date("2026-04-07T12:00:00Z"))).toBe(false);
  });
});

describe("BANK_HOLIDAYS coverage", () => {
  const year = new Date().getFullYear();
  it.each([year, year + 1])("lists holidays for %i so status never silently goes stale", (y) => {
    expect(BANK_HOLIDAYS.some((d) => d.startsWith(`${y}-`))).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { formatClock, formatDayHours, groupWeekHours } from "./hours-format";

describe("formatClock", () => {
  it("drops minutes on the hour", () => {
    expect(formatClock("09:00")).toBe("9am");
    expect(formatClock("21:00")).toBe("9pm");
  });
  it("keeps minutes off the hour", () => {
    expect(formatClock("09:30")).toBe("9:30am");
  });
  it("handles noon and midnight", () => {
    expect(formatClock("12:00")).toBe("12pm");
    expect(formatClock("00:00")).toBe("12am");
  });
});

describe("formatDayHours", () => {
  it("joins open and close with the word to", () => {
    expect(formatDayHours({ open: "11:00", close: "18:00" })).toBe("11am to 6pm");
  });
  it("says Closed for closed days", () => {
    expect(formatDayHours({ closed: true })).toBe("Closed");
  });
});

describe("groupWeekHours", () => {
  it("collapses identical weekdays into one range", () => {
    const rows = groupWeekHours();
    expect(rows[0]).toMatchObject({ label: "Monday to Friday", hours: "9am to 9pm" });
  });
  it("lists Saturday, Sunday and bank holidays separately", () => {
    const labels = groupWeekHours().map((r) => r.label);
    expect(labels).toEqual(["Monday to Friday", "Saturday", "Sunday", "Bank holidays"]);
  });
});

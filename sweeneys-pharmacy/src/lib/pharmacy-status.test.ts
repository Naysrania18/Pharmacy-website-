/**
 * Unit tests for getPharmacyStatus
 *
 * Clock is injected via the `now` parameter — no mocking of Date.now() needed.
 * All times are constructed in UTC, then verified against expected Dublin output.
 *
 * Europe/Dublin:
 *   - GMT (UTC+0) from last Sunday of October to last Sunday of March
 *   - IST (UTC+1) from last Sunday of March to last Sunday of October
 */

import { describe, it, expect } from "vitest";
import { getPharmacyStatus } from "./pharmacy-status";

/** Create a Date for a Dublin local time, accounting for UTC offset */
function dublinDate(
  year: number,
  month: number, // 1-based
  day: number,
  hour: number,
  minute: number
): Date {
  // Use Intl to figure out what UTC time corresponds to a Dublin local time.
  // We approximate by creating a UTC date and adjusting; for test purposes
  // we use known offsets.
  // Sep 2026 → IST (+1), so UTC = local - 1
  // Jan 2026 → GMT (+0), so UTC = local
  // We'll embed the UTC times directly for clarity.
  return new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
}

describe("getPharmacyStatus — Monday to Friday (9am–9pm, IST +1)", () => {
  // Monday 2026-09-21, Dublin is IST (+1)
  // 09:00 Dublin = 08:00 UTC
  it("is open at 12:00 Dublin on a Monday", () => {
    const now = dublinDate(2026, 9, 21, 11, 0); // 12:00 Dublin (UTC+1)
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("open");
    if (status.state === "open") {
      expect(status.closes).toBe("9pm");
    }
  });

  it("is open at 09:00 Dublin exactly on a Tuesday", () => {
    const now = dublinDate(2026, 9, 22, 8, 0); // 09:00 Dublin
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("open");
  });

  it("is closed at 08:59 Dublin on a Wednesday", () => {
    const now = dublinDate(2026, 9, 23, 7, 59); // 08:59 Dublin
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("closed");
    if (status.state === "closed") {
      expect(status.opensDay).toBe("today");
      expect(status.opensAt).toBe("9am");
    }
  });

  it("is closing soon at 20:31 Dublin on a Thursday", () => {
    const now = dublinDate(2026, 9, 24, 19, 31); // 20:31 Dublin (within 30 min of 21:00)
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("soon");
    if (status.state === "soon") {
      expect(status.closes).toBe("9pm");
    }
  });

  it("is exactly on the closing-soon boundary at 20:30 Dublin", () => {
    const now = dublinDate(2026, 9, 25, 19, 30); // 20:30 Dublin
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("soon");
  });

  it("is open at 20:29 Dublin (not yet soon)", () => {
    const now = dublinDate(2026, 9, 25, 19, 29); // 20:29 Dublin
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("open");
  });

  it("is closed at 21:00 Dublin (close time is exclusive)", () => {
    const now = dublinDate(2026, 9, 25, 20, 0); // 21:00 Dublin
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("closed");
  });

  it("is closed at 23:00 Dublin on a Friday and opens tomorrow", () => {
    const now = dublinDate(2026, 9, 25, 22, 0); // 23:00 Dublin Friday
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("closed");
    if (status.state === "closed") {
      expect(status.opensDay).toBe("tomorrow");
      expect(status.opensAt).toBe("9:30am"); // Saturday opens 9:30
    }
  });
});

describe("getPharmacyStatus — Saturday (9:30am–8pm)", () => {
  // Saturday 2026-09-26, IST (+1)
  it("is open at 10:00 Dublin on Saturday", () => {
    const now = dublinDate(2026, 9, 26, 9, 0); // 10:00 Dublin
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("open");
    if (status.state === "open") {
      expect(status.closes).toBe("8pm");
    }
  });

  it("is closed at 09:00 Dublin on Saturday (opens at 9:30)", () => {
    const now = dublinDate(2026, 9, 26, 8, 0); // 09:00 Dublin
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("closed");
    if (status.state === "closed") {
      expect(status.opensAt).toBe("9:30am");
    }
  });

  it("is closing soon at 19:31 Dublin on Saturday", () => {
    const now = dublinDate(2026, 9, 26, 18, 31); // 19:31 Dublin
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("soon");
  });

  it("is closed at 20:01 Dublin on Saturday, opens Sunday", () => {
    const now = dublinDate(2026, 9, 26, 19, 1); // 20:01 Dublin Saturday
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("closed");
    if (status.state === "closed") {
      expect(status.opensDay).toBe("tomorrow");
      expect(status.opensAt).toBe("11am"); // Sunday opens 11:00
    }
  });
});

describe("getPharmacyStatus — Sunday (11am–6pm)", () => {
  // Sunday 2026-09-27, IST (+1)
  it("is open at 14:00 Dublin on Sunday", () => {
    const now = dublinDate(2026, 9, 27, 13, 0); // 14:00 Dublin
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("open");
    if (status.state === "open") {
      expect(status.closes).toBe("6pm");
    }
  });

  it("is closed after 18:00 on Sunday, opens Monday", () => {
    const now = dublinDate(2026, 9, 27, 17, 1); // 18:01 Dublin Sunday
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("closed");
    if (status.state === "closed") {
      expect(status.opensDay).toBe("tomorrow");
      expect(status.opensAt).toBe("9am");
    }
  });
});

describe("getPharmacyStatus — DST transition (last Sunday of October)", () => {
  // Clocks go back: 2026-10-25 at 02:00 IST → 01:00 GMT
  // After the clock change, Dublin is UTC+0

  it("handles a time in GMT (post-DST) correctly on the Monday after", () => {
    // Monday 2026-10-26 at 12:00 Dublin GMT (+0) = 12:00 UTC
    const now = new Date(Date.UTC(2026, 9, 26, 12, 0, 0));
    const status = getPharmacyStatus(now);
    // Oct 26 is also the October Bank Holiday in 2026
    // bankHoliday hours: 11:00–18:00
    expect(status.state).toBe("open");
    if (status.state === "open") {
      expect(status.closes).toBe("6pm");
    }
  });
});

describe("getPharmacyStatus — Bank holiday override", () => {
  // 2026-10-26 is a Monday AND the October Bank Holiday
  it("uses bank holiday hours on a Monday that is a bank holiday", () => {
    // 10:00 Dublin GMT (+0) on Oct 26 = 10:00 UTC
    const now = new Date(Date.UTC(2026, 9, 26, 10, 0, 0));
    const status = getPharmacyStatus(now);
    // Bank holiday: 11:00–18:00; 10:00 is before open
    expect(status.state).toBe("closed");
    if (status.state === "closed") {
      expect(status.opensAt).toBe("11am");
    }
  });

  it("is open at 12:00 Dublin on the October Bank Holiday", () => {
    const now = new Date(Date.UTC(2026, 9, 26, 12, 0, 0));
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("open");
  });
});

describe("getPharmacyStatus — midnight edge case", () => {
  it("is closed at exactly midnight on a Monday", () => {
    // 00:00 Dublin IST = 23:00 UTC Sunday
    const now = new Date(Date.UTC(2026, 8, 20, 23, 0, 0)); // 00:00 Dublin Monday Sep 21
    const status = getPharmacyStatus(now);
    expect(status.state).toBe("closed");
    if (status.state === "closed") {
      expect(status.opensDay).toBe("today");
    }
  });
});

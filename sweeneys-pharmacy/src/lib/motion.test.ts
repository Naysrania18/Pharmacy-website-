import { describe, expect, it } from "vitest";
import { countAt, easeOutExpo, formatCount } from "./motion";

describe("easeOutExpo", () => {
  it("starts at 0 and ends at 1", () => {
    expect(easeOutExpo(0)).toBe(0);
    expect(easeOutExpo(1)).toBe(1);
  });
  it("front-loads progress and never goes backwards", () => {
    expect(easeOutExpo(0.5)).toBeGreaterThan(0.9);
    let prev = 0;
    for (let t = 0.05; t <= 1; t += 0.05) {
      const v = easeOutExpo(t);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });
  it("clamps out-of-range input", () => {
    expect(easeOutExpo(-1)).toBe(0);
    expect(easeOutExpo(2)).toBe(1);
  });
});

describe("countAt", () => {
  it("returns whole numbers between from and to", () => {
    expect(countAt(0, 1500, 0)).toBe(0);
    expect(countAt(0, 1500, 1)).toBe(1500);
    expect(Number.isInteger(countAt(0, 1500, 0.37))).toBe(true);
  });
  it("counts downwards too", () => {
    expect(countAt(100, 0, 1)).toBe(0);
  });
});

describe("formatCount", () => {
  it("uses Irish thousands separators", () => {
    expect(formatCount(1500)).toBe("1,500");
    expect(formatCount(0)).toBe("0");
  });
  it("adds a prefix", () => {
    expect(formatCount(1500, "€")).toBe("€1,500");
  });
});

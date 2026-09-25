import { describe, expect, it } from "vitest";
import { pickActiveSection } from "./scrollspy";

const sections = [
  { id: "services", top: 900 },
  { id: "ask", top: 1700 },
  { id: "about", top: 2500 },
];

describe("pickActiveSection", () => {
  it("is null while every section is still below the probe line (on the hero)", () => {
    expect(pickActiveSection(sections, 360, false)).toBeNull();
  });

  it("picks a section once its top reaches the probe line", () => {
    expect(pickActiveSection([{ id: "services", top: 360 }, { id: "ask", top: 1187 }], 360, false)).toBe("services");
  });

  it("stays on the current section until the next one crosses the probe", () => {
    const tops = [{ id: "services", top: -400 }, { id: "ask", top: 427 }, { id: "about", top: 1254 }];
    expect(pickActiveSection(tops, 360, false)).toBe("services");
    const later = [{ id: "services", top: -470 }, { id: "ask", top: 357 }, { id: "about", top: 1184 }];
    expect(pickActiveSection(later, 360, false)).toBe("ask");
  });

  it("is exact right after a nav jump (section top sits under the header)", () => {
    const landed = [{ id: "services", top: -754 }, { id: "ask", top: 73 }, { id: "about", top: 900 }];
    expect(pickActiveSection(landed, 360, false)).toBe("ask");
  });

  it("returns the last section at the very bottom of the page, even if its top never reaches the probe", () => {
    expect(pickActiveSection(sections, 360, true)).toBe("about");
  });

  it("handles an empty list", () => {
    expect(pickActiveSection([], 360, false)).toBeNull();
    expect(pickActiveSection([], 360, true)).toBeNull();
  });
});

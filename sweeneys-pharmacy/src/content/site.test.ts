import { describe, expect, it } from "vitest";
import {
  ABOUT_COPY,
  CONNECTDOC,
  COMMUNITY,
  HERO_COPY,
  PRODUCTS,
  SERVICES,
  TRUST_FACTS,
  URGENT_HELP,
  VISIT_COPY,
} from "./site";

const PLACEHOLDER = /TODO_CONFIRM/;

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

describe("site content shown to visitors", () => {
  const displayCopy = {
    ABOUT_COPY,
    CONNECTDOC,
    COMMUNITY,
    HERO_COPY,
    PRODUCTS,
    SERVICES,
    TRUST_FACTS,
    URGENT_HELP,
    VISIT_COPY,
  };

  for (const [name, copy] of Object.entries(displayCopy)) {
    it(`${name} contains no unresolved TODO_CONFIRM placeholder`, () => {
      const offenders = collectStrings(copy).filter((s) => PLACEHOLDER.test(s));
      expect(offenders).toEqual([]);
    });
  }
});

describe("visitor-facing copy style", () => {
  it("contains no em or en dashes", () => {
    const all = collectStrings({ ABOUT_COPY, CONNECTDOC, COMMUNITY, HERO_COPY, PRODUCTS, SERVICES, TRUST_FACTS, URGENT_HELP, VISIT_COPY });
    expect(all.filter((s) => /[—–]/.test(s))).toEqual([]);
  });
});

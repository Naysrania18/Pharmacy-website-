/** Small, pure helpers behind the count-up animation. */

const clamp01 = (t: number): number => Math.min(1, Math.max(0, t));

/** Fast start, long soft landing. Same feel as Apple's stat counters. */
export function easeOutExpo(t: number): number {
  const c = clamp01(t);
  return c === 1 ? 1 : 1 - Math.pow(2, -10 * c);
}

/** Whole-number value of a count from `from` to `to` at eased progress `t` (0 to 1). */
export function countAt(from: number, to: number, t: number): number {
  return Math.round(from + (to - from) * easeOutExpo(t));
}

export function formatCount(value: number, prefix = ""): string {
  return `${prefix}${new Intl.NumberFormat("en-IE").format(value)}`;
}

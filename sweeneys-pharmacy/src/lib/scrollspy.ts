export interface SectionPosition {
  id: string;
  /** Distance from the top of the viewport to the top of the section, in px. */
  top: number;
}

/**
 * The section the reader is "in": the last one whose top has passed the probe
 * line. Sections must be in page order. Returns null on the hero (no section
 * has reached the line yet). At the bottom of the page the last section wins,
 * because a short final section may never reach the line.
 */
export function pickActiveSection(
  sections: readonly SectionPosition[],
  probeY: number,
  atBottom: boolean,
): string | null {
  if (sections.length === 0) return null;
  if (atBottom) return sections[sections.length - 1].id;

  let active: string | null = null;
  for (const section of sections) {
    if (section.top <= probeY) active = section.id;
  }
  return active;
}

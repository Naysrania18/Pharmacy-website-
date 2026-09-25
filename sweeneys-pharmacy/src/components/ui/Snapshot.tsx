import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";

interface SnapshotProps {
  src: StaticImageData;
  alt: string;
  caption?: string;
  /** Rotation in degrees, for a pinned-up-photo feel. */
  tilt?: number;
  /** Rendered width in px. Kept near the source size so small photos stay crisp. */
  width?: number;
  className?: string;
}

/** A print-style framed photo. Suits the small source photos we have. */
export function Snapshot({ src, alt, caption, tilt = 0, width = 260, className = "" }: SnapshotProps) {
  return (
    <figure
      style={{ width, maxWidth: "100%", "--tilt": `${tilt}deg` } as CSSProperties}
      className={`snap snap-photo bg-surface p-3 pb-3.5 shadow-[var(--shadow-md)] ring-1 ring-hairline ${className}`}
    >
      <Image src={src} alt={alt} className="h-auto w-full" />
      {caption && <figcaption className="mt-3 font-display text-[0.9375rem] italic text-muted">{caption}</figcaption>}
    </figure>
  );
}

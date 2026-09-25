"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

interface SpotlightGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Feeds the pointer position to every child marked `data-spot` so its `.spot`
 * glow can follow the cursor. One listener for the whole grid, throttled to
 * animation frames, mouse only (touch and pen skip it).
 */
export function SpotlightGrid({ children, className = "" }: SpotlightGridProps) {
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const grid = e.currentTarget;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      grid.querySelectorAll<HTMLElement>("[data-spot]").forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${clientX - rect.left}px`);
        card.style.setProperty("--my", `${clientY - rect.top}px`);
      });
    });
  };

  return (
    <div className={className} onPointerMove={handleMove}>
      {children}
    </div>
  );
}

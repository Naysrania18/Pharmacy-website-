"use client";

import { useEffect, useRef, useState } from "react";
import { countAt, formatCount } from "@/lib/motion";

interface CountUpProps {
  value: number;
  prefix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Counts up to `value` the first time it is mostly on screen.
 * Server HTML and no-JS show the final number. Screen readers get the final
 * number only, never the running count. The invisible copy fixes the width so
 * nothing shifts while digits change.
 */
export function CountUp({ value, prefix = "", durationMs = 1700, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setShown(0);
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = (now - start) / durationMs;
          setShown(countAt(0, value, t));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  const final = formatCount(value, prefix);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="invisible" aria-hidden="true">{final}</span>
      <span className="absolute left-0 top-0" aria-hidden="true">{formatCount(shown, prefix)}</span>
      <span className="sr-only">{final}</span>
    </span>
  );
}

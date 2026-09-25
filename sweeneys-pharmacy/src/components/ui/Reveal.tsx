"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: ElementType;
  /** text: fade, rise and soft blur. card: fade, rise and scale, no blur. */
  variant?: "text" | "card";
}

/** Reveals content once, the first time it scrolls into view. */
export function Reveal({ children, className = "", delayMs = 0, as: Component = "div", variant = "text" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <Component
      ref={ref}
      style={style}
      className={`reveal reveal-${variant} ${visible ? "revealed" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}

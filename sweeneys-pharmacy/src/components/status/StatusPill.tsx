"use client";

/**
 * StatusPill — live open/closing-soon/closed indicator.
 *
 * Renders a neutral server fallback ("See opening hours") that is visible
 * without JS. On mount, computes the real status from the pharmacy hours
 * in Europe/Dublin time and refreshes every 60 seconds.
 *
 * States:
 *   open  → green dot, "Open now until 9pm", soft amber glow
 *   soon  → amber dot, "Closing soon, 8:30pm" (last 30 min)
 *   closed → muted, "Closed. Opens tomorrow at 9am" (no glow)
 *
 * Accessibility:
 *   role="status" on the text span → polite live region
 *   aria-live="polite" on the wrapper
 *   Colour is never the ONLY differentiator: dot + text convey state
 */

import { useEffect, useState, useRef } from "react";
import { getPharmacyStatus, type PharmacyStatus } from "@/lib/pharmacy-status";
import { PHONE_HREF, PHONE_DISPLAY } from "@/content/site";

type PillVariant = "header" | "hero" | "footer" | "mobile-strip";

interface StatusPillProps {
  variant?: PillVariant;
}

function buildLabel(status: PharmacyStatus): string {
  switch (status.state) {
    case "open":
      return `Open now until ${status.closes}`;
    case "soon":
      return `Closing soon, ${status.closes}`;
    case "closed":
      return `Closed. Opens ${status.opensDay} at ${status.opensAt}`;
  }
}

export function StatusPill({ variant = "header" }: StatusPillProps) {
  const [status, setStatus] = useState<PharmacyStatus | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    function update() {
      setStatus(getPharmacyStatus());
    }
    update();
    intervalRef.current = setInterval(update, 60_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Server / pre-hydration fallback
  if (!status) {
    return (
      <a
        href={`#visit`}
        className={pillClass(variant, "idle")}
        aria-label="See opening hours"
      >
        <span className={dotClass("idle")} aria-hidden="true" />
        <span className="tabular">See opening hours</span>
      </a>
    );
  }

  const label = buildLabel(status);
  const stateKey = status.state;

  const isOpen = stateKey === "open";
  const isSoon = stateKey === "soon";

  return (
    <div
      className={pillClass(variant, stateKey)}
      aria-live="polite"
    >
      <span className={`relative flex-shrink-0 ${dotClass(stateKey)}`} aria-hidden="true">
        {/* Pulsing ring for open state */}
        {(isOpen || isSoon) && (
          <span className={`absolute inset-0 rounded-full animate-ping opacity-60 ${isOpen ? "bg-open" : "bg-soon"}`}
            style={{ animationDuration: "2s" }}
          />
        )}
      </span>
      <span role="status" className="tabular text-sm font-medium leading-none">
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type StateKey = "open" | "soon" | "closed" | "idle";

function dotClass(state: StateKey): string {
  const base = "inline-block w-2 h-2 rounded-full flex-shrink-0";
  const colours: Record<StateKey, string> = {
    open:   `${base} bg-[var(--color-open)]`,
    soon:   `${base} bg-[var(--color-soon)]`,
    closed: `${base} bg-[var(--color-closed)]`,
    idle:   `${base} bg-[var(--color-muted)] opacity-50`,
  };
  return colours[state];
}

function pillClass(variant: PillVariant, state: StateKey): string {
  const base =
    "relative inline-flex items-center gap-2 rounded-[999px] px-3 py-1.5 select-none";

  // Background and border by variant × state
  if (variant === "header") {
    const map: Record<StateKey, string> = {
      open:   "bg-[var(--color-surface)] border border-[var(--color-open)] text-[var(--color-open)]",
      soon:   "bg-[var(--color-surface)] border border-[var(--color-soon)] text-[var(--color-soon)]",
      closed: "bg-[var(--color-sage)] border border-[var(--color-hairline)] text-[var(--color-muted)]",
      idle:   "bg-[var(--color-sage)] border border-[var(--color-hairline)] text-[var(--color-muted)]",
    };
    return `${base} ${map[state]}`;
  }

  if (variant === "hero") {
    const map: Record<StateKey, string> = {
      open:   "bg-[var(--color-ink-2)] border border-[var(--color-open)] text-[var(--color-on-dark)] status-glow",
      soon:   "bg-[var(--color-ink-2)] border border-[var(--color-soon)] text-[var(--color-on-dark)]",
      closed: "bg-[var(--color-ink-2)] border border-[var(--color-hairline)] text-[var(--color-on-dark-muted)]",
      idle:   "bg-[var(--color-ink-2)] border border-[var(--color-hairline)] text-[var(--color-on-dark-muted)]",
    };
    return `${base} ${map[state]}`;
  }

  if (variant === "footer") {
    const map: Record<StateKey, string> = {
      open:   "bg-[var(--color-ink-2)] border border-[var(--color-open)] text-[var(--color-on-dark)]",
      soon:   "bg-[var(--color-ink-2)] border border-[var(--color-soon)] text-[var(--color-on-dark)]",
      closed: "text-[var(--color-on-dark-muted)]",
      idle:   "text-[var(--color-on-dark-muted)]",
    };
    return `${base} ${map[state]}`;
  }

  // mobile-strip
  const map: Record<StateKey, string> = {
    open:   "bg-[var(--color-open)] text-white",
    soon:   "bg-[var(--color-soon)] text-white",
    closed: "bg-[var(--color-ink-2)] text-[var(--color-on-dark-muted)]",
    idle:   "bg-[var(--color-ink-2)] text-[var(--color-on-dark-muted)]",
  };
  return `${base} ${map[state]}`;
}

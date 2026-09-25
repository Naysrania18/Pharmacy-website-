"use client";

import Link from "next/link";
import { statusLabel, usePharmacyStatus } from "@/lib/use-pharmacy-status";

type Tone = "dark" | "light";

interface StatusPillProps {
  tone?: Tone;
  className?: string;
  /** Announce changes to screen readers. Enable on one pill per page only. */
  announce?: boolean;
}

type Key = "open" | "soon" | "closed" | "idle";

const DOT: Record<Tone, Record<Key, string>> = {
  dark: {
    open: "text-[#6FD39A]",
    soon: "text-lamp",
    closed: "text-[#E8917B]",
    idle: "text-on-dark-muted",
  },
  light: {
    open: "text-open",
    soon: "text-soon",
    closed: "text-closed",
    idle: "text-muted",
  },
};

const SHELL: Record<Tone, string> = {
  dark: "border-line-dark bg-ink-2/70 text-on-dark",
  light: "border-hairline bg-surface text-ink",
};

/**
 * Live open / closing soon / closed indicator (Europe/Dublin time).
 * Shows a neutral link until hydrated so the server HTML never lies.
 * The dot and the words both carry the state, never colour alone.
 */
export function StatusPill({ tone = "dark", className = "", announce = false }: StatusPillProps) {
  const status = usePharmacyStatus();
  const key: Key = status ? status.state : "idle";
  const live = key === "open" || key === "soon";

  const inner = (
    <>
      <span className={`relative inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-current ${DOT[tone][key]} ${live ? "ping" : ""}`} aria-hidden="true" />
      <span className="tabular leading-tight">{status ? statusLabel(status) : "See opening hours"}</span>
    </>
  );

  const shell = `inline-flex min-h-10 items-center gap-2.5 rounded-full border px-3.5 py-2 text-sm font-bold sm:whitespace-nowrap ${SHELL[tone]} ${className}`;

  if (!status) {
    return (
      <Link href="/#visit" className={shell}>
        {inner}
      </Link>
    );
  }
  return (
    <p role={announce ? "status" : undefined} className={shell}>
      {inner}
    </p>
  );
}

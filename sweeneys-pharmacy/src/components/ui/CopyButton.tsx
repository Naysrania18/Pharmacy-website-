"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";

type State = "idle" | "copied" | "failed";
const RESET_MS = 1800;

/** Copies text to the clipboard with a small confirmation. Useful on desktop, where tel: links do nothing. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), RESET_MS);
  };

  return (
    <>
      <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-bold text-muted transition-colors hover:bg-ink/5 hover:text-ink"
    >
      {state === "copied" ? (
        <span key="copied" className="pop-in flex items-center gap-1.5 text-open" aria-hidden="true">
          <Icon name="check" size={18} />
          Copied
        </span>
      ) : state === "failed" ? (
        <span key="failed" className="pop-in text-closed" aria-hidden="true">Couldn&apos;t copy</span>
      ) : (
        <Icon name="copy" size={18} />
      )}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? `${label} copied` : state === "failed" ? "Copy failed" : ""}
      </span>
    </>
  );
}

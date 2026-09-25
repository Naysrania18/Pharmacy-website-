"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { CONNECTDOC } from "@/content/site";

/**
 * Interstitial shown before leaving for ConnectDoc, a separate company.
 * Uses the native <dialog> so focus is trapped, Escape closes it and focus
 * returns to the trigger without custom code.
 */
export function ConsentDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [consented, setConsented] = useState(false);

  const close = () => dialogRef.current?.close();

  const proceed = () => {
    if (!consented) return;
    window.open(CONNECTDOC.url, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <>
      <button type="button" className="btn btn-outline" onClick={() => dialogRef.current?.showModal()}>
        <span>{CONNECTDOC.heading}</span>
        <Icon name="external" size={18} />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="consent-title"
        onClose={() => setConsented(false)}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-[1.5rem] bg-surface p-0 text-body shadow-[var(--shadow-lg)] backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative space-y-5 p-7 sm:p-9">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <Icon name="close" size={22} />
          </button>

          <p className="eyebrow">External service</p>
          <h3 id="consent-title" className="pr-10 !text-[1.75rem]">
            You&rsquo;re leaving for a separate service
          </h3>
          <p>{CONNECTDOC.disclaimer}</p>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-sage/60 p-4 font-bold text-ink">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-green)]"
            />
            <span>{CONNECTDOC.consentText}</span>
          </label>

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <button type="button" onClick={close} className="btn btn-outline">
              Cancel
            </button>
            <button type="button" onClick={proceed} disabled={!consented} className="btn btn-green">
              {CONNECTDOC.buttonText}
              <Icon name="external" size={18} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

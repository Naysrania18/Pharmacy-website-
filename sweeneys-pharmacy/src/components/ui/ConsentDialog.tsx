"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@/components/icons";
import { CONNECTDOC } from "@/content/site";

export function ConsentDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDialog();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleProceed = () => {
    if (hasConsented) {
      window.open(CONNECTDOC.url, "_blank", "noopener,noreferrer");
      closeDialog();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openDialog}
        className="btn btn-secondary inline-flex items-center gap-2"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span>See a GP online</span>
        <Icon name="external" className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-dialog-title"
        >
          <div
            ref={dialogRef}
            className="w-full max-w-lg bg-surface rounded-2xl p-6 sm:p-8 shadow-lg border border-ink/10 space-y-5 relative"
          >
            <button
              type="button"
              onClick={closeDialog}
              className="absolute top-4 right-4 text-muted hover:text-ink focus-visible:outline-teal p-1 rounded-md"
              aria-label="Close dialog"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-amber-deep">
              <Icon name="alert" className="w-6 h-6 shrink-0" />
              <h3
                id="consent-dialog-title"
                className="font-serif text-xl font-semibold text-ink"
              >
                External GP Service Notice
              </h3>
            </div>

            <p className="text-body text-sm sm:text-base leading-relaxed">
              {CONNECTDOC.disclaimer}
            </p>

            <div className="bg-sage/40 p-4 rounded-xl border border-ink/5 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer text-sm font-medium text-ink select-none">
                <input
                  type="checkbox"
                  checked={hasConsented}
                  onChange={(e) => setHasConsented(e.target.checked)}
                  className="mt-1 w-4 h-4 text-teal rounded border-ink/20 focus:ring-teal"
                />
                <span>{CONNECTDOC.consentText}</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeDialog}
                className="btn btn-secondary w-full sm:w-auto text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!hasConsented}
                onClick={handleProceed}
                className="btn btn-primary w-full sm:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-disabled={!hasConsented}
              >
                {CONNECTDOC.buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

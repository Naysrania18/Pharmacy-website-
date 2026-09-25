import React from "react";
import { Icon } from "@/components/icons";
import { ConsentDialog } from "@/components/ui/ConsentDialog";
import { Reveal } from "@/components/ui/Reveal";
import { PHARMACY, CONNECTDOC, ASK_PHARMACY } from "@/content/site";

export function AskAndGp() {
  return (
    <section id="ask-and-gp" className="py-16 md:py-24 bg-paper border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Large Teal Card: Ask the Pharmacy */}
          <div className="lg:col-span-7">
            <Reveal className="h-full">
              <div className="h-full bg-teal text-surface rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-md">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-surface/10 flex items-center justify-center text-surface">
                    <Icon name="message" className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                    {ASK_PHARMACY.heading}
                  </h2>
                  <p className="text-surface/90 text-base sm:text-lg leading-relaxed max-w-xl">
                    {ASK_PHARMACY.body}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-surface/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href={PHARMACY.phoneTel}
                      className="btn bg-surface text-ink hover:bg-paper font-semibold py-3 px-5 text-center flex items-center justify-center gap-2 rounded-xl"
                    >
                      <Icon name="phone" className="w-4 h-4 text-teal" />
                      <span>Call {PHARMACY.phoneDisplay}</span>
                    </a>
                    <a
                      href={PHARMACY.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-surface/10 hover:bg-surface/20 text-surface border border-surface/30 font-semibold py-3 px-5 text-center flex items-center justify-center gap-2 rounded-xl"
                    >
                      <Icon name="whatsapp" className="w-4 h-4 text-surface" />
                      <span>Message on WhatsApp</span>
                    </a>
                  </div>
                  <p className="text-xs text-surface/70 italic text-center sm:text-left">
                    {PHARMACY.whatsappDisclaimer}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Smaller White Card: See a GP Online (ConnectDoc) */}
          <div className="lg:col-span-5">
            <Reveal delayMs={100} className="h-full">
              <div className="h-full bg-surface border border-ink/10 rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="eyebrow">{CONNECTDOC.tagline}</span>
                    <span className="bg-sage text-ink text-xs font-semibold px-2.5 py-1 rounded-full border border-ink/10">
                      {CONNECTDOC.separateTag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-ink">
                    {CONNECTDOC.heading}
                  </h3>

                  <p className="text-body text-sm sm:text-base leading-relaxed">
                    {CONNECTDOC.body}
                  </p>
                </div>

                <div className="pt-4 border-t border-ink/10 space-y-3">
                  <ConsentDialog />
                  <p className="text-xs text-muted leading-snug">
                    {CONNECTDOC.disclaimer}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

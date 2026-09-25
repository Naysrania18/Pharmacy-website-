import React from "react";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { StatusPill } from "@/components/status/StatusPill";
import { Reveal } from "@/components/ui/Reveal";
import { HERO_COPY, PHARMACY, URGENT_HELP, TRUST_FACTS } from "@/content/site";
import heroImg from "@/assets/images/pharmacy-interior-placeholder.png";

export function Hero() {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 bg-paper border-b border-ink/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <span className="eyebrow inline-block mb-2">
                {HERO_COPY.eyebrow}
              </span>
              <h1 className="font-serif font-bold text-ink text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-balance">
                {HERO_COPY.h1}
              </h1>
            </Reveal>

            <Reveal delayMs={100}>
              <p className="text-body text-lg sm:text-xl leading-relaxed max-w-2xl font-normal text-pretty">
                {HERO_COPY.subline}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delayMs={200}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={PHARMACY.phoneTel}
                  className="btn btn-primary text-base py-3.5 px-6 shadow-sm"
                >
                  <Icon name="phone" className="w-5 h-5 mr-2" />
                  <span>{HERO_COPY.primaryCta}</span>
                </a>
                <a
                  href="#visit"
                  className="btn btn-secondary text-base py-3.5 px-6"
                >
                  <span>{HERO_COPY.secondaryCta}</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Imagery & Floating Status */}
          <div className="lg:col-span-5">
            <Reveal delayMs={150}>
              <div className="relative rounded-3xl overflow-hidden border border-ink/10 bg-surface shadow-md aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
                <Image
                  src={heroImg}
                  alt="Sweeney's Pharmacy counter and interior on Port Road"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <StatusPill variant="hero" />
                  <div className="bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-ink border border-ink/10 flex items-center gap-1.5 shadow-xs">
                    <Icon name="badge" className="w-3.5 h-3.5 text-teal" />
                    <span>Karima Sweeney MPSI</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Urgent Help Strip */}
        <Reveal delayMs={250}>
          <div className="bg-sage/40 border border-ink/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Icon name="alert" className="w-5 h-5 text-amber-deep shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-semibold text-ink">Urgent Help: </span>
                <span className="text-body">{URGENT_HELP.emergency}</span>
                <span className="block sm:inline sm:ml-2 text-muted">
                  {URGENT_HELP.outOfHours}
                </span>
              </div>
            </div>
            <a
              href={`tel:${URGENT_HELP.outOfHoursPhone.replace(/\s/g, "")}`}
              className="text-xs font-semibold text-teal hover:underline shrink-0"
            >
              Call Out-of-Hours GP ({URGENT_HELP.outOfHoursPhone})
            </a>
          </div>
        </Reveal>

        {/* Four-Fact Trust Row */}
        <Reveal delayMs={300}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-ink/10">
            {TRUST_FACTS.map((fact) => (
              <div key={fact.title} className="space-y-1">
                <h4 className="font-semibold text-sm text-ink">{fact.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{fact.subtitle}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

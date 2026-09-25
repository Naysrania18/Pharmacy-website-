import React from "react";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { COMMUNITY } from "@/content/site";
import wellnessImg from "@/assets/images/wellness-day.jpg";
import salamImg from "@/assets/images/salam-charity.jpg";

export function Community() {
  return (
    <section id="community" className="py-16 md:py-24 bg-sage/30 border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <span className="eyebrow">Local & Global Support</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              Community & Outreach
            </h2>
            <p className="text-body text-base sm:text-lg">
              Supporting health in Letterkenny and providing humanitarian aid abroad.
            </p>
          </div>
        </Reveal>

        {/* Asymmetric Community Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Large Card: Wellness Day */}
          <div className="lg:col-span-7">
            <Reveal className="h-full">
              <div className="bg-surface border border-ink/10 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative aspect-16/9 w-full bg-sage/50">
                  <Image
                    src={wellnessImg}
                    alt="Letterkenny Wellness Day free health event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">
                      Local Health Initiative
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-ink">
                      {COMMUNITY.wellnessDay.heading}
                    </h3>
                    <p className="text-body text-sm sm:text-base leading-relaxed">
                      {COMMUNITY.wellnessDay.body}
                    </p>
                  </div>
                  <div className="pt-2 text-xs text-muted font-mono">
                    Event details & date: {COMMUNITY.wellnessDay.dateNote}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Compact Card: Salam Charity Gaza Donation */}
          <div className="lg:col-span-5">
            <Reveal delayMs={100} className="h-full">
              <div className="bg-surface border border-ink/10 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-sage/30">
                    <Image
                      src={salamImg}
                      alt="Salam Charity medical supplies"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-muted uppercase tracking-wider">
                      Humanitarian Aid
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-4xl font-bold text-ink tracking-tight">
                        {COMMUNITY.charity.amount}
                      </span>
                      <span className="text-sm font-medium text-muted">Donated</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-ink pt-1">
                      {COMMUNITY.charity.heading}
                    </h3>
                    <p className="text-body text-sm leading-relaxed">
                      {COMMUNITY.charity.body}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-ink/5 space-y-1 text-xs text-muted font-mono">
                  <p>Salam Charity RCN: {COMMUNITY.charity.rcnNote}</p>
                  <p>Confirmation: {COMMUNITY.charity.consentNote}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

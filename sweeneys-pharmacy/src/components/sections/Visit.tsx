import React from "react";
import { Icon } from "@/components/icons";
import { MapFacade } from "@/components/ui/MapFacade";
import { HoursTable } from "@/components/status/HoursTable";
import { Reveal } from "@/components/ui/Reveal";
import { PHARMACY, VISIT_COPY } from "@/content/site";

export function Visit() {
  return (
    <section id="visit" className="py-16 md:py-24 bg-paper border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <span className="eyebrow">Location & Hours</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              {VISIT_COPY.heading}
            </h2>
            <p className="text-body text-base sm:text-lg">
              Located conveniently on Port Road in Letterkenny with free parking nearby.
            </p>
          </div>
        </Reveal>

        {/* Two-Column Grid: Map Facade & Hours Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Map Facade */}
          <div className="lg:col-span-7 space-y-4">
            <Reveal>
              <MapFacade
                embedUrl={PHARMACY.googleMapsEmbedUrl}
                mapsUrl={PHARMACY.googleMapsUrl}
              />
            </Reveal>

            <Reveal delayMs={100}>
              <div className="bg-surface border border-ink/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-ink">{PHARMACY.name}</p>
                  <p className="text-muted">{PHARMACY.street}, {PHARMACY.town}, {PHARMACY.county}, Eircode: {PHARMACY.eircode}</p>
                </div>
                <a
                  href={PHARMACY.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-sm py-2 px-4 shrink-0 flex items-center gap-1.5"
                >
                  <Icon name="mapPin" className="w-4 h-4 text-teal" />
                  <span>Get directions</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Opening Hours Table & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delayMs={100}>
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-ink">
                  Opening Hours
                </h3>
                <HoursTable />
              </div>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="bg-surface border border-ink/10 rounded-2xl p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-ink">
                  Direct Contacts
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href={PHARMACY.phoneTel}
                      className="flex items-center gap-3 text-body hover:text-teal font-medium transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center text-teal shrink-0">
                        <Icon name="phone" className="w-4 h-4" />
                      </div>
                      <span>Call {PHARMACY.phoneDisplay}</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={PHARMACY.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-body hover:text-teal font-medium transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center text-teal shrink-0">
                        <Icon name="whatsapp" className="w-4 h-4" />
                      </div>
                      <span>Message on WhatsApp</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={`mailto:${PHARMACY.email}`}
                      className="flex items-center gap-3 text-body hover:text-teal font-medium transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center text-teal shrink-0">
                        <Icon name="email" className="w-4 h-4" />
                      </div>
                      <span>Email {PHARMACY.email}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Icon, IconName } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/content/site";

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-sage/40 border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <span className="eyebrow">Care & Dispensing</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              Pharmacy Services on Port Road
            </h2>
            <p className="text-body text-base sm:text-lg">
              We offer essential dispensing, clinical advice and health checks. Talk to Karima or our pharmacy team anytime during opening hours.
            </p>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SERVICES.map((service, idx) => {
            // Bento layout sizing:
            // Item 0 (Prescriptions): Large span 8
            // Item 1 (Pharmacist Advice): Span 4
            // Item 2 (Vaccinations): Span 4
            // Item 3 (Blood pressure): Span 4
            // Item 4 (Stop smoking): Span 4
            // Item 5 (Mother and baby): Span 12 or Span 4
            let colSpan = "md:col-span-4";
            if (idx === 0) colSpan = "md:col-span-8";
            if (idx === 5) colSpan = "md:col-span-12 lg:col-span-4";

            return (
              <Reveal key={service.title} delayMs={idx * 50} className={colSpan}>
                <details className="group h-full bg-surface border border-ink/10 rounded-2xl p-6 shadow-xs transition-shadow hover:shadow-md [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-start justify-between cursor-pointer list-none select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center text-teal shrink-0">
                        <Icon name={service.icon as IconName} className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-ink group-hover:text-teal transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <span className="text-muted group-open:rotate-180 transition-transform duration-200">
                      <Icon name="chevronDown" className="w-5 h-5" />
                    </span>
                  </summary>

                  <div className="mt-4 pt-4 border-t border-ink/5 space-y-3 text-body text-sm sm:text-base leading-relaxed">
                    <p>{service.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted pt-1">
                      <span>Click to toggle details</span>
                      <a href="#visit" className="text-teal font-semibold hover:underline">
                        Inquire in store &rarr;
                      </a>
                    </div>
                  </div>
                </details>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

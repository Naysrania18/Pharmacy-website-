import React from "react";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT_COPY, PHARMACY } from "@/content/site";
import interiorImg from "@/assets/images/pharmacy-interior-placeholder.png";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-ink text-on-dark border-b border-ink-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Portrait / Image Frame */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden border border-ink-2 bg-ink-2 aspect-4/5 shadow-lg">
                <Image
                  src={interiorImg}
                  alt="Karima Sweeney MPSI at Sweeney's Pharmacy Port Road"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-ink/80 backdrop-blur-md border border-ink-2 space-y-1">
                  <p className="font-serif text-lg font-bold text-surface">
                    {PHARMACY.pharmacist}
                  </p>
                  <p className="text-xs text-on-dark-muted">
                    Superintendent Pharmacist & Owner
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Copy */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delayMs={100}>
              <span className="eyebrow inline-block">Established on Port Road</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-surface tracking-tight mt-2">
                {ABOUT_COPY.heading}
              </h2>
            </Reveal>

            <Reveal delayMs={200}>
              <p className="text-on-dark-muted text-base sm:text-lg leading-relaxed text-pretty">
                {ABOUT_COPY.body}
              </p>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-ink-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal/20 text-amber flex items-center justify-center shrink-0 mt-1">
                    <Icon name="badge" className="w-4 h-4 text-amber" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surface">MPSI Registered</h3>
                    <p className="text-xs text-on-dark-muted">Fully qualified & PSI regulated</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal/20 text-amber flex items-center justify-center shrink-0 mt-1">
                    <Icon name="clock" className="w-4 h-4 text-amber" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-surface">Late Night Opening</h3>
                    <p className="text-xs text-on-dark-muted">Open until 9pm Monday to Friday</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

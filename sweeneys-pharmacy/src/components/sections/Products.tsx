import React from "react";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { PRODUCTS_COPY, PRODUCTS } from "@/content/site";
import otcImg from "@/assets/images/otc-medicines.jpg";
import biocareImg from "@/assets/images/biocare-supplements.jpg";

export function Products() {
  const imagesMap = {
    "otc-medicines.jpg": otcImg,
    "biocare-supplements.jpg": biocareImg,
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-paper border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <span className="eyebrow">Over the counter & Nutrition</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
              {PRODUCTS_COPY.heading}
            </h2>
            <p className="text-body text-base sm:text-lg leading-relaxed">
              {PRODUCTS_COPY.body}
            </p>
          </div>
        </Reveal>

        {/* Editorial Two-Up Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PRODUCTS.map((prod, idx) => {
            const imgSrc = imagesMap[prod.image as keyof typeof imagesMap] || otcImg;

            return (
              <Reveal key={prod.title} delayMs={idx * 100}>
                <div className="bg-surface border border-ink/10 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="relative aspect-16/10 w-full bg-sage/30">
                    <Image
                      src={imgSrc}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-ink border border-ink/10">
                      {prod.tag}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-ink">
                        {prod.title}
                      </h3>
                      <p className="text-body text-sm sm:text-base leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-ink/5 flex items-center justify-between">
                      <span className="text-xs text-muted font-medium">
                        Always read the label
                      </span>
                      <a
                        href="#visit"
                        className="text-xs font-semibold text-teal hover:underline flex items-center gap-1"
                      >
                        <span>Ask pharmacist in store</span>
                        <Icon name="chevronDown" className="w-3.5 h-3.5 -rotate-90" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

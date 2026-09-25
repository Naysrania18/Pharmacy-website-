"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { PHARMACY } from "@/content/site";

export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide mobile action bar when #visit section is in view
    const visitElement = document.getElementById("visit");
    if (!visitElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(visitElement);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-t border-ink/10 shadow-lg px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Mobile quick actions"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto h-12">
        {/* 1. Call */}
        <a
          href={PHARMACY.phoneTel}
          className="flex items-center justify-center gap-1.5 bg-teal text-surface rounded-lg font-medium text-xs sm:text-sm shadow-xs active:scale-95 transition-transform"
          aria-label="Call Sweeney's Pharmacy"
        >
          <Icon name="phone" className="w-4 h-4 shrink-0" />
          <span>Call</span>
        </a>

        {/* 2. Directions */}
        <a
          href={PHARMACY.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-sage text-ink rounded-lg font-medium text-xs sm:text-sm active:scale-95 transition-transform"
          aria-label="Get directions to Sweeney's Pharmacy"
        >
          <Icon name="mapPin" className="w-4 h-4 shrink-0 text-teal" />
          <span>Directions</span>
        </a>

        {/* 3. WhatsApp */}
        <a
          href={PHARMACY.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-sage text-ink rounded-lg font-medium text-xs sm:text-sm active:scale-95 transition-transform"
          aria-label="Message Sweeney's Pharmacy on WhatsApp"
        >
          <Icon name="whatsapp" className="w-4 h-4 shrink-0 text-teal" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

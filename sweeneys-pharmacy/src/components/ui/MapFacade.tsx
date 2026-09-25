"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { PHARMACY } from "@/content/site";

interface MapFacadeProps {
  embedUrl: string;
  mapsUrl: string;
}

/**
 * Click-to-load map. Nothing is requested from Google until the visitor asks,
 * which keeps the page fast and avoids third-party tracking by default.
 */
export function MapFacade({ embedUrl, mapsUrl }: MapFacadeProps) {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (loaded) frameRef.current?.focus();
  }, [loaded]);

  if (loaded) {
    return (
      <iframe
        ref={frameRef}
        src={embedUrl}
        title="Map showing Sweeney's Pharmacy on Port Road, Letterkenny"
        className="h-full min-h-[22rem] w-full rounded-[1.5rem] border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="on-dark relative isolate flex h-full min-h-[22rem] flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-ink-2 p-8 text-center text-on-dark">
      {/* Abstract street grid, drawn not fetched */}
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
        <g fill="none" stroke="#D8B25A" strokeOpacity="0.35" strokeWidth="1.2">
          <path d="M-10 210 C 90 190, 150 140, 400 120" />
          <path d="M120 -10 C 140 90, 190 180, 260 310" />
          <path d="M-10 90 L410 60" />
          <path d="M40 310 L210 -10" />
          <path d="M300 -10 L340 310" />
          <path d="M-10 260 L410 250" />
        </g>
        <path d="M-10 150 C 120 130, 220 170, 410 190" fill="none" stroke="#D8B25A" strokeOpacity="0.7" strokeWidth="6" strokeLinecap="round" />
      </svg>

      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-lamp text-ink shadow-[0_0_0_10px_rgba(245,184,74,0.18)]">
        <Icon name="mapPin" size={26} />
      </span>
      <p className="mt-5 font-display text-2xl">Port Road, Letterkenny</p>
      <p className="mt-1 text-on-dark-muted">{PHARMACY.eircode}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-lamp">
          <Icon name="arrow-right" size={18} />
          Get directions
        </a>
        <button type="button" onClick={() => setLoaded(true)} className="btn btn-outline-dark">
          Load Map
        </button>
      </div>
      <p className="mt-4 max-w-[30ch] text-sm text-on-dark-muted">Loading the map sends a request to Google Maps.</p>
    </div>
  );
}

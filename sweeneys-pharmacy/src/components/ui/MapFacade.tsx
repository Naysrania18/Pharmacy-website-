"use client";

import React, { useState } from "react";
import { Icon } from "@/components/icons";
import { PHARMACY } from "@/content/site";

interface MapFacadeProps {
  embedUrl: string;
  mapsUrl: string;
}

export function MapFacade({ embedUrl, mapsUrl }: MapFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden bg-sage/50 border border-ink/10 flex flex-col justify-between p-6">
      {!isLoaded ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-surface/90 backdrop-blur-xs">
          <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center mb-4">
            <Icon name="mapPin" className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-ink mb-1">
            Interactive Map
          </h3>
          <p className="text-sm text-muted max-w-xs mb-5">
            Clicking load will request map data from Google Maps.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsLoaded(true)}
              className="btn btn-primary text-sm py-2.5 px-5"
            >
              Load Map
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-sm py-2.5 px-5"
            >
              Get directions
            </a>
          </div>
        </div>
      ) : hasError ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-surface">
          <Icon name="alert" className="w-8 h-8 text-amber-deep mb-3" />
          <p className="text-body text-sm font-medium max-w-sm mb-4">
            The map didn&apos;t load. We&apos;re on Port Road, Letterkenny, {PHARMACY.eircode}.
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm"
          >
            Open in Google Maps
          </a>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          title="Sweeney's Pharmacy Location Map"
          className="w-full h-full border-0 rounded-2xl"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

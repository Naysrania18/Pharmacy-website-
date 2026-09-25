"use client";

import { useEffect, useState } from "react";
import { getPharmacyStatus, type PharmacyStatus } from "./pharmacy-status";

const REFRESH_MS = 60_000;

/**
 * Live pharmacy status in Europe/Dublin time. Returns null until mounted so
 * server HTML and first client render match; consumers show a neutral state.
 */
export function usePharmacyStatus(): PharmacyStatus | null {
  const [status, setStatus] = useState<PharmacyStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getPharmacyStatus());
    update();
    const id = setInterval(update, REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  return status;
}

export function statusLabel(status: PharmacyStatus): string {
  switch (status.state) {
    case "open":
      return `Open now until ${status.closes}`;
    case "soon":
      return `Closing soon, ${status.closes}`;
    case "closed":
      return `Closed. Opens ${status.opensDay} at ${status.opensAt}`;
  }
}

"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import { PHARMACY } from "@/content/site";

interface Action {
  href: string;
  label: string;
  aria: string;
  icon: IconName;
  external?: boolean;
  primary?: boolean;
}

const ACTIONS: readonly Action[] = [
  { href: PHARMACY.phoneTel, label: "Call", aria: "Call Sweeney's Pharmacy", icon: "phone", primary: true },
  { href: PHARMACY.googleMapsUrl, label: "Directions", aria: "Get directions to Sweeney's Pharmacy", icon: "mapPin", external: true },
  { href: PHARMACY.whatsappUrl, label: "WhatsApp", aria: "Message Sweeney's Pharmacy on WhatsApp", icon: "whatsapp", external: true },
];

/** Thumb-reach shortcuts on phones. Steps aside once the Visit section is on screen. */
export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const visit = document.getElementById("visit");
    if (!visit) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(visit);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Quick actions"
      hidden={hidden}
      className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-3 gap-2">
        {ACTIONS.map((a) => (
          <li key={a.label}>
            <a
              href={a.href}
              aria-label={a.aria}
              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-full text-sm font-bold transition-transform active:scale-95 ${a.primary ? "bg-lamp text-ink" : "bg-ink-2 text-on-dark ring-1 ring-line-dark"}`}
            >
              <Icon name={a.icon} size={18} />
              {a.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

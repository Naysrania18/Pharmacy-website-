import React from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { StatusPill } from "@/components/status/StatusPill";
import { PHARMACY, FOOTER_DISCLAIMER, TODO_CONFIRM } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark pt-16 pb-24 md:pb-16 border-t border-ink-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Status */}
          <div className="space-y-4 md:col-span-1">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-surface">
                {PHARMACY.name}
              </h3>
              <p className="text-sm text-on-dark-muted">
                Supervised by {PHARMACY.pharmacist}
              </p>
            </div>
            <div className="pt-2">
              <StatusPill variant="footer" />
            </div>
          </div>

          {/* Col 2: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-amber-deep">
              Location & Contact
            </h4>
            <address className="not-italic text-sm text-on-dark-muted space-y-1">
              <p>{PHARMACY.street}</p>
              <p>{PHARMACY.town}, {PHARMACY.county}</p>
              <p>Eircode: <span className="font-mono">{PHARMACY.eircode}</span></p>
            </address>
            <div className="pt-1 space-y-1 text-sm">
              <p>
                <a href={PHARMACY.phoneTel} className="hover:text-surface transition-colors">
                  Phone: {PHARMACY.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${PHARMACY.email}`} className="hover:text-surface transition-colors">
                  Email: {PHARMACY.email}
                </a>
              </p>
            </div>
          </div>

          {/* Col 3: Hours Summary */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-amber-deep">
              Opening Hours
            </h4>
            <ul className="text-sm text-on-dark-muted space-y-1.5 font-mono">
              <li>Mon – Fri: 9:00am – 9:00pm</li>
              <li>Saturday: 9:30am – 8:00pm</li>
              <li>Sunday: 11:00am – 6:00pm</li>
              <li className="text-xs text-on-dark-muted/80">Bank Holidays: 11:00am – 6:00pm</li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-amber-deep">
              Navigation & Legal
            </h4>
            <ul className="text-sm space-y-2 text-on-dark-muted">
              <li>
                <Link href="/#services" className="hover:text-surface transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#ask-and-gp" className="hover:text-surface transition-colors">
                  See a GP Online
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-surface transition-colors">
                  About Karima Sweeney
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-surface transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-surface transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Disclaimer Band */}
        <div className="pt-8 border-t border-ink-2/60 space-y-4 text-xs text-on-dark-muted leading-relaxed">
          <p className="p-4 rounded-xl bg-ink-2/40 border border-ink-2/80">
            {FOOTER_DISCLAIMER}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="space-y-1">
              <p>
                PSI Registration: <span className="font-mono">{TODO_CONFIRM("psiRegistrationNumber")}</span> | Registered Pharmacy Premises: Port Road, Letterkenny
              </p>
              <p>
                Pharmacist in Charge: {PHARMACY.pharmacist} | {" "}
                <a
                  href="https://www.psi.ie/register/pharmacies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-surface"
                >
                  Verify on PSI Register
                </a>
              </p>
            </div>
            <div className="text-right whitespace-nowrap text-on-dark-muted/70">
              <span>Last reviewed: September 2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

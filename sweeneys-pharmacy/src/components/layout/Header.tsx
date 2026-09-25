"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { StatusPill } from "@/components/status/StatusPill";
import { PHARMACY, NAV_LINKS } from "@/content/site";
import logoImg from "@/assets/images/logo.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on resize to desktop (> 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-ink/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand logo & name */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-teal rounded-lg p-1 -ml-1"
        >
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src={logoImg}
              alt="Sweeney's Late Night Pharmacy Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-ink leading-tight group-hover:text-teal transition-colors">
              Sweeney&apos;s
            </span>
            <span className="text-xs text-muted font-medium tracking-tight">
              Late Night Pharmacy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 hover:text-teal focus-visible:outline-teal rounded-md px-2 py-1 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Header Actions */}
        <div className="hidden md:flex items-center gap-4">
          <StatusPill variant="header" />
          <a
            href={PHARMACY.phoneTel}
            className="btn btn-primary text-sm py-2 px-4"
          >
            <Icon name="phone" className="w-4 h-4 mr-1.5" />
            <span>Call us</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink rounded-lg focus-visible:outline-teal hover:bg-sage/50"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sticky Status Bar */}
      <div className="md:hidden border-t border-ink/5 bg-sage/30 px-4 py-2 flex items-center justify-center">
        <StatusPill variant="mobile-strip" />
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-navigation-menu"
        className={`md:hidden fixed inset-x-0 top-[115px] bg-paper border-b border-ink/10 shadow-lg transition-all duration-300 ease-in-out origin-top ${
          mobileMenuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none hidden"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="p-6 space-y-5 max-w-lg mx-auto">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-ink hover:text-teal py-2 border-b border-ink/5 focus-visible:outline-teal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col space-y-3">
            <a
              href={PHARMACY.phoneTel}
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary w-full text-center flex items-center justify-center gap-2"
            >
              <Icon name="phone" className="w-4 h-4" />
              <span>Call 074 921 0034</span>
            </a>
            <a
              href={PHARMACY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-secondary w-full text-center flex items-center justify-center gap-2"
            >
              <Icon name="whatsapp" className="w-4 h-4" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

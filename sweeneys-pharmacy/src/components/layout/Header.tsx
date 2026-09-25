"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Mark } from "@/components/ui/Mark";
import { StatusPill } from "@/components/status/StatusPill";
import { NAV_LINKS, PHARMACY } from "@/content/site";
import { pickActiveSection } from "@/lib/scrollspy";

const SCROLLED_AFTER_PX = 8;
/** A section becomes current once its top passes this fraction of the viewport height. */
const PROBE_RATIO = 0.4;
/** How long after the last scroll event a jump counts as finished. */
const SETTLE_MS = 140;
const JUMP_GRACE_MS = 400;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

/**
 * The nav section the reader is in, from scroll position (not an observer band,
 * which left gaps between sections). While a nav click is smooth-scrolling, the
 * clicked item stays selected instead of the highlight racing through every
 * section on the way.
 */
function useActiveSection(): { active: string | null; jumpTo: (id: string) => void } {
  const [active, setActive] = useState<string | null>(null);
  const jumping = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const frame = useRef(0);

  const measure = useCallback(() => {
    const positions = SECTION_IDS.flatMap((id) => {
      const el = document.getElementById(id);
      return el ? [{ id, top: el.getBoundingClientRect().top }] : [];
    });
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    setActive(pickActiveSection(positions, window.innerHeight * PROBE_RATIO, atBottom));
  }, []);

  const armSettle = useCallback(
    (ms: number) => {
      clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        jumping.current = false;
        measure();
      }, ms);
    },
    [measure],
  );

  useEffect(() => {
    const onScroll = () => {
      armSettle(SETTLE_MS);
      if (jumping.current) return;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame.current);
      clearTimeout(settleTimer.current);
    };
  }, [measure, armSettle]);

  const jumpTo = useCallback(
    (id: string) => {
      jumping.current = true;
      setActive(id);
      armSettle(JUMP_GRACE_MS);
    },
    [armSettle],
  );

  return { active, jumpTo };
}

function useScrolled(): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLLED_AFTER_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return scrolled;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const { active, jumpTo } = useActiveSection();
  const scrolled = useScrolled();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Slide the indicator under the active link, and keep it right after resizes or font loads.
  useEffect(() => {
    const track = trackRef.current;
    const indicator = indicatorRef.current;
    if (!track || !indicator) return;

    const place = () => {
      const link = active ? linkRefs.current[active] : null;
      if (!link) {
        indicator.dataset.visible = "false";
        return;
      }
      indicator.style.setProperty("--x", `${link.offsetLeft}px`);
      indicator.style.setProperty("--w", `${link.offsetWidth}px`);
      indicator.dataset.visible = "true";
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(track);
    return () => observer.disconnect();
  }, [active]);

  return (
    <header
      data-scrolled={scrolled}
      className="site-header on-dark sticky top-0 z-40 border-b border-line-dark bg-ink text-on-dark backdrop-blur-md"
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3 rounded-lg" aria-label="Sweeney's Late Night Pharmacy, home">
          <Mark className="h-9 w-9 text-brass transition-transform duration-700 ease-[var(--ease-spring)] group-hover:-rotate-12" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.375rem] font-medium tracking-tight text-on-dark">Sweeney&rsquo;s</span>
            <span className="mt-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-brass">Late Night Pharmacy</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          {/* The track is the only positioned ancestor, so link.offsetLeft is measured from it. */}
          <div ref={trackRef} className="relative">
            <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" data-visible="false" />
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const id = link.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <Link
                      href={`/${link.href}`}
                      ref={(el) => {
                        linkRefs.current[id] = el;
                      }}
                      onClick={() => jumpTo(id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative block rounded-full px-4 py-2 text-[0.9375rem] font-bold transition-colors duration-300 ${isActive ? "text-on-dark" : "text-on-dark-muted hover:text-on-dark"}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden 2xl:block"><StatusPill /></div>
          <a href={PHARMACY.phoneTel} className="btn btn-lamp !min-h-11 !px-5 whitespace-nowrap" aria-label={`Call ${PHARMACY.phoneDisplay}`}>
            <Icon name="phone" size={18} />
            <span className="hidden sm:inline tabular">{PHARMACY.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-line-dark text-on-dark transition-colors hover:bg-ink-2 active:scale-95 lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute transition-all duration-300 ${open ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}>
              <Icon name="menu" size={22} />
            </span>
            <span className={`absolute transition-all duration-300 ${open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"}`}>
              <Icon name="close" size={22} />
            </span>
          </button>
        </div>
      </div>

      <div id={panelId} data-open={open} inert={!open} className="menu-panel lg:hidden">
        <div>
          <nav aria-label="Mobile" className="wrap max-h-[calc(100svh-var(--header-h))] overflow-y-auto border-t border-line-dark bg-ink pb-4 pt-2">
            <ul>
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="menu-item border-b border-line-dark last:border-0" style={{ "--i": i } as CSSProperties}>
                  <Link
                    href={`/${link.href}`}
                    onClick={() => {
                      jumpTo(link.href.slice(1));
                      setOpen(false);
                      // The panel becomes inert, so hand focus back to the toggle instead of losing it.
                      toggleRef.current?.focus({ preventScroll: true });
                    }}
                    className="flex items-center justify-between py-4 font-display text-2xl text-on-dark"
                  >
                    {link.label}
                    <Icon name="arrow-right" size={20} className="text-brass" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="menu-item pt-4 pb-2" style={{ "--i": NAV_LINKS.length } as CSSProperties}>
              <StatusPill />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

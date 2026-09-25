import { Icon } from "@/components/icons";
import { StatusPill } from "@/components/status/StatusPill";
import { LitWindow } from "@/components/sections/LitWindow";
import { HERO_COPY, PHARMACY, URGENT_HELP } from "@/content/site";

const FACTS = [
  { k: "Pharmacist", v: "Karima Sweeney MPSI" },
  { k: "Open late", v: "Until 9pm, Monday to Friday" },
  { k: "Find us", v: "Port Road, Letterkenny" },
] as const;

export function Hero() {
  return (
    <section className="on-dark grain panel relative overflow-hidden bg-ink text-on-dark" aria-labelledby="hero-title">
      <div className="wrap grid flex-1 content-center items-center gap-x-10 gap-y-14 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="eyebrow rise" style={{ "--d": "0ms" } as React.CSSProperties}>
            {HERO_COPY.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-6 max-w-[14ch]">
            <span className="hero-line" style={{ "--i": 0 } as React.CSSProperties}>
              <span>
                Your <em>late night</em>
              </span>
            </span>{" "}
            <span className="hero-line" style={{ "--i": 1 } as React.CSSProperties}>
              <span>pharmacy</span>
            </span>{" "}
            <span className="hero-line" style={{ "--i": 2 } as React.CSSProperties}>
              <span>on Port Road</span>
            </span>
          </h1>
          <p className="rise mt-7 max-w-[34rem] text-lg text-on-dark-muted sm:text-xl" style={{ "--d": "180ms" } as React.CSSProperties}>
            {HERO_COPY.subline}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "280ms" } as React.CSSProperties}>
            <a href={PHARMACY.phoneTel} className="btn btn-lamp">
              <Icon name="phone" size={20} />
              <span>{HERO_COPY.primaryCta}</span>
            </a>
            <a href="#visit" className="btn btn-outline-dark">
              <Icon name="mapPin" size={20} />
              <span>{HERO_COPY.secondaryCta}</span>
            </a>
          </div>

          <div className="rise mt-8" style={{ "--d": "360ms" } as React.CSSProperties}>
            <StatusPill announce />
          </div>

          <dl className="rise mt-14 grid gap-x-8 gap-y-5 border-t border-line-dark pt-7 sm:grid-cols-3" style={{ "--d": "440ms" } as React.CSSProperties}>
            {FACTS.map((fact) => (
              <div key={fact.k}>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-brass">{fact.k}</dt>
                <dd className="mt-1.5 text-[0.9375rem] text-on-dark">{fact.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise" style={{ "--d": "200ms" } as React.CSSProperties}>
          <LitWindow />
        </div>
      </div>

      {/* Urgent help band */}
      <div className="border-t border-line-dark bg-ink-2/60">
        <div className="wrap flex flex-col gap-2 py-4 text-[0.9375rem] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="flex items-start gap-3 text-on-dark">
            <Icon name="alert" size={20} className="mt-0.5 shrink-0 text-lamp" />
            <span>
              <strong className="font-bold">{URGENT_HELP.emergency}</strong>{" "}
              <span className="text-on-dark-muted">{URGENT_HELP.outOfHours}</span>
            </span>
          </p>
          {URGENT_HELP.outOfHoursPhone && (
            <a href={`tel:${URGENT_HELP.outOfHoursPhone.replace(/\s/g, "")}`} className="link-arrow shrink-0">
              Out-of-hours GP: {URGENT_HELP.outOfHoursPhone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

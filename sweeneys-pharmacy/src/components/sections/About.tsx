import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT_COPY, PHARMACY } from "@/content/site";
import logoImg from "@/assets/images/logo.png";

export function About() {
  return (
    <section id="about" className="on-dark grain panel section-y relative bg-ink text-on-dark" aria-labelledby="about-title">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal variant="card" className="order-2 lg:order-1">
          {/* A dispensary label: double brass rule around the logo */}
          <figure style={{ "--tilt": "-2deg" } as React.CSSProperties} className="snap relative mx-auto max-w-[26rem] rounded-[0.5rem] bg-surface p-3 shadow-[var(--shadow-lg)]">
            <div className="rounded-[0.25rem] border-2 border-brass-deep/60 p-2">
              <div className="rounded-[0.125rem] border border-brass-deep/40 px-8 pb-5 pt-8">
                <Image src={logoImg} alt="Sweeney's Pharmacy logo: a mortar and pestle" className="mx-auto h-auto w-full max-w-[16rem]" style={{ clipPath: "inset(3.5% 1% 3.5% 1%)" }} />
                <figcaption className="mt-2 border-t border-hairline pt-4 text-center">
                  <span className="block font-display text-xl text-ink">{PHARMACY.pharmacist}</span>
                  <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em] text-brass-deep">Port Road, Letterkenny</span>
                </figcaption>
              </div>
            </div>
          </figure>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">Established on Port Road</p>
            <h2 id="about-title" className="mt-5">
              Your local pharmacy on <em>Port Road</em>
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg text-on-dark-muted">{ABOUT_COPY.body}</p>
          </Reveal>

          <ul className="mt-12 grid gap-8 border-t border-line-dark pt-8 sm:grid-cols-2">
            {ABOUT_COPY.pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delayMs={i * 90}>
                <h3 className="!text-xl">{pillar.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-on-dark-muted">{pillar.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

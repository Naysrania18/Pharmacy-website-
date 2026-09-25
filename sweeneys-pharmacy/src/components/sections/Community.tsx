import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightGrid } from "@/components/ui/SpotlightGrid";
import { Snapshot } from "@/components/ui/Snapshot";
import { COMMUNITY } from "@/content/site";
import wellnessImg from "@/assets/images/wellness-day.jpg";
import charityImg from "@/assets/images/salam-charity.jpg";

export function Community() {
  const { wellnessDay, charity } = COMMUNITY;
  const amountValue = Number(charity.amount.replace(/\D/g, ""));
  const amountPrefix = charity.amount.replace(/[\d,.\s]/g, "");

  return (
    <section id="community" className="panel section-y bg-sage" aria-labelledby="community-title">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Local &amp; global support</p>
          <h2 id="community-title" className="mt-4">
            Community &amp; <em>outreach</em>
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg text-muted">
            A free health event in Letterkenny, and a donation for families in Gaza.
          </p>
        </Reveal>

        <SpotlightGrid className="mt-8 grid gap-5 lg:grid-cols-2">
          <Reveal variant="card" className="min-w-0">
            <article data-spot className="spot relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[1.75rem] bg-surface p-6 ring-1 ring-hairline sm:p-7 lg:flex-row lg:items-center lg:gap-5">
              <div className="min-w-0 lg:flex-1">
                <p className="eyebrow">Free health event</p>
                <h3 className="mt-4 !text-[1.5rem]">{wellnessDay.heading}</h3>
                <p className="mt-4 max-w-[42ch]">{wellnessDay.body}</p>
              </div>
              <Snapshot
                src={wellnessImg}
                alt="Karima Sweeney and the team with visitors at the Letterkenny Wellness Day"
                caption="Wellness Day, Letterkenny"
                tilt={-1.5}
                width={wellnessImg.width * 1.05}
                className="lg:shrink-0"
              />
            </article>
          </Reveal>

          <Reveal variant="card" delayMs={120} className="min-w-0">
            <article data-spot className="spot on-dark grain relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[1.75rem] bg-ink p-6 text-on-dark sm:p-7 lg:flex-row lg:items-center lg:gap-5">
              <div className="min-w-0 lg:flex-1">
                <p className="eyebrow">Charity</p>
                <p className="mt-4 font-display text-[clamp(3.5rem,2rem+4.5vw,5.5rem)] italic leading-[0.9] tracking-tight text-brass">
                  <CountUp value={amountValue} prefix={amountPrefix} />
                </p>
                <h3 className="mt-4 !text-[1.5rem]">{charity.heading}</h3>
                <p className="mt-3 max-w-[42ch] text-on-dark-muted">{charity.body}</p>
              </div>
              <Snapshot
                src={charityImg}
                alt="Two members of the team holding a donation cheque for Salam Charity"
                caption="Donation to Salam Charity"
                tilt={1.5}
                width={charityImg.width * 1.05}
                className="self-end lg:shrink-0 lg:self-center"
              />
            </article>
          </Reveal>
        </SpotlightGrid>
      </div>
    </section>
  );
}

import { Icon } from "@/components/icons";
import { ConsentDialog } from "@/components/ui/ConsentDialog";
import { Reveal } from "@/components/ui/Reveal";
import { ASK_PHARMACY, CONNECTDOC, PHARMACY } from "@/content/site";

export function AskAndGp() {
  return (
    <section id="ask-and-gp" className="section-y panel bg-paper-2" aria-label="Contact the pharmacy or see a GP online">
      <div className="wrap grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <Reveal variant="card">
          <div className="on-dark grain relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-green p-8 text-on-dark sm:p-12">
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-5 !text-[clamp(2rem,1.4rem+2.4vw,3.25rem)]">
              {ASK_PHARMACY.heading}
            </h2>
            <p className="mt-5 max-w-[44ch] text-lg text-on-dark-muted">{ASK_PHARMACY.body}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PHARMACY.phoneTel} className="btn btn-lamp">
                <Icon name="phone" size={18} />
                Call {PHARMACY.phoneDisplay}
              </a>
              <a href={PHARMACY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                <Icon name="whatsapp" size={18} />
                Message on WhatsApp
              </a>
            </div>

            <div className="mt-auto pt-10">
              <p className="flex items-start gap-3 border-t border-line-dark pt-6 text-[0.9375rem] text-on-dark-muted">
                <Icon name="alert" size={20} className="mt-0.5 shrink-0 text-lamp" />
                <span>{PHARMACY.whatsappDisclaimer}</span>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal variant="card" delayMs={120}>
          <div className="flex h-full flex-col rounded-[1.75rem] bg-surface p-8 ring-1 ring-hairline sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">{CONNECTDOC.tagline}</p>
              <span className="rounded-full border border-brass-deep/40 bg-[#F6E9C4] px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-brass-deep">
                {CONNECTDOC.separateTag}
              </span>
            </div>
            <h3 className="mt-5 !text-[1.875rem]">{CONNECTDOC.heading}</h3>
            <p className="mt-4">{CONNECTDOC.body}</p>
            <div className="mt-7">
              <ConsentDialog />
            </div>
            <div className="mt-auto pt-8">
              <p className="border-t border-hairline pt-5 text-sm text-muted">{CONNECTDOC.disclaimer}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

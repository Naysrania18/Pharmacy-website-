import { Icon } from "@/components/icons";
import { HoursTable } from "@/components/status/HoursTable";
import { StatusPill } from "@/components/status/StatusPill";
import { CopyButton } from "@/components/ui/CopyButton";
import { MapFacade } from "@/components/ui/MapFacade";
import { Reveal } from "@/components/ui/Reveal";
import { PHARMACY } from "@/content/site";

export function Visit() {
  return (
    <section id="visit" className="section-y panel" aria-labelledby="visit-title">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Location &amp; hours</p>
            <h2 id="visit-title" className="mt-4">
              Find us on <em>Port Road</em>
            </h2>
          </div>
          <StatusPill tone="light" />
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="flex min-w-0 flex-col gap-4">
            <Reveal variant="card">
              <div className="overflow-hidden rounded-[1.5rem] bg-surface ring-1 ring-hairline">
                <HoursTable />
              </div>
            </Reveal>

            <Reveal variant="card" delayMs={100}>
              <address className="not-italic rounded-[1.5rem] bg-paper-2 p-6 sm:p-7">
                <p className="font-display text-2xl text-ink">{PHARMACY.name}</p>
                <div className="mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-[auto_1fr]">
                <p>
                  {PHARMACY.street}
                  <br />
                  {PHARMACY.town}, {PHARMACY.county}
                  <br />
                  <span className="tabular font-bold text-ink">{PHARMACY.eircode}</span>
                </p>
                <ul className="grid">
                  <li className="flex flex-wrap items-center gap-x-1">
                    <a href={PHARMACY.phoneTel} className="link-arrow">
                      <Icon name="phone" size={18} />
                      <span className="tabular">{PHARMACY.phoneDisplay}</span>
                    </a>
                    <CopyButton text={PHARMACY.phoneDisplay} label="phone number" />
                  </li>
                  <li className="flex flex-wrap items-center gap-x-1">
                    <a href={`mailto:${PHARMACY.email}`} className="link-arrow">
                      <Icon name="mail" size={18} />
                      {PHARMACY.email}
                    </a>
                    <CopyButton text={PHARMACY.email} label="email address" />
                  </li>
                  <li>
                    <a href={PHARMACY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      <Icon name="whatsapp" size={18} />
                      Message on WhatsApp
                    </a>
                  </li>
                </ul>
                </div>
                <p className="mt-4 text-sm text-muted">{PHARMACY.whatsappDisclaimer}</p>
              </address>
            </Reveal>
          </div>

          <Reveal variant="card" delayMs={140} className="h-full min-h-[24rem]">
            <MapFacade embedUrl={PHARMACY.googleMapsEmbedUrl} mapsUrl={PHARMACY.googleMapsUrl} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

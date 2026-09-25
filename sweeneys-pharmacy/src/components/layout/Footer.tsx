import Link from "next/link";
import { StatusPill } from "@/components/status/StatusPill";
import { Mark } from "@/components/ui/Mark";
import { FOOTER_DISCLAIMER, NAV_LINKS, PHARMACY } from "@/content/site";
import { groupWeekHours } from "@/lib/hours-format";

const HEADING = "text-xs font-bold uppercase tracking-[0.18em] text-brass";

export function Footer() {
  const hours = groupWeekHours();

  return (
    <footer className="on-dark relative overflow-hidden bg-ink pb-28 pt-20 text-on-dark md:pb-14">
      <Mark className="pointer-events-none absolute -right-16 -top-10 h-[26rem] w-[26rem] text-brass opacity-[0.05]" />
      <div className="wrap relative">
        <div className="grid gap-12 border-b border-line-dark pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)] font-medium leading-[0.95] tracking-tight">
              Sweeney&rsquo;s <em className="text-brass">Late Night</em> Pharmacy
            </p>
            <p className="mt-4 text-on-dark-muted">Supervised by {PHARMACY.pharmacist}</p>
            <div className="mt-6">
              <StatusPill />
            </div>
          </div>

          <div>
            <h2 className={HEADING} style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.18em" }}>
              Visit
            </h2>
            <address className="mt-4 space-y-1 not-italic text-on-dark-muted">
              <p>{PHARMACY.street}</p>
              <p>
                {PHARMACY.town}, {PHARMACY.county}
              </p>
              <p className="tabular">{PHARMACY.eircode}</p>
            </address>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={PHARMACY.phoneTel} className="tabular font-bold hover:text-brass">
                  {PHARMACY.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${PHARMACY.email}`} className="text-on-dark-muted hover:text-brass">
                  {PHARMACY.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={HEADING} style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.18em" }}>
              Opening hours
            </h2>
            <dl className="mt-4 space-y-2">
              {hours.map((row) => (
                <div key={row.label} className="flex justify-between gap-4">
                  <dt className="text-on-dark-muted">{row.label}</dt>
                  <dd className="tabular font-bold">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Footer">
            <h2 className={HEADING} style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.18em" }}>
              Explore
            </h2>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={`/${link.href}`} className="text-on-dark-muted hover:text-brass">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="text-on-dark-muted hover:text-brass">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-on-dark-muted hover:text-brass">
                  Terms of use
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="space-y-4 pt-8 text-sm leading-relaxed text-on-dark-muted">
          <p className="max-w-4xl">{FOOTER_DISCLAIMER}</p>
          <p>
            Pharmacist in charge: {PHARMACY.pharmacist} ·{" "}
            <a
              href="https://www.psi.ie/register/pharmacies"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-brass"
            >
              Check the PSI register
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

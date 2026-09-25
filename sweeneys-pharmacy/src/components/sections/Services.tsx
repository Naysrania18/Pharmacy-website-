import { Icon, type IconName } from "@/components/icons";
import { Mark } from "@/components/ui/Mark";
import { SpotlightGrid } from "@/components/ui/SpotlightGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/content/site";

type Service = (typeof SERVICES)[number];

const SURFACES: Record<Service["id"], string> = {
  prescriptions: "bg-green text-on-dark",
  "pharmacist-advice": "bg-surface ring-1 ring-hairline",
  vaccinations: "bg-[#F3DFA8] ring-1 ring-brass/40",
  "blood-pressure": "bg-sage",
  "stop-smoking": "bg-surface ring-1 ring-hairline",
  "mother-baby": "bg-paper-2",
};

/** Cards that span two columns so each grid row fills exactly. */
const WIDE: ReadonlySet<Service["id"]> = new Set(["prescriptions", "mother-baby"]);

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const feature = service.id === "prescriptions";
  const chips = "chips" in service ? service.chips : undefined;

  return (
    <Reveal variant="card" delayMs={index * 70} className={`h-full ${WIDE.has(service.id) ? "sm:col-span-2" : ""}`}>
      <article
        data-spot
        className={`spot group relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.5rem] p-6 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-md)] ${SURFACES[service.id]} ${feature ? "on-dark" : ""}`}
      >
        {feature && (
          <Mark
            className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 text-brass opacity-[0.07] transition-transform duration-700 group-hover:-rotate-6 sm:opacity-[0.12]"
            cut="var(--color-green)"
          />
        )}
        <div className="flex items-center justify-between gap-4">
          <span
            className={`grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${feature ? "bg-brass text-ink" : "bg-ink text-brass"}`}
          >
            <Icon name={service.icon as IconName} size={22} />
          </span>
          <span className={`font-display text-lg italic ${feature ? "text-brass" : "text-brass-deep"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div>
          <h3 className={feature ? "!text-[clamp(1.75rem,1.3rem+1.2vw,2.25rem)] !leading-[1.05]" : "!text-[1.3125rem]"}>{service.title}</h3>
          <p className={`mt-2 text-[0.9688rem] leading-relaxed ${feature ? "max-w-[44ch] text-on-dark-muted" : "text-body"}`}>{service.description}</p>
          {chips && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Prescription types we dispense">
              {chips.map((chip) => (
                <li key={chip} className="rounded-full border border-line-dark px-3.5 py-1.5 text-sm font-bold text-on-dark">
                  {chip}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="section-y panel" aria-labelledby="services-title">
      <div className="wrap">
        <Reveal className="max-w-5xl">
          <p className="eyebrow">Care &amp; dispensing</p>
          <h2 id="services-title" className="mt-4">
            Pharmacy services on <em>Port Road</em>
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg text-muted">
            We dispense prescriptions, give advice and run health checks. Talk to Karima or the team any time we&apos;re open.
          </p>
        </Reveal>

        <SpotlightGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </SpotlightGrid>
      </div>
    </section>
  );
}

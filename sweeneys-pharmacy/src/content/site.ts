/**
 * site.ts — single source of truth for Sweeney's Late Night Pharmacy
 *
 * Every name, number, date, claim, price, hour and credential in the website
 * is read from this file. Unresolved items are marked TODO_CONFIRM(...) and
 * listed in CONFIRM.md at the project root.
 */

export function TODO_CONFIRM(key: string): string {
  return `TODO_CONFIRM(${key})`;
}

// ---------------------------------------------------------------------------
// Business identity
// ---------------------------------------------------------------------------

export const SITE_NAME = "Sweeney's Late Night Pharmacy";
export const PHARMACIST = "Karima Sweeney MPSI";
export const PHONE_DISPLAY = "074 921 0034";
export const PHONE_E164 = "+353749210034";
export const PHONE_HREF = "tel:+353749210034";
export const EMAIL = "info@sweeneypharmacy.ie";
export const DOMAIN = "sweeneypharmacy.ie"; // TODO_CONFIRM(C15)
export const WHATSAPP_NUMBER = "447230259631"; // TODO_CONFIRM(C1) — UK +44 number
export const WHATSAPP_PREFILL =
  "Hello%2C%20I%27d%20like%20to%20ask%20Sweeney%27s%20Pharmacy%20about%3A%20";

export function whatsappHref(prefill = WHATSAPP_PREFILL): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${prefill}`;
}

export const CONNECTDOC_URL = "https://www.connectdoc.ie";

// ---------------------------------------------------------------------------
// Address & Maps
// ---------------------------------------------------------------------------

export const ADDRESS = {
  street: "Port Road", // TODO_CONFIRM(C9)
  city: "Letterkenny",
  county: "Co. Donegal",
  eircode: "F92 T2WX",
  country: "Ireland",
} as const;

export const ADDRESS_ONE_LINE = `${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.county}, ${ADDRESS.eircode}`;
export const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=Sweeney%27s+Late+Night+Pharmacy,+Port+Road,+Letterkenny,+F92+T2WX,+Ireland";
export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2300.518293700142!2d-7.7329!3d54.9515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDU3JzA1LjQiTiA3wrA0Myc1OC40Ilc!5e0!3m2!1sen!2sie!4v1690000000000!5m2!1sen!2sie";

// ---------------------------------------------------------------------------
// Opening hours
// ---------------------------------------------------------------------------

export type DayHours = { open: string; close: string } | { closed: true };

export interface HoursConfig {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  bankHoliday: DayHours;
}

export const HOURS: HoursConfig = {
  monday: { open: "09:00", close: "21:00" },
  tuesday: { open: "09:00", close: "21:00" },
  wednesday: { open: "09:00", close: "21:00" },
  thursday: { open: "09:00", close: "21:00" },
  friday: { open: "09:00", close: "21:00" },
  saturday: { open: "09:30", close: "20:00" },
  sunday: { open: "11:00", close: "18:00" },
  bankHoliday: { open: "11:00", close: "18:00" }, // TODO_CONFIRM(C3)
};

export const BANK_HOLIDAY_HOURS = { open: "11:00", close: "18:00" };

export const BANK_HOLIDAYS_2026: readonly string[] = [
  "2026-01-01",
  "2026-02-02", // St Brigid's Day
  "2026-03-17",
  "2026-04-06",
  "2026-05-04",
  "2026-06-01",
  "2026-08-03",
  "2026-10-26",
  "2026-12-25",
  "2026-12-26",
];

// TODO_CONFIRM(2027 dates against the official Irish public holiday list before 2027)
export const BANK_HOLIDAYS_2027: readonly string[] = [
  "2027-01-01",
  "2027-02-01", // St Brigid's Day
  "2027-03-17",
  "2027-03-29", // Easter Monday
  "2027-05-03",
  "2027-06-07",
  "2027-08-02",
  "2027-10-25",
  "2027-12-27", // St Stephen's Day observed (26th is a Sunday)
];

export const BANK_HOLIDAYS: readonly string[] = [...BANK_HOLIDAYS_2026, ...BANK_HOLIDAYS_2027];

// ---------------------------------------------------------------------------
// Grouped convenience objects for UI components
// ---------------------------------------------------------------------------

export const PHARMACY = {
  name: SITE_NAME,
  pharmacist: PHARMACIST,
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_HREF,
  email: EMAIL,
  street: ADDRESS.street,
  town: ADDRESS.city,
  county: ADDRESS.county,
  eircode: ADDRESS.eircode,
  googleMapsUrl: GOOGLE_MAPS_URL,
  googleMapsEmbedUrl: GOOGLE_MAPS_EMBED_URL,
  whatsappUrl: whatsappHref(),
  whatsappDisclaimer:
    "Please don't send medical details or prescription photos here. A photo is not a valid prescription.",
};

export const CONNECTDOC = {
  url: CONNECTDOC_URL,
  heading: "See a GP online",
  tagline: "GP telehealth",
  separateTag: "Separate company",
  body: "If you can't get to your own GP, ConnectDoc offers online GP consultations. It is a separate company. We don't run it and we aren't involved in your consultation.",
  consentText:
    "I understand ConnectDoc is a separate service and Sweeney's Pharmacy isn't part of my consultation.",
  buttonText: "Go to ConnectDoc.ie",
  disclaimer:
    "ConnectDoc.ie is run by a separate company. Sweeney's Pharmacy doesn't provide or oversee its consultations, prescriptions or advice.",
};

export const HERO_COPY = {
  eyebrow: "Port Road, Letterkenny",
  h1: "Your late night pharmacy on Port Road",
  subline:
    "Karima Sweeney and the team are open until 9pm Monday to Friday and 8pm on Saturday. Call in, ring us or send a message.",
  primaryCta: "Call 074 921 0034",
  secondaryCta: "Opening hours and directions",
};

export const ASK_PHARMACY = {
  heading: "Ask the pharmacy",
  body: "Ask about opening hours, whether an order is ready, or which of our services suits you. For anything about your health, please call or call in.",
};

export const ABOUT_COPY = {
  heading: "Your local pharmacy on Port Road",
  // TODO_CONFIRM(opening month/year, superintendent title) — see CONFIRM.md §2–3
  body: "Karima Sweeney MPSI runs Sweeney's Late Night Pharmacy on Port Road with her team. We open late, so you can call in after work for a prescription, to ask about your medicines, or to get advice on something that's been bothering you. If it needs a GP, we'll say so.",
  pillars: [
    { title: "Registered pharmacist", text: "Karima Sweeney MPSI supervises the pharmacy." },
    { title: "Open late", text: "Until 9pm Monday to Friday and 8pm on Saturday." },
  ],
};

export const PRODUCTS_COPY = {
  heading: "In the shop",
  body: "We stock over-the-counter medicines for everyday problems like colds, allergies and pain, plus BioCare vitamins and supplements. Not sure what suits you? Ask the pharmacist. Always read the label.",
};

export const PRODUCTS = [
  {
    title: "Over-the-counter medicines",
    tag: "Everyday remedies",
    description:
      "Medicines for common ailments including colds, coughs, seasonal allergies and pain relief.",
    image: "otc-medicines.jpg",
  },
  {
    title: "BioCare supplements",
    tag: "Vitamins and minerals",
    description:
      "BioCare vitamins, minerals and nutritional supplements. Ask our pharmacist for advice on what suits your diet.",
    image: "biocare-supplements.jpg",
  },
];

export const COMMUNITY = {
  wellnessDay: {
    heading: "Letterkenny Wellness Day",
    body: "We ran a free health event in Letterkenny with blood pressure checks and health advice.",
    // TODO_CONFIRM(date of Wellness Day event) — CONFIRM.md §6
  },
  charity: {
    heading: "Salam Charity Gaza Medical Support",
    amount: "€1,500",
    body: "We donated 1,500 euro to Salam Charity towards medicines and supplies for families in Gaza.",
    // TODO_CONFIRM(charity RCN, consent and year) — CONFIRM.md §6
  },
};

export const VISIT_COPY = {
  heading: "Find us on Port Road",
};

export const URGENT_HELP = {
  emergency: "In an emergency call 112 or 999.",
  outOfHours: "Out-of-hours GP is by appointment only. Call first.",
  // TODO_CONFIRM(out-of-hours GP number, e.g. Nowdoc) — CONFIRM.md §5.
  // Set to a string once confirmed and the site will show a call link.
  outOfHoursPhone: null as string | null,
};

export const TRUST_FACTS = [
  {
    title: "MPSI Pharmacist",
    subtitle: "Supervised by Karima Sweeney MPSI",
  },
  {
    title: "Late Opening",
    subtitle: "Open until 9pm Monday to Friday",
  },
  {
    title: "Central Location",
    subtitle: "Port Road, Letterkenny F92 T2WX",
  },
  {
    title: "Clinical Services",
    subtitle: "Dispensing, vaccines & BP checks",
  },
];

export const FOOTER_DISCLAIMER =
  "ConnectDoc.ie is run by a separate company. Sweeney's Pharmacy doesn't provide or oversee its consultations, prescriptions or advice. This site gives general information and doesn't replace advice from your pharmacist or GP. In an emergency call 112 or 999.";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#ask-and-gp", label: "See a GP" },
  { href: "#about", label: "About" },
  { href: "#shop", label: "Shop" },
  { href: "#community", label: "Community" },
  { href: "#visit", label: "Visit" },
] as const;

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const SERVICES = [
  {
    id: "prescriptions",
    title: "Prescriptions",
    description:
      "We dispense medical card, Drug Payment Scheme and private prescriptions.",
    chips: ["Medical card", "Drug Payment Scheme", "Private"],
    icon: "pill" as const,
  },
  {
    id: "pharmacist-advice",
    title: "Pharmacist advice",
    description:
      "Talk to a pharmacist about a minor ailment or a review of your medicines.",
    icon: "stethoscope" as const,
  },
  {
    id: "vaccinations",
    title: "Vaccinations",
    // TODO_CONFIRM(which vaccines, dates) — CONFIRM.md §5
    description: "Flu and COVID-19 vaccinations from a trained pharmacist.",
    icon: "syringe" as const,
  },
  {
    id: "blood-pressure",
    title: "Blood pressure checks",
    // TODO_CONFIRM(walk-in vs appointment, cost) — CONFIRM.md §5
    description: "Walk in for a blood pressure check.",
    icon: "heart-pulse" as const,
  },
  {
    id: "stop-smoking",
    title: "Stop smoking support",
    description:
      "One-to-one support from a pharmacist, including nicotine replacement options.",
    icon: "no-smoking" as const,
  },
  {
    id: "mother-baby",
    title: "Mother and baby",
    description:
      "Everyday essentials and advice for babies and new parents, from thermometers to skin care.",
    icon: "baby" as const,
  },
] as const;

export const CLOSING_SOON_MINUTES = 30;

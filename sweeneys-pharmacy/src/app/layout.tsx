import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { PHARMACY, HOURS, DayHours } from "@/content/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sweeneypharmacy.ie"),
  title: {
    default: "Sweeney's Late Night Pharmacy, Port Road, Letterkenny",
    template: "%s | Sweeney's Late Night Pharmacy",
  },
  description:
    "Local pharmacy on Port Road, Letterkenny, open until 9pm Monday to Friday. Prescriptions, pharmacist advice, vaccinations and blood pressure checks. Call 074 921 0034.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sweeney's Late Night Pharmacy, Port Road, Letterkenny",
    description:
      "Local community pharmacy in Letterkenny, Co. Donegal. Open late until 9pm weekdays. Prescriptions, clinical advice, vaccinations.",
    url: "https://sweeneypharmacy.ie",
    siteName: "Sweeney's Late Night Pharmacy",
    locale: "en_IE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2A2B",
  width: "device-width",
  initialScale: 1,
};

function getOpens(h: DayHours) {
  return "closed" in h ? undefined : h.open;
}

function getCloses(h: DayHours) {
  return "closed" in h ? undefined : h.close;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": "https://sweeneypharmacy.ie/#pharmacy",
    name: PHARMACY.name,
    description:
      "Community pharmacy on Port Road, Letterkenny offering prescriptions, clinical pharmacist advice, vaccinations and health checks.",
    url: "https://sweeneypharmacy.ie",
    telephone: "+353749210034",
    email: PHARMACY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: PHARMACY.street,
      addressLocality: PHARMACY.town,
      addressRegion: PHARMACY.county,
      postalCode: PHARMACY.eircode,
      addressCountry: "IE",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: getOpens(HOURS.monday),
        closes: getCloses(HOURS.monday),
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: getOpens(HOURS.saturday),
        closes: getCloses(HOURS.saturday),
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "PublicHolidays"],
        opens: getOpens(HOURS.sunday),
        closes: getCloses(HOURS.sunday),
      },
    ],
    hasMap: PHARMACY.googleMapsUrl,
  };

  const safeJsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <html
      lang="en-IE"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdString }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-paper text-body selection:bg-teal selection:text-surface">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

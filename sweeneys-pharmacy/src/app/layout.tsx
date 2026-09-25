import type { Metadata, Viewport } from "next";
import { Fraunces, Atkinson_Hyperlegible_Next } from "next/font/google";
import "./globals.css";
import { PHARMACY, HOURS, PHONE_E164, type DayHours } from "@/content/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sweeneypharmacy.ie"),
  title: {
    default: "Sweeney's Late Night Pharmacy, Port Road, Letterkenny",
    template: "%s | Sweeney's Late Night Pharmacy",
  },
  description:
    "Local pharmacy on Port Road, Letterkenny, open until 9pm Monday to Friday. Prescriptions, pharmacist advice, vaccinations and blood pressure checks. Call 074 921 0034.",
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
  themeColor: "#0C231B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
    telephone: PHONE_E164,
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
        dayOfWeek: "Sunday",
        opens: getOpens(HOURS.sunday),
        closes: getCloses(HOURS.sunday),
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "PublicHolidays",
        opens: getOpens(HOURS.bankHoliday),
        closes: getCloses(HOURS.bankHoliday),
      },
    ],
    hasMap: PHARMACY.googleMapsUrl,
  };

  // On a plain refresh, start at the top and drop any #section from the URL. Without this the
  // browser restores the old scroll position or jumps to the hash, so a refresh "takes you down".
  // Runs before first paint; back/forward and normal visits are untouched.
  const startAtTopOnReload =
    'try{var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){history.scrollRestoration="manual";if(location.hash){history.replaceState(history.state,"",location.pathname+location.search)}var stop=false,go=function(){if(!stop)scrollTo({top:0,left:0,behavior:"instant"})};["wheel","touchstart","keydown","mousedown"].forEach(function(t){addEventListener(t,function(){stop=true},{once:true,passive:true})});addEventListener("DOMContentLoaded",go);addEventListener("load",go);[60,200,450,900].forEach(function(t){setTimeout(go,t)});setTimeout(function(){history.scrollRestoration="auto"},1500)}}catch(e){}';

  const safeJsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <html
      lang="en-IE"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${atkinson.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: startAtTopOnReload }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdString }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-paper text-body">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

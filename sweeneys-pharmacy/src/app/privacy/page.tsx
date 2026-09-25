import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { PHARMACY } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description:
    "Privacy Policy and data protection practices for Sweeney's Late Night Pharmacy on Port Road, Letterkenny.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="Last updated: September 2026 · Sweeney's Late Night Pharmacy"
      draftNotice="Draft Notice: This privacy policy is a draft and requires review and formal sign-off by Sweeney's Pharmacy legal adviser before final deployment."
    >
          <section>
            <h2>1. Data controller</h2>
            <p>
              Sweeney&apos;s Late Night Pharmacy, located at Port Road, Letterkenny, Co. Donegal, Eircode F92 T2WX, is the data controller for personal information collected through this website and in our dispensary. You can contact us regarding your data by phoning <a href={PHARMACY.phoneTel} className="underline underline-offset-4 text-green hover:text-green-deep">{PHARMACY.phoneDisplay}</a> or emailing <a href={`mailto:${PHARMACY.email}`} className="underline underline-offset-4 text-green hover:text-green-deep">{PHARMACY.email}</a>.
            </p>
          </section>

          <section>
            <h2>2. WhatsApp messaging</h2>
            <p>
              If you initiate contact with us via WhatsApp, your phone number and message contents are processed by WhatsApp (Meta Ireland Ltd) under their privacy policy. Please <strong>do not send sensitive medical details or prescription photos</strong> over WhatsApp. Standard messaging is not an encrypted medical portal.
            </p>
          </section>

          <section>
            <h2>3. Third-party telehealth (ConnectDoc.ie)</h2>
            <p>
              Our site provides a link to ConnectDoc.ie for online GP consultations. ConnectDoc.ie is an independent third-party company. Sweeney&apos;s Pharmacy does not operate ConnectDoc, does not receive patient clinical records from ConnectDoc consultations, and is not responsible for ConnectDoc&apos;s data practices.
            </p>
          </section>

          <section>
            <h2>4. Map</h2>
            <p>
              We only load the Google Maps embed when you ask for it. Nothing is sent to Google Maps, including cookies or your IP address, until you click the &quot;Load Map&quot; button.
            </p>
          </section>

          <section>
            <h2>5. Cookies & analytics</h2>
            <p>
              This website does not use tracking cookies, advertising beacons, or third-party analytics scripts. Only essential self-hosted resources are loaded.
            </p>
          </section>
        </LegalPage>
  );
}

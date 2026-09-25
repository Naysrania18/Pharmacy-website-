import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  alternates: { canonical: "/terms" },
  description:
    "Terms of Use for Sweeney's Late Night Pharmacy website and general dispensing disclaimer.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="Last updated: September 2026 · Sweeney's Late Night Pharmacy"
      draftNotice="Draft Notice: These Terms of Use are a draft and require review and formal sign-off by Sweeney's Pharmacy legal adviser before final deployment."
    >
          <section>
            <h2>1. General information</h2>
            <p>
              This website provides general information about Sweeney&apos;s Late Night Pharmacy on Port Road, Letterkenny. The information provided on this website is for general informational purposes only and does not constitute medical advice or a substitute for professional clinical judgment by a pharmacist or medical doctor.
            </p>
          </section>

          <section>
            <h2>2. Medical emergencies</h2>
            <p>
              In a medical emergency, do not rely on website communication or messaging. Call <strong>112</strong> or <strong>999</strong> immediately or attend the nearest hospital Emergency Department.
            </p>
          </section>

          <section>
            <h2>3. Prescriptions & dispensing</h2>
            <p>
              All prescription medicines are dispensed in accordance with Irish pharmacy legislation under the supervision of Karima Sweeney MPSI. An original valid prescription must be presented before prescription medicines can be supplied.
            </p>
          </section>

          <section>
            <h2>4. Third-party links</h2>
            <p>
              Links to external websites, such as ConnectDoc.ie, are provided for user convenience. Sweeney&apos;s Pharmacy does not control, endorse, or accept liability for third-party medical services.
            </p>
          </section>
        </LegalPage>
  );
}

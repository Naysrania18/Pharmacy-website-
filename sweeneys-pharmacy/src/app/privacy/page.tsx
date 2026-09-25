import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PHARMACY } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Sweeney's Late Night Pharmacy",
  description:
    "Privacy Policy and data protection practices for Sweeney's Late Night Pharmacy on Port Road, Letterkenny.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-body">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="p-4 rounded-xl bg-amber/10 border border-amber/30 text-amber-deep text-sm font-semibold">
          Draft Notice: This privacy policy is a draft and requires review and formal sign-off by Sweeney&apos;s Pharmacy legal adviser before final deployment.
        </div>

        <div className="space-y-4">
          <span className="eyebrow">Legal & Compliance</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted">
            Last updated: September 2026 | Sweeney&apos;s Late Night Pharmacy
          </p>
        </div>

        <article className="prose prose-teal max-w-none space-y-6 text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink">1. Data Controller</h2>
            <p>
              Sweeney&apos;s Late Night Pharmacy, located at Port Road, Letterkenny, Co. Donegal, Eircode F92 T2WX, is the data controller for personal information collected through this website and in our dispensary. You can contact us regarding your data by phoning <a href={PHARMACY.phoneTel} className="text-teal underline">{PHARMACY.phoneDisplay}</a> or emailing <a href={`mailto:${PHARMACY.email}`} className="text-teal underline">{PHARMACY.email}</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink">2. WhatsApp Messaging</h2>
            <p>
              If you initiate contact with us via WhatsApp, your phone number and message contents are processed by WhatsApp (Meta Ireland Ltd) under their privacy policy. We strongly advise that you <strong>do not send sensitive medical details or prescription photos</strong> over WhatsApp, as standard messaging is not an encrypted medical portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink">3. Third-Party Telehealth (ConnectDoc.ie)</h2>
            <p>
              Our site provides a link to ConnectDoc.ie for online GP consultations. ConnectDoc.ie is an independent third-party company. Sweeney&apos;s Pharmacy does not operate ConnectDoc, does not receive patient clinical records from ConnectDoc consultations, and is not responsible for ConnectDoc&apos;s data practices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink">4. Interactive Map Facade</h2>
            <p>
              To protect your privacy, our Google Maps embed is loaded on-demand behind a facade. No cookies or IP tracking data are sent to Google Maps until you explicitly click the &quot;Load Map&quot; button.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink">5. Cookies & Analytics</h2>
            <p>
              This website does not use tracking cookies, advertising beacons, or third-party analytics scripts. Only essential self-hosted resources are loaded.
            </p>
          </section>
        </article>

        <div className="pt-6 border-t border-ink/10">
          <Link href="/" className="btn btn-secondary text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

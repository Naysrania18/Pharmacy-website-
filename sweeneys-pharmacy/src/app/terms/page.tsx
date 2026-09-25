import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PHARMACY } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use | Sweeney's Late Night Pharmacy",
  description:
    "Terms of Use for Sweeney's Late Night Pharmacy website and general dispensing disclaimer.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-body">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="p-4 rounded-xl bg-amber/10 border border-amber/30 text-amber-deep text-sm font-semibold">
          Draft Notice: These Terms of Use are a draft and require review and formal sign-off by Sweeney&apos;s Pharmacy legal adviser before final deployment.
        </div>

        <div className="space-y-4">
          <span className="eyebrow">Legal & Terms</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
            Terms of Use
          </h1>
          <p className="text-sm text-muted">
            Last updated: September 2026 | Sweeney&apos;s Late Night Pharmacy
          </p>
        </div>

        <article className="prose prose-teal max-w-none space-y-6 text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink">1. General Information</h2>
            <p>
              This website provides general information about Sweeney&apos;s Late Night Pharmacy on Port Road, Letterkenny. The information provided on this website is for general informational purposes only and does not constitute medical advice or a substitute for professional clinical judgment by a pharmacist or medical doctor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink">2. Medical Emergencies</h2>
            <p>
              In a medical emergency, do not rely on website communication or messaging. Call <strong>112</strong> or <strong>999</strong> immediately or attend the nearest hospital Emergency Department.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink">3. Prescriptions & Dispensing</h2>
            <p>
              All prescription medicines are dispensed in accordance with Irish pharmacy legislation under the supervision of Karima Sweeney MPSI. A original valid prescription must be presented before prescription medicines can be supplied.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-ink">4. Third-Party Links</h2>
            <p>
              Links to external websites, such as ConnectDoc.ie, are provided for user convenience. Sweeney&apos;s Pharmacy does not control, endorse, or accept liability for third-party medical services.
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

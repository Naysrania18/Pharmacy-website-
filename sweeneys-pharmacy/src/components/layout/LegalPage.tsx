import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

interface LegalPageProps {
  title: string;
  updated: string;
  draftNotice: string;
  children: ReactNode;
}

/** Shared shell for the privacy and terms pages. */
export function LegalPage({ title, updated, draftNotice, children }: LegalPageProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="wrap max-w-3xl py-[clamp(3rem,2rem+5vw,6rem)]">
          <p role="note" className="rounded-2xl border border-brass-deep/30 bg-[#F6E9C4] p-4 text-sm font-bold text-brass-deep">
            {draftNotice}
          </p>
          <p className="eyebrow mt-10">Legal</p>
          <h1 className="mt-4 !text-[clamp(2.5rem,1.8rem+3vw,4rem)]">{title}</h1>
          <p className="mt-3 text-sm text-muted">{updated}</p>

          <article className="legal mt-12 space-y-10">{children}</article>

          <div className="mt-14 border-t border-hairline pt-8">
            <Link href="/" className="btn btn-outline">
              &larr; Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

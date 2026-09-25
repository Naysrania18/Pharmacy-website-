import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { About } from "@/components/sections/About";
import { AskAndGp } from "@/components/sections/AskAndGp";
import { Community } from "@/components/sections/Community";
import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { Services } from "@/components/sections/Services";
import { Visit } from "@/components/sections/Visit";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <Services />
        <AskAndGp />
        <About />
        <Products />
        <Community />
        <Visit />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}

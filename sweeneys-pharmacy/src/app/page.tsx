import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/sections/Hero";
import { AskAndGp } from "@/components/sections/AskAndGp";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Products } from "@/components/sections/Products";
import { Community } from "@/components/sections/Community";
import { Visit } from "@/components/sections/Visit";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />

      <main id="main-content" className="flex-1">
        <Hero />
        <AskAndGp />
        <Services />
        <About />
        <Products />
        <Community />
        <Visit />
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
}

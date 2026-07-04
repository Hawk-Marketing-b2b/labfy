import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Automations from "@/components/sections/Automations";
import Contact from "@/components/sections/Contact";
import Experts from "@/components/sections/Experts";
import Founders from "@/components/sections/Founders";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Manifesto from "@/components/sections/Manifesto";
import Process from "@/components/sections/Process";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="grain" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Journey />
        <Automations />
        <Experts />
        <Process />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import DiagnosticCTA from "@/components/DiagnosticCTA";
import Footer from "@/components/Footer";
import DiagnosticForm from "@/components/DiagnosticForm";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Solutions />
        <Process />
        <DiagnosticCTA onOpenForm={() => setIsFormOpen(true)} />
      </main>
      <Footer />
      
      {/* Diagnostic Form Modal */}
      <DiagnosticForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
}


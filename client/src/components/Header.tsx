import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-foreground">LabFy a.i</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("sobre-nos")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Sobre nós
            </button>
            <button
              onClick={() => scrollToSection("solucoes")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Soluções
            </button>
            <Button
              onClick={() => scrollToSection("diagnostico")}
              className="bg-white text-black hover:bg-gray-200 transition-all"
            >
              Diagnóstico
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("sobre-nos")}
                className="text-foreground/80 hover:text-foreground transition-colors text-left"
              >
                Sobre nós
              </button>
              <button
                onClick={() => scrollToSection("solucoes")}
                className="text-foreground/80 hover:text-foreground transition-colors text-left"
              >
                Soluções
              </button>
              <Button
                onClick={() => scrollToSection("diagnostico")}
                className="bg-white text-black hover:bg-gray-200 transition-all w-full"
              >
                Diagnóstico
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}


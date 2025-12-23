import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4">
      {/* Desktop Navigation - Centered with Rounded Container */}
      <div className="hidden md:block max-w-4xl mx-auto">
        <div className="relative bg-black/80 backdrop-blur-md border border-gray-800 rounded-full px-6 py-3">
          {/* Dot Pattern Background */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none rounded-full"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <span className="text-xl font-bold text-white">Nora Labs</span>
            </a>

            {/* Navigation Links */}
            <nav className="flex items-center gap-8">
              <button
                onClick={() => scrollToSection("sobre-nos")}
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Sobre nós
              </button>
              <button
                onClick={() => scrollToSection("solucoes")}
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Soluções
              </button>
              <Button
                onClick={() => scrollToSection("diagnostico")}
                className="bg-white text-black hover:bg-gray-200 transition-all rounded-full px-5 py-2 h-auto text-sm"
              >
                Diagnóstico →
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-black/80 backdrop-blur-md border border-gray-800 rounded-2xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-bold text-white">Nora Labs</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground hover:bg-foreground/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  scrollToSection("sobre-nos");
                  setIsMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Sobre nós
              </button>
              <button
                onClick={() => {
                  scrollToSection("solucoes");
                  setIsMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Soluções
              </button>
              <Button
                onClick={() => {
                  scrollToSection("diagnostico");
                  setIsMenuOpen(false);
                }}
                className="bg-white text-black hover:bg-gray-200 transition-all w-full rounded-full"
              >
                Diagnóstico →
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}


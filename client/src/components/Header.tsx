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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      {/* Dot Pattern Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-black font-bold">
              L
            </div>
            <span>LabFy a.i</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
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
              className="bg-white text-black hover:bg-gray-200 transition-all rounded-full px-6"
            >
              Diagnóstico →
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-foreground/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
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
                className="bg-white text-black hover:bg-gray-200 transition-all w-full"
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


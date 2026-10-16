import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useSmoothScroll } from "@/components/fx/SmoothScroll";
import WhatsAppCta from "@/components/WhatsAppCta";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Sistemas", target: "#jornada" },
  { label: "IA & Agentes", target: "#experts" },
  { label: "Quem constrói", target: "#fundadores" },
];

export default function Header() {
  const { scrollTo } = useSmoothScroll();
  const [location] = useLocation();
  // Fora da home as âncoras da nav não existem: logo volta pra home e a nav some.
  const isHome = location === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/5 bg-background/70 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {isHome ? (
          <button
            onClick={() => scrollTo("#hero", 0)}
            aria-label="NØRA Labs, voltar ao topo"
            className="shrink-0"
          >
            <img
              src="/logos/nora-labs-wordmark.png"
              alt="NØRA Labs"
              className="h-7 w-auto md:h-8"
            />
          </button>
        ) : (
          <a href="/" aria-label="NØRA Labs, ir para a home" className="shrink-0">
            <img
              src="/logos/nora-labs-wordmark.png"
              alt="NØRA Labs"
              className="h-7 w-auto md:h-8"
            />
          </a>
        )}

        <nav className={cn("hidden items-center gap-8", isHome && "md:flex")}>
          {NAV.map(item => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <WhatsAppCta size="sm" />
      </div>
    </motion.header>
  );
}

import { motion } from "framer-motion";
import Reveal from "@/components/fx/Reveal";
import WhatsAppCta from "@/components/WhatsAppCta";

export default function Contact() {
  return (
    <section
      id="contato"
      className="relative isolate flex min-h-[90svh] items-center justify-center overflow-hidden"
    >
      {/* Ø gigante como marca-d'água, girando lentíssimo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.img
          src="/logos/nora-symbol.svg"
          alt=""
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="w-[540px] opacity-[0.04] md:w-[720px]"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 50%, rgba(191,219,254,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container py-32 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl font-display text-5xl font-extrabold tracking-tight text-balance md:text-7xl">
            Avance sua empresa para o futuro.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/55 md:text-xl">
            Conta teu problema. A gente te mostra o sistema.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <WhatsAppCta variant="whatsapp" size="lg" label="Iniciar a viagem →" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

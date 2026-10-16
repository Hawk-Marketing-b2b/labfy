import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { lazy, Suspense } from "react";
import DnaHelix from "@/components/fx/DnaHelix";
import { HeadlineLine } from "@/components/sections/Hero";
import { useShow3D } from "@/components/three/useShow3D";

const HelixCanvas = lazy(() => import("@/components/three/HelixCanvas"));

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fundo estático (reduced-motion, low-end, sem WebGL e enquanto o 3D carrega). */
function HelixFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center overflow-hidden md:justify-end md:pr-[10%]"
    >
      <div className="animate-dna-drift shrink-0">
        <DnaHelix className="h-[880px] w-auto opacity-40 blur-[2px] md:h-[1100px]" />
      </div>
    </div>
  );
}

export default function DnaHero() {
  const show3D = useShow3D();

  return (
    <section
      id="dna-hero"
      className="relative isolate flex min-h-svh items-center overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 72% 45%, #111827 0%, #0A0A0F 70%)",
        }}
      />

      {show3D ? (
        <Suspense fallback={<HelixFallback />}>
          <HelixCanvas />
        </Suspense>
      ) : (
        <HelixFallback />
      )}

      <div className="container relative z-10 py-28">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Nossa cultura
          </motion.p>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
            <HeadlineLine delay={0}>Bem-vindo ao</HeadlineLine>
            <HeadlineLine delay={0.12}>
              <em className="bg-gradient-to-r from-white to-sky-200 bg-clip-text pr-2 text-transparent">
                DNA
              </em>{" "}
              NoraLabs
            </HeadlineLine>
          </h1>
          <motion.p
            className="mt-7 text-lg text-white/60 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            Que bom que você chegou. A partir de agora, a gente constrói junto.
          </motion.p>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}

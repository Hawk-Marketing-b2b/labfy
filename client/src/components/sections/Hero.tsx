import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/components/fx/SmoothScroll";
import HeroFallback from "@/components/three/HeroFallback";
import WhatsAppCta from "@/components/WhatsAppCta";
import { gsap, motionOK } from "@/lib/gsap";

const HeroCanvas = lazy(() => import("@/components/three/HeroCanvas"));

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Gate do hero 3D: monta o canvas só depois do first paint e só quando o
 * ambiente aguenta — `?static=1` força o fallback, reduced-motion/low-end/
 * sem-WebGL caem no estático.
 */
function useShow3D() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("static")) return;
    if (!motionOK()) return;
    if ((navigator.hardwareConcurrency ?? 8) <= 4) return;

    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return;

    const show = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(show, { timeout: 800 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(show, 300);
    return () => window.clearTimeout(t);
  }, []);

  return ready;
}

function HeadlineLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const show3D = useShow3D();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hint = hintRef.current;
    if (!section || !hint) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // A dica de scroll some assim que o usuário começa a rolar.
      gsap.to(hint, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "10% top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 60% at 50% 35%, #10101A 0%, #0A0A0F 70%)",
      }}
    >
      {show3D ? (
        <Suspense fallback={<HeroFallback />}>
          <HeroCanvas />
        </Suspense>
      ) : (
        <HeroFallback />
      )}

      <div className="container relative z-10 py-28 text-center">
        <h1 className="font-display text-5xl font-extrabold tracking-tight text-balance md:text-7xl lg:text-8xl">
          <HeadlineLine delay={0}>A gente constrói</HeadlineLine>
          <HeadlineLine delay={0.12}>
            o <em>seu</em> software.
          </HeadlineLine>
        </h1>

        <motion.p
          className="mx-auto mt-7 max-w-2xl text-lg text-white/60 md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          Sistemas sob medida, desenhados em cima da sua operação, com
          engenharia sênior e IA aplicada no que importa.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        >
          <WhatsAppCta size="lg" />
          <button
            onClick={() => scrollTo("#manifesto")}
            className="rounded-full px-6 py-3 text-base text-white/60 transition-colors hover:text-white"
          >
            Veja o que já tá rodando ↓
          </button>
        </motion.div>
      </div>

      <div
        ref={hintRef}
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </div>
    </section>
  );
}

import { useLayoutEffect, useRef } from "react";
import DnaHelix from "@/components/fx/DnaHelix";
import Reveal from "@/components/fx/Reveal";
import { gsap } from "@/lib/gsap";

// Statement principal, splitado em palavras pro reveal por scrub.
const SEGMENTS: { text: string; em?: boolean }[] = [
  { text: "O software com o" },
  { text: "DNA da sua empresa.", em: true },
];

const WORDS = SEGMENTS.flatMap(seg =>
  seg.text.split(" ").map(word => ({ word, em: seg.em })),
);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Palavras acendem de 15% → 100% conforme o scroll atravessa a seção.
      gsap.from(section.querySelectorAll("[data-word]"), {
        opacity: 0.15,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "center 45%",
          scrub: 0.5,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative isolate overflow-hidden py-44 md:py-60"
    >
      {/* DNA desfocado ao fundo — o software carrega o código da empresa */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <div className="animate-dna-drift shrink-0">
          <DnaHelix className="h-[880px] w-auto opacity-30 blur-md md:h-[1100px]" />
        </div>
        <div className="animate-dna-drift-slow absolute shrink-0">
          <DnaHelix className="h-[680px] w-auto opacity-20 blur-2xl md:h-[900px]" />
        </div>
      </div>

      <div className="container text-center">
        <p
          data-manifesto
          className="mx-auto max-w-4xl font-display text-3xl font-bold leading-snug tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          {WORDS.map(({ word, em }, i) => (
            <span key={i}>
              <span
                data-word
                className={em ? "inline-block italic" : "inline-block"}
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60">
            A NoraLabs estuda como a sua operação funciona e constrói o sistema
            em cima dela. Engenharia sênior, produto bem pensado e IA aplicada
            nos pontos que travam o seu dia a dia.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { animate, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type PointerEvent,
  type ReactNode,
} from "react";
import Reveal from "@/components/fx/Reveal";
import { gsap, motionOK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type Item = { title: string; body: string; icon: LucideIcon };

export function Heading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
        {eyebrow}
      </p>
      <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
        {title}
      </h2>
      {children && (
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
          {children}
        </p>
      )}
    </Reveal>
  );
}

// Luz que segue o cursor dentro do card (CSS vars, sem re-render).
function trackSpotlight(e: PointerEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export function SpotlightCard({ item }: { item: Item }) {
  const Icon = item.icon;
  return (
    <div
      onPointerMove={trackSpotlight}
      className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x) var(--y), rgba(191,219,254,0.12), transparent 60%)",
        }}
      />
      <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:border-sky-200/40">
        <Icon className="size-5 text-white/70 transition-colors duration-300 group-hover:text-sky-100" />
      </div>
      <p className="mt-5 font-display text-lg font-semibold">{item.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{item.body}</p>
    </div>
  );
}

/** Cards em flex centralizado: linha incompleta fica no meio, e a linha toda tem a mesma altura. */
export function Cards({ items, cols = 3 }: { items: Item[]; cols?: 3 | 5 }) {
  return (
    <div
      className={cn(
        "mx-auto mt-14 flex flex-wrap justify-center gap-5",
        cols === 5 ? "max-w-7xl" : "max-w-5xl",
      )}
    >
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          delay={0.05 + (i % cols) * 0.07}
          className={cn(
            "w-full sm:w-[calc((100%_-_1.25rem)/2)]",
            cols === 5
              ? "lg:w-[calc((100%_-_5rem)/5)]"
              : "lg:w-[calc((100%_-_2.5rem)/3)]",
          )}
        >
          <SpotlightCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}

/** Frase que acende palavra por palavra com o scroll, com o Ø gigante girando atrás. */
export function Lema({
  segments,
  children,
}: {
  segments: { text: string; em?: boolean }[];
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = segments.flatMap(seg =>
    seg.text.split(" ").map(word => ({ word, em: seg.em })),
  );

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el.querySelectorAll("[data-word]"), {
        opacity: 0.12,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 70%", end: "center 45%", scrub: 0.5 },
      });
      gsap.fromTo(
        el.querySelector("[data-symbol]"),
        { rotate: -40, scale: 0.85 },
        {
          rotate: 80,
          scale: 1.1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden border-y border-white/5 py-44 md:py-56"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 flex items-center justify-center"
      >
        <img
          data-symbol
          src="/logos/nora-symbol.svg"
          alt=""
          className="w-[80vmin] max-w-[720px] opacity-[0.06]"
        />
      </div>
      <div className="container text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Nosso lema
          </p>
        </Reveal>
        <p className="mx-auto mt-8 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl lg:text-7xl">
          {words.map(({ word, em }, i) => (
            <span key={i}>
              <span data-word className={cn("inline-block", em && "italic text-sky-100")}>
                {word}
              </span>{" "}
            </span>
          ))}
        </p>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-lg text-white/60">{children}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** Número que conta de 0 até `to` quando entra na tela. */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (!motionOK()) {
      el.textContent = String(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => (el.textContent = String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>0</span>;
}

/** Faixa infinita de palavras vazadas, separadas pelo Ø. */
export function Marquee({ words }: { words: string[] }) {
  const row = words.map(word => (
    <span key={word} className="flex shrink-0 items-center">
      <span className="px-8 font-display text-6xl font-extrabold tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)] md:text-8xl">
        {word}
      </span>
      <img src="/logos/nora-symbol.svg" alt="" className="size-8 opacity-30 md:size-12" />
    </span>
  ));
  return (
    <div
      aria-hidden
      className="flex overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="animate-marquee flex shrink-0">
        {row}
        {row}
      </div>
    </div>
  );
}

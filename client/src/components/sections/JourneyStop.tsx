import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import Reveal from "@/components/fx/Reveal";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { JourneyStopData } from "./journey.data";

type JourneyStopProps = {
  data: JourneyStopData;
  index: number;
};

export default function JourneyStop({ data, index }: JourneyStopProps) {
  const { id, eyebrow, title, body, textClass, hex, baseHex, mock, frame, flip, badge, appHref, appLabel } = data;
  const num = `0${index + 1} / 04`;

  const sectionRef = useRef<HTMLElement>(null);
  const floodRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);

    mm.add(
      {
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      ctx => {
        const desktop = Boolean(
          (ctx.conditions as Record<string, boolean>)?.desktop,
        );

        // A seção "inunda" com o acento do produto conforme entra na tela.
        if (floodRef.current) {
          gsap.from(floodRef.current, {
            opacity: 0,
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 20%",
              scrub: 0.6,
            },
          });
        }

        const card = cardRef.current;
        if (!card) return;

        if (desktop) {
          gsap.fromTo(
            card,
            {
              clipPath: "inset(12% 8% 12% 8% round 12px)",
              y: 80,
              ...(frame === "tilt" ? { rotateY: -10, rotateX: 6 } : {}),
            },
            {
              clipPath: "inset(0% 0% 0% 0% round 12px)",
              y: 0,
              ...(frame === "tilt" ? { rotateY: 0, rotateX: 0 } : {}),
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: frame === "tilt" ? "center 55%" : "top 30%",
                scrub: 0.6,
              },
            },
          );

          // Parallax sutil da tela dentro da moldura.
          if (imgRef.current) {
            gsap.fromTo(
              imgRef.current,
              { y: -12, scale: 1.08 },
              {
                y: 12,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          }
        } else {
          gsap.from(card, {
            opacity: 0,
            y: 48,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        }
      },
    );

    return () => mm.revert();
  }, [frame]);

  const textBlock = (
    <Reveal className={frame === "center" ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <p
        className={cn(
          "flex items-baseline gap-3 text-xs font-semibold uppercase tracking-[0.25em]",
          frame === "center" && "justify-center",
        )}
      >
        <span className={textClass}>{eyebrow}</span>
        <span className="text-[11px] font-medium tracking-[0.2em] text-white/30">
          {num}
        </span>
      </p>
      <h3 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h3>
      <p
        className={cn(
          "mt-5 text-lg text-white/60",
          frame === "center" ? "mx-auto max-w-2xl" : "max-w-md",
        )}
      >
        {body}
      </p>
      {appHref && (
        <a
          href={appHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white"
        >
          {appLabel ?? "Acessar o app"}
          <ArrowUpRight className="size-3.5" />
        </a>
      )}
    </Reveal>
  );

  const mockCard =
    frame === "center" ? (
      <div
        ref={cardRef}
        className="overflow-hidden rounded-2xl border"
        style={{
          borderColor: `${hex}33`,
          boxShadow: `0 60px 160px -30px ${hex}40, 0 30px 80px -40px rgba(0,0,0,0.9)`,
        }}
      >
        <div className="overflow-hidden">
          <img
            ref={imgRef}
            src={mock.src}
            alt={mock.alt}
            width={1577}
            height={731}
            loading="lazy"
            decoding="async"
            className="block w-full"
          />
        </div>
      </div>
    ) : (
      <div className={frame === "tilt" ? "[perspective:1200px]" : undefined}>
        <div className="relative">
          {badge && (
            <div
              className="absolute -top-4 right-6 z-10 rounded-full border bg-[#0A0A0F]/80 px-4 py-1.5 text-xs font-medium backdrop-blur"
              style={{ borderColor: `${hex}4D` }}
            >
              <span className={textClass}>{badge}</span>
            </div>
          )}
          <div
            ref={cardRef}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            style={{
              boxShadow: `0 40px 120px -20px ${hex}33, 0 20px 60px -30px rgba(0,0,0,0.8)`,
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="ml-3 truncate text-[11px] text-white/30">
                {eyebrow}
              </span>
            </div>
            <div className="overflow-hidden">
              <img
                ref={imgRef}
                src={mock.src}
                alt={mock.alt}
                width={1577}
                height={731}
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative isolate flex min-h-svh items-center overflow-hidden py-24"
    >
      <div ref={floodRef} aria-hidden className="absolute inset-0 -z-10">
        {baseHex !== "#0A0A0F" && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: baseHex }}
          />
        )}
        {/* radial atrás da coluna de texto (o mock cobriria o centro) */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(110% 95% at ${
              flip ? "78%" : frame === "center" ? "50%" : "22%"
            } ${frame === "center" ? "28%" : "45%"}, ${hex}4D 0%, ${hex}17 42%, transparent 74%)`,
          }}
        />
      </div>

      <div className="container w-full">
        {frame === "center" ? (
          <div className="flex flex-col items-center gap-12">
            {textBlock}
            <div className="w-full max-w-5xl">{mockCard}</div>
          </div>
        ) : (
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
              {textBlock}
            </div>
            <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
              {mockCard}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

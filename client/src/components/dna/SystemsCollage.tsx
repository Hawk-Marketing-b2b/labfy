import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// Telas reais de sistemas que construímos, em cascata com parallax.
const SHOTS = [
  { src: "/mocks/atendebot-inbox.png", alt: "AtendeBot: inbox de atendimento no WhatsApp", pos: "left-0 top-0 -rotate-6", speed: -50 },
  { src: "/mocks/cliente-dashboard.png", alt: "Dashboard de funil feito sob medida para um cliente", pos: "right-0 top-[22%] rotate-3", speed: 40 },
  { src: "/mocks/barbearia.png", alt: "Barbearia Inteligente: agenda e visão geral", pos: "left-[6%] top-[46%] rotate-2", speed: -30 },
  { src: "/mocks/atendebot-dashboard.png", alt: "AtendeBot: relatórios de atendimento", pos: "right-[4%] top-[68%] -rotate-3", speed: 60 },
];

export default function SystemsCollage() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      el.querySelectorAll<HTMLElement>("[data-speed]").forEach(shot => {
        gsap.fromTo(
          shot,
          { y: -Number(shot.dataset.speed) },
          {
            y: Number(shot.dataset.speed),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref}>
      {/* mobile: grade simples */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {SHOTS.map(shot => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            decoding="async"
            className="rounded-lg border border-white/10"
          />
        ))}
      </div>

      {/* desktop: cascata com parallax */}
      <div className="relative hidden aspect-[5/6] md:block">
        {SHOTS.map((shot, i) => (
          <div
            key={shot.src}
            data-speed={shot.speed}
            className={cn("absolute w-[72%]", shot.pos)}
            style={{ zIndex: i + 1 }}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              width={1577}
              height={731}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition duration-500 hover:scale-[1.04] hover:border-white/40"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

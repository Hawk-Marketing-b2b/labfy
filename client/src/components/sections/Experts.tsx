import Reveal from "@/components/fx/Reveal";

const CAPABILITIES = [
  "Operam 24/7",
  "Integrados aos seus sistemas",
  "Sob as suas regras",
];

export default function Experts() {
  return (
    <section
      id="experts"
      className="relative isolate overflow-hidden border-y border-white/5 py-40"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(191,219,254,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Experts em IA &amp; agentes
          </p>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Agentes que tocam o dia a dia.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Eles automatizam processos, conversam com os seus sistemas e
            decidem dentro das regras que a sua empresa define.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap} delay={0.1 + i * 0.08} y={12}>
              <span className="inline-block rounded-full border border-white/10 px-5 py-2 text-sm text-white/70 transition-colors hover:border-white/25">
                {cap}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

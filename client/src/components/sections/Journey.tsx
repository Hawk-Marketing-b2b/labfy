import Reveal from "@/components/fx/Reveal";
import { JOURNEY_STOPS } from "./journey.data";
import JourneyStop from "./JourneyStop";

export default function Journey() {
  return (
    <section id="jornada">
      <div className="container py-32 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Sistemas em produção
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-5xl">
            O que já tá rodando.
          </h2>
        </Reveal>
      </div>

      {JOURNEY_STOPS.map((stop, i) => (
        <JourneyStop key={stop.id} data={stop} index={i} />
      ))}
    </section>
  );
}

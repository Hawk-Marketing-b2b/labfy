import Reveal from "@/components/fx/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Entender a operação",
    body: "A gente senta com o seu time e mapeia o processo do jeito que ele acontece na prática.",
  },
  {
    number: "02",
    title: "Desenhar o sistema",
    body: "Você vê o desenho da solução e valida o caminho antes de qualquer linha de código.",
  },
  {
    number: "03",
    title: "Construir e evoluir",
    body: "Entregas em ciclos curtos, com o sistema crescendo junto com a operação.",
  },
];

export default function Process() {
  return (
    <section id="processo" className="py-40">
      <div className="container">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Como a gente trabalha
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">
            Do diagnóstico ao sistema rodando.
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={0.1 + i * 0.1}>
              <div className="border-t border-white/10 pt-6">
                <p className="font-display text-5xl font-extrabold tracking-tight text-white/15">
                  {step.number}
                </p>
                <p className="mt-4 font-display text-xl font-semibold">
                  {step.title}
                </p>
                <p className="mt-2 leading-relaxed text-white/55">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

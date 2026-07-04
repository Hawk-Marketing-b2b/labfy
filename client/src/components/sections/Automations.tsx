import {
  BarChart3,
  Cable,
  CalendarClock,
  Send,
  Users,
  Workflow,
} from "lucide-react";
import Reveal from "@/components/fx/Reveal";

const AUTOMATIONS = [
  {
    icon: Workflow,
    title: "Processos no automático",
    body: "Rotinas que rodavam na mão passam a rodar sozinhas, com regra clara e registro de tudo.",
  },
  {
    icon: Users,
    title: "CRM sempre atualizado",
    body: "Leads entram, etapas avançam e follow-ups saem sem depender de lembrete de ninguém.",
  },
  {
    icon: Send,
    title: "Ofertas pro lead certo",
    body: "Disparos segmentados no WhatsApp e no e-mail, na hora em que o lead está quente.",
  },
  {
    icon: CalendarClock,
    title: "Lembretes e cobranças",
    body: "Confirmação de agenda, cobrança e pós-venda saindo no horário certo, todos os dias.",
  },
  {
    icon: Cable,
    title: "Sistemas conversando",
    body: "ERP, planilhas e APIs integrados, sem retrabalho de digitação entre ferramentas.",
  },
  {
    icon: BarChart3,
    title: "Relatórios sem esforço",
    body: "Os números da operação chegam prontos, sem ninguém montar planilha no fim do mês.",
  },
];

export default function Automations() {
  return (
    <section id="automacoes" className="py-40">
      <div className="container">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Automações
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">
            Sua operação no automático.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            A gente mapeia o que consome o tempo do seu time e coloca pra rodar
            sozinho.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATIONS.map((item, i) => (
            <Reveal key={item.title} delay={0.05 + (i % 3) * 0.08} y={20}>
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25">
                <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <item.icon className="size-5 text-white/70" />
                </div>
                <p className="mt-5 font-display text-lg font-semibold">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

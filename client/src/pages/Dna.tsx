import { motion } from "framer-motion";
import {
  BadgeCheck,
  Check,
  Compass,
  Ear,
  Eye,
  Feather,
  Footprints,
  GraduationCap,
  Hand,
  HeartHandshake,
  KeyRound,
  Lightbulb,
  Lock,
  NotebookPen,
  PackageCheck,
  Rocket,
  ShieldCheck,
  Shuffle,
  Smile,
  Sparkles,
  Telescope,
  Users,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/fx/Reveal";
import { Cards, CountUp, Heading, type Item, Lema, Marquee } from "@/components/dna/blocks";
import DnaHero from "@/components/dna/DnaHero";
import Pong from "@/components/dna/Pong";
import SystemsCollage from "@/components/dna/SystemsCollage";
import Founders from "@/components/sections/Founders";

const PONTOS = [
  {
    title: "Entender antes de construir",
    body: "Todo sob medida começa com escuta. A gente senta com quem põe a mão na massa, entende como a operação roda de verdade e só aí desenha a solução.",
  },
  {
    title: "Fazer mais com menos",
    body: "Time enxuto, entrega de gente grande. O segredo é IA e automação em tudo, inclusive no nosso próprio trabalho.",
  },
  {
    title: "Cuidar do que construímos",
    body: "Depois que o sistema vai pro ar, a gente segue por perto: acompanha, ajusta e melhora.",
  },
  {
    title: "Aprender todo dia",
    body: "A tecnologia muda toda semana, e é isso que deixa tudo mais divertido. Aqui o que conta é a vontade de aprender.",
  },
];

const RELACAO: Item[] = [
  {
    icon: KeyRound,
    title: "Todo mundo é dono",
    body: "Cada um cuida do que constrói como se fosse seu, porque é. Se algo deu errado, a gente olha junto, corrige e aprende, sem caça às bruxas.",
  },
  {
    icon: Compass,
    title: "Liberdade com contexto",
    body: "Você tem espaço pra decidir como resolver. Só entende o porquê e mantém o time por dentro.",
  },
  {
    icon: Lightbulb,
    title: "A melhor ideia ganha",
    body: "Venha de quem vier. Aqui qualquer pessoa pode questionar qualquer decisão, inclusive dos fundadores.",
  },
  {
    icon: PackageCheck,
    title: "Palavra cumprida",
    body: "Prazo combinado é prazo entregue. E, se der pra entregar um pouco mais, melhor ainda.",
  },
  {
    icon: Shuffle,
    title: "Todo mundo faz de tudo",
    body: "Dev conversa com cliente, fundador testa sistema. Ninguém tá acima de tarefa nenhuma.",
  },
  {
    icon: Users,
    title: "Ninguém resolve sozinho",
    body: "Travou? Chama alguém. Pedir ajuda cedo poupa o tempo de todo mundo.",
  },
];

const TRABALHO: Item[] = [
  {
    icon: Ear,
    title: "Perto de quem usa",
    body: "A gente mapeia o processo junto com quem faz o trabalho no dia a dia.",
  },
  {
    icon: Footprints,
    title: "Passos curtos",
    body: "Entrega em partes pequenas, com o sistema crescendo junto com a operação. Feedback cedo poupa retrabalho.",
  },
  {
    icon: Feather,
    title: "Simples primeiro",
    body: "A melhor linha de código é a que não precisou ser escrita.",
  },
  {
    icon: Sparkles,
    title: "IA no nosso dia a dia",
    body: "A gente usa IA em tudo antes de levar pro cliente. Tarefa repetitiva por aqui vira automação rapidinho.",
  },
  {
    icon: NotebookPen,
    title: "Tudo escrito",
    body: "Decisões, acessos e aprendizados ficam registrados, pra ninguém depender da memória de ninguém.",
  },
];

const VALORES: Item[] = [
  {
    icon: Telescope,
    title: "Curiosidade",
    body: "Gostamos de entender como as coisas funcionam: a operação do cliente, uma tecnologia nova, um bug estranho.",
  },
  {
    icon: Feather,
    title: "Simplicidade",
    body: "Software simples é mais rápido de fazer, mais barato de manter e mais difícil de quebrar. Vale também pro jeito como a gente conversa.",
  },
  {
    icon: Eye,
    title: "Transparência",
    body: "Com o time e com o cliente. Atrasou, deu bug, mudou o escopo: a gente conta antes de alguém perguntar.",
  },
  {
    icon: HeartHandshake,
    title: "Cuidado",
    body: "Com as pessoas, com o trabalho bem-feito e com o tempo, o dinheiro e os dados de quem confia na gente.",
  },
  {
    icon: Smile,
    title: "Leveza",
    body: "Dá pra levar o trabalho a sério e se divertir no caminho. A gente comemora as vitórias, ri dos perrengues e respeita a vida fora do trabalho.",
  },
];

const PILARES: Item[] = [
  {
    icon: GraduationCap,
    title: "Aprendizado contínuo",
    body: "Todo dia tem coisa nova pra aprender, e a gente divide com o time. Ensinar é o melhor jeito de aprender.",
  },
  {
    icon: Rocket,
    title: "Inovação com propósito",
    body: "A gente testa tudo que sai de novo em IA e leva pro cliente o que resolve problema de verdade.",
  },
  {
    icon: ShieldCheck,
    title: "Confiança",
    body: "Entre nós e com os clientes, construída com honestidade e entrega.",
  },
];

const NAO_ABRIMOS_MAO: Item[] = [
  {
    icon: BadgeCheck,
    title: "Honestidade",
    body: "Sempre, até quando a verdade é desconfortável.",
  },
  {
    icon: Lock,
    title: "Respeito aos dados",
    body: "Cuidamos de conversas, contatos e números de empresas reais. Segurança e privacidade não têm atalho.",
  },
  {
    icon: Hand,
    title: "Assumir o que é nosso",
    body: "Quando algo dá errado, a gente assume, conserta e segue.",
  },
];

// [destaque, resto da frase]
const COMBINADOS: [string, string][] = [
  ["Entender antes de construir", ": primeiro a conversa, depois o código."],
  ["Testar antes de entregar", ", sempre."],
  ["Contar o erro assim que ele aparece", ". Quanto antes, mais fácil de resolver."],
  ["Escolher o caminho simples", " sempre que der."],
  ["Combinar prazos realistas", " e cumprir o combinado."],
  ["Recomendar o que o cliente precisa", ", na medida certa."],
  ["Automatizar o que se repete", ". Fez três vezes na mão? Vira automação."],
  ["Transformar erro em aprendizado", ": um teste, um processo ou uma automação, pra ele não voltar."],
  ["Falar o que pensa", ", mesmo quando dá um frio na barriga."],
  ["Receber feedback de peito aberto", ", inclusive na revisão de código."],
  ["Focar no que foi entregue", ". Resultado no ar é o que conta."],
  ["Melhorar o que “sempre foi feito assim”", ", sempre que aparecer um jeito melhor."],
  ["Jogar pelo time", ". Ganha todo mundo junto."],
  ["Comemorar junto", " cada conquista, das grandes às pequenas."],
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Dna() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="grain" aria-hidden />
      <Header />
      <main>
        <DnaHero />

        <section className="py-32">
          <div className="container">
            <Reveal className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-white/60 md:text-xl">
              <p>
                Muita empresa se acostumou a trabalhar do jeito que o software
                manda: processo adaptado para caber na ferramenta, planilha
                paralela para cobrir o que ela não faz, gente digitando a mesma
                coisa em três lugares.
              </p>
              <p>
                A NoraLabs nasceu desse incômodo. A gente começou em 2025 com o
                AtendeBot, dentro do ecossistema da Hawk, e foi vendo de perto o
                que as empresas queriam de verdade: ferramenta que entende como
                elas trabalham. Daí veio a nossa ideia fixa:{" "}
                <strong className="font-semibold text-white">
                  construir a tecnologia em volta da operação de cada empresa.
                </strong>
              </p>
              <p>
                Esse é o nosso jeito de ser, colocado no papel. A graça é viver
                isso no dia a dia.
              </p>
            </Reveal>
          </div>
        </section>

        <Lema segments={[{ text: "Pronto é quando" }, { text: "funciona", em: true }, { text: "pro cliente." }]}>
          Nada dá mais orgulho do que saber que, do outro lado, alguém largou
          uma tarefa chata porque o sistema que a gente fez agora cuida disso.
        </Lema>

        <Founders />

        <section className="py-32">
          <div className="container">
            <Heading eyebrow="Nosso DNA em 4 pontos" title="Na dúvida, volte aqui.">
              Bateu a dúvida “tô no caminho certo?”, é só passar por estes
              quatro pontos.
            </Heading>
            <div className="mx-auto mt-16 grid max-w-4xl gap-x-10 gap-y-14 md:grid-cols-2">
              {PONTOS.map((ponto, i) => (
                <div key={ponto.title}>
                  <motion.div
                    aria-hidden
                    className="h-px origin-left bg-gradient-to-r from-sky-200/60 via-white/20 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 1.1, delay: (i % 2) * 0.15, ease: EASE }}
                  />
                  <Reveal delay={0.1 + (i % 2) * 0.1}>
                    <p className="mt-6 bg-gradient-to-b from-white/40 to-white/5 bg-clip-text font-display text-7xl font-extrabold tracking-tight text-transparent">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 font-display text-2xl font-semibold">{ponto.title}</p>
                    <p className="mt-3 leading-relaxed text-white/55">{ponto.body}</p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate py-32">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(50% 60% at 75% 50%, rgba(191,219,254,0.07) 0%, transparent 70%)",
            }}
          />
          <div className="container grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                  Propósito
                </p>
                <p className="mt-10 font-display text-3xl font-bold leading-snug tracking-tight md:text-5xl">
                  Fazer tecnologia que se encaixa{" "}
                  <span className="text-white/40">no jeito de cada empresa trabalhar.</span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-sky-200/20 bg-gradient-to-b from-sky-200/[0.07] to-transparent p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                  Nosso sonho grande
                </p>
                <p className="mt-8 font-display font-extrabold tracking-tight">
                  <span className="sr-only">R$ 100 mil</span>
                  <span aria-hidden className="bg-gradient-to-r from-white to-sky-200 bg-clip-text text-6xl text-transparent md:text-8xl">
                    R$ <CountUp to={100} /> mil
                  </span>
                </p>
                <p className="mt-3 text-lg font-semibold">
                  de faturamento mensal até fevereiro de 2027.
                </p>
                <p className="mt-5 leading-relaxed text-white/55">
                  É um baita salto pra um time do nosso tamanho, e é isso que
                  empolga. Cada sistema no ar e cada cliente bem cuidado deixa a
                  gente mais perto.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="overflow-hidden py-32">
          <div className="container grid items-center gap-16 md:grid-cols-2">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                O que somos
              </p>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
                O time de tecnologia das empresas que não têm um.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60">
                A gente entende a operação, desenha a solução, constrói, coloca
                pra rodar e segue cuidando.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/60">
                Funciona como parceria: a gente entra no dia a dia do cliente,
                pensa junto e fala a real, até quando a melhor saída nem envolve
                sistema.
              </p>
            </Reveal>
            <SystemsCollage />
          </div>
        </section>

        <section className="py-32">
          <div className="container">
            <Heading eyebrow="Como a gente se relaciona" title="Time pequeno, cabeça de dono." />
            <Cards items={RELACAO} />
          </div>
        </section>

        <section className="py-32">
          <div className="container">
            <Heading eyebrow="Como trabalhamos" title="Simples, perto e em passos curtos." />
            <Cards items={TRABALHO} />
            <Reveal className="mt-20 text-center">
              <p className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                <span className="bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                  1%
                </span>{" "}
                melhor todo dia.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-white/5 py-32">
          <div className="container">
            <Heading eyebrow="Valores" title="O que guia as nossas escolhas." />
          </div>
          <div className="mt-14">
            <Marquee words={VALORES.map(v => v.title)} />
          </div>
          <div className="container">
            <Cards items={VALORES} cols={5} />
            <div className="mx-auto mt-20 grid max-w-4xl gap-10 md:grid-cols-2">
              <Reveal>
                <blockquote className="border-l-2 border-sky-200/40 pl-6">
                  <p className="font-display text-2xl font-semibold">
                    Na dúvida, vai.
                  </p>
                  <p className="mt-2 leading-relaxed text-white/55">
                    Errar faz parte do jogo. Tenta, aprende, ajusta e segue.
                  </p>
                </blockquote>
              </Reveal>
              <Reveal delay={0.1}>
                <blockquote className="border-l-2 border-sky-200/40 pl-6">
                  <p className="font-display text-2xl font-semibold">
                    Cliente, empresa, time, cada um de nós.
                  </p>
                  <p className="mt-2 leading-relaxed text-white/55">
                    Quando a escolha aperta, a ordem é essa: primeiro o cliente,
                    depois a empresa, depois o time e por último cada um de nós.
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="intervalo" className="py-32">
          <div className="container">
            <Heading eyebrow="Intervalo" title="Leveza também é valor.">
              Respira. Bate uma bolinha com a Nora e depois segue a leitura.
            </Heading>
            <Reveal className="mx-auto mt-12 max-w-4xl">
              <Pong />
            </Reveal>
          </div>
        </section>

        <section className="py-32">
          <div className="container">
            <Heading eyebrow="Pilares" title="O que sustenta tudo isso." />
            <Cards items={PILARES} />
          </div>
        </section>

        <section className="py-32">
          <div className="container">
            <Heading eyebrow="Do que não abrimos mão" title="Três coisas que não mudam.">
              Falamos o que precisa ser dito, sempre com respeito.
            </Heading>
            <Cards items={NAO_ABRIMOS_MAO} />
          </div>
        </section>

        <section className="border-t border-white/5 py-32">
          <div className="container">
            <Heading eyebrow="Nossos combinados" title="O jeito NoraLabs, no dia a dia." />
            <ul className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-5 md:grid-cols-2">
              {COMBINADOS.map(([acao, detalhe], i) => (
                <li key={acao}>
                  <Reveal delay={(i % 2) * 0.08} className="flex gap-4">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-sky-200/30 bg-sky-200/[0.06]">
                      <Check aria-hidden className="size-3.5 text-sky-100" />
                    </span>
                    <p className="leading-relaxed text-white/55">
                      <span className="font-semibold text-white">{acao}</span>
                      {detalhe}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative isolate overflow-hidden py-40">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(191,219,254,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="container text-center">
            <Reveal>
              <img
                src="/logos/nora-symbol.svg"
                alt=""
                className="mx-auto size-16 opacity-70"
              />
              <p className="mt-8 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                Bem-vindo ao time.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

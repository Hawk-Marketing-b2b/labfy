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
    body: "Sob medida começa ouvindo. A gente senta com quem faz o trabalho, entende a operação como ela é e só depois desenha a solução.",
  },
  {
    title: "Fazer mais com menos",
    body: "Somos um time pequeno que entrega como um grande, porque usamos IA e automação em tudo, inclusive no nosso próprio trabalho.",
  },
  {
    title: "Cuidar do que construímos",
    body: "O sistema não termina na entrega. A gente acompanha, ajusta e continua por perto.",
  },
  {
    title: "Aprender todo dia",
    body: "A tecnologia muda toda semana, e isso é o que deixa o trabalho divertido. Aqui ninguém precisa saber tudo, só ter vontade de aprender.",
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
    body: "Você tem espaço para decidir como resolver. A gente só pede que entenda o porquê e mantenha o time por dentro.",
  },
  {
    icon: Lightbulb,
    title: "A melhor ideia ganha",
    body: "Não o cargo. Somos horizontais: qualquer pessoa pode questionar qualquer decisão, inclusive dos fundadores.",
  },
  {
    icon: PackageCheck,
    title: "Prometer pouco, entregar muito",
    body: "O prazo que a gente fala é o prazo que a gente cumpre.",
  },
  {
    icon: Shuffle,
    title: "Todo mundo faz de tudo",
    body: "Dev conversa com cliente, fundador testa sistema. Ninguém está acima de nenhuma tarefa.",
  },
  {
    icon: Users,
    title: "Ninguém resolve sozinho",
    body: "Pedir ajuda cedo é sinal de maturidade, não de fraqueza.",
  },
];

const TRABALHO: Item[] = [
  {
    icon: Ear,
    title: "Perto de quem usa",
    body: "Mapeamos o processo com quem faz o trabalho no dia a dia, não só com quem contrata.",
  },
  {
    icon: Footprints,
    title: "Passos curtos",
    body: "Entregamos em partes pequenas, e o sistema cresce junto com a operação. Ouvir cedo poupa retrabalho depois.",
  },
  {
    icon: Feather,
    title: "Simples primeiro",
    body: "A melhor linha de código é a que não precisou ser escrita.",
  },
  {
    icon: Sparkles,
    title: "IA no nosso dia a dia",
    body: "Antes de levar IA para o cliente, a gente usa IA. Tarefa repetitiva por aqui vira automação.",
  },
  {
    icon: NotebookPen,
    title: "Tudo escrito",
    body: "Decisões, acessos e aprendizados ficam registrados, para ninguém depender da memória de ninguém.",
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
    body: "Software simples é mais rápido de fazer, mais barato de manter e mais difícil de quebrar. Vale também para a forma como a gente conversa.",
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
    body: "Trabalho sério não precisa ser pesado. Comemoramos as vitórias, rimos dos perrengues e respeitamos a vida fora do trabalho.",
  },
];

const PILARES: Item[] = [
  {
    icon: GraduationCap,
    title: "Aprendizado contínuo",
    body: "Aprendemos algo novo todo dia e compartilhamos. Ensinar é o melhor jeito de aprender.",
  },
  {
    icon: Rocket,
    title: "Inovação com propósito",
    body: "Testamos o que há de novo em IA e tecnologia, mas só levamos para o cliente o que resolve um problema de verdade.",
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
    body: "Sempre, mesmo quando a verdade é desconfortável.",
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
  ["Entender antes de construir", ", em vez de sair codando."],
  ["Testar antes de entregar", ", em vez de torcer para funcionar."],
  ["Contar um erro assim que ele aparece", ". Erro escondido sempre cresce."],
  ["Escolher o caminho simples", ", em vez de complicar para impressionar."],
  ["Dar prazos realistas", ", em vez de prometer o que já sabemos que não vamos cumprir."],
  ["Recomendar só o que o cliente precisa", ", mesmo que isso signifique vender menos."],
  ["Automatizar o que se repete", ", em vez de fazer na mão todo dia."],
  ["Transformar erro em aprendizado", ": um teste, um processo ou uma automação, para ele não voltar."],
  ["Falar, mesmo com receio", ", em vez de guardar uma ideia ou uma preocupação."],
  ["Receber feedback de peito aberto", ", inclusive na revisão de código."],
  ["Medir pelo que foi entregue", ", e não pelas horas ocupadas."],
  ["Melhorar o que “sempre foi feito assim”", ", quando houver um jeito melhor."],
  ["Pensar no time", " antes do resultado individual."],
  ["Comemorar juntos", " cada conquista."],
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
                A NoraLabs nasceu de um incômodo com isso. Começamos em 2025 com
                o AtendeBot, dentro do ecossistema da Hawk, e vimos de perto que
                o problema quase nunca era falta de ferramenta. Era ferramenta
                que não conhecia a empresa. Então decidimos fazer o contrário:{" "}
                <strong className="font-semibold text-white">
                  a tecnologia se adapta à operação, e não a operação à
                  tecnologia.
                </strong>
              </p>
              <p>
                Esta página é o nosso jeito de ser, escrito. Mais do que ler, a
                ideia é viver.
              </p>
            </Reveal>
          </div>
        </section>

        <Lema segments={[{ text: "Pronto é quando" }, { text: "funciona", em: true }, { text: "para o cliente." }]}>
          O que nos deixa orgulhosos não é a tela bonita na apresentação. É
          saber que, do outro lado, alguém parou de fazer uma tarefa chata
          porque o sistema que a gente construiu agora faz por ela.
        </Lema>

        <Founders />

        <section className="py-32">
          <div className="container">
            <Heading eyebrow="Nosso DNA em 4 pontos" title="Na dúvida, volte aqui.">
              Se um dia bater a dúvida “estou no caminho certo?”, estes quatro
              pontos respondem.
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
                  Fazer a tecnologia se adaptar às empresas,{" "}
                  <span className="text-white/40">e não o contrário.</span>
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
                  É um passo grande para um time do nosso tamanho, e é
                  exatamente por isso que ele empolga. Cada sistema que entra em
                  produção e cada cliente bem cuidado nos deixa mais perto.
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
                para rodar e segue cuidando.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/60">
                Não somos uma fábrica de software que recebe uma lista de telas e
                devolve um código, nem revenda de ferramenta pronta. Somos
                parceiros. E, se o problema do cliente se resolve sem sistema
                nenhum, a gente fala.
              </p>
            </Reveal>
            <SystemsCollage />
          </div>
        </section>

        <section className="py-32">
          <div className="container">
            <Heading eyebrow="Como a gente se relaciona" title="Todo mundo é dono." />
            <Cards items={RELACAO} />
          </div>
        </section>

        <section className="py-32">
          <div className="container">
            <Heading eyebrow="Como trabalhamos" title="Simples, perto e em passos curtos." />
            <Cards items={TRABALHO} />
            <Reveal className="mt-20 text-center">
              <p className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                Evoluímos{" "}
                <span className="bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                  1%
                </span>{" "}
                todos os dias.
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
                    Peça desculpas, não peça licença.
                  </p>
                  <p className="mt-2 leading-relaxed text-white/55">
                    Não deixe de tentar por medo de errar. Errar faz parte; o
                    importante é aprender com o erro.
                  </p>
                </blockquote>
              </Reveal>
              <Reveal delay={0.1}>
                <blockquote className="border-l-2 border-sky-200/40 pl-6">
                  <p className="font-display text-2xl font-semibold">
                    Cliente, empresa, time, cada um de nós.
                  </p>
                  <p className="mt-2 leading-relaxed text-white/55">
                    Na dúvida, pensamos no que é melhor para o cliente, depois
                    para a empresa, depois para o time e, por fim, para cada um
                    de nós.
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="intervalo" className="py-32">
          <div className="container">
            <Heading eyebrow="Intervalo" title="Leveza também é valor.">
              Trabalho sério não precisa ser pesado. Bate uma bolinha com a
              Nora antes de seguir.
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

export type JourneyFrame = "window" | "tilt" | "center";

export type JourneyStopData = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Classe literal de texto do acento (Tailwind v4 só enxerga strings literais). */
  textClass: string;
  /** Hex do acento — usado em floods/sombras/bordas via style inline. */
  hex: string;
  /** Base escura do flood da seção. */
  baseHex: string;
  mock: { src: string; alt: string };
  frame: JourneyFrame;
  flip?: boolean;
  badge?: string;
  /** Link discreto pro produto (ex.: app do AtendeBot). */
  appHref?: string;
  appLabel?: string;
};

export const JOURNEY_STOPS: JourneyStopData[] = [
  {
    id: "atendebot-atendimento",
    eyebrow: "AtendeBot · Atendimento",
    title: "Atendimento no WhatsApp que resolve sozinho.",
    body: "Responde, qualifica e resolve conversas no WhatsApp, 24 horas por dia.",
    textClass: "text-lime",
    hex: "#A3E635",
    baseHex: "#0A0A0F",
    mock: {
      src: "/mocks/atendebot-inbox.png",
      alt: "Inbox do AtendeBot: atendimento no WhatsApp com IA",
    },
    frame: "window",
    appHref: "https://app.atende.bot",
    appLabel: "Acessar o AtendeBot",
  },
  {
    id: "atendebot-relatorios",
    eyebrow: "AtendeBot · Relatórios",
    title: "E a operação inteira em números.",
    body: "Capacidade de atendimento, tempo de espera e resultados do time, tudo em tempo real.",
    textClass: "text-lime",
    hex: "#A3E635",
    baseHex: "#0A0A0F",
    mock: {
      src: "/mocks/atendebot-dashboard.png",
      alt: "Dashboard de relatórios do AtendeBot: KPIs e capacidade de atendimento",
    },
    frame: "tilt",
    flip: true,
    badge: "Por dentro da mesma plataforma",
    appHref: "https://app.atende.bot",
    appLabel: "Acessar o AtendeBot",
  },
  {
    id: "barbearia-inteligente",
    eyebrow: "Barbearia Inteligente",
    title: "A barbearia no automático.",
    body: "Plataforma completa pra barbearias: agenda, clientes, WhatsApp e operação num lugar só.",
    textClass: "text-orange-400",
    hex: "#C2410C",
    baseHex: "#0D1B2A",
    mock: {
      src: "/mocks/barbearia.png",
      alt: "Barbearia Inteligente: dashboard com agenda, WhatsApp e ações rápidas",
    },
    frame: "window",
  },
  {
    id: "cliente-dashboard",
    eyebrow: "Cliente · Dashboard sob medida",
    title: "Um sistema que nasceu do zero pra um cliente.",
    body: "Dashboard de funil, conversão e receita desenhado em cima dos números que essa operação precisava acompanhar.",
    textClass: "text-neon",
    hex: "#4ADE80",
    baseHex: "#0A0A0F",
    mock: {
      src: "/mocks/cliente-dashboard.png",
      alt: "Dashboard sob medida de funil, conversão e receita feito para um cliente",
    },
    frame: "center",
  },
];

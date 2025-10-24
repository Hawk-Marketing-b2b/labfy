import { motion } from "framer-motion";
import {
  DollarSign,
  Headphones,
  Users,
  FolderKanban,
  TrendingUp,
  Package,
  Sparkles,
} from "lucide-react";

const solutions = [
  {
    icon: DollarSign,
    title: "Financeiro",
    description:
      "Automatize reconciliações, análise de faturas e relatórios financeiros com precisão e agilidade.",
  },
  {
    icon: Headphones,
    title: "Atendimento ao Cliente",
    description:
      "Agentes de IA que resolvem demandas 24/7, reduzindo tempo de resposta e aumentando satisfação.",
  },
  {
    icon: Users,
    title: "RH e Recrutamento",
    description:
      "Triagem inteligente de candidatos, onboarding automatizado e gestão de documentos simplificada.",
  },
  {
    icon: FolderKanban,
    title: "Gestão de Projetos",
    description:
      "Automação de status reports, alocação de recursos e identificação proativa de riscos.",
  },
  {
    icon: TrendingUp,
    title: "Vendas e Prospecção",
    description:
      "Qualificação automática de leads, follow-ups personalizados e análise preditiva de oportunidades.",
  },
  {
    icon: Package,
    title: "Operações e Logística",
    description:
      "Otimização de processos, previsão de demanda e automação de fluxos operacionais complexos.",
  },
  {
    icon: Sparkles,
    title: "E Muito mais!",
    description:
      "Soluções personalizadas para qualquer desafio do seu negócio. Entre em contato para descobrir como podemos ajudar.",
  },
];

export default function Solutions() {
  return (
    <section id="solucoes" className="py-20 px-4 bg-black/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-foreground/50 uppercase tracking-wider mb-4">
            Nossas soluções
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Escale sua operação sem
            <br />
            escalar sua folha de pagamento
          </h2>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-white/20 transition-all group"
            >
              {/* Icon */}
              <div className="mb-4 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <solution.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3">{solution.title}</h3>

              {/* Description */}
              <p className="text-foreground/70 text-sm leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


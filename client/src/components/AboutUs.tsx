import { motion } from "framer-motion";
import { Brain, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Soluções que Funcionam",
    description:
      "Criamos agentes de IA que não apenas automatizam tarefas, mas aprendem e evoluem com seu negócio, entregando eficiência crescente ao longo do tempo.",
    color: "border-red-500",
  },
  {
    icon: Zap,
    title: "Zero Fricção",
    description:
      "Nossas soluções se encaixam no seu ambiente atual. Sem reformular processos, sem abandonar ferramentas. Apenas resultados melhores, mais rápido.",
    color: "border-blue-500",
  },
  {
    icon: Users,
    title: "Expertise Comprovada",
    description:
      "Desenvolvedores com formação sólida em IA e track record em implementações enterprise que entregam ROI mensurável.",
    color: "border-red-500",
  },
];

export default function AboutUs() {
  return (
    <section id="sobre-nos" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-foreground/50 uppercase tracking-wider mb-4">
            Sobre nós
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Resultados começam onde
            <br />
            a teoria termina.
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            Unimos engenharia de IA avançada com profundo entendimento do seu
            modelo de negócio.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative p-8 rounded-2xl border-2 ${feature.color} bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all group`}
            >
              {/* Icon */}
              <div className="mb-6 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

              {/* Description */}
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


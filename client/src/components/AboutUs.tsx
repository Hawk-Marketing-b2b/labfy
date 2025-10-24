import { motion } from "framer-motion";
import { Brain, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Soluções que Funcionam",
    description:
      "Criamos agentes de IA que não apenas automatizam tarefas, mas aprendem e evoluem com seu negócio, entregando eficiência crescente ao longo do tempo.",
  },
  {
    icon: Zap,
    title: "Zero Fricção",
    description:
      "Nossas soluções se encaixam no seu ambiente atual. Sem reformular processos, sem abandonar ferramentas. Apenas resultados melhores, mais rápido.",
  },
  {
    icon: Users,
    title: "Expertise Comprovada",
    description:
      "Desenvolvedores com formação sólida em IA e track record em implementações enterprise que entregam ROI mensurável.",
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
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
            Sobre nós
          </p>
          <h2 className="text-[35px] md:text-[45px] font-semibold mb-6">
            Resultados começam onde
            <br />
            a teoria termina.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
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
              className="relative p-8 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm hover:border-gray-700 transition-all group overflow-hidden"
            >
              {/* Grid Background Pattern */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon Circle */}
                <div className="mb-6 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform mx-auto">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-center">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-center text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


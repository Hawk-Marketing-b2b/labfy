import { motion } from "framer-motion";
import { Map, Users, PlayCircle } from "lucide-react";

const steps = [
  {
    icon: Map,
    title: "Identificamos quais processos automatizar",
    description:
      "Mapeamos seu fluxo de trabalho e revelamos exatamente quais tarefas podem ser executadas por agentes de IA. Sua empresa produz mais sem aumentar seu time.",
    color: "from-gray-300 via-gray-400 to-gray-500",
  },
  {
    icon: Users,
    title: "Selecionamos e Treinamos os Agentes Certos",
    description:
      "Escolhemos e treinamos os melhores agentes para suas necessidades específicas. Cada um especializado para entregar eficiência.",
    color: "from-gray-300 via-gray-400 to-gray-500",
  },
  {
    icon: PlayCircle,
    title: "Integramos e Ativamos Seus Agentes",
    description:
      "Seus agentes trabalham integrados ao seu time atual. Mais entregas, mesmo custo. A diferença é puro lucro.",
    color: "from-gray-300 via-gray-400 to-gray-500",
  },
];

export default function Process() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
            Como Trabalhamos
          </p>
          <h2 className="text-[35px] md:text-[45px] font-semibold mb-6">
            O Que Fazemos
          </h2>
        </motion.div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative p-8 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/30 to-black/30 backdrop-blur-xl hover:border-gray-700 transition-all group overflow-hidden"
            >
              {/* Dot Pattern Background */}
              <div 
                className="absolute inset-0 opacity-30 pointer-events-none rounded-2xl"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon Circle */}
                <div className={`mb-6 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform mx-auto shadow-lg`}>
                  <step.icon className="w-8 h-8 text-black" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface DiagnosticCTAProps {
  onOpenForm: () => void;
}

const benefits = [
  "Mapear seus processos atuais e identificar gargalos",
  "Analisar oportunidades de automação com IA",
  "Propor soluções personalizadas para seus desafios",
  "Estimar ganhos de eficiência e redução de custos",
];

export default function DiagnosticCTA({ onOpenForm }: DiagnosticCTAProps) {
  return (
    <section id="diagnostico" className="py-20 px-4 bg-black/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-[35px] md:text-[45px] font-bold mb-6">
            Descubra onde a IA pode
            <br />
            transformar sua operação
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Agende uma sessão estratégica onde vamos:
          </p>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 space-y-4 max-w-2xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-gray-300 text-lg">{benefit}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={onOpenForm}
            size="lg"
            className="bg-white text-black hover:bg-gray-200 text-lg px-12 py-6 rounded-full transition-all"
          >
            Solicitar Diagnóstico Gratuito
          </Button>
        </motion.div>
      </div>
    </section>
  );
}


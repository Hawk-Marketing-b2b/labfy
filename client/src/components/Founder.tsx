import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function Founder() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="space-y-6">
            {/* Badge with Lightbulb Icon */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-300">Idealizador</span>
            </div>

            {/* Name and Title */}
            <div>
              <h3 className="text-4xl md:text-5xl font-semibold mb-2">
                Rhulian Marcus
              </h3>
              <p className="text-xl text-gray-400">Especialista em IA & Automação</p>
            </div>

            {/* Bio */}
            <p className="text-gray-300 leading-relaxed text-lg">
              Com mais de uma década de experiência em tecnologia e inovação, Rhulian lidera a 
              LabFy a.i solutions na missão de democratizar o acesso à inteligência artificial 
              para empresas de todos os portes. Sua visão é transformar processos complexos em 
              soluções simples e eficientes, permitindo que negócios alcancem resultados 
              extraordinários através da automação inteligente.
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-300">
                Inteligência Artificial
              </span>
              <span className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-300">
                Automação de Processos
              </span>
              <span className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-300">
                Transformação Digital
              </span>
            </div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl max-h-[500px]">
              <img
                src="/rhulian-founder.png"
                alt="Rhulian Marcus - Fundador LabFy a.i solutions"
                className="w-full h-full object-cover object-center"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


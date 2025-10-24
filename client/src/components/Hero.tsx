import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const techLogos = [
  { name: "OpenAI", color: "border-blue-500" },
  { name: "Anthropic", color: "border-orange-500" },
  { name: "Google AI", color: "border-red-500" },
  { name: "LangChain", color: "border-blue-400" },
  { name: "n8n", color: "border-pink-500" },
  { name: "AWS", color: "border-yellow-500" },
];

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center pt-[120px]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-8"
        >
          <h1 className="text-[50px] md:text-[60px] lg:text-[70px] font-semibold leading-tight">
            Escale sua operação sem
            <br />
            escalar sua folha de
            <br />
            pagamento
          </h1>
        </motion.div>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
        >
          Ajudamos empresas em alto crescimento a adotar sistemas de ponta
          personalizados com IA para economizar tempo, cortar custos e acelerar
          o crescimento.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <Button
            onClick={() => scrollToSection("sobre-nos")}
            size="lg"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all text-lg px-8 py-6"
          >
            Saiba Mais →
          </Button>
        </motion.div>

        {/* Tech Logos Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-8"
        >
          <p className="text-sm text-gray-400 uppercase tracking-wider">
            Tecnologia sob medida para seus desafios
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {techLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="px-6 py-3 border border-gray-700 rounded-lg bg-gray-900/50 backdrop-blur-sm hover:border-gray-600 transition-all"
              >
                <span className="text-sm font-medium text-foreground">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


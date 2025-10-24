import { motion } from "framer-motion";

export default function Founder() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
            Idealizador
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
              className="relative p-8 md:p-12 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm"
        >
          {/* Name and Title */}
          <div className="mb-6">
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              Rhulian Marcus
            </h3>
            <p className="text-lg text-gray-400">
              Fundador Labify - CEO Hawk Marketing
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Mais de <strong>20 anos de experiência</strong> em Marketing e
              Vendas Digitais no Brasil e exterior. Fundador da{" "}
              <strong>Hawk Marketing</strong>, aceleradora de Growth B2B com
              operações no Brasil e Boston (EUA), responsável por gerar mais de{" "}
              <strong>R$500 milhões em receita</strong> para clientes como
              Bauducco, Danone, Unimed e Bionexo.
            </p>
            <p>
              Ex-CMO da <strong>Gloopay</strong> (fintech acelerada pela Cielo
              Pay e Grupo Boticário), onde conquistou{" "}
              <strong>+10 mil usuários em 3 meses</strong>. Especialista em
              Growth Marketing B2B, RevOps e estruturação comercial para
              empresas em expansão.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


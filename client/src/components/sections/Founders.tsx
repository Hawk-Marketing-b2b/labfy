import { motion } from "framer-motion";
import Reveal from "@/components/fx/Reveal";

const FOUNDERS = [
  { photo: "/founders/rhulian.jpg", name: "Rhulian Marcus", role: "Advisor" },
  { photo: "/founders/jhonatan.jpg", name: "Jhonatan Silva", role: "CEO" },
  { photo: "/founders/enzo.jpg", name: "Enzo Faria", role: "CTO" },
];

export default function Founders() {
  return (
    <section id="fundadores" className="py-40">
      <div className="container">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Fundadores
          </p>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Quem constrói
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
          {FOUNDERS.map((founder, i) => (
            <Reveal key={founder.name} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25"
              >
                <img
                  src={founder.photo}
                  alt={founder.name}
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="p-5 text-center">
                  <p className="font-display text-lg font-semibold">
                    {founder.name}
                  </p>
                  <p className="mt-1 text-sm text-white/50">{founder.role}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

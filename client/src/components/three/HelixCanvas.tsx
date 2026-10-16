import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Helix from "./Helix";

/**
 * Canvas da hélice do /dna — alvo do React.lazy (default export).
 * Mesmo esquema do HeroCanvas: pausa o render fora da viewport.
 */
export default function HelixCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");
  const [isMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? "always" : "never"),
      { rootMargin: "10%" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={frameloop}
      >
        <Helix isMobile={isMobile} />
      </Canvas>
    </motion.div>
  );
}

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Constellation from "./Constellation";

/**
 * Canvas do hero 3D — alvo do React.lazy (default export).
 * Pausa o render loop quando o hero sai da viewport (IntersectionObserver).
 */
export default function HeroCanvas() {
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
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={frameloop}
      >
        <Constellation count={isMobile ? 450 : 1200} withEdges={!isMobile} />
      </Canvas>
    </motion.div>
  );
}

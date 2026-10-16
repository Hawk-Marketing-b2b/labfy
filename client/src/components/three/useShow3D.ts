import { useEffect, useState } from "react";
import { motionOK } from "@/lib/gsap";

/**
 * Gate dos canvases 3D: monta só depois do first paint e só quando o
 * ambiente aguenta — `?static=1` força o fallback, reduced-motion/low-end/
 * sem-WebGL caem no estático.
 */
export function useShow3D() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("static")) return;
    if (!motionOK()) return;
    if ((navigator.hardwareConcurrency ?? 8) <= 4) return;

    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return;

    const show = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(show, { timeout: 800 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(show, 300);
    return () => window.clearTimeout(t);
  }, []);

  return ready;
}

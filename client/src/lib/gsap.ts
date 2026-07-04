import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registro único do plugin — todo componente importa gsap/ScrollTrigger daqui.
gsap.registerPlugin(ScrollTrigger);

/** true quando o usuário NÃO pediu redução de movimento. */
export const motionOK = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };

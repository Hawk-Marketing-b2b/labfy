import Lenis from "lenis";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger, motionOK } from "@/lib/gsap";

type SmoothScrollApi = {
  /** Rola até um seletor (ex.: "#jornada"). Offset compensa o header fixo. */
  scrollTo: (target: string, offset?: number) => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: target => document.querySelector(target)?.scrollIntoView(),
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    // Em reduced-motion a página usa scroll nativo, sem inércia.
    if (!motionOK()) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener("load", onLoad);
    };
  }, []);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      scrollTo: (target, offset = -80) => {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(target, { offset, duration: 1.2 });
        } else {
          document.querySelector(target)?.scrollIntoView({ block: "start" });
        }
      },
    }),
    [],
  );

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

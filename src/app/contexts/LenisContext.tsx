import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";

type LenisInstance = InstanceType<typeof Lenis>;

const LenisContext = createContext<LenisInstance | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
    });

    setLenis(instance);

    let rafId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}

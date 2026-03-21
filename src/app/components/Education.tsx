import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import Shuffle from "./Shuffle";

export function Education() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start progress a bit early so animation begins before section hits top
    offset: ["start 30%", "end 70%"],
  });

  const smoothed = useSpring(scrollYProgress, { stiffness: 85, damping: 24, mass: 1 });

  const rotateY = useTransform(smoothed, [0, 0.5, 1], [180, 0, -180]);
  const rotateX = useTransform(smoothed, [0, 0.25, 0.5, 0.75, 1], [2, -1, 0, -1, 2]);
  const rotateZ = useTransform(smoothed, [0, 0.25, 0.75, 1], [90, 0, 0, 90]);
  const scale = useTransform(smoothed, [0, 0.4, 0.6, 1], [0.92, 1, 1, 0.92]);
  const shimmerX = useTransform(rotateY, [180, 0, -180], [85, 50, 15]);

  return (
    <section
      ref={containerRef}
      className="relative bg-transparent"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="relative z-10 pt-12 md:pt-16 px-6 md:px-12 lg:px-20 shrink-0">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.04], [0, 1]),
              y: useTransform(scrollYProgress, [0, 0.04], [30, 0]),
            }}
          >
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk] block mb-3">
              05 / Education
            </span>
            <Shuffle
              text="Academic Background"
              textAlign="left"
              className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight block"
            />
          </motion.div>
        </div>

        <div
          className="flex-1 flex items-center justify-center px-6"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className="relative"
            style={{
              width: "570px",
              height: "388px",
              rotateY,
              rotateX,
              rotateZ,
              scale,
              opacity: 1,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="absolute -inset-16 rounded-[60px] blur-[60px] pointer-events-none"
              style={{
                opacity: useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [0, 0.7, 0.7, 0]),
                background: "radial-gradient(ellipse at 50% 40%, rgba(0,200,255,0.18), rgba(100,50,255,0.08) 50%, transparent 70%)",
              }}
            />

            <div
              className="absolute inset-0 rounded-2xl border border-white/10 bg-[#080f19] shadow-[0_4px_80px_rgba(0,200,255,0.06)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(1px)",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,_rgba(0,200,255,0.06)_0%,_transparent_60%)]" />
            </div>

            <div
              className="absolute inset-0 rounded-2xl border border-white/10 bg-[#080f19] shadow-[0_4px_80px_rgba(0,200,255,0.06)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(1px)",
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(2px)",
                opacity: useTransform(rotateY, [180, 90, 0, -90, -180], [0, 0, 1, 0, 0]),
              }}
            >
              <svg className="absolute right-[-8%] top-[-12%] w-[65%] h-[125%] opacity-[0.08]" viewBox="0 0 400 400" fill="none">
                {[60, 100, 140, 180, 220, 260].map((r) => (
                  <circle key={r} cx="200" cy="200" r={r} stroke="rgba(0,200,255,0.7)" strokeWidth="0.7" />
                ))}
              </svg>

              <div className="absolute inset-0 rounded-2xl border border-cyan-400/10" />

              <div className="relative z-10 flex flex-col justify-between h-full p-7 md:p-9">
                <div>
                  <h3 className="text-white text-sm md:text-lg tracking-[0.25em] uppercase font-[Space_Grotesk] font-medium">
                    Bachelor of Technology
                  </h3>
                  <p className="text-cyan-400/60 text-[11px] md:text-sm tracking-[0.15em] uppercase font-[Space_Grotesk] mt-1.5">
                    Computer Science & Engineering
                  </p>
                  <p className="text-white/70 text-xs tracking-[0.15em] uppercase font-[Space_Grotesk] mt-3">
                    Parul Institute of Engineering & Technology, Parul University
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/90 text-sm md:text-[16px] tracking-[0.2em] uppercase font-[Space_Grotesk] font-medium">
                      Vadodara, Gujarat
                    </p>
                    <p className="text-white/50 text-[12px] tracking-[0.2em] uppercase font-[Space_Grotesk] mt-1">
                      July 2022 – Present
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-300/40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                      </svg>
                    </div>
                    <span className="text-white/50 text-[11px] tracking-[0.15em] uppercase font-[Space_Grotesk]">
                      CGPA 8.34
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: useTransform(shimmerX, (x) =>
                    `linear-gradient(105deg, transparent ${x - 12}%, rgba(0,200,255,0.06) ${x - 4}%, rgba(168,85,247,0.04) ${x}%, rgba(0,200,255,0.06) ${x + 4}%, transparent ${x + 12}%)`
                  ),
                }}
              />
            </motion.div>

            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(2px)",
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center p-4"
                style={{ transform: "rotateZ(90deg) scale(1.5)" }}
              >
                <img
                  src="/ace_of_spades.svg"
                  alt="Ace of Spades"
                  className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,200,255,0.3)]"
                  style={{ filter: "invert(1) sepia(0.5) saturate(8) hue-rotate(170deg)", opacity: 0.55 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

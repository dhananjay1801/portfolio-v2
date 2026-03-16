import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Education() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]);
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [3, -1, 0, -1, 3]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1, 1, 0.92]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const frontOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);
  const backOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [1, 0, 0, 1]);

  const shimmerX = useTransform(rotateY, [45, 0, -45], [85, 50, 15]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,200,255,0.04)_0%,_transparent_60%)]" />

        {/* Header */}
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
            <h2 className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight">
              Academic Background
            </h2>
          </motion.div>
        </div>

        {/* Card */}
        <div
          className="flex-1 flex items-center justify-center px-6"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            className="relative w-full max-w-[620px]"
            style={{
              aspectRatio: "1.6 / 1",
              rotateY,
              rotateX,
              scale,
              opacity: cardOpacity,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Ambient glow */}
            <motion.div
              className="absolute -inset-16 rounded-[60px] blur-[60px] pointer-events-none"
              style={{
                opacity: useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [0, 0.7, 0.7, 0]),
                background: "radial-gradient(ellipse at 50% 40%, rgba(0,200,255,0.18), rgba(100,50,255,0.08) 50%, transparent 70%)",
              }}
            />

            {/* Card base (always visible when card is) */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[#080f19] shadow-[0_4px_80px_rgba(0,200,255,0.06)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,_rgba(0,200,255,0.06)_0%,_transparent_60%)]" />
            </div>

            {/* FRONT FACE */}
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{ opacity: frontOpacity }}
            >
              <svg className="absolute right-[-8%] top-[-12%] w-[65%] h-[125%] opacity-[0.08]" viewBox="0 0 400 400" fill="none">
                {[60, 100, 140, 180, 220, 260].map((r) => (
                  <circle key={r} cx="200" cy="200" r={r} stroke="rgba(0,200,255,0.7)" strokeWidth="0.7" />
                ))}
              </svg>

              <div className="absolute inset-0 rounded-2xl border border-cyan-400/10" />

              <div className="relative z-10 flex flex-col justify-between h-full p-7 md:p-9">
                <div>
                  <h3 className="text-white text-sm md:text-base tracking-[0.25em] uppercase font-[Space_Grotesk] font-medium">
                    Bachelor of Science
                  </h3>
                  <p className="text-cyan-400/60 text-[11px] md:text-xs tracking-[0.15em] uppercase font-[Space_Grotesk] mt-1.5">
                    Software Engineering
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/90 text-sm md:text-[15px] tracking-[0.2em] uppercase font-[Space_Grotesk] font-medium">
                      Your Name
                    </p>
                    <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-[Space_Grotesk] mt-1">
                      2013 – 2017
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-full border border-cyan-400/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-300/40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                      </svg>
                    </div>
                    <span className="text-white/30 text-[8px] tracking-[0.15em] uppercase font-[Space_Grotesk]">
                      GPA 3.8
                    </span>
                  </div>
                </div>
              </div>

              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: useTransform(shimmerX, (x) =>
                    `linear-gradient(105deg, transparent ${x - 12}%, rgba(0,200,255,0.06) ${x - 4}%, rgba(168,85,247,0.04) ${x}%, rgba(0,200,255,0.06) ${x + 4}%, transparent ${x + 12}%)`
                  ),
                }}
              />
            </motion.div>

            {/* BACK FACE */}
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{ opacity: backOpacity }}
            >
              <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] opacity-[0.07]" viewBox="0 0 400 400" fill="none">
                {[40, 70, 100, 130, 160, 190, 220, 260].map((r) => (
                  <circle key={r} cx="200" cy="200" r={r} stroke="rgba(0,200,255,0.5)" strokeWidth="0.6" />
                ))}
              </svg>

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-7 md:p-9 text-center">
                <div className="w-16 h-16 rounded-full border border-cyan-400/15 flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-cyan-300/25" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                  </svg>
                </div>

                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-[Space_Grotesk] mb-2">
                  University Name
                </p>
                <p className="text-white/20 text-[9px] tracking-[0.2em] uppercase font-[Space_Grotesk]">
                  School of Engineering
                </p>

                <div className="absolute bottom-[28%] left-0 right-0 h-8 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <span className="text-white/15 text-[8px] tracking-[0.25em] uppercase font-[Space_Grotesk]">
                    Student ID · XXXX-XXXX-2017
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

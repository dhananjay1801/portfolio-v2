import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { Award } from "lucide-react";

const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-SA-2024",
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2023",
    credentialId: "GCP-DEV-2023",
  },
  {
    name: "Meta Front-End Developer Professional",
    issuer: "Meta",
    date: "2023",
    credentialId: "META-FE-2023",
  },
  {
    name: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2022",
    credentialId: "MONGO-DEV-2022",
  },
  {
    name: "Kubernetes Application Developer",
    issuer: "Cloud Native Computing Foundation",
    date: "2022",
    credentialId: "CKAD-2022",
  },
  {
    name: "Certified Scrum Master",
    issuer: "Scrum Alliance",
    date: "2021",
    credentialId: "CSM-2021",
  },
];

// Group certs into pairs
const certPairs = certifications.reduce<(typeof certifications)[]>((acc, cert, i) => {
  if (i % 2 === 0) acc.push([cert]);
  else acc[acc.length - 1].push(cert);
  return acc;
}, []);

export function Certifications() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activePair, setActivePair] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const pair = Math.min(
      Math.floor(v * (certPairs.length + 0.5)),
      certPairs.length - 1
    );
    setActivePair(Math.max(0, pair));
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${(certPairs.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(100,50,255,0.04)_0%,_transparent_60%)]" />

        {/* Header */}
        <div className="relative z-10 pt-16 md:pt-20 px-6 md:px-12 lg:px-20">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.06], [0, 1]),
              y: useTransform(scrollYProgress, [0, 0.06], [40, 0]),
            }}
          >
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk] block mb-4">
              06 / Certifications
            </span>
            <h2 className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight">
              Credentials
            </h2>
          </motion.div>
        </div>

        {/* Pair indicator */}
        <div className="absolute top-20 right-6 md:right-12 lg:right-20 z-10 flex gap-2">
          {certPairs.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === activePair ? "#00c8ff" : "rgba(255,255,255,0.1)",
                boxShadow: i === activePair ? "0 0 12px rgba(0,200,255,0.4)" : "none",
              }}
            />
          ))}
        </div>

        {/* Card pairs */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-4xl px-6">
            {certPairs.map((pair, pairIdx) => {
              const isActive = pairIdx === activePair;
              const isPast = pairIdx < activePair;
              const isFuture = pairIdx > activePair;

              return (
                <motion.div
                  key={pairIdx}
                  className="absolute inset-x-0 px-6 flex gap-6 justify-center"
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : isFuture ? 0.85 : 1.05,
                    y: isActive ? 0 : isFuture ? 40 : -40,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ pointerEvents: isActive ? "auto" : "none" }}
                >
                  {pair.map((cert, cardIdx) => (
                    <motion.div
                      key={cert.credentialId}
                      className="w-full max-w-[360px]"
                      animate={{
                        x: isPast ? (cardIdx === 0 ? -200 : 200) : 0,
                        opacity: isPast ? 0 : isActive ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                        delay: isActive ? cardIdx * 0.1 : 0,
                      }}
                    >
                      <div className="group p-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm hover:border-cyan-500/20 transition-all duration-500">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                            <Award className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base text-white/85 font-[Space_Grotesk] tracking-tight leading-snug">
                              {cert.name}
                            </h3>
                            <p className="text-cyan-400/50 text-sm font-[Inter] mt-1">
                              {cert.issuer}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-white/20 font-[Space_Grotesk] tracking-wider uppercase pt-3 border-t border-white/[0.05]">
                          <span>{cert.date}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400/40">
                            {cert.credentialId}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

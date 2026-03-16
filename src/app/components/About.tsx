import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ProfileCard from "./ProfileCard";

const words = [
  "I'm", "a", "passionate", "developer", "with", "a", "keen", "eye", "for", "design",
  "and", "a", "love", "for", "building", "innovative", "web", "applications.",
  "With", "years", "of", "experience", "in", "full-stack", "development,",
  "I", "specialize", "in", "creating", "seamless", "user", "experiences",
  "and", "robust", "backend", "systems.", "My", "journey", "in", "tech",
  "started", "with", "curiosity", "and", "has", "evolved", "into", "a", "career",
  "focused", "on", "continuous", "learning", "and", "pushing", "the", "boundaries",
  "of", "what's", "possible", "on", "the", "web.",
];

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative min-h-[200vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* BG glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,200,255,0.05)_0%,_transparent_60%)]" />

        {/* Particle dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400/15"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            className="mb-16"
            style={{
              opacity: useTransform(scrollYProgress, [0.05, 0.15], [0, 1]),
              y: useTransform(scrollYProgress, [0.05, 0.15], [40, 0]),
            }}
          >
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk]">
              01 / About
            </span>
          </motion.div>

          <div className="flex items-start gap-12 lg:gap-20">
            <div className="flex-1 min-w-0">
              <p className="text-[clamp(1.25rem,3vw,2.5rem)] leading-[1.4] font-[Inter] tracking-tight">
                {words.map((word, i) => {
                  const start = 0.1 + (i / words.length) * 0.5;
                  const end = start + 0.03;
                  return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                      {word}
                    </Word>
                  );
                })}
              </p>
            </div>

            <motion.div
              className="hidden lg:flex flex-shrink-0 items-start"
              style={{
                opacity: useTransform(scrollYProgress, [0.15, 0.3], [0, 1]),
                y: useTransform(scrollYProgress, [0.15, 0.3], [40, 0]),
              }}
            >
              <ProfileCard
                name="Dhananjay Tailor"
                title="Software/DevOps Engineer"
                handle="javicodes"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/profile.jpg"
                showUserInfo={false}
                enableTilt
                enableMobileTilt={false}
                onContactClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                behindGlowColor="rgba(125, 190, 255, 0.67)"
                iconUrl="/assets/demo/iconpattern.svg"
                behindGlowEnabled
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              />
            </motion.div>
          </div>

          <motion.div
            className="mt-16 flex gap-12 md:gap-20"
            style={{
              opacity: useTransform(scrollYProgress, [0.55, 0.7], [0, 1]),
              y: useTransform(scrollYProgress, [0.55, 0.7], [30, 0]),
            }}
          >
            <Stat number="5+" label="Years Experience" />
            <Stat number="50+" label="Projects Built" />
            <Stat number="20+" label="Happy Clients" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.9)"]
  );

  return (
    <motion.span className="inline-block mr-[0.3em]" style={{ opacity, color }}>
      {children}
    </motion.span>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl text-white/90 font-[Space_Grotesk] tracking-tight">
        {number}
      </div>
      <div className="text-cyan-400/40 text-xs tracking-[0.2em] uppercase mt-1 font-[Space_Grotesk]">
        {label}
      </div>
    </div>
  );
}

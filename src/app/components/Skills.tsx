import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import Particles from "../../components/Particles";

const skillGroups = [
  {
    name: "Core",
    color: "#00c8ff",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Operating Systems",
    ],
  },
  {
    name: "Languages",
    color: "#a855f7",
    skills: ["C", "Java", "Python", "JavaScript"],
  },
  {
    name: "Frontend & Backend",
    color: "#22d3ee",
    skills: [
      "NodeJS",
      "ExpressJS",
      "ReactJS",
      "NextJS",
      "REST API",
      "Tailwind CSS",
      "FastAPI",
    ],
  },
  {
    name: "Tools & Platforms",
    color: "#f472b6",
    skills: ["Git", "GitHub", "Docker", "Google Colab", "AWS", "Postman", "Jenkins"],
  },
  {
    name: "Databases",
    color: "#fbbf24",
    skills: ["MySQL", "MongoDB", "PostgreSQL"],
  },
];

const TOTAL = skillGroups.length;
const BASE_LABEL_SPREAD_DEG = 30;
const EXIT_LABEL_SPREAD_DEG = 92;
const COLLECT_PHASE = 0.85;
const COLLECT_END_PHASE = 1.0;

const ARC_R = 520;
const ARC_CX = 600;
const ARC_CY = 850;

const toRad = (deg: number) => (deg * Math.PI) / 180;

function ArcDot({
  angleDeg,
  isActive,
}: {
  angleDeg: number;
  isActive: boolean;
}) {
  const springAngle = useSpring(angleDeg, { stiffness: 120, damping: 20 });
  const cx = useTransform(springAngle, (a) => ARC_CX + ARC_R * Math.cos(toRad(a)));
  const cy = useTransform(springAngle, (a) => ARC_CY + ARC_R * Math.sin(toRad(a)));

  useEffect(() => {
    springAngle.set(angleDeg);
  }, [angleDeg, springAngle]);

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      animate={{
        r: isActive ? 5 : 3.5,
        opacity: isActive ? 1 : 0.35,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      fill={isActive ? "#ffffff" : "rgba(255,255,255,0.5)"}
      filter={isActive ? "url(#labelGlow)" : undefined}
    />
  );
}

function ArcLabel({
  angleDeg,
  isActive,
  name,
}: {
  angleDeg: number;
  isActive: boolean;
  name: string;
}) {
  const outset = isActive ? 30 : 22;
  const r = ARC_R + outset;
  const springAngle = useSpring(angleDeg, { stiffness: 120, damping: 20 });
  const x = useTransform(springAngle, (a) => ARC_CX + r * Math.cos(toRad(a)));
  const y = useTransform(springAngle, (a) => ARC_CY + r * Math.sin(toRad(a)));

  useEffect(() => {
    springAngle.set(angleDeg);
  }, [angleDeg, springAngle]);

  return (
    <motion.text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="Space Grotesk, sans-serif"
      letterSpacing="0.12em"
      animate={{
        opacity: isActive ? 1 : 0.15,
        fontSize: isActive ? 26 : 15,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      fill={isActive ? "#ffffff" : "rgba(255,255,255,0.3)"}
      filter={isActive ? "url(#labelGlow)" : undefined}
      style={{ textTransform: "uppercase" }}
    >
      {name}
    </motion.text>
  );
}

function CollectSkill({
  label,
  color,
  groupIdx,
  skillIdx,
  totalInGroup,
  scrollYProgress,
}: {
  label: string;
  color: string;
  groupIdx: number;
  skillIdx: number;
  totalInGroup: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const perGroup = 1 / TOTAL;
  const gStart = groupIdx * perGroup;

  const appearPhase = 0.65;
  const collectPhase = 0.85;
  const skillAppearStart = (skillIdx / totalInGroup) * appearPhase;
  const skillAppearEnd = skillAppearStart + 0.08;

  const opacity = useTransform(scrollYProgress, (p) => {
    const local = Math.max(0, Math.min(1, (p - gStart) / perGroup));
    if (local < skillAppearStart) return 0;
    if (local < skillAppearEnd) return (local - skillAppearStart) / 0.08;
    if (local < collectPhase) return 1;
    return Math.max(0, 1 - (local - collectPhase) / 0.15);
  });

  const y = useTransform(scrollYProgress, (p) => {
    const local = Math.max(0, Math.min(1, (p - gStart) / perGroup));
    if (local < skillAppearStart) return 24;
    if (local < skillAppearEnd) return 24 - ((local - skillAppearStart) / 0.08) * 24;
    return 0;
  });

  const scale = useTransform(scrollYProgress, (p) => {
    const local = Math.max(0, Math.min(1, (p - gStart) / perGroup));
    if (local < collectPhase) return 1;
    const t = (local - collectPhase) / 0.15;
    return 1 - t * 0.6;
  });

  const z = useTransform(scrollYProgress, (p) => {
    const local = Math.max(0, Math.min(1, (p - gStart) / perGroup));
    if (local < collectPhase) return 0;
    const t = (local - collectPhase) / 0.15;
    return t * 800;
  });

  const blur = useTransform(scrollYProgress, (p) => {
    const local = Math.max(0, Math.min(1, (p - gStart) / perGroup));
    if (local < collectPhase) return 0;
    const t = (local - collectPhase) / 0.15;
    return t * 6;
  });

  return (
    <motion.div
      className="flex items-center justify-center whitespace-nowrap select-none"
      style={{
        opacity,
        y,
        scale,
        z,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        willChange: "opacity, transform, filter",
      }}
    >
      <span
        className="text-xl md:text-2xl lg:text-3xl font-light font-[Space_Grotesk] tracking-wide"
        style={{ color }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [labelSpreadDeg, setLabelSpreadDeg] = useState(BASE_LABEL_SPREAD_DEG);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.floor(v * TOTAL)));
    setActiveIdx(idx);
  });

  // Exit animation for the arc + labels: increase spread ("gap") and fade/slide out near the end.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const perGroup = 1 / TOTAL;
    const lastGroupStart = (TOTAL - 1) * perGroup;
    const exitStart = lastGroupStart + perGroup * COLLECT_PHASE;
    const exitEnd = lastGroupStart + perGroup * COLLECT_END_PHASE;
    if (v <= exitStart) {
      setLabelSpreadDeg(BASE_LABEL_SPREAD_DEG);
      return;
    }
    const t = Math.min(1, Math.max(0, (v - exitStart) / (exitEnd - exitStart)));
    setLabelSpreadDeg(BASE_LABEL_SPREAD_DEG + t * (EXIT_LABEL_SPREAD_DEG - BASE_LABEL_SPREAD_DEG));
  });

  const perGroup = 1 / TOTAL;
  const lastGroupStart = (TOTAL - 1) * perGroup;
  const arcExitStart = lastGroupStart + perGroup * COLLECT_PHASE;
  const arcExitEnd = lastGroupStart + perGroup * COLLECT_END_PHASE;
  const arcOpacity = useTransform(scrollYProgress, [arcExitStart, arcExitEnd], [1, 0]);
  const arcY = useTransform(scrollYProgress, [arcExitStart, arcExitEnd], [0, 70]);
  const arcBlur = useTransform(scrollYProgress, [arcExitStart, arcExitEnd], [0, 10]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen overflow-clip">
        <div className="relative h-screen w-screen flex flex-col">
          {/* Particles background (100vw x 100vh) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Particles
              particleColors={["#ffffff"]}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover
              alphaParticles={false}
              disableRotation={false}
              pixelRatio={1}
              className="w-full h-full"
            />
          </div>

          {/* Header */}
          <div className="relative z-10 pt-20 md:pt-24 px-6 md:px-12 lg:px-20">
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.06], [0, 1]),
                y: useTransform(scrollYProgress, [0, 0.06], [40, 0]),
              }}
            >
              <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk] block mb-4">
                02 / Skills
              </span>
              <h2 className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight">
                Skill Orbit
              </h2>
            </motion.div>
          </div>

        {/* Skills appear one by one, collect together, then zoom away together */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center overflow-clip pb-[25vh] px-6"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          {skillGroups.map((group, gi) => (
            <div
              key={group.name}
              className="absolute inset-0 flex items-center justify-center px-6"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex flex-wrap gap-4 md:gap-6 justify-center max-w-4xl">
                {group.skills.map((label, si) => (
                  <CollectSkill
                    key={`${group.name}-${label}`}
                    label={label}
                    color={group.color}
                    groupIdx={gi}
                    skillIdx={si}
                    totalInGroup={group.skills.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

          {/* Semicircle arc + labels at bottom (exit with "gap" spread) */}
          <motion.div
            className="absolute inset-x-0 bottom-0 w-full pointer-events-none z-20"
            style={{
              opacity: arcOpacity,
              y: arcY,
              filter: useTransform(arcBlur, (v) => `blur(${v}px)`),
            }}
          >
            <svg
              className="w-full"
              viewBox="0 0 1200 500"
              preserveAspectRatio="xMidYMax meet"
              style={{ height: "55vh" }}
            >
              {/* Arc line */}
              <circle
                cx={ARC_CX}
                cy={ARC_CY}
                r={ARC_R}
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.5"
              />

              <defs>
                <filter id="labelGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Group dots + labels along the arc */}
              {skillGroups.map((group, i) => {
                const angleDeg = -90 + (i - activeIdx) * labelSpreadDeg;
                const isActive = i === activeIdx;

                return (
                  <g key={group.name}>
                    <ArcDot angleDeg={angleDeg} isActive={isActive} />
                    <ArcLabel angleDeg={angleDeg} isActive={isActive} name={group.name} />
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

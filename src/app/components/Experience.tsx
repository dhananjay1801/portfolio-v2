import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState, useMemo } from "react";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Corp Inc.",
    period: "2023 – Present",
    summary: "Leading cloud-based SaaS development, mentoring teams, and architecting scalable systems.",
    highlights: [
      "Increased application performance by 40%",
      "Led a team of 5 developers",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions LLC",
    period: "2021 – 2023",
    summary: "Developed and maintained web applications for various clients using modern JS frameworks.",
    highlights: [
      "Built 15+ client projects from scratch",
      "Reduced bug reports by 35% through improved testing",
      "Introduced TypeScript to the tech stack",
    ],
  },
  {
    title: "Frontend Developer",
    company: "StartUp Ventures",
    period: "2019 – 2021",
    summary: "Created responsive and interactive user interfaces focusing on UX and performance.",
    highlights: [
      "Achieved 95+ Lighthouse scores on all projects",
      "Implemented design system used across 10+ projects",
      "Reduced page load time by 50%",
    ],
  },
  {
    title: "Junior Developer",
    company: "Code Academy Labs",
    period: "2018 – 2019",
    summary: "Started career building features for learning platform products and internal tools.",
    highlights: [
      "Developed 8 interactive learning modules",
      "Improved test coverage from 40% to 85%",
    ],
  },
];

const svgWidth = 800;
const svgHeight = 700;

function generateSpiralPoints(): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const cx = svgWidth / 2;
  const startY = 60;
  const totalHeight = svgHeight - 120;
  const resolution = experiences.length * 80;

  for (let i = 0; i <= resolution; i++) {
    const t = i / resolution;
    const y = startY + t * totalHeight;
    const amplitude = 160 + t * 80;
    const frequency = Math.PI * 2 * 1.5;
    const x = cx + Math.sin(t * frequency) * amplitude;
    points.push({ x, y });
  }
  return points;
}

function spiralPathD(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}`;
  }
  return d;
}

function findExtremes(
  points: { x: number; y: number }[],
  count: number
): { point: { x: number; y: number }; side: "left" | "right"; t: number }[] {
  const cx = svgWidth / 2;
  const peaks: { point: { x: number; y: number }; side: "left" | "right"; idx: number }[] = [];

  for (let i = 2; i < points.length - 2; i++) {
    const prev = points[i - 1].x - cx;
    const curr = points[i].x - cx;
    const next = points[i + 1].x - cx;
    if (curr > prev && curr > next && curr > 40) {
      peaks.push({ point: points[i], side: "right", idx: i });
    } else if (curr < prev && curr < next && curr < -40) {
      peaks.push({ point: points[i], side: "left", idx: i });
    }
  }

  const step = Math.max(1, Math.floor(peaks.length / count));
  const selected: typeof peaks = [];
  for (let i = 0; i < count && i * step < peaks.length; i++) {
    selected.push(peaks[i * step]);
  }
  while (selected.length < count && selected.length < peaks.length) {
    const next = peaks[selected.length];
    if (next) selected.push(next);
    else break;
  }

  return selected.map((p) => ({
    point: p.point,
    side: p.side,
    t: p.idx / (points.length - 1),
  }));
}

export function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const spiralPoints = useMemo(() => generateSpiralPoints(), []);
  const pathD = useMemo(() => spiralPathD(spiralPoints), [spiralPoints]);
  const nodePositions = useMemo(
    () => findExtremes(spiralPoints, experiences.length),
    [spiralPoints]
  );

  const drawProgress = useTransform(scrollYProgress, [0.05, 0.92], [0, 1]);

  const [activeIndex, setActiveIndex] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.floor(v * (experiences.length + 0.5)) - 1;
    setActiveIndex(Math.max(-1, Math.min(idx, experiences.length - 1)));
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${(experiences.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(0,200,255,0.04)_0%,_transparent_50%)]" />

        {/* Particle bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400/15"
              style={{
                left: `${10 + (i * 3.3) % 80}%`,
                top: `${5 + (i * 7.1) % 90}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.05, 0.2, 0.05],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: (i % 5) * 0.6,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative z-20 pt-16 md:pt-20 px-6 md:px-12 lg:px-20">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]),
              y: useTransform(scrollYProgress, [0, 0.08], [40, 0]),
            }}
          >
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk] block mb-4">
              03 / Experience
            </span>
            <h2 className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight">
              Career Spiral
            </h2>
          </motion.div>
        </div>

        {/* SVG spiral — centered */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[800px] h-auto max-h-[85vh]"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="spiralGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00c8ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#00c8ff" />
              </linearGradient>
              <filter id="spiralGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dim base path */}
            <path
              d={pathD}
              stroke="rgba(0, 200, 255, 0.06)"
              strokeWidth="2"
              fill="none"
            />

            {/* Drawn path with glow */}
            <motion.path
              d={pathD}
              stroke="url(#spiralGrad)"
              strokeWidth="2.5"
              fill="none"
              filter="url(#spiralGlow)"
              style={{ pathLength: drawProgress }}
              strokeLinecap="round"
            />

            {/* Nodes at the extremes */}
            {nodePositions.map(({ point }, i) => {
              const isActive = i === activeIndex;
              const isViewed = i <= activeIndex;
              return (
                <g key={i}>
                  {/* Glow ring */}
                  {isActive && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="18"
                      fill="none"
                      stroke="rgba(0,200,255,0.2)"
                      strokeWidth="1"
                    />
                  )}
                  {/* Outer glow */}
                  {isActive && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="10"
                      fill="rgba(0,200,255,0.15)"
                    />
                  )}
                  {/* Core */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isActive ? 6 : isViewed ? 5 : 3.5}
                    fill={
                      isActive
                        ? "#00c8ff"
                        : isViewed
                        ? "rgba(0,200,255,0.6)"
                        : "rgba(0,200,255,0.2)"
                    }
                    stroke={isActive ? "rgba(0,200,255,0.5)" : "none"}
                    strokeWidth="2"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Experience cards — z-10 above the spiral */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {experiences.map((exp, i) => {
            if (i >= nodePositions.length) return null;
            const { point, side } = nodePositions[i];
            const isActive = i === activeIndex;
            const cardSide = side === "right" ? "left" : "right";
            const topPct = (point.y / svgHeight) * 100;

            return (
              <motion.div
                key={i}
                className="absolute w-[280px] md:w-[320px] pointer-events-auto"
                style={{
                  top: `${topPct}%`,
                  transform: "translateY(-50%)",
                  ...(cardSide === "left"
                    ? { left: "clamp(16px, 3vw, 60px)" }
                    : { right: "clamp(16px, 3vw, 60px)" }),
                }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : cardSide === "left" ? -50 : 50,
                  scale: isActive ? 1 : 0.92,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="p-5 rounded-xl border border-cyan-500/20 bg-black/85 backdrop-blur-xl shadow-[0_0_40px_rgba(0,200,255,0.06)]">
                  <span className="text-cyan-400/60 text-xs tracking-[0.2em] uppercase font-[Space_Grotesk] block mb-1">
                    {exp.period}
                  </span>
                  <h3 className="text-lg text-white/90 font-[Space_Grotesk] tracking-tight mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-cyan-400/50 text-sm font-[Inter] mb-3">
                    {exp.company}
                  </p>
                  <p className="text-white/40 text-sm font-[Inter] leading-relaxed mb-3">
                    {exp.summary}
                  </p>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-white/30 text-xs font-[Inter] flex items-start gap-2"
                      >
                        <span className="w-1 h-1 bg-cyan-400/50 rounded-full mt-1.5 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

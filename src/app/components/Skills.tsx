import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";

const skillGroups = [
  {
    name: "Programming",
    color: "#00c8ff",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C++", "Go"],
  },
  {
    name: "Frameworks",
    color: "#a855f7",
    skills: ["React", "Next.js", "Node.js", "Django", "FastAPI", "Express"],
  },
  {
    name: "Tools",
    color: "#22d3ee",
    skills: ["Git", "Docker", "AWS", "Linux", "CI/CD", "PostgreSQL"],
  },
  {
    name: "AI / Data",
    color: "#f472b6",
    skills: ["PyTorch", "TensorFlow", "NLP", "Computer Vision", "MLOps", "Pandas"],
  },
];

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  label: string;
  group: number;
  radius: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function generateConstellation(
  w: number,
  h: number
): { nodes: Node[]; connections: [number, number][] } {
  const nodes: Node[] = [];
  const cx = w / 2;
  const cy = h / 2;
  const spread = Math.min(w, h) * 0.38;

  skillGroups.forEach((group, gi) => {
    const groupAngle = (gi / skillGroups.length) * Math.PI * 2 - Math.PI / 2;
    const groupCx = cx + Math.cos(groupAngle) * spread;
    const groupCy = cy + Math.sin(groupAngle) * spread;

    group.skills.forEach((skill, si) => {
      const angle = (si / group.skills.length) * Math.PI * 2 + gi * 0.5;
      const r = 70 + Math.random() * 60;
      const x = groupCx + Math.cos(angle) * r;
      const y = groupCy + Math.sin(angle) * r;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        label: skill,
        group: gi,
        radius: 4 + Math.random() * 3,
      });
    });
  });

  const connections: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].baseX - nodes[j].baseX;
      const dy = nodes[i].baseY - nodes[j].baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (nodes[i].group === nodes[j].group && dist < 200) {
        connections.push([i, j]);
      } else if (nodes[i].group !== nodes[j].group && dist < 250 && Math.random() < 0.12) {
        connections.push([i, j]);
      }
    }
  }

  return { nodes, connections };
}

function useConstellationCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  scrollProgress: { get: () => number }
) {
  const data = useRef<{ nodes: Node[]; connections: [number, number][] } | null>(null);
  const animId = useRef(0);
  const time = useRef(0);

  const init = useCallback((canvas: HTMLCanvasElement) => {
    data.current = generateConstellation(canvas.offsetWidth, canvas.offsetHeight);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(canvas);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const sp = scrollProgress.get();
      time.current += 0.004;
      ctx.clearRect(0, 0, w, h);

      if (!data.current) {
        animId.current = requestAnimationFrame(draw);
        return;
      }

      const { nodes, connections } = data.current;
      const rotAngle = time.current + sp * Math.PI * 0.8;
      const cx = w / 2;
      const cy = h / 2;

      for (const n of nodes) {
        const dx = n.baseX - cx;
        const dy = n.baseY - cy;
        const cos = Math.cos(rotAngle * 0.08);
        const sin = Math.sin(rotAngle * 0.08);
        n.x = cx + dx * cos - dy * sin;
        n.y = cy + dx * sin + dy * cos;
      }

      const activeGroup = Math.min(
        Math.floor(sp * skillGroups.length),
        skillGroups.length - 1
      );

      // Connections
      for (const [i, j] of connections) {
        const ni = nodes[i];
        const nj = nodes[j];
        const eitherActive = ni.group === activeGroup || nj.group === activeGroup;
        const bothActive = ni.group === activeGroup && nj.group === activeGroup;
        const alpha = bothActive ? 0.35 : eitherActive ? 0.15 : 0.05;
        const [r, g, b] = hexToRgb(skillGroups[ni.group].color);

        ctx.beginPath();
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = bothActive ? 1.5 : eitherActive ? 0.8 : 0.4;
        ctx.stroke();
      }

      // Nodes
      for (const n of nodes) {
        const isActive = n.group === activeGroup;
        const [r, g, b] = hexToRgb(skillGroups[n.group].color);
        const nodeRadius = isActive ? n.radius * 2 : n.radius;
        const alpha = isActive ? 1 : 0.3;

        // Outer glow for active nodes
        if (isActive) {
          const glowR = nodeRadius * 6;
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.25)`);
          grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.08)`);
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        // Ring around active
        if (isActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, nodeRadius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Labels
        if (isActive) {
          ctx.font = "600 13px Space Grotesk, system-ui";
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.x, n.y - nodeRadius - 12);
        }
      }

      // Group name at center of each active cluster
      if (activeGroup >= 0 && activeGroup < skillGroups.length) {
        const group = skillGroups[activeGroup];
        const groupNodes = nodes.filter((n) => n.group === activeGroup);
        if (groupNodes.length > 0) {
          const avgX = groupNodes.reduce((s, n) => s + n.x, 0) / groupNodes.length;
          const avgY = groupNodes.reduce((s, n) => s + n.y, 0) / groupNodes.length;
          const [r, g, b] = hexToRgb(group.color);
          ctx.font = "700 16px Space Grotesk, system-ui";
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
          ctx.textAlign = "center";
          ctx.fillText(group.name.toUpperCase(), avgX, avgY + 4);
        }
      }

      animId.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, scrollProgress, init]);
}

export function Skills() {
  const containerRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useConstellationCanvas(canvasRef, scrollYProgress);

  const [activeGroup, setActiveGroup] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveGroup(Math.min(Math.floor(v * skillGroups.length), skillGroups.length - 1));
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${skillGroups.length * 100 + 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,200,255,0.06)_0%,_transparent_60%)]" />

        {/* Canvas fills the viewport */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Header */}
        <div className="relative z-10 pt-20 md:pt-24 px-6 md:px-12 lg:px-20">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]),
              y: useTransform(scrollYProgress, [0, 0.08], [40, 0]),
            }}
          >
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk] block mb-4">
              02 / Skills
            </span>
            <h2 className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight">
              Skill Constellation
            </h2>
          </motion.div>
        </div>

        {/* Active group legend */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-6 md:gap-10">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.name}
              className="flex flex-col items-center gap-2"
              animate={{
                opacity: activeGroup === i ? 1 : 0.3,
                scale: activeGroup === i ? 1.15 : 0.9,
              }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-3 h-3 rounded-full transition-shadow duration-300"
                style={{
                  backgroundColor: group.color,
                  boxShadow: activeGroup === i ? `0 0 20px ${group.color}90` : "none",
                }}
              />
              <span
                className="text-[10px] md:text-xs tracking-[0.15em] uppercase font-[Space_Grotesk] whitespace-nowrap"
                style={{ color: activeGroup === i ? group.color : "rgba(255,255,255,0.25)" }}
              >
                {group.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

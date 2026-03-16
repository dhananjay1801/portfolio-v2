import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function useNeuralCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  scrollProgress: { get: () => number }
) {
  const particles = useRef<Particle[]>([]);
  const animId = useRef(0);

  const init = useCallback((canvas: HTMLCanvasElement) => {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 120);
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      init(canvas);
    };
    resize();
    window.addEventListener("resize", resize);

    const connectionDistance = 140;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const sp = scrollProgress.get();
      ctx.clearRect(0, 0, w, h);

      // Draw grid that tilts with scroll
      ctx.save();
      const tilt = sp * 12;
      ctx.translate(w / 2, h / 2);
      ctx.transform(1, 0, Math.sin(tilt * Math.PI / 180) * 0.15, 1, 0, 0);
      ctx.translate(-w / 2, -h / 2);

      const gridSize = 60;
      ctx.strokeStyle = `rgba(0, 200, 255, ${0.04 - sp * 0.03})`;
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();

      // Update and draw particles
      const pts = particles.current;
      for (const p of pts) {
        p.x += p.vx + sp * 0.5;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${p.opacity})`;
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `rgba(0, 200, 255, ${p.opacity * 0.3})`);
        grad.addColorStop(1, "rgba(0, 200, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fill();
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

export function Hero() {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useNeuralCanvas(canvasRef, scrollYProgress);

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleTopY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const titleBottomY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const titleTopX = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const titleBottomX = useTransform(scrollYProgress, [0, 0.5], [0, 40]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Neural network canvas */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>

        {/* Radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,200,255,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(100,50,255,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,150,255,0.06)_0%,_transparent_50%)]" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6"
          style={{ scale: containerScale, opacity: containerOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6"
          >
            <motion.span
              className="text-cyan-400/60 text-sm tracking-[0.3em] uppercase font-[Space_Grotesk]"
              style={{ opacity: subtitleOpacity }}
            >
              Welcome to my world
            </motion.span>
          </motion.div>

          {/* Title that splits on scroll */}
          <div className="overflow-visible mb-8">
            <motion.div
              style={{ y: titleTopY, x: titleTopX }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="block text-[clamp(3rem,10vw,8rem)] text-white tracking-tight leading-[0.9] font-[Space_Grotesk]">
                Your
              </span>
            </motion.div>
            <motion.div
              style={{ y: titleBottomY, x: titleBottomX }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <span className="block text-[clamp(3rem,10vw,8rem)] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight leading-[0.9] font-[Space_Grotesk]">
                Name
              </span>
            </motion.div>
          </div>

          <motion.p
            className="text-white/50 text-lg md:text-xl max-w-xl mx-auto font-[Inter] tracking-wide mb-4"
            style={{ opacity: subtitleOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            AI Engineer · Backend Developer · Problem Solver
          </motion.p>

          <motion.p
            className="text-white/30 text-sm max-w-md mx-auto font-[Inter] mb-10"
            style={{ opacity: subtitleOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Crafting elegant solutions to complex problems with modern technologies
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            style={{ opacity: subtitleOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a
              href="#projects"
              className="group/btn relative px-7 py-2.5 rounded-full text-sm font-[Space_Grotesk] tracking-wider uppercase overflow-hidden isolate transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.15),inset_0_0_40px_rgba(0,200,255,0.05)]"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border border-cyan-400/25 group-hover/btn:border-cyan-400/50 transition-all duration-500" />
              <span className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.12),transparent_70%)]" />
              <span className="relative z-10 text-cyan-300 group-hover/btn:text-white transition-colors duration-300">View Projects</span>
            </a>
            <a
              href="#about"
              className="group/btn relative px-7 py-2.5 rounded-full text-sm font-[Space_Grotesk] tracking-wider uppercase overflow-hidden isolate transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
            >
              <span className="absolute inset-0 rounded-full border border-white/[0.08] group-hover/btn:border-white/20 bg-white/[0.02] group-hover/btn:bg-white/[0.05] backdrop-blur-sm transition-all duration-500" />
              <span className="relative z-10 text-white/40 group-hover/btn:text-white/80 transition-colors duration-300">Scroll to Explore</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{ opacity: hintOpacity }}
        >
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-[Space_Grotesk]">
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-cyan-400/60 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

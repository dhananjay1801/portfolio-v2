import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Antigravity from "./Antigravity";
import { HeroNameRope } from "./HeroNameRope";
import Magnet from "./Magnet";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Antigravity particle background */}
        <motion.div className="absolute inset-x-0 -top-[300px] bottom-0 h-[calc(100%+300px)]" style={{ y: bgY }}>
          <Antigravity
            count={500}
            magnetRadius={6}
            ringRadius={5}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={0.5}
            lerpSpeed={0.05}
            color="#5227FF"
            autoAnimate
            particleVariance={1}
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={5}
            particleShape="capsule"
            fieldStrength={15}
          />
        </motion.div>

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
              Welcome to my Galaxy
            </motion.span>
          </motion.div>

          {/* Title with GSAP animations */}
          <div className="overflow-visible mb-8 flex justify-center">
            <HeroNameRope />
          </div>

          <motion.p
            className="text-white/50 text-lg md:text-xl max-w-xl mx-auto font-[Inter] tracking-wide mb-4"
            style={{ opacity: subtitleOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Software Engineer · DevOps Engineer · Problem Solver
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
            <Magnet padding={50} magnetStrength={3} maxOffset={6}>
              <a
                href="#projects"
                className="group/btn relative px-7 py-2.5 rounded-full text-sm font-[Space_Grotesk] tracking-wider uppercase overflow-hidden isolate transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.15),inset_0_0_40px_rgba(0,200,255,0.05)]"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border border-cyan-400/25 group-hover/btn:border-cyan-400/50 transition-all duration-500" />
                <span className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.12),transparent_70%)]" />
                <span className="relative z-10 text-cyan-300 group-hover/btn:text-white transition-colors duration-300">View Projects</span>
              </a>
            </Magnet>
            <Magnet padding={50} magnetStrength={3} maxOffset={6}>
              <a
                href="#contact"
                className="group/btn relative px-7 py-2.5 rounded-full text-sm font-[Space_Grotesk] tracking-wider uppercase overflow-hidden isolate transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
              >
                <span className="absolute inset-0 rounded-full border border-white/[0.08] group-hover/btn:border-white/20 bg-white/[0.02] group-hover/btn:bg-white/[0.05] backdrop-blur-sm transition-all duration-500" />
                <span className="relative z-10 text-white/40 group-hover/btn:text-white/80 transition-colors duration-300">Contact</span>
              </a>
            </Magnet>
          </motion.div>

          <motion.p
            className="text-white/25 text-xs tracking-[0.2em] uppercase font-[Space_Grotesk] mt-6"
            style={{ opacity: subtitleOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>

        
      </div>
    </section>
  );
}

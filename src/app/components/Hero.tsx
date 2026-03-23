import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AceternityLogo, HoverBorderGradient } from "@/components/ui/hover-border-gradient";
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
            count={600}
            magnetRadius={6}
            ringRadius={5}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={0.5}
            lerpSpeed={0.05}
            color="rgb(82, 39, 255)"
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
          className="relative z-10 w-full max-w-7xl px-6"
          style={{ scale: containerScale, opacity: containerOpacity }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 w-full">
            {/* Name on left */}
            <div className="lg:col-span-7 min-w-0 overflow-visible flex flex-col items-center lg:items-start text-center lg:text-left">
              <HeroNameRope />
            </div>

            {/* Everything else on right */}
            <div className="lg:col-span-5 min-w-0 flex flex-col items-center lg:items-end text-center lg:text-right">
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

              <motion.p
                className="text-white/50 text-base md:text-xl max-w-none font-[Inter] tracking-wide mb-4 lg:whitespace-nowrap"
                style={{ opacity: subtitleOpacity }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Software Engineer · DevOps Engineer · Problem Solver
              </motion.p>

              <motion.p
                className="text-white/30 text-xs sm:text-sm max-w-none font-[Inter] mb-8 md:mb-10 lg:whitespace-nowrap"
                style={{ opacity: subtitleOpacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Crafting elegant solutions to complex problems with modern technologies.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-end"
                style={{ opacity: subtitleOpacity }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Magnet padding={50} magnetStrength={3} maxOffset={6}>
                  <HoverBorderGradient
                    as="a"
                    href="#projects"
                    containerClassName="rounded-full"
                    className="h-11 sm:h-12 px-5 sm:px-7 text-xs sm:text-sm font-medium font-[Space_Grotesk] tracking-[0.18em] uppercase flex items-center space-x-2"
                  >
                    <AceternityLogo />
                    <span>View Projects</span>
                  </HoverBorderGradient>
                </Magnet>
                <Magnet padding={50} magnetStrength={3} maxOffset={6}>
                  <HoverBorderGradient
                    as="a"
                    href="#contact"
                    containerClassName="rounded-full"
                    className="h-11 sm:h-12 px-5 sm:px-7 text-xs sm:text-sm font-medium font-[Space_Grotesk] tracking-[0.18em] uppercase flex items-center space-x-2"
                  >
                    <AceternityLogo />
                    <span>Contact</span>
                  </HoverBorderGradient>
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
            </div>
          </div>
        </motion.div>

        
      </div>
    </section>
  );
}

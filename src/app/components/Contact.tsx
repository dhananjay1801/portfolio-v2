import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Github, Linkedin, Twitter, Code, Mail, Download, ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/yourusername",
    label: "github.com/yourusername",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/yourusername",
    label: "linkedin.com/in/yourusername",
  },
  {
    name: "X",
    icon: Twitter,
    url: "https://x.com/yourusername",
    label: "x.com/yourusername",
  },
  {
    name: "LeetCode",
    icon: Code,
    url: "https://leetcode.com/yourusername",
    label: "leetcode.com/yourusername",
  },
];

export function Contact() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* BG effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,200,255,0.08)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,50,255,0.06)_0%,_transparent_50%)]" />

        {/* Particle accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div style={{ scale: titleScale, opacity: titleOpacity }}>
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk] block mb-8">
              08 / Contact
            </span>

            <h2 className="text-5xl md:text-7xl lg:text-8xl text-white/90 font-[Space_Grotesk] tracking-tight mb-6">
              Let's work
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                together
              </span>
            </h2>
          </motion.div>

          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
              y: useTransform(scrollYProgress, [0.3, 0.5], [30, 0]),
            }}
          >
            <a
              href="mailto:your.email@example.com"
              className="group relative inline-flex items-center gap-3 px-6 py-3 mb-12 rounded-full overflow-hidden isolate transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,200,255,0.06)]"
            >
              <span className="absolute inset-0 rounded-full border border-white/[0.04] bg-white/[0.015] group-hover:border-cyan-400/15 group-hover:bg-cyan-500/[0.03] backdrop-blur-sm transition-all duration-500" />
              <Mail className="relative z-10 w-5 h-5 text-white/40 group-hover:text-cyan-400 transition-colors duration-300" />
              <span className="relative z-10 text-lg md:text-xl font-[Inter] text-white/40 group-hover:text-white/80 transition-colors duration-300">
                your.email@example.com
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-white/0 group-hover:text-cyan-400 -translate-y-1 group-hover:translate-y-0 translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex flex-col items-center gap-4 mt-8"
            style={{
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
            }}
          >
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full overflow-hidden isolate transition-all duration-500 hover:shadow-[0_0_24px_rgba(0,200,255,0.08)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  <span className="absolute inset-0 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm group-hover:border-cyan-400/25 group-hover:bg-cyan-500/[0.04] transition-all duration-500" />
                  <link.icon className="relative z-10 w-4 h-4 text-white/35 group-hover:text-cyan-400/80 transition-colors duration-300" />
                  <span className="relative z-10 text-white/35 text-sm font-[Inter] group-hover:text-white/80 transition-colors duration-300">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Resume download */}
            <motion.a
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center gap-2.5 mt-6 px-7 py-3 rounded-full overflow-hidden isolate transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.12),inset_0_0_30px_rgba(0,200,255,0.04)]"
              whileHover={{ scale: 1.02 }}
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-cyan-500/15 to-cyan-500/10 border border-cyan-400/20 group-hover:border-cyan-400/40 group-hover:from-cyan-500/15 group-hover:via-cyan-500/20 group-hover:to-cyan-500/15 backdrop-blur-sm transition-all duration-500" />
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.1),transparent_70%)]" />
              <Download className="relative z-10 w-4 h-4 text-cyan-400/50 group-hover:text-cyan-300 transition-colors duration-300" />
              <span className="relative z-10 text-cyan-400/50 text-sm font-[Space_Grotesk] tracking-wide group-hover:text-cyan-300 transition-colors duration-300">
                Download Resume
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="absolute bottom-8 text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]),
          }}
        >
          <p className="text-white/15 text-xs font-[Space_Grotesk] tracking-[0.2em] uppercase">
            &copy; 2026 Your Name. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Mail, Download, ArrowUpRight } from "lucide-react";
import { AceternityLogo, HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Magnet from "./Magnet";
import { ContactTitleRope } from "./ContactTitleRope";

function GitHubLogo(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={props.className}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInLogo(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={props.className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XLogo(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={props.className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LeetCodeLogo(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={props.className}
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "GitHub",
    icon: GitHubLogo,
    url: "https://github.com/dhananjay1801/",
    label: "github.com/yourusername",
  },
  {
    name: "LinkedIn",
    icon: LinkedInLogo,
    url: "https://www.linkedin.com/in/dhananjaytailor/",
    label: "linkedin.com/in/yourusername",
  },
  {
    name: "X",
    icon: XLogo,
    url: "https://x.com/dhananjay_1801",
    label: "x.com/yourusername",
  },
  {
    name: "LeetCode",
    icon: LeetCodeLogo,
    url: "https://leetcode.com/dhananjay1801",
    label: "leetcode.com/yourusername",
  },
];

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-transparent">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-visible">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,200,255,0.08)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(100,50,255,0.06)_0%,_transparent_50%)]" />

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
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]),
            }}
          >
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk] block mb-8">
              08 / Contact
            </span>
            <div className="flex justify-center">
              <ContactTitleRope containerRef={containerRef} />
            </div>
          </motion.div>

          <motion.div
            className="mt-3 md:mt-5"
            style={{
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
              y: useTransform(scrollYProgress, [0.4, 0.6], [30, 0]),
            }}
          >
            <Magnet padding={50} magnetStrength={3}>
              <HoverBorderGradient
                as="a"
                href="mailto:dhananjaytailor18@gmail.com"
                containerClassName="rounded-full mb-12 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,200,255,0.06)]"
                className="h-12 gap-2 px-6 text-sm font-medium flex items-center space-x-2"
              >
                <AceternityLogo />
                <Mail className="relative z-10 h-4 w-4 shrink-0 opacity-80" aria-hidden />
                <span className="relative z-10 whitespace-nowrap font-[Inter]">
                    dhananjaytailor18@gmail.com
                </span>
                <ArrowUpRight className="relative z-10 h-4 w-4 shrink-0 opacity-80" aria-hidden />
              </HoverBorderGradient>
            </Magnet>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4 mt-8"
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]),
            }}
          >
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {socialLinks.map((link, index) => (
                <Magnet key={link.name} padding={40} magnetStrength={4} maxOffset={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <HoverBorderGradient
                      as="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      containerClassName="rounded-full h-12 w-12 transition-all duration-500 hover:shadow-[0_0_24px_rgba(0,200,255,0.08)]"
                      className="flex h-12 w-12 items-center justify-center p-0 dark:bg-black bg-slate-950 text-white"
                    >
                      <link.icon className="relative z-10 h-5 w-5 shrink-0 text-white/70" />
                    </HoverBorderGradient>
                  </motion.div>
                </Magnet>
              ))}
            </div>

            <Magnet padding={50} magnetStrength={3}>
              <HoverBorderGradient
                as="a"
                href="Dhananjay's Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                containerClassName="rounded-full mt-6 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.12),inset_0_0_30px_rgba(0,200,255,0.04)]"
                className="h-12 gap-2 px-7 text-sm font-medium flex items-center space-x-2 font-[Space_Grotesk] tracking-wide"
              >
                <AceternityLogo />
                <Download className="relative z-10 h-4 w-4 shrink-0 opacity-80" aria-hidden />
                <span className="relative z-10">Resume</span>
              </HoverBorderGradient>
            </Magnet>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]),
          }}
        >
          <p className="text-white/25 text-xs font-[Space_Grotesk] tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} Dhananjay Tailor. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
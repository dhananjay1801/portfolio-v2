"use client";

import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { RefObject } from "react";

const row1 = ["Let's", "work"];
const row2 = ["together!"];

function AnimatedWord({
  word,
  index,
  scrollYProgress,
  className = "",
}: {
  word: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
}) {
  const start = 0.1 + index * 0.12;
  const end = start + 0.2;

  const y = useTransform(scrollYProgress, [start, end], ["-120%", "0%"]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.06], [0, 1]);

  return (
    <div className="overflow-hidden">
      <motion.span
        style={{ y, opacity, display: "inline-block" }}
        className={`text-6xl md:text-8xl font-bold font-[Space_Grotesk] leading-tight ${className}`}
      >
        {word}
      </motion.span>
    </div>
  );
}

export function ContactTitleRope({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <div className="flex flex-col items-center gap-y-0">
      <div className="flex flex-wrap justify-center gap-x-6">
        {row1.map((word, i) => (
          <AnimatedWord
            key={word}
            word={word}
            index={i}
            scrollYProgress={scrollYProgress}
            className="text-white"
          />
        ))}
      </div>

      <div className="flex justify-center -mt-2">
        {row2.map((word, i) => (
          <AnimatedWord
            key={word}
            word={word}
            index={row1.length + i}
            scrollYProgress={scrollYProgress}
            className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
          />
        ))}
      </div>
    </div>
  );
}
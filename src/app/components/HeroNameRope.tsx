import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type AnimationSnapshot = {
  filter?: string;
  opacity?: number;
  y?: number;
  scale?: number;
};

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  segmentClassName?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (value: number) => number;
  stepDuration?: number;
}

const buildKeyframes = (from: AnimationSnapshot, steps: AnimationSnapshot[]) => {
  const keys = new Set<keyof AnimationSnapshot>([
    ...(Object.keys(from) as Array<keyof AnimationSnapshot>),
    ...steps.flatMap((step) => Object.keys(step) as Array<keyof AnimationSnapshot>),
  ]);

  const keyframes: Partial<Record<keyof AnimationSnapshot, Array<string | number | undefined>>> =
    {};

  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])];
  });

  return keyframes;
};

const BlurText = ({
  text,
  delay = 80,
  className = "",
  segmentClassName = "",
  animateBy = "letters",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (value) => value,
  stepDuration = 0.35,
}: BlurTextProps) => {
  const segments = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo<AnimationSnapshot>(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50, scale: 0.96 }
        : { filter: "blur(10px)", opacity: 0, y: 50, scale: 0.96 },
    [direction]
  );

  const defaultTo = useMemo<AnimationSnapshot[]>(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
        scale: 1.01,
      },
      { filter: "blur(0px)", opacity: 1, y: 0, scale: 1 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  );

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from(
    { length: stepCount },
    (_, index) => (stepCount === 1 ? 0 : index / (stepCount - 1))
  );

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {segments.map((segment, index) => (
        <motion.span
          key={`${text}-${index}`}
          className={`inline-block will-change-[transform,filter,opacity] ${segmentClassName}`}
          initial={fromSnapshot}
          animate={inView ? animateKeyframes : fromSnapshot}
          transition={{
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: easing,
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < segments.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </p>
  );
};

export function HeroNameRope() {
  return (
    <div className="flex flex-col items-center overflow-visible">
      <BlurText
        text="Dhananjay"
        delay={65}
        animateBy="letters"
        direction="top"
        stepDuration={0.32}
        className="justify-center font-[Poppins] text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-[0.9] text-white"
      />
      <BlurText
        text="Tailor"
        delay={115}
        animateBy="letters"
        direction="top"
        stepDuration={0.45}
        animationFrom={{ filter: "blur(14px)", opacity: 0, y: 42, scale: 0.94 }}
        animationTo={[
          { filter: "blur(8px)", opacity: 0.45, y: -4, scale: 1.03 },
          { filter: "blur(0px)", opacity: 1, y: 0, scale: 1 },
        ]}
        easing={(value) => 1 - Math.pow(1 - value, 3)}
        className="justify-center font-[Poppins] text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-[0.9]"
        segmentClassName="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
      />
    </div>
  );
}

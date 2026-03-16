import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ROW1 = "Let's work".split("");
const ROW2 = "together".split("");

export function ContactTitleRope({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<(HTMLSpanElement | null)[]>([]);
  const row2Ref = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const letters1 = row1Ref.current.filter(Boolean) as HTMLSpanElement[];
    const letters2 = row2Ref.current.filter(Boolean) as HTMLSpanElement[];
    if (letters1.length === 0 && letters2.length === 0) return;

    const allLetters = [...letters1, ...letters2];

    const ctx = gsap.context(() => {
      allLetters.forEach((el, i) => {
        gsap.set(el, { opacity: 0, x: i % 2 === 0 ? -80 : 80, y: 30, scale: 0.5 });
      });

      const tl = gsap.timeline({ paused: true });
      ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        once: true,
        onEnter: () => tl.play(),
      });

      letters1.forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        tl.fromTo(
          el,
          { opacity: 0, x: fromLeft ? -80 : 80, y: 30, scale: 0.5 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          i * 0.035
        );
      });
      letters2.forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        tl.fromTo(
          el,
          { opacity: 0, x: fromLeft ? -80 : 80, y: 30, scale: 0.5 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          (letters1.length + i) * 0.035
        );
      });
    }, wrapper);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div ref={wrapperRef} className="flex flex-col items-center overflow-visible mb-6">
      <div className="flex flex-nowrap justify-center gap-0">
        {ROW1.map((char, i) => (
          <span
            key={`1-${i}`}
            ref={(el) => {
              row1Ref.current[i] = el;
            }}
            className="inline-block font-[Poppins] text-[clamp(1.75rem,5vw,6rem)] tracking-tight leading-[0.9] will-change-transform text-white"
            style={{ display: "inline-block", transformOrigin: "center center" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div className="flex flex-nowrap justify-center gap-0 overflow-visible min-h-[1.4em]">
        {ROW2.map((char, i) => (
          <span
            key={`2-${i}`}
            ref={(el) => {
              row2Ref.current[i] = el;
            }}
            className="inline-block font-[Poppins] text-[clamp(1.75rem,5vw,4rem)] tracking-tight leading-[1.4] will-change-transform bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
            style={{ display: "inline-block", transformOrigin: "center center" }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

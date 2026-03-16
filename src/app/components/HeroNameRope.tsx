import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const ROW1 = "Dhananjay".split("");
const ROW2 = "Tailor".split("");

export function HeroNameRope() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<(HTMLSpanElement | null)[]>([]);
  const row2Ref = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const letters1 = row1Ref.current.filter(Boolean) as HTMLSpanElement[];
    const letters2 = row2Ref.current.filter(Boolean) as HTMLSpanElement[];
    if (letters1.length === 0 && letters2.length === 0) return;

    const ctx = gsap.context(() => {
      // GSAP entrance: split from sides + elastic bounce
      letters1.forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          el,
          { opacity: 0, x: fromLeft ? -80 : 80, y: 30, scale: 0.5 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.5 + i * 0.035,
            ease: "elastic.out(1, 0.5)",
            overwrite: true,
          }
        );
      });
      letters2.forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          el,
          { opacity: 0, x: fromLeft ? -80 : 80, y: 30, scale: 0.5 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.5 + (letters1.length + i) * 0.035,
            ease: "elastic.out(1, 0.5)",
            overwrite: true,
          }
        );
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="flex flex-col items-center overflow-visible">
      <div className="flex flex-nowrap justify-center gap-0">
        {ROW1.map((char, i) => (
          <span
            key={`1-${i}`}
            ref={(el) => {
              row1Ref.current[i] = el;
            }}
            className="inline-block font-[Poppins] text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-[0.9] will-change-transform text-white"
            style={{ display: "inline-block", transformOrigin: "center center" }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="flex flex-nowrap justify-center gap-0">
        {ROW2.map((char, i) => (
          <span
            key={`2-${i}`}
            ref={(el) => {
              row2Ref.current[i] = el;
            }}
            className="inline-block font-[Poppins] text-[clamp(2.5rem,8vw,7rem)] tracking-tight leading-[0.9] will-change-transform bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
            style={{ display: "inline-block", transformOrigin: "center center" }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

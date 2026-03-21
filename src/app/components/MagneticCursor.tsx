"use client";

import { useEffect, useRef, useState } from "react";

const TEXT_SELECTOR =
  "p,span,h1,h2,h3,h4,h5,h6,a,button,label,li,strong,em,b,i,small,blockquote,cite";

export default function MagneticCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 }); 
  const target = useRef({ x: 0, y: 0 }); 
  const rafId = useRef<number | null>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);

    const render = () => {
      // 0.15 is the fluid delay. Lower = heavier, Higher = snappier.
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };
    rafId.current = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      if (!visibleRef.current) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        visibleRef.current = true;
        setIsVisible(true);
      }
      
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // Expand when hovering interactive OR text elements.
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const isInteractive = !!el?.closest("a, button, .hover-target");
      const textEl = el?.closest(TEXT_SELECTOR) as HTMLElement | null;
      const hasText = !!textEl?.innerText?.trim();
      setIsHovering(isInteractive || hasText);
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };
    const onMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
        willChange: "transform", // Keeps your scroll animations smooth
      }}
      aria-hidden="true"
    >
      <div
        // Changes size based on hover state
        className={`bg-white rounded-full ${
          isHovering ? "h-14 w-14 opacity-100" : "h-4 w-4 opacity-100"
        }`}
        style={{
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      />
    </div>
  );
}
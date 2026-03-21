"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { CardSpotlight } from "@/components/ui/card-spotlight";

import "./CircularGallery.css";

function lerp(start, end, ease) {
  return start + (end - start) * ease;
}

function mod(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function wrap(value, min, max) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function getArcTransform(x, viewportWidth, bend) {
  if (!bend) {
    return { y: 0, rotation: 0 };
  }

  const halfWidth = viewportWidth / 2;
  const bendAbs = Math.abs(bend);
  const radius = (halfWidth * halfWidth + bendAbs * bendAbs) / (2 * bendAbs);
  const effectiveX = Math.min(Math.abs(x), halfWidth);
  const arc = radius - Math.sqrt(Math.max(radius * radius - effectiveX * effectiveX, 0));

  if (bend > 0) {
    return {
      y: -arc,
      rotation: -Math.sign(x) * Math.asin(effectiveX / radius),
    };
  }

  return {
    y: arc,
    rotation: Math.sign(x) * Math.asin(effectiveX / radius),
  };
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mt-1 h-4 w-4 shrink-0 text-blue-500"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
}

function SpotlightCard({ item, width, height, textColor }) {
  return (
    <CardSpotlight
      className="flex h-full min-h-0 w-full flex-col rounded-[22px] border-neutral-800/90 bg-black p-4 md:p-5"
      style={{ width, height }}
      radius={360}
      color="#171717"
    >
      <h3
        className="relative z-20 shrink-0 text-xl font-bold tracking-tight md:text-[1.6rem] md:leading-[1.1] font-[Space_Grotesk] line-clamp-3"
        style={{ color: textColor }}
      >
        {item.title || item.name || item.text}
      </h3>

      <div className="relative z-20 mt-auto flex shrink-0 items-center justify-between gap-3 border-t border-white/[0.06] pt-3 md:pt-4">
        <span className="rounded-full border border-cyan-400/15 bg-cyan-500/[0.05] px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-cyan-200/70 font-[Space_Grotesk]">
          {item.footer || item.date || "Year"}
        </span>
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            onPointerDown={(event) => event.stopPropagation()}
            className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:border-cyan-400/30 hover:text-white"
          >
            View
          </a>
        ) : null}
      </div>
    </CardSpotlight>
  );
}

export default function CircularGallery({
  items,
  bend = 1,
  scrollSpeed = 2,
  scrollEase = 0.05,
  textColor = "#ffffff",
  borderRadius = 0.05,
}) {
  const containerRef = useRef(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startTarget: 0,
  });
  const scrollRef = useRef({
    current: 0,
    target: 0,
  });
  const animationRef = useRef(0);
  const [scrollValue, setScrollValue] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const galleryItems = useMemo(() => {
    const fallbackItems = [
      {
        eyebrow: "Credential",
        title: "Sample Spotlight Card",
        steps: ["Issued by Example Org", "Credential ID SAMPLE-001", "Recorded in 2024"],
        note: "This is a fallback spotlight card for the circular gallery.",
        tags: ["Sample", "2024"],
      },
    ];

    return items?.length ? items : fallbackItems;
  }, [items]);

  const renderedItems = useMemo(() => {
    return Array.from({ length: galleryItems.length * 3 }, (_, index) => ({
      ...galleryItems[index % galleryItems.length],
      __renderKey: `${galleryItems[index % galleryItems.length].title || index}-${index}`,
    }));
  }, [galleryItems]);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const node = containerRef.current;
    const observer = new ResizeObserver(() => {
      setDimensions({
        width: node.clientWidth,
        height: node.clientHeight,
      });
    });

    observer.observe(node);
    setDimensions({
      width: node.clientWidth,
      height: node.clientHeight,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      scrollRef.current.current = lerp(
        scrollRef.current.current,
        scrollRef.current.target,
        scrollEase,
      );
      setScrollValue(scrollRef.current.current);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    animationRef.current = frame;

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [scrollEase]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    function handleWheel(event) {
      event.preventDefault();
      scrollRef.current.target += event.deltaY * 0.002 * scrollSpeed;
    }

    function handlePointerDown(event) {
      dragState.current.isDragging = true;
      dragState.current.startX = event.clientX;
      dragState.current.startTarget = scrollRef.current.target;
      node.setPointerCapture?.(event.pointerId);
    }

    function handlePointerMove(event) {
      if (!dragState.current.isDragging) return;
      const deltaX = dragState.current.startX - event.clientX;
      scrollRef.current.target = dragState.current.startTarget + deltaX * 0.0045 * scrollSpeed;
    }

    function handlePointerUp(event) {
      dragState.current.isDragging = false;
      node.releasePointerCapture?.(event.pointerId);
    }

    node.addEventListener("wheel", handleWheel, { passive: false });
    node.addEventListener("pointerdown", handlePointerDown);
    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerup", handlePointerUp);
    node.addEventListener("pointercancel", handlePointerUp);
    node.addEventListener("pointerleave", handlePointerUp);

    return () => {
      node.removeEventListener("wheel", handleWheel);
      node.removeEventListener("pointerdown", handlePointerDown);
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerup", handlePointerUp);
      node.removeEventListener("pointercancel", handlePointerUp);
      node.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [scrollSpeed]);

  const cardWidth = Math.min(dimensions.width * 0.286, 308);
  const cardHeight = Math.min(dimensions.height * 0.682, 418) * 0.5 * 1.2;
  const gap = Math.min(dimensions.width * 0.02, 22);
  const step = cardWidth + gap;
  const loopWidth = step * galleryItems.length;
  const viewportWidth = dimensions.width || 1;
  const centerOffset = viewportWidth / 2 - cardWidth / 2;
  const baseOffset = mod(scrollValue * step, loopWidth);

  return (
    <div className="circular-gallery" ref={containerRef}>
      <div className="circular-gallery__track">
        {renderedItems.map((item, index) => {
          const normalizedX = index * step - baseOffset - loopWidth;
          const { y, rotation } = getArcTransform(normalizedX, viewportWidth, bend * 1.35);
          const distanceFromCenter = Math.abs(normalizedX) / (viewportWidth / 2 || 1);
          const opacity = distanceFromCenter > 1.25 ? 0 : 1;
          const t = Math.min(distanceFromCenter, 1.4) / 1.4;
          const scale = 1 - Math.pow(t, 1.6) * 0.35;
          const scaledWidth = cardWidth * scale;
          const scaledHeight = cardHeight * scale;

          return (
            <div
              key={item.__renderKey}
              className="circular-gallery__item"
              style={{
                width: `${scaledWidth}px`,
                height: `${scaledHeight}px`,
                transform: `translate3d(${
                  centerOffset + normalizedX - (scaledWidth - cardWidth) / 2
                }px, ${y * 0.82 - (scaledHeight - cardHeight) / 2}px, 0) rotate(${rotation}rad)`,
                opacity,
                zIndex: Math.round((1 - Math.min(distanceFromCenter, 1)) * 100),
              }}
            >
              <SpotlightCard item={item} width="100%" height="100%" textColor={textColor} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

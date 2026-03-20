"use client";

import { AceternityLogo, HoverBorderGradient } from "./hover-border-gradient";

/**
 * Aceternity-style demo for HoverBorderGradient.
 * Import `AceternityLogo` from the same module to avoid duplicating the SVG.
 */
export default function HoverBorderGradientDemo() {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <AceternityLogo />
        <span>Aceternity UI</span>
      </HoverBorderGradient>
    </div>
  );
}

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useCallback } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    const sectionEls = sections.map((s) => document.getElementById(s.id));
    const scrollY = window.scrollY + window.innerHeight / 3;
    for (let i = sectionEls.length - 1; i >= 0; i--) {
      const el = sectionEls[i];
      if (el && el.offsetTop <= scrollY) {
        setActiveSection(sections[i].id);
        break;
      }
    }
  });

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Top progress bar — neon cyan gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, #00c8ff, #a855f7, #00c8ff)",
        }}
      />

      {/* Side dot navigation */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            onMouseEnter={() => setHovered(section.id)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-3 group"
          >
            <motion.span
              className="text-xs tracking-wider uppercase text-white/60 font-[Space_Grotesk]"
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: hovered === section.id ? 1 : 0,
                x: hovered === section.id ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
            >
              {section.label}
            </motion.span>

            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                scale: activeSection === section.id ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-cyan-400 scale-100"
                    : "bg-white/20 scale-75 group-hover:bg-white/50"
                }`}
              />
              {activeSection === section.id && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-cyan-400/40"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ margin: "-3px" }}
                />
              )}
            </motion.div>
          </button>
        ))}
      </nav>

      {/* Mobile top nav */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 lg:hidden"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center justify-between px-5 py-3 bg-black/70 backdrop-blur-xl border-b border-white/5">
          <span className="text-white/90 text-sm tracking-widest uppercase font-[Space_Grotesk]">
            Portfolio
          </span>
          <div className="flex gap-1.5">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSection === s.id
                    ? "bg-cyan-400 w-4"
                    : "bg-white/20 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

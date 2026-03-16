import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const publications = [
  {
    title: "Modern Web Architecture: Patterns and Best Practices",
    journal: "Tech Journal of Software Engineering",
    date: "March 2024",
    authors: "Your Name, et al.",
    abstract:
      "An in-depth exploration of contemporary web architecture patterns, including microservices, serverless computing, and edge computing paradigms.",
    link: "#",
  },
  {
    title: "Optimizing React Performance in Large-Scale Applications",
    journal: "Frontend Development Quarterly",
    date: "December 2023",
    authors: "Your Name",
    abstract:
      "Comprehensive guide to performance optimization techniques in React applications, covering code splitting, lazy loading, and rendering optimization.",
    link: "#",
  },
  {
    title: "Building Accessible Web Applications: A Developer's Guide",
    journal: "Web Standards Magazine",
    date: "August 2023",
    authors: "Your Name, Co-Author Name",
    abstract:
      "Practical approaches to implementing WCAG 2.1 guidelines in modern web applications with real-world examples and testing strategies.",
    link: "#",
  },
  {
    title: "The Future of CSS: Container Queries and Beyond",
    journal: "CSS-Tricks Blog",
    date: "May 2023",
    authors: "Your Name",
    abstract:
      "Exploring upcoming CSS features and their impact on responsive web design, with particular focus on container queries and cascade layers.",
    link: "#",
  },
];

export function Publications() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,200,255,0.03)_0%,_transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="mb-20"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.12], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.12], [60, 0]),
          }}
        >
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk] block mb-4">
            07 / Publications
          </span>
          <h2 className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight">
            Writing & Research
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {publications.map((pub, index) => {
            const start = 0.08 + index * 0.1;
            const end = start + 0.12;
            return (
              <motion.a
                key={pub.title}
                href={pub.link}
                className="group block"
                style={{
                  opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
                  y: useTransform(scrollYProgress, [start, end], [40, 0]),
                }}
              >
                <div className="relative p-6 md:p-8 rounded-xl border border-white/5 bg-white/[0.01] hover:border-cyan-500/20 hover:bg-cyan-500/[0.02] transition-all duration-500">
                  <div className="absolute top-6 right-6 text-white/5 text-4xl font-[Space_Grotesk]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg md:text-xl text-white/80 font-[Space_Grotesk] tracking-tight group-hover:text-white transition-colors pr-12">
                          {pub.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 mb-3 text-xs font-[Space_Grotesk]">
                        <span className="text-cyan-400/50">{pub.journal}</span>
                        <span className="text-white/10">|</span>
                        <span className="text-white/25">{pub.date}</span>
                      </div>
                      <p className="text-white/30 text-sm font-[Inter] leading-relaxed line-clamp-2">
                        {pub.abstract}
                      </p>
                      <p className="text-white/20 text-xs font-[Inter] mt-3">
                        {pub.authors}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/10 group-hover:text-cyan-400/60 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

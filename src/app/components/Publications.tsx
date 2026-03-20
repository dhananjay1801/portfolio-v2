import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AceternityLogo, HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const publications = [
  {
    title: "A Comprehensive Study on Secure Shell: Remote Infused with AI/ML",
    journal: "IJSAT",
    date: "2025",
    authors: "Dhananjay Tailor",
    abstract:
      "Research on Secure Shell (SSH) enhanced with AI/ML approaches for remote systems.",
    preprintLink: "https://dhananjaytailor.in/Research_Paper.pdf",
    publishedLink: "https://www.ijsat.org/research-paper.php?id=8143",
  },
];

export function Publications() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative pt-4 pb-32 md:pt-8 md:pb-48 bg-black overflow-hidden">
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
              <motion.div
                key={pub.title}
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

                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl text-white/80 font-[Space_Grotesk] tracking-tight group-hover:text-white transition-colors pr-12 mb-2">
                        {pub.title}
                      </h3>
                      <div className="flex items-center gap-3 mb-3 text-xs font-[Space_Grotesk]">
                        <span className="text-cyan-400/50">{pub.journal}</span>
                        <span className="text-white/10">|</span>
                        <span className="text-white/25">{pub.date}</span>
                      </div>
                      <p className="text-white/30 text-sm font-[Inter] leading-relaxed">
                        {pub.abstract}
                      </p>
                      <p className="text-white/20 text-xs font-[Inter] mt-3">{pub.authors}</p>
                    </div>

                    <div className="flex flex-col gap-2 md:items-end shrink-0">
                      <HoverBorderGradient
                        as="a"
                        href={pub.preprintLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        containerClassName="rounded-full"
                        className="gap-2 px-4 py-1.5 text-xs font-[Space_Grotesk] uppercase tracking-[0.18em] flex items-center space-x-2 text-cyan-300"
                      >
                        <AceternityLogo className="text-cyan-300" />
                        <span>Preprint</span>
                      </HoverBorderGradient>
                      <HoverBorderGradient
                        as="a"
                        href={pub.publishedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        containerClassName="rounded-full"
                        className="gap-2 px-4 py-1.5 text-xs font-[Space_Grotesk] uppercase tracking-[0.18em] flex items-center space-x-2"
                      >
                        <AceternityLogo />
                        <span>Published</span>
                      </HoverBorderGradient>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

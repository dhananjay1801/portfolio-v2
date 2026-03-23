import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Shuffle from "./Shuffle";

const projects: {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live?: string;
}[] = [
  {
    title: "Nous",
    description:
      "AI-powered remote Windows command execution using RAG and LLM. Securely manage multiple systems via NLP.",
    tags: ["Python", "C#", "MySQL", "SSL/TLS", "RAG", "Gemini"],
    image:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1080&q=80&auto=format&fit=crop",
    github: "https://github.com/dhananjay1801/nous",
  },
  {
    title: "SkillGapAI",
    description:
      "AI-powered resume analysis that uses NLP to identify skill gaps and match candidates to job requirements.",
    tags: ["Python", "Streamlit", "NLP", "BERT", "Hugging Face"],
    image:
      "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
    github: "https://github.com/dhananjay1801/SkillGapAI-Analyzing-Resume-and-Job-Post-for-Skill-Gap",
    live: "https://dhananjay1801-skillgapai-analyzing-resume-and-job-p-home-ffmwhj.streamlit.app/",
  },
  {
    title: "Get Me A Chai",
    description:
      "A Patreon-style platform for creators to receive direct support through custom profiles and Razorpay payment integration.",
    tags: ["Next.js", "MongoDB", "NextAuth", "Razorpay", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1080&q=80&auto=format&fit=crop",
    github: "https://github.com/dhananjay1801/get-me-a-chai",
    live: "https://get-me-a-chai-git.vercel.app/",
  },
  {
    title: "Linkium",
    description:
      "A modern link-in-bio tool to organize and share all your important links through a single, custom URL.",
    tags: ["Next.js", "MongoDB", "JWT", "Tailwind", "Nodemailer"],
    image:
      "https://images.squarespace-cdn.com/content/v1/5c27c93f1aef1d60b29781f9/1c63ca52-79ec-4937-9a40-2ab01e554a2b/blog-social-media-080320.jpg?format=2500w",
    github: "https://github.com/dhananjay1801/linkium",
    live: "https://linkium.dhananjaytailor.in/",
  },
  {
    title: "YouTube Max Quality",
    description:
      "Chrome extension that auto-selects the highest YouTube quality and respects manual picks with a simple popup toggle.",
    tags: ["JavaScript", "Chrome API", "HTML", "CSS"],
    image:
      "https://wallpapers.com/images/featured/youtube-background-34ycn949dz42yg4c.webp",
    github: "https://github.com/dhananjay1801/youtube-max-quality",
  },
  {
    title: "Code Studio",
    description:
      "Judge0 powered multi-language Web IDE with real-time compilation, output terminal and syntax highlighting.",
    tags: ["React", "TypeScript", "Vite", "Judge0", "Tailwind"],
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/051/261/577/small/person-coding-on-a-laptop-with-vibrant-programming-code-on-the-screen-photo.jpeg",
    github: "https://github.com/dhananjay1801/code-studio",
    live: "https://code-studio-iota.vercel.app/",
  },
  {
    title: "BitLinks",
    description:
      "Registration-free URL shortener with custom short links and fast redirects.",
    tags: ["Next.js", "MongoDB", "Tailwind"],
    image:
      "https://d3gribjq2zt3oj.cloudfront.net/blog-hub/wp-content/uploads/2022/02/Shortlinks_blog_social-sharing_1200x630.png",
    github: "https://github.com/dhananjay1801/bit-links",
    live: "https://bitlinksurl.vercel.app/",
  },
  {
    title: "More on GitHub",
    description:
      "Explore more repositories, experiments, and open-source work. Find additional projects and ideas on my GitHub profile.",
    tags: ["Open Source", "Repositories", "GitHub"],
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1080&q=80&auto=format&fit=crop",
    github: "https://github.com/dhananjay1801",
  },
];

// Card width as a fraction of viewport width (matches lg:w-[40vw], capped at 600px)
// Gap between cards in vw units (gap-8 = 2rem ≈ 2vw on 1024px screen, use 2.5 as safe avg)
// Total scroll distance = (n-1) cards * (cardWidth + gap)
// We express the x transform in %, where 100% = full track width
// Simplest: express end position in vw so it's viewport-relative and matches card sizes exactly

const CARD_WIDTH_VW = 34; // slightly smaller card width for a tighter layout
const GAP_VW = 2.25;      // matches the reduced visual gap
const PADDING_LEFT_VW = 5; // lg:pl-20 ≈ 5vw

// How many vw units we need to scroll to bring the last card into view
// Each step scrolls one card+gap width
const totalScrollVW = (projects.length - 1) * (CARD_WIDTH_VW + GAP_VW);

// Section height: 100vh (to show first card) + scroll distance converted to vh
// Using 1:1 vw→vh mapping keeps it simple and correct
const SECTION_HEIGHT_VH = 100 + totalScrollVW;

export function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Move track left by totalScrollVW worth of vw. Express as vw string.
  // framer-motion supports `${n}vw` in useTransform output.
  // Start horizontal scroll a little later so the first card settles in place
  const x = useTransform(scrollYProgress, [0, 0.15, 1], ["0vw", "0vw", `-${totalScrollVW}vw`]);

  return (
    <section
      ref={containerRef}
      className="relative bg-transparent"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-x-hidden overflow-y-visible">
        {/* BG effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,200,255,0.04)_0%,_transparent_50%)]" />

        {/* Header */}
        <div className="relative z-10 pt-20 md:pt-24 pb-8 px-6 md:px-12 lg:px-20">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]),
              y: useTransform(scrollYProgress, [0, 0.05], [30, 0]),
            }}
          >
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-[Space_Grotesk] block mb-4">
              04 / Projects
            </span>
            <div className="flex items-baseline gap-6">
              <Shuffle
                text="Selected work"
                textAlign="left"
                className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight block"
              />
              <span className="text-white/20 text-sm font-[Space_Grotesk]">
                ({projects.length})
              </span>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scroll track */}
        <div className="flex-1 flex items-center overflow-x-hidden overflow-y-visible py-6 md:py-8">
          <motion.div
            className="-translate-y-2 md:-translate-y-3 flex gap-6 md:gap-7 pl-6 md:pl-12 lg:pl-20 pr-[24vw]"
            style={{ x }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Scroll progress bar */}
        <div className="px-6 md:px-12 lg:px-20 pb-8">
          <div className="h-[1px] bg-white/10 max-w-md">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400/60 to-purple-500/40"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      className="group relative flex-shrink-0 w-[60vw] md:w-[40vw] lg:w-[28vw] max-w-[440px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-white/5 border border-white/[0.06]">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Overlay links */}
        <div className="absolute bottom-4 right-4 flex gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/85 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/35 hover:bg-black/70 hover:text-white hover:shadow-[0_0_20px_rgba(0,200,255,0.12)]"
            aria-label="View on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/85 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/35 hover:bg-black/70 hover:text-white hover:shadow-[0_0_20px_rgba(0,200,255,0.12)]"
              aria-label="Open live site"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <div className="absolute top-4 left-4 text-white/15 text-6xl font-[Space_Grotesk] leading-none">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <h3 className="text-xl md:text-2xl text-white/85 font-[Space_Grotesk] tracking-tight mb-2 group-hover:text-white transition-colors">
        {project.title}
      </h3>
      <p className="text-white/35 text-sm font-[Inter] leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-[10px] text-cyan-400/45 border border-cyan-400/[0.08] rounded-full uppercase tracking-wider font-[Space_Grotesk] bg-cyan-500/[0.03] backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

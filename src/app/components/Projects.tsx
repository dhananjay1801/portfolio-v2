import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1762330463863-a6a399beb5ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGFya3xlbnwxfHx8fDE3NzI4OTg3ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team workspaces, and advanced filtering capabilities.",
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1770734360042-676ef707d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudCUyMGRhc2hib2FyZCUyMGRhcmslMjBtb2RlfGVufDF8fHx8MTc3Mjg5ODc4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    github: "#",
    live: "#",
  },
  {
    title: "AI Chat Interface",
    description:
      "Modern chat interface for AI assistants with streaming responses, conversation history, and customizable themes.",
    tags: ["React", "Python", "OpenAI", "WebSocket"],
    image:
      "https://images.unsplash.com/photo-1762340277380-04c2c30d0ef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY2hhdCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzI4OTg3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    github: "#",
    live: "#",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Real-time analytics dashboard with interactive charts, custom reports, and data visualization tools.",
    tags: ["Vue.js", "D3.js", "Express", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwY2hhcnRzfGVufDF8fHx8MTc3Mjg2MDE0NXww&ixlib=rb-4.1.0&q=80&w=1080",
    github: "#",
    live: "#",
  },
  {
    title: "Social Media App",
    description:
      "Social networking platform with posts, comments, likes, real-time notifications, and user profiles.",
    tags: ["React Native", "GraphQL", "AWS", "DynamoDB"],
    image:
      "https://images.unsplash.com/photo-1710870509663-16f20f75d758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1vYmlsZSUyMGFwcCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzI4OTg3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Builder",
    description:
      "Drag-and-drop portfolio builder allowing users to create stunning portfolios without coding.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1648134859211-4a1b57575f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwYnVpbGRlciUyMGRlc2lnbnxlbnwxfHx8fDE3NzI4OTg3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    github: "#",
    live: "#",
  },
  {
    title: "More on GitHub",
    description:
      "Want to see more? Explore the rest of my work, experiments, and open-source projects on GitHub.",
    tags: ["Open Source", "Repositories", "More Projects"],
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXRodWIlMjBkYXJrJTIwY29kZXxlbnwxfHx8fDE3NzI4OTg3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    github: "https://github.com/yourusername",
    live: "https://github.com/yourusername",
  },
];

export function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(projects.length - 1) * 50}%`]
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${projects.length * 80}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight">
                Selected work
              </h2>
              <span className="text-white/20 text-sm font-[Space_Grotesk]">
                ({projects.length})
              </span>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scroll */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8 pl-6 md:pl-12 lg:pl-20 pr-[30vw]"
            style={{ x }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Scroll progress */}
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
      className="group relative flex-shrink-0 w-[75vw] md:w-[50vw] lg:w-[40vw] max-w-[600px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-white/5 border border-white/[0.06]">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Overlay links */}
        <div className="absolute bottom-4 right-4 flex gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
          <a
            href={project.github}
            className="relative p-2.5 rounded-full overflow-hidden isolate transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,200,255,0.15)]"
          >
            <span className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300" />
            <Github className="relative z-10 w-4 h-4 text-white/80" />
          </a>
          <a
            href={project.live}
            className="relative p-2.5 rounded-full overflow-hidden isolate transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,200,255,0.15)]"
          >
            <span className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300" />
            <ExternalLink className="relative z-10 w-4 h-4 text-white/80" />
          </a>
        </div>

        <div className="absolute top-4 left-4 text-white/8 text-6xl font-[Space_Grotesk] leading-none">
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

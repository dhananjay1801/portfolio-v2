import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Publications } from "./components/Publications";
import { Contact } from "./components/Contact";
import MagneticCursor from "./components/MagneticCursor";
import { useEffect } from "react";
import Lenis from "lenis";
import Particles from "../components/Particles";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      // Keep defaults; just smooth wheel/touch scrolling
      smoothWheel: true,
      smoothTouch: false,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black text-white selection:bg-cyan-500/30 selection:text-white">
      <MagneticCursor />
      <Navigation />

      <div id="hero">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0">
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Particles
                particleColors={["#ffffff"]}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover
                particleHoverFactor={2.5}
                alphaParticles={false}
                disableRotation={false}
                pixelRatio={1}
                className="h-full w-full"
              />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,200,255,0.05)_0%,_transparent_45%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.12)_100%)]" />
          </div>
        </div>

        <div id="skills" className="relative z-10">
          <Skills />
        </div>

        <div id="experience" className="relative z-10">
          <Experience />
        </div>

        <div id="projects" className="relative z-10">
          <Projects />
        </div>

        <div id="education" className="relative z-10">
          <Education />
        </div>

        <div id="certifications" className="relative z-10">
          <Certifications />
        </div>

        <div id="publications" className="relative z-10">
          <Publications />
        </div>

        <div id="contact" className="relative z-10">
          <Contact />
        </div>
      </div>
    </div>
  );
}

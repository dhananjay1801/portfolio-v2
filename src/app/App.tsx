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
import SplashCursor from "./components/SplashCursor";

export default function App() {
  return (
    <div className="bg-black text-white selection:bg-cyan-500/30 selection:text-white">
      <SplashCursor />
      <Navigation />

      <div id="hero">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="experience">
        <Experience />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="education">
        <Education />
      </div>

      <div id="certifications">
        <Certifications />
      </div>

      <div id="publications">
        <Publications />
      </div>

      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

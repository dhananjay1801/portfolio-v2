import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import CircularGallery from "../../components/CircularGallery";
import Shuffle from "./Shuffle";

const certifications = [
  {
    name: "JPMorgan Chase & Co. Software Engineering Job Simulation",
    issuer: "Forage",
    date: "Forage",
    credentialId: "FORAGE-JPMC-SE",
    link: "https://drive.google.com/file/d/1-Dm_y9wYxmV-IZ_Dy8jSSiIvM-TEoyI0/view?usp=sharing",
  },
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "AWS",
    date: "AWS",
    credentialId: "AWS-CPE",
    link: "https://drive.google.com/file/d/1e5qQUEpDYsOSbH7yPIcnaA3RlE8kDDgk/view?usp=sharing",
  },
  {
    name: "Google - Ask Questions to Make Data-Driven Decisions",
    issuer: "Coursera",
    date: "Coursera",
    credentialId: "COURSERA-GOOGLE-ASK-QUESTIONS",
    link: "https://coursera.org/verify/APTX9JQP8RZU",
  },
  {
    name: "Google - Foundations - Data, Data, Everywhere",
    issuer: "Coursera",
    date: "Coursera",
    credentialId: "COURSERA-GOOGLE-DATA-EVERYWHERE",
    link: "https://coursera.org/verify/4JA7RR9G5Q33",
  },
  {
    name: "Computer Networks And Internet Protocol",
    issuer: "NPTEL",
    date: "NPTEL",
    credentialId: "NPTEL-CNIP",
    link: "https://drive.google.com/file/d/18AEONVrSkQKQ6iEg1Bwhz_SydQ9z57EW/view?usp=sharing",
  },
  {
    name: "AWS for Beginners",
    issuer: "Simplilearn",
    date: "Simplilearn",
    credentialId: "SIMPLILEARN-AWS-BEGINNERS",
    link: "https://simpli-web.app.link/e/KWep6968fYb",
  },
  {
    name: "Database and SQL",
    issuer: "Infosys Springboard",
    date: "Infosys Springboard",
    credentialId: "INFOSYS-DB-SQL",
    link: "https://drive.google.com/file/d/1VE-6lREnbw4htbLI27_BgRZHxu9WeISW/view?usp=sharing",
  },
  {
    name: "Impact Training Program",
    issuer: "Hitbullseye",
    date: "Hitbullseye",
    credentialId: "HITBULLSEYE-IMPACT",
    link: "https://drive.google.com/file/d/1UgJN61PWuqe5j3qIt6wXIlE2u3lDCG_4/view?usp=sharing",
  },
  {
    name: "Software Engineering and Agile software development",
    issuer: "Infosys Springboard",
    date: "Infosys Springboard",
    credentialId: "INFOSYS-SE-AGILE",
    link: "https://drive.google.com/file/d/1_IMHbnzEJBGo_XYwo498vSg8FfOozOTc/view?usp=sharing",
  },
];

const galleryItems = certifications.map((cert) => ({
  card: true,
  title: cert.name,
  footer: cert.issuer,
  link: cert.link,
}));

export function Certifications() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-transparent pt-28 pb-2 md:pt-36 md:pb-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(100,50,255,0.04)_0%,_transparent_60%)]" />

      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-20">
        <motion.div
          className="mb-6"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.12], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.12], [40, 0]),
          }}
        >
          <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-white/30 font-[Space_Grotesk]">
            06 / Certifications
          </span>
          <Shuffle
            text="Credentials Gallery"
            textAlign="left"
            className="text-4xl md:text-5xl text-white/90 font-[Space_Grotesk] tracking-tight block"
          />
        </motion.div>

        <motion.p
          className="mb-4 max-w-2xl text-sm leading-relaxed text-white/35 font-[Inter]"
          style={{
            opacity: useTransform(scrollYProgress, [0.04, 0.16], [0, 1]),
            y: useTransform(scrollYProgress, [0.04, 0.16], [24, 0]),
          }}
        >
          Click and drag with your mouse to pan through the gallery.
        </motion.p>

        <motion.div
          className="relative h-[520px] sm:h-[560px] md:h-[560px] -translate-y-3 sm:-translate-y-6 md:-translate-y-10"
          style={{
            opacity: useTransform(scrollYProgress, [0.08, 0.2], [0, 1]),
            y: useTransform(scrollYProgress, [0.08, 0.2], [8, 0]),
          }}
        >
          <CircularGallery
            items={galleryItems}
            bend={3}
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </motion.div>
      </div>
    </section>
  );
}

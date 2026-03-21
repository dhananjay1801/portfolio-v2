import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import CircularGallery from "../../components/CircularGallery";
import Shuffle from "./Shuffle";

const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-SA-2024",
    link: "https://aws.amazon.com/certification/",
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2023",
    credentialId: "GCP-DEV-2023",
    link: "https://cloud.google.com/learn/certification",
  },
  {
    name: "Meta Front-End Developer Professional",
    issuer: "Meta",
    date: "2023",
    credentialId: "META-FE-2023",
    link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
  },
  {
    name: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2022",
    credentialId: "MONGO-DEV-2022",
    link: "https://learn.mongodb.com/pages/mongodb-certification",
  },
  {
    name: "Kubernetes Application Developer",
    issuer: "Cloud Native Computing Foundation",
    date: "2022",
    credentialId: "CKAD-2022",
    link: "https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/",
  },
  {
    name: "Certified Scrum Master",
    issuer: "Scrum Alliance",
    date: "2021",
    credentialId: "CSM-2021",
    link: "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  },
];

const galleryItems = certifications.map((cert) => ({
  card: true,
  title: cert.name,
  footer: cert.date,
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

      <div className="relative z-10 px-6 md:px-12 lg:px-20">
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
          className="relative h-[420px] sm:h-[500px] md:h-[560px] -translate-y-6 md:-translate-y-10"
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

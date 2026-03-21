import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import Shuffle from "./Shuffle";

const experiences = [
  {
    title: "Administrative Staff",
    company: "Enbee Education Center Pvt. Ltd. · Vadodara, Gujarat",
    period: "February 2021 – June 2021",
    summary: "Supported operations and client services for international education workflows.",
    highlights: [
      "Assisted clients with college applications and visa documentation while maintaining records.",
      "Managed back-office operations and client coordination to ensure smooth operations.",
    ],
  },
  {
    title: "Python Developer Intern",
    company: "Infosys Springboard · Remote",
    period: "November 2025 – January 2026",
    summary: "Worked on NLP-driven hiring intelligence features and iterative product improvements with the team.",
    highlights: [
      "Developed SkillGapAI using BERT for NLP-based resume-JD gap analysis and recommendations.",
      "Collaborated in daily meetings on feature design, implementation, and system improvement.",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "Allianz Cloud · Vadodara, Gujarat",
    period: "January 2026 – Present",
    summary: "Building cybersecurity platform features with modern web and Python stacks in a collaborative team environment.",
    highlights: [
      "Developed web applications using NextJS, ReactJS, and Python for cybersecurity platforms.",
      "Collaborated in a team to build and deliver client-focused projects with API-driven integrations.",
    ],
  },
];

function buildCurve(): THREE.CatmullRomCurve3 {
  const resolution = experiences.length * 80;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= resolution; i++) {
    const t = i / resolution;
    const svgY = 60 + t * 580;
    const amplitude = 160 + t * 80;
    const svgX = 400 + Math.sin(t * Math.PI * 2 * 1.5) * amplitude;
    const x = (svgX - 400) / 100;
    const y = -(svgY - 350) / 100;
    const z = (t - 1) * 8;
    pts.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
}

function getNodeTs(curve: THREE.CatmullRomCurve3): number[] {
  const resolution = experiences.length * 80;
  const pts = curve.getPoints(resolution);
  const peaks: { idx: number }[] = [];
  for (let i = 2; i < pts.length - 2; i++) {
    const prev = pts[i - 1].x;
    const curr = pts[i].x;
    const next = pts[i + 1].x;
    if (
      (curr > prev && curr > next && curr > 0.4) ||
      (curr < prev && curr < next && curr < -0.4)
    ) {
      peaks.push({ idx: i });
    }
  }
  const count = experiences.length;
  const step = Math.max(1, Math.floor(peaks.length / count));
  const selected: number[] = [];
  for (let i = 0; i < count && i * step < peaks.length; i++) {
    selected.push(peaks[i * step].idx / resolution);
  }
  return selected;
}

const vertShader = `
  attribute float aTubeT;
  varying float vTubeT;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vTubeT   = aTubeT;
    vNormal  = normalize(normalMatrix * normal);
    vec4 mv  = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragShader = `
  uniform float uProgress;
  varying float vTubeT;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    if (vTubeT > uProgress + 0.0005) discard;
    float rel = vTubeT / max(uProgress, 0.001);
    vec3 col = vec3(0.92, 0.93, 0.95);
    vec3 viewDir = normalize(-vViewPos);
    float rim = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.0);
    float tailAlpha = pow(rel, 2.4);
    float alpha = tailAlpha * (0.55 + rim * 0.45);
    gl_FragColor = vec4(col + rim * 0.08, alpha);
  }
`;

function buildActiveTube(curve: THREE.CatmullRomCurve3, progress: number): THREE.Mesh | null {
  const SEGS = experiences.length * 80;
  const endSeg = Math.max(2, Math.floor(progress * SEGS));
  const allPts = curve.getPoints(SEGS);
  const slicePts = allPts.slice(0, endSeg + 1);
  if (slicePts.length < 2) return null;
  const subCurve = new THREE.CatmullRomCurve3(slicePts, false, "catmullrom", 0.5);
  const radSegs = 12;
  const geo = new THREE.TubeGeometry(subCurve, endSeg, 0.042, radSegs, false);
  const tubeT = new Float32Array(geo.attributes.position.count);
  const vertsPerRing = radSegs + 1;
  for (let ring = 0; ring <= endSeg; ring++) {
    const t = (ring / endSeg) * progress;
    for (let v = 0; v < vertsPerRing; v++) {
      tubeT[ring * vertsPerRing + v] = t;
    }
  }
  geo.setAttribute("aTubeT", new THREE.BufferAttribute(tubeT, 1));
  return new THREE.Mesh(
    geo,
    new THREE.ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: { uProgress: { value: progress } },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
}

const orbVertShader = `
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const orbFragShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  void main() {
    vec3 viewDir = normalize(-vViewPos);
    float rim = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 1.8);
    float core = max(dot(vNormal, viewDir), 0.0);
    vec3 col = uColor;
    float alpha = uOpacity * (0.5 + core * 0.35 + rim * 0.4);
    gl_FragColor = vec4(col + rim * col * 0.4, min(1.0, alpha));
  }
`;

function ThreeSpiral({ progress, activeIndex, nodeTs: _nodeTs }: { progress: number; activeIndex: number; nodeTs: number[] }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, -1);
    const curve = buildCurve();
    const nodeTs = getNodeTs(curve);
    const ORB_COLOR_INACTIVE = new THREE.Color(0xf59e0b);
    const ORB_COLOR_ACTIVE = new THREE.Color(0xfbbf24);
    const nodeMeshes = nodeTs.map((t) => {
      const p = curve.getPoint(t);
      const mat = new THREE.ShaderMaterial({
        vertexShader: orbVertShader,
        fragmentShader: orbFragShader,
        uniforms: { uColor: { value: ORB_COLOR_INACTIVE.clone() }, uOpacity: { value: 0.15 } },
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), mat);
      mesh.position.copy(p);
      scene.add(mesh);
      return mesh;
    });
    let animId = 0;
    const loop = () => { animId = requestAnimationFrame(loop); renderer.render(scene, camera); };
    loop();
    sceneRef.current = { renderer, scene, camera, curve, nodeTs, nodeMeshes, activeTube: null, ORB_COLOR_INACTIVE, ORB_COLOR_ACTIVE };
    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const s = sceneRef.current;
    if (!s) return;
    const { scene, curve, nodeTs, nodeMeshes, ORB_COLOR_INACTIVE, ORB_COLOR_ACTIVE } = s;
    if (s.activeTube) {
      scene.remove(s.activeTube);
      s.activeTube.geometry.dispose();
      s.activeTube.material.dispose();
      s.activeTube = null;
    }
    if (progress > 0.005) {
      const tube = buildActiveTube(curve, progress);
      if (tube) { scene.add(tube); s.activeTube = tube; }
    }
    nodeTs.forEach((t: number, i: number) => {
      const reached = progress >= t;
      const isActive = i === activeIndex && reached;
      const mat = nodeMeshes[i].material;
      const p = curve.getPoint(t);
      const depthScale = 1 - Math.abs(p.z) / 10;
      if (isActive) {
        mat.uniforms.uColor.value.copy(ORB_COLOR_ACTIVE);
        mat.uniforms.uOpacity.value = 1.0;
        nodeMeshes[i].scale.setScalar(depthScale * 1.8);
      } else if (reached) {
        mat.uniforms.uColor.value.copy(ORB_COLOR_INACTIVE);
        mat.uniforms.uOpacity.value = 0.85 * depthScale;
        nodeMeshes[i].scale.setScalar(depthScale * 1.1);
      } else {
        mat.uniforms.uColor.value.copy(ORB_COLOR_INACTIVE);
        mat.uniforms.uOpacity.value = 0.45 * depthScale;
        nodeMeshes[i].scale.setScalar(depthScale * 0.75);
      }
    });
  }, [progress, activeIndex]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

// Returns pixel positions of each orb projected to screen space
function projectNodePositionsPx() {
  if (typeof window === "undefined") return [];
  const W = window.innerWidth;
  const H = window.innerHeight;
  const curve = buildCurve();
  const nodeTs = getNodeTs(curve);
  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, -1);
  camera.updateMatrixWorld();
  return nodeTs.map((t) => {
    const wp = curve.getPoint(t);
    const ndc = wp.clone().project(camera);
    const xPx = ((ndc.x + 1) / 2) * W;
    const yPx = ((-ndc.y + 1) / 2) * H;
    const side: "left" | "right" = wp.x > 0 ? "right" : "left";
    return { xPx, yPx, side, t };
  });
}

function getNodeTsList() {
  return getNodeTs(buildCurve());
}

const CARD_W = 296;
const DOT_GAP = 22;
const CARD_OFFSET_UP = 175;

export function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const drawProgress = useTransform(scrollYProgress, [0.05, 0.92], [0, 1]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  const nodeScreenPos = useMemo(() => projectNodePositionsPx(), []);
  const nodeTs = useMemo(() => getNodeTsList(), []);

  useMotionValueEvent(drawProgress, "change", (v) => {
    setProgress(v);
    const WINDOW = 0.12;
    let active = -1;
    for (let i = nodeTs.length - 1; i >= 0; i--) {
      if (v >= nodeTs[i] && v <= nodeTs[i] + WINDOW) { active = i; break; }
    }
    setActiveIndex(active);
  });

  return (
    <section ref={containerRef} className="relative bg-transparent" style={{ height: `${(experiences.length + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.03)_0%,_transparent_60%)]" />

        <div className="relative z-20 pt-16 md:pt-20 px-6 md:px-12 lg:px-20">
          <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]), y: useTransform(scrollYProgress, [0, 0.08], [40, 0]) }}>
            <span className="text-white/25 text-xs tracking-[0.35em] uppercase font-mono block mb-4">03 / Experience</span>
            <Shuffle
              text="Career Path"
              textAlign="left"
              className="text-4xl md:text-5xl text-white/85 font-[Space_Grotesk] tracking-tight block"
            />
          </motion.div>
        </div>

        <ThreeSpiral progress={progress} activeIndex={activeIndex} nodeTs={nodeTs} />

        {/* Cards: positioned in px, anchored to dot. Dot is vertically centered on card via translateY(-50%). */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {experiences.map((exp, i) => {
            if (i >= nodeScreenPos.length) return null;
            const { xPx, yPx, side } = nodeScreenPos[i];
            const isActive = i === activeIndex;

            // Card placed directly beside the dot.
            // dot on right side of screen → card extends rightward from dot
            // dot on left side of screen  → card extends leftward from dot
            const leftPx = side === "right"
              ? xPx + DOT_GAP
              : xPx - DOT_GAP - CARD_W;

            return (
              <motion.div
                key={i}
                className="absolute pointer-events-auto"
                style={{
                  left: leftPx,
                  top: yPx - CARD_OFFSET_UP,
                  width: CARD_W,
                  transform: "translateY(-50%)",
                  perspective: 1200,
                }}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : side === "right" ? -24 : 24,
                  scale: isActive ? 1 : 0.92,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  mass: 0.8,
                }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/40 via-black/90 to-black/95 backdrop-blur-xl"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: isActive
                      ? "0 25px 50px -12px rgba(0,0,0,0.5), 0 12px 24px -8px rgba(0,0,0,0.3), 0 0 60px rgba(59,130,246,0.15), 0 0 120px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)"
                      : "0 10px 30px -10px rgba(0,0,0,0.5)",
                  }}
                  animate={{
                    borderColor: isActive ? "rgba(96,165,250,0.5)" : "rgba(59,130,246,0.2)",
                    rotateX: isActive ? 4 : 0,
                    rotateY: isActive ? (side === "right" ? -6 : 6) : 0,
                    z: isActive ? 24 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Accent bar - right for left-side cards, left for right-side cards */}
                  <motion.div
                    className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 origin-top ${
                      side === "left" ? "right-0 rounded-r-2xl" : "left-0 rounded-l-2xl"
                    }`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
                  />
                  <div className={`relative p-5 ${side === "left" ? "pr-6" : "pl-6"}`}>
                    <motion.span
                      className="text-blue-400/70 text-xs tracking-[0.25em] uppercase font-mono block mb-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                      transition={{ delay: 0.08, duration: 0.35 }}
                    >
                      {exp.period}
                    </motion.span>
                    <motion.h3
                      className="text-lg font-semibold text-white/95 font-[Space_Grotesk] mb-1.5 leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                      transition={{ delay: 0.12, duration: 0.35 }}
                    >
                      {exp.title}
                    </motion.h3>
                    <motion.p
                      className="text-blue-400/60 text-sm font-mono mb-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                      transition={{ delay: 0.16, duration: 0.35 }}
                    >
                      {exp.company}
                    </motion.p>
                    <motion.p
                      className="text-white/45 text-sm mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      {exp.summary}
                    </motion.p>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, hi) => (
                        <motion.li
                          key={h}
                          className="text-white/35 text-xs flex items-start gap-2.5"
                          initial={{ opacity: 0, x: -12 }}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : -12,
                          }}
                          transition={{ delay: 0.24 + hi * 0.06, duration: 0.35 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-1.5 flex-shrink-0" />
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

## Portfolio v2

A modern, section-based personal portfolio built with React + Vite, featuring smooth scrolling, animated UI, and interactive project/certification galleries.

## Tech Stack

- React (with Vite)
- Tailwind CSS
- Framer Motion (`motion/react`) for animations
- Lenis for smooth scrolling
- Three.js (`three` + `@react-three/fiber`-style usage) for the Experience “career path” visual
- Lucide icons
- Custom UI components (Radix/shadcn-style primitives)


## Key Files

- App shell: `src/app/App.tsx`
- Section navigation: `src/app/components/Navigation.tsx`
- Main sections:
  - `Hero.tsx`, `About.tsx`, `Skills.tsx`, `Experience.tsx`, `Projects.tsx`,
    `Education.tsx`, `Certifications.tsx`, `Publications.tsx`, `Contact.tsx`
- Smooth scrolling provider: `src/app/contexts/LenisContext` (used by `Navigation` and the page)
- Interactive gallery:
  - `src/components/CircularGallery.jsx`
  - Styling: `src/components/CircularGallery.css`

## Notes

- Thumbnails/images for projects are defined in `src/app/components/Projects.tsx`.
- The favicon is served from `public/favicon.png`.

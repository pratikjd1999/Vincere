# Architecture

## Current scope

Frontend-only public website. No MERN backend is required in version 1; MongoDB and Express are deferred until a feature needs persistent data or secure form handling.

## Approved stack

- React with TypeScript, bootstrapped with Vite.
- Tailwind CSS for styling.
- React Router for the six public routes.
- Lucide React for icons.
- React Three Fiber / Drei for 3D scenes where the experience benefits from real-time rendering.
- GSAP with ScrollTrigger for scroll-led narrative sequences and controlled transitions.
- Lenis only if its accessibility and reduced-motion integration are verified during implementation.
- Local static assets only, unless an approved task adds an external source.
- Vitest and React Testing Library for unit/component tests.
- Playwright for critical browser journeys and responsive checks.
- ESLint and Prettier.

## Future MERN boundary

When backend work is approved, add a separate Node.js/Express API and MongoDB behind a documented API contract. The frontend must not connect directly to MongoDB or contain server secrets.

## Motion and 3D strategy

- Use 3D to communicate brand and capability, not as a visual tax on every page.
- Defer heavy 3D assets and dynamically load them when appropriate.
- Cap device pixel ratio and pause/offload rendering when a 3D canvas is not visible.
- Fall back to CSS/illustrated compositions when WebGL is unavailable or reduced motion is requested.
- Measure the production build and preserve good Core Web Vitals before adding more visual complexity.

## Proposed structure

```
src/
  app/          # Router and application providers
  components/   # Shared layout and UI components
  features/     # Page/feature-specific components and content
  assets/       # Approved local images and icons
  lib/          # Framework-agnostic utilities
  styles/       # Global styles and design tokens
tests/
  e2e/
docs/
```

## Deployment

Static hosting is sufficient for version 1. Select the hosting provider in a future deployment task.

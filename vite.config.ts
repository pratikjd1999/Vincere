import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Each direction is lazy-loaded from the registry, so Vite's route-level splitting
// already keeps three.js and GSAP out of the initial gallery bundle.
export default defineConfig({
  // Relative asset paths: the build works at any GitHub Pages sub-path
  // (https://user.github.io/<repo>/) without knowing the repository name.
  base: './',
  plugins: [react(), tailwindcss()],
})

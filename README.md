# Vincere Corp Private Limited

The public, frontend-only company website for Vincere Corp Private Limited, a Pune-based IT company serving government and private-sector technology projects.

## Working with an AI assistant

The project handbook is in [`docs/`](docs/). Before implementing work, read `AGENTS.md`, `docs/product-requirements.md`, and the relevant task in `docs/tasks/`.

Typical command:

> Implement `docs/tasks/001-company-website.md` according to the engineering handbook. Complete its acceptance criteria, run the required checks, and update documentation.

## Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck (`tsc -b`) then produce a production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

> **Registry note:** this machine's default npm registry requires auth that is currently
> expired. If `npm install` fails with `E401`, append
> `--registry=https://registry.npmjs.org/`.

Unit tests (Vitest) and end-to-end tests (Playwright) are specified in
`docs/architecture.md` but are **not yet set up** — they belong to the production phase.

## Homepage explorations

Run `npm install` then `npm run dev`. `#/` is the Home page (Monolith · Facet, in
`src/features/home/`). Visit `#/templates` to compare the twenty-seven homepage directions;
each opens at `#/templates/:id` and is deep-linkable. The gallery is not linked from Home.

> Routes are hash-based (`#/templates/…`) so the site can be hosted on GitHub Pages
> without server rewrites. The table below lists route ids; prefix them with `#/`.

Every direction is a complete, interactive homepage differing in layout archetype,
type system, palette and motion technique, built from a distinct style in the
`ui-ux-pro-max` design database. All twenty-seven render the same approved content, so the
comparison is about design rather than copy.

| # | Route | Direction | Basis |
| --- | --- | --- | --- |
| 01 | `/templates/swiss-grid` | Swiss Signal | Swiss Modernism 2.0 |
| 02 | `/templates/bento-command` | Bento Command | Bento Box Grid |
| 03 | `/templates/aurora-mesh` | Aurora Field | Gradient Mesh / Aurora |
| 04 | `/templates/hud-console` | Operations HUD | HUD / Sci-Fi FUI |
| 05 | `/templates/kinetic-type` | Kinetic Statement | Kinetic Typography |
| 06 | `/templates/neubrutal-grid` | Civic Brutalist | Neubrutalism |
| 07 | `/templates/spatial-glass` | Spatial Panels | Spatial UI (VisionOS) |
| 08 | `/templates/editorial-press` | Editorial Press | Editorial Grid / Magazine |
| 09 | `/templates/depth-layers` | Depth Stack | Dimensional Layering |
| 10 | `/templates/ai-console` | Assistant Console | AI-Native UI |
| 11 | `/templates/parallax-story` | Scroll Narrative | Parallax Storytelling |
| 12 | `/templates/mono-brutal` | Monochrome Register | Minimalist Monochrome |
| 13 | `/templates/exec-metrics` | Delivery Console | Executive Dashboard |
| 14 | `/templates/terminal-net` | Terminal Brief | Terminal CLI |
| 15 | `/templates/glitch-split` | Chromatic Split | Chromatic Aberration |
| 16 | `/templates/liquid-morph` | Liquid Form | Liquid Glass |
| 17 | `/templates/orbital-3d` | Orbital Lattice | 3D Product Preview (WebGL) |
| 18 | `/templates/biophilic-calm` | Organic Systems | Organic Biophilic |
| 19 | `/templates/retro-future` | Horizon Grid | Retro-Futurism |
| 20 | `/templates/bauhaus-civic` | Bauhaus Civic | Bauhaus |
| 21 | `/templates/monogram-field` | Monogram Field | Dimensional Layering + Gradient Mesh |
| 22 | `/templates/studio-index` | Studio Index | Interactive Cursor + 3D Preview (WebGL) |
| 23 | `/templates/pastel-monolith` | Monolith · Solid | Scroll-bound V, solid extrusion (WebGL) |
| 24 | `/templates/monolith-wire` | Monolith · Wire | Scroll-bound V, edge wireframe (WebGL) |
| 25 | `/templates/monolith-strata` | Monolith · Strata | Scroll-bound V, stacked plates (WebGL) |
| 26 | `/templates/monolith-facet` | Monolith · Facet | Scroll-bound V, faceted crystal (WebGL) |
| 27 | `/templates/monolith-points` | Monolith · Points | Scroll-bound V, vertex cloud (WebGL) |

### How the directions are built

- **Content** lives in one typed module, [`src/content/company.ts`](src/content/company.ts).
  It contains only approved copy — no project, client, metric, testimonial or
  certificate appears anywhere.
- **Tokens** are scoped per direction under a `[data-tpl="…"]` attribute, so all
  palettes coexist without leaking into each other.
- **Motion** goes through [`src/lib/motion.ts`](src/lib/motion.ts), which gates every
  animation behind `prefers-reduced-motion`. Each direction renders a complete static
  composition when motion is reduced.
- **3D** is progressive enhancement: directions 17, 22 and 23–27 probe for WebGL and skip
  constrained devices, so `three.js` is never downloaded unless it will be used.
- **Code splitting** is route-level; opening one direction downloads only that
  direction.

## Deploying to GitHub Pages

The repository is configured to build and publish itself. **One-time setup by the
repository owner:**

> **Settings → Pages → Build and deployment → Source: `GitHub Actions`**

That is the only manual step. After it, [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
runs on every push to `main` — including commits created by uploading files through the
GitHub web interface — and publishes `dist/` to Pages. Progress and failures appear
under the repository's **Actions** tab.

### Why the configuration looks the way it does

| Setting | Reason |
| --- | --- |
| `base: './'` in `vite.config.ts` | Pages serves a project repo from `/<repo>/`. Relative asset paths work at any sub-path, so the build does not need to know the repository name and survives a rename. |
| `HashRouter` in `src/main.tsx` | Pages has no SPA rewrite, so a real path like `/templates/swiss-grid` would 404 on direct visit or refresh. Routing through the hash (`#/templates/swiss-grid`) means the server only ever sees the base path. |
| `src/lib/anchor-scroll.ts` | With hash routing, the in-page anchors every direction uses (`#services`, `#contact`, `#main`) would otherwise be read as routes. One document-level delegate handles them as scroll jumps. |
| `public/.nojekyll` | Stops Jekyll from filtering files out of the published output. |
| Exact dependency versions + committed lockfile | `npm ci` requires a lockfile that matches `package.json`. Versions are pinned so CI builds what was tested. |

URLs look like `https://<user>.github.io/<repo>/#/templates/swiss-grid`. Every route is
directly linkable and survives a refresh.

> **Note:** fonts load from Google Fonts, which works on Pages but is an external
> request. The production site should self-host the selected direction's fonts — see
> `docs/decisions.md`.

## Project status

Prototype phase complete. Direction selection is pending; the six-page production
website has not been built yet.

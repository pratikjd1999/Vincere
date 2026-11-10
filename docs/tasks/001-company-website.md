# Task 001: Build the Vincere Corp Public Website

## Objective

Implement the version 1 website described in the engineering handbook.

## Prototype phase: homepage direction gallery

Before selecting the production homepage direction, build a gallery route with at least twenty distinct homepage explorations. Each card must open a deep-linked interactive template route. The selected direction will become the foundation for the full six-page public website.

Each exploration must differ in layout archetype, type system, palette and motion technique — not only in colour. Every exploration uses the same approved content so the comparison is about design.

**Status: complete.** Twenty directions are implemented at `/` and `/templates/:id`. See `docs/decisions.md` for the deviations recorded during this phase.

## Requirements

- Create the approved React/TypeScript frontend scaffold.
- Implement Home, About, Services, Industries, Certifications, and Contact routes.
- Present the nine approved service areas clearly.
- Use the primary messages `Modern digital solutions` and `Build the future digitally` appropriately in the approved content.
- Use `VINCERE CORP` as a text wordmark until a logo is supplied.
- Include a clear `Check what we can do` call to action that leads into a futuristic capability presentation while retaining an overall clean corporate experience.
- Present the five approved industries: Government & Public Sector, Small and Medium Businesses, Startups, Education, and Healthcare.
- Use polished, responsive light and dark themes.
- Implement a progressive-enhancement 3D hero/capability scene, scroll-led transitions, and smooth micro-interactions according to the architecture and design system.
- Include an accessible header, navigation, footer, page metadata, and clear calls to action.
- Display the approved address, email, and phone from `docs/product-requirements.md`. Do not invent a project portfolio, client, award, metric, testimonial, or certificate details.
- Social channels must remain labelled `Coming soon` until their profile URLs are approved. The Contact page must not include a form that pretends to submit.
- Use four or five neutral compliance-card placeholders. Do not name or imply unapproved certificates.

## Acceptance criteria

- All six routes work by direct URL and through navigation.
- The experience is usable at 320px, 768px, 1024px, and 1440px widths.
- Light/dark preference can be changed accessibly and persists between visits.
- 3D and scroll effects work smoothly on supported devices and have a complete static/reduced-motion fallback.
- The production experience meets the performance budget documented in the architecture; 3D does not unnecessarily load on constrained devices.
- Keyboard navigation, focus states, skip link, colour contrast, and reduced-motion behaviour meet the handbook requirements.
- Lint, typecheck, tests, production build, and relevant Playwright tests pass.
- The README documents install, local development, test, and build commands.

## Status

Prototype phase complete — twenty homepage directions built and awaiting selection.
Production phase (six routes, tests, Playwright, performance budget) not yet started.

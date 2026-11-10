# AI Engineering Handbook

You are the senior engineer for Vincere Corp's public website. Build production-quality, maintainable work within the approved scope.

## Source of truth

Read these before changing code:

1. `docs/product-requirements.md`
2. `docs/architecture.md`
3. `docs/coding-standards.md`
4. `docs/design-system.md`
5. The relevant file in `docs/tasks/`

When requirements conflict, the task takes priority for that feature; otherwise the product requirements take priority. Do not silently expand scope.

## Operating rules

- Inspect the repository and relevant documents before implementing.
- Make a concise implementation plan before material changes.
- Prefer the UI/UX Pro Max skill for interface, interaction, accessibility, and visual quality decisions.
- Use the 21st.dev MCP server when the task benefits from remote design or product intelligence tools.
- Use TypeScript in strict mode. Do not use `any`, placeholders, or unresolved TODOs.
- Build responsive, accessible, performant interfaces. Support keyboard navigation, visible focus states, semantic HTML, and WCAG 2.2 AA colour contrast.
- Reuse components and keep code organised by feature. Prefer simple composition over abstraction for its own sake.
- Do not invent company facts, client logos, project results, certificates, contact details, awards, or legal claims. Use approved content or clearly labelled non-public placeholders specified by the task.
- Do not add a backend, authentication, database, analytics, tracking, third-party APIs, or data collection without an approved task.
- Never expose private certificate numbers, incorporation information, personal contact details, or secrets.
- Preserve existing public routes and behaviour unless the task explicitly changes them.
- Update the relevant documentation when architecture, decisions, or a task's status changes.

## Quality gate

Before declaring a task complete, run the documented lint, typecheck, unit-test, build, and end-to-end checks that exist in the repository. Fix failures caused by your changes. Report commands run and any checks not available.

## Definition of done

- Every acceptance criterion is met.
- The UI works at mobile, tablet, laptop, and wide desktop widths.
- Loading, error, and empty states exist where applicable.
- New interactive behaviour is keyboard-accessible and respects reduced-motion preferences.
- No private or fabricated company information has been published.
- Documentation and tests are updated where applicable.

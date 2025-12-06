## Phase 6 Implementation Prompt (Sustainability & CSR Pages, with dev/prod/notes structure)

```markdown
You are an expert frontend engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **data visualization with Recharts**, building production-grade, accessible dashboards on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 6, you must assume that **Phases 0–5 are fully completed** per:

- `notes/phase0.md` – Project setup, Next.js app in `dev/`.
- `notes/phase1.md` – Design system & foundation (colors, typography, layout, shadcn/ui).
- `notes/phase2.md` – Homepage development.
- `notes/phase3.md` – About Us section.
- `notes/phase4.md` – Services & Solutions section.
- `notes/phase5.md` – Projects, Clients & Partnerships section.

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - App Router is configured with `(marketing)` and the sections from previous phases.
  - Design system (colors, typography, layout, shadcn/ui) is fully in place and reused.
  - Typed constants and utilities exist under `dev/lib/constants` and `dev/lib/utils`.
  - `npm run lint` and `npm run build` succeed when run in `dev/`.

If any of these assumptions are not true, **fix or complete earlier phases first** before proceeding.

---

## Directory Conventions (MUST FOLLOW)

At the **repository root**, folders have strict roles:

- `dev/` – **All development files**
  - Source code (Next.js app), configs, TypeScript, tests, local dev assets.
  - The **Next.js project root is `dev/`**.

- `prod/` – **Production artifacts & deployment assets**
  - Any deployment scripts, archived build outputs, zip bundles, CI/exported artifacts.
  - Do **not** put development source here.

- `notes/` – **All documentation**
  - Markdown specs (`*.md`), design docs, PDFs, etc.
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase5.md`, this `phase6.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 6 implementation work happens **inside `dev/`**.

---

## Phase 6 Scope (Sustainability & CSR Pages)

You are implementing **Phase 6: Sustainability & CSR Pages** from `notes/phases.md`.

Goal: Build a complete, production-ready **Sustainability & Corporate Social Responsibility** section for the marketing site that:

- Communicates environmental responsibility, safety excellence, CSR initiatives, and ethical business practices.
- Uses **interactive dashboards** and **data visualizations** (via Recharts) for safety and environmental metrics.
- Showcases CSR projects and community impact, including stories and media.

Planned routes under `dev/app/(marketing)/sustainability/`:

- `dev/app/(marketing)/sustainability/page.tsx` – Sustainability Overview.
- `dev/app/(marketing)/sustainability/environment/page.tsx` – Environmental Responsibility.
- `dev/app/(marketing)/sustainability/safety/page.tsx` – Safety Excellence.
- `dev/app/(marketing)/sustainability/csr/page.tsx` – CSR Programs.
- `dev/app/(marketing)/sustainability/csr/projects/page.tsx` – CSR Project Showcase.
- `dev/app/(marketing)/sustainability/ethics/page.tsx` – Ethical Business Practices.

Reusable components to implement (from `phases.md`):

- `dev/components/sections/SafetyDashboard.tsx` – Interactive safety stats.
- `dev/components/sections/ImpactMetrics.tsx` – Environmental/CSR metrics visualization.
- `dev/components/sections/CSRProjectCard.tsx` – CSR project display card.
- `dev/components/sections/CommunityStories.tsx` – Community/employee video testimonials & stories.

All dashboards and charts in Phase 6 are **read-only visualizations** based on static placeholder data for now. In later phases, they may be wired to live data.

---

## Constraints & Quality Bar

- All work must respect folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (run in `dev/`).
  - **Lint successfully** with `npm run lint` (run in `dev/`).
  - Run with `npm run dev` (in `dev/`) without runtime errors when visiting any Sustainability route.
- Sustainability pages must be:
  - **Responsive** across mobile, tablet, and desktop.
  - **Accessible-minded** (semantic sections, proper headings, descriptive alt text, ARIA for charts if appropriate).
  - **On-brand** using the existing design system.
- Data visualizations must:
  - Use **Recharts**.
  - Degrade gracefully (e.g. show fallback text if JavaScript fails).
  - Avoid excessive performance overhead.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Previous Phases

1. From repo root, make sure `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, resolve issues from Phases 0–5 before proceeding.

---

### 2. Confirm Data Visualization Dependencies (Recharts)

All commands in this section are run **inside `dev/`**.

1. In `dev/package.json`, ensure you have:
   - `recharts`

2. If missing, install:

   ```bash
   cd dev
   npm install recharts
   ```

3. Verify there are no TypeScript or lint errors introduced by these changes.

---

### 3. Define Sustainability & Safety Data Models

Create typed data models and placeholder datasets for sustainability and safety.

1. Add a new constants file, e.g.:
   - `dev/lib/constants/sustainability.ts`

2. Define TypeScript types/interfaces such as:
   - `SafetyMetric` – e.g., `label`, `value`, `unit`, `target`, `period`.
   - `IncidentTrendPoint` – `date`, `incidents`, `nearMisses`, etc.
   - `EnvironmentalMetric` – `category`, `value`, `unit`, `year`.
   - `CSRProject` – `id`, `title`, `location`, `category`, `impactSummary`, `metrics`, `image`, `year`.
   - `Story` – `id`, `name`, `role`, `story`, `videoUrl?` (can be placeholder).

3. Export **placeholder arrays** for:
   - Safety statistics (e.g., accident-free days, training hours, incident rates).
   - Environmental metrics (emissions reduction, fuel efficiency, dust/noise control metrics).
   - CSR projects (schools, healthcare, infrastructure, etc.).
   - Community/employee stories.

4. Keep data realistic but clearly placeholder; later phases or CMS/backend work can replace it.

---

### 4. Implement Reusable Sustainability Sections

Create the following sections under `dev/components/sections/`.

1. **SafetyDashboard**
   - File: `dev/components/sections/SafetyDashboard.tsx`
   - Responsibilities:
     - Visualize key safety metrics, e.g.:
       - Accident-free days.
       - Training hours.
       - Incident rates over time.
     - Use **Recharts** components (e.g., `BarChart`, `LineChart`, `ResponsiveContainer`).
     - Accept typed props or read from `lib/constants/sustainability`.
     - Provide legends, axis labels, and tooltips with accessible text.
     - Mark as `"use client"` because Recharts is client-only.

2. **ImpactMetrics**
   - File: `dev/components/sections/ImpactMetrics.tsx`
   - Responsibilities:
     - Display environmental and CSR impact metrics using cards and/or charts.
     - Examples:
       - Emissions reduction over years.
       - Number of CSR projects completed.
       - Community members impacted.
     - Use Recharts for at least one chart; use cards for other metrics.

3. **CSRProjectCard**
   - File: `dev/components/sections/CSRProjectCard.tsx`
   - Responsibilities:
     - Render a single CSR project: title, location, category, impact summary, year, and image.
     - Accept a typed `CSRProject` or equivalent props.
     - Use semantic markup and responsive layout.

4. **CommunityStories**
   - File: `dev/components/sections/CommunityStories.tsx`
   - Responsibilities:
     - Show a list or slider of community/employee stories.
     - Each story includes name, role/relationship, and a short narrative.
     - Optionally include a placeholder video thumbnail or link.
     - May be a simple grid or a basic slider; if slider, mark as `"use client"`.

All sections must:
- Use semantic `<section>` with appropriate headings.
- Be responsive.
- Use the design system (colors, fonts, spacing, shadcn/ui where appropriate).

---

### 5. Implement Sustainability Overview Page

1. File: `dev/app/(marketing)/sustainability/page.tsx`
2. Responsibilities:
   - Provide a high-level overview of Yellow Power’s sustainability strategy and commitments.
   - Summarize key pillars:
     - Environmental Responsibility.
     - Safety Excellence.
     - CSR & Community Impact.
     - Ethical Business Practices.
   - Embed:
     - A high-level `ImpactMetrics` section.
     - A short text/visual summary of safety performance (can reuse part of `SafetyDashboard` or show aggregated numbers).
   - Include clear links/cards to subpages: Environment, Safety, CSR, CSR Projects, Ethics.

3. Implement as a server component that composes client sections where needed.

---

### 6. Implement Environment, Safety, CSR, CSR Projects & Ethics Pages

Create the following pages under `dev/app/(marketing)/sustainability/`:

1. **Environmental Responsibility Page** – `environment/page.tsx`
   - Content:
     - Sections describing:
       - Eco-friendly equipment & practices.
       - Emissions reduction.
       - Dust & noise management.
       - Fuel efficiency programs.
     - Use `ImpactMetrics` with environmental-focused data.

2. **Safety Excellence Page** – `safety/page.tsx`
   - Content:
     - Safety statistics dashboard (embed `SafetyDashboard`).
     - Sections on training programs, maintenance standards, emergency protocols, certifications.

3. **CSR Programs Page** – `csr/page.tsx`
   - Content:
     - Overview of CSR focus areas: education, healthcare, infrastructure, community projects.
     - Grid of `CSRProjectCard` items with brief impact summaries.
     - Link to CSR Projects showcase page.

4. **CSR Projects Showcase Page** – `csr/projects/page.tsx`
   - Content:
     - More detailed CSR projects listing, potentially filterable by category or year.
     - Reuse `CSRProjectCard` and optionally `ProjectTimeline` from Phase 5 for a featured project.

5. **Ethical Business Practices Page** – `ethics/page.tsx`
   - Content:
     - Business ethics policy.
     - Transparency and compliance statements.
     - Certifications and governance information.

For each page:
- Use server components for main structure.
- Compose client sections (`SafetyDashboard`, `ImpactMetrics`, `CommunityStories`) where needed.
- Keep content realistic but placeholder-safe.

---

### 7. Navigation & Internal Linking

1. Ensure main navigation includes an entry for **Sustainability & CSR** (linking to `/sustainability`).
2. Within the Sustainability section:
   - Overview page links to Environment, Safety, CSR, CSR Projects, Ethics.
   - CSR and CSR Projects pages cross-link.
   - Relevant Services and Projects pages (from Phases 4–5) may be updated to link to Sustainability pages where it makes sense (optional but recommended).

3. Use Next.js `Link` for all internal navigation.

---

### 8. SEO Metadata for Sustainability Pages

For each Sustainability route, define appropriate metadata via Next.js 14 conventions.

1. Pages to cover:
   - `/sustainability`
   - `/sustainability/environment`
   - `/sustainability/safety`
   - `/sustainability/csr`
   - `/sustainability/csr/projects`
   - `/sustainability/ethics`

2. For each, export metadata with:
   - `title` – descriptive and unique.
   - `description` – concise summary tailored to the page.

3. Ensure metadata integrates cleanly with the root layout metadata.

---

### 9. Accessibility & Responsiveness Checks

1. Run the dev server from `dev/`:

   ```bash
   npm run dev
   ```

2. Manually test all Sustainability routes:
   - `/sustainability`
   - `/sustainability/environment`
   - `/sustainability/safety`
   - `/sustainability/csr`
   - `/sustainability/csr/projects`
   - `/sustainability/ethics`

3. Verify:
   - No runtime errors in terminal or browser console.
   - Charts render correctly and are responsive.
   - Pages look good on mobile, tablet, and desktop (use devtools for responsive testing).
   - Non-chart content remains readable if charts fail to load.

4. Quick accessibility review:
   - Headings have logical hierarchy.
   - Interactive elements (links, buttons, chart legends if clickable) are keyboard accessible.
   - Key data conveyed by charts is also summarized in text for screen readers.

---

### 10. Linting, Build Verification & Repo Hygiene

Working inside `dev/`:

1. Stop the dev server, then run:
   - `npm run lint`
   - `npm run build`

   Both must complete successfully.

2. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 6

Phase 6 (Sustainability & CSR Pages) is complete when **all** of the following are true:

1. **Routes & Pages**
   - All planned routes exist and render without errors:
     - `dev/app/(marketing)/sustainability/page.tsx`
     - `dev/app/(marketing)/sustainability/environment/page.tsx`
     - `dev/app/(marketing)/sustainability/safety/page.tsx`
     - `dev/app/(marketing)/sustainability/csr/page.tsx`
     - `dev/app/(marketing)/sustainability/csr/projects/page.tsx`
     - `dev/app/(marketing)/sustainability/ethics/page.tsx`
   - Pages use semantic HTML and are responsive.

2. **Reusable Components & Data Models**
   - Typed sustainability and safety data live under `dev/lib/constants/sustainability.ts` (and related constants, if any).
   - `SafetyDashboard`, `ImpactMetrics`, `CSRProjectCard`, and `CommunityStories` exist under `dev/components/sections/` and are integrated into the appropriate pages.
   - Recharts-based components are implemented as client components and function correctly.

3. **Navigation & SEO**
   - Main navigation and internal links connect Sustainability pages logically with the rest of the site.
   - Each Sustainability page exports appropriate metadata (title + description).

4. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - All Sustainability pages render correctly under `npm run dev` with no console errors.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase6.md`).

Once all these conditions are met, Phase 6 is considered **production-ready and fully functional for the Sustainability & CSR section**.

Follow these instructions exactly and report each major change you make.
```

---

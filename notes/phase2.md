## Phase 2 Implementation Prompt (Homepage Development, with dev/prod/notes structure)

```markdown
You are an expert frontend engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**, building production-grade marketing sites on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 2, you must assume that **Phase 0 and Phase 1 are fully completed** per `notes/phase0.md` and `notes/phase1.md`:

- The repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (the Next.js project root), Phase 0 & 1 have already provided:
  - A working Next.js 14 App Router app with TypeScript and Tailwind configured.
  - `dev/app/(marketing)/page.tsx` as a simple placeholder homepage.
  - `dev/app/layout.tsx` wiring in `Header`, `Footer`, and `MobileNav` from `dev/components/layouts/`.
  - Design system basics:
    - Brand colors wired via CSS variables + Tailwind config.
    - Typography set up via Google Fonts (`next/font/google`) and Tailwind `fontFamily`.
    - shadcn/ui initialized, with core components under `dev/components/ui/`.
  - Utility and constants modules such as `dev/lib/utils` and `dev/lib/constants/company`.
  - `npm run lint` and `npm run build` both succeed when run in `dev/`.

If any of these assumptions are not true, **fix or complete the previous phases first** before proceeding with Phase 2.

---

## Directory Conventions (MUST FOLLOW)

At the **repository root**, folders have strict roles:

- `dev/` – **All development files**
  - Source code (Next.js app), configs, TypeScript, tests, local dev assets.
  - The **Next.js project root is `dev/`**.

- `prod/` – **Production artifacts & deployment assets**
  - Any deployment scripts, archived build outputs, zip bundles, CI/exported artifacts.
  - Do **not** put development source files here.

- `notes/` – **All documentation**
  - Markdown specs (`*.md`), design docs, PDFs, etc.
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`, `phase1.md`, this `phase2.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 2 implementation work happens **inside `dev/`**.

---

## Phase 2 Scope (Homepage Development)

You are implementing **Phase 2: Homepage Development** from `notes/phases.md`.

Goal: Transform the simple placeholder homepage into a **fully designed, responsive, production-ready homepage** built on top of the Phase 1 design system.

The homepage should include the following sections (as separate, reusable components):

1. **Hero Section** – prominent introduction with tagline, subtitle, and CTAs.
2. **Core Services Overview** – cards for the 5 core services.
3. **Statistics Bar** – animated counters for key company metrics.
4. **Equipment & Technology Showcase** – highlight key equipment/technology.
5. **Client Partnerships Section** – logos and testimonials overview.
6. **Why Choose Yellow Power** – grid of value propositions.
7. **News Section** – preview of latest news items (placeholder content).
8. **Careers CTA** – short call-to-action with link to careers.

Additionally, you must create reusable **UI components** that these sections rely on, and assemble everything in `app/(marketing)/page.tsx` with proper SEO metadata.

Animations (especially for hero, stats, carousels) should be implemented with **Framer Motion** and modern, accessible patterns.

---

## Constraints & Quality Bar

- All work must respect the folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (in `dev/`).
  - **Lint successfully** with `npm run lint` (in `dev/`).
  - Run with `npm run dev` (in `dev/`) without runtime errors on the homepage.
- The homepage must be:
  - **Responsive** across common breakpoints (mobile, tablet, desktop).
  - **Accessible-minded** (semantic landmarks, heading hierarchy, alt text, aria where appropriate).
  - **Performant** (reasonable image usage, no heavy blocking scripts, Framer Motion used judiciously).
- Use idiomatic **Next.js App Router** patterns:
  - Server components where possible; mark components that rely on browser APIs, `useState`, or `Framer Motion` as `"use client"`.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Phase 0 & 1 State

1. From repo root, confirm folder structure:
   - `dev/`, `prod/`, and `notes/` all exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either fails, resolve issues from Phase 0 or 1 before continuing.

---

### 2. Confirm Dependencies for Phase 2

1. In `dev/package.json`, ensure the following dependencies exist (these should have been added in Phase 0):
   - `framer-motion`
   - `@tanstack/react-query`
   - `zod`
   - `zustand`
   - `next`, `react`, `react-dom`, `typescript`, `tailwindcss` (baseline).

2. If anything is missing, add it and run (inside `dev/`):

   ```bash
   cd dev
   npm install
   ```

3. Ensure there are no TypeScript errors introduced by any previously added components.

---

### 3. Create Reusable UI Components for Homepage

Create base UI primitives in `dev/components/ui/` that homepage sections will reuse.

1. **ServiceCard**
   - File: `dev/components/ui/ServiceCard.tsx`
   - Responsibilities:
     - Display a service name, short description, icon placeholder, and optional "Learn More" link.
     - Accept props for title, description, icon (optional), and link.
     - Use shadcn `Card` or a custom card styled with Tailwind + design system.

2. **StatCounter**
   - File: `dev/components/ui/StatCounter.tsx`
   - Responsibilities:
     - Display a metric label and animated numeric value.
     - Use Framer Motion (or a lightweight count-up approach) triggered when the component scrolls into view.
     - Accept props for `value`, `label`, and optional suffix (e.g., `+`, `M`, etc.).
     - Mark as `"use client"` if using hooks, IntersectionObserver, or Framer Motion.

3. **TestimonialCard**
   - File: `dev/components/ui/TestimonialCard.tsx`
   - Responsibilities:
     - Display a client name, role/company, and testimonial text.
     - Optional avatar or logo placeholder.

4. **NewsCard**
   - File: `dev/components/ui/NewsCard.tsx`
   - Responsibilities:
     - Display a news article preview with title, date, short excerpt, and "Read More" link.
     - For Phase 2, content can be static placeholder data.

All of these should be fully typed with TypeScript and use design system tokens for colors, typography, and spacing.

---

### 4. Implement Homepage Sections in `components/sections`

Implement each homepage section as its own component under `dev/components/sections/`.

1. **Hero Section**
   - File: `dev/components/sections/HeroSection.tsx`
   - Features:
     - Large headline with company tagline:
       - "Powering Africa's Mining Future Through Excellence in Drilling & Support Services".
     - Subtitle:
       - "Comprehensive Solutions for the Mining Industry Since 2017".
     - Primary CTA: "Explore Our Services" (links to `/services`).
     - Secondary CTA: "Request a Quote" (links to `/contact` or `/services` quote section placeholder).
     - Optional background: gradient, hero image/video placeholder; use Framer Motion for subtle entrance animations.
     - Responsive layout (stacked on mobile, horizontal on desktop if desired).

2. **Core Services Overview**
   - File: `dev/components/sections/ServicesOverview.tsx`
   - Features:
     - Use `ServiceCard` to render 5 service cards using data from `SERVICES` (from `dev/lib/constants/company` or a dedicated services constants file).
     - Each card should have a short, hardcoded placeholder description.
     - Arrange in responsive grid (e.g., 1 column mobile, 2–3 columns tablet/desktop).

3. **Statistics Bar**
   - File: `dev/components/sections/StatsSection.tsx`
   - Features:
     - Use `StatCounter` to display at least these metrics:
       - "201-500 Employees"
       - "Established 2017"
       - "3 African Countries"
       - Placeholders for additional stats (projects, clients, meters drilled).
     - Horizontal bar or grid layout; responsive stacking on small screens.
     - Animated count-up behavior as the section scrolls into view.

4. **Equipment & Technology Showcase**
   - File: `dev/components/sections/EquipmentShowcase.tsx`
   - Features:
     - A simple carousel or grid of images (use placeholder images from `dev/public/images` for now).
     - Short text describing equipment quality and technology.
     - "View Full Fleet" CTA linking to future `/services/equipment` page.
     - Use Framer Motion for smooth slide/fade animations; keep performance in mind.

5. **Client Partnerships Section**
   - File: `dev/components/sections/ClientsSection.tsx`
   - Features:
     - Client logo grid (placeholder logos or simple text blocks).
     - Optional testimonial slider using `TestimonialCard` (static placeholder entries).
     - Short copy emphasizing trust and partnership.

6. **Why Choose Yellow Power**
   - File: `dev/components/sections/WhyChooseUs.tsx`
   - Features:
     - 4-column (on desktop) or 1–2 column (on mobile) grid of value propositions, e.g.:
       - Safety record
       - Quality certifications
       - Technology leadership
       - Community commitment
     - Each item should have an icon placeholder, title, and short description.

7. **News Section**
   - File: `dev/components/sections/NewsGrid.tsx`
   - Features:
     - Use `NewsCard` to render 3 placeholder news items.
     - Include a "View All News" CTA linking to `/news`.
     - Layout: responsive grid.

8. **Careers CTA**
   - File: `dev/components/sections/CareersCTA.tsx`
   - Features:
     - Short block highlighting career opportunities at Yellow Power.
     - "Join Our Team" button linking to `/careers`.
     - May include 1–3 featured roles as static text.

All sections should:
- Use semantic HTML (e.g., `<section>`, proper headings).
- Be responsive.
- Use the established design system (colors, fonts, spacing, buttons via shadcn where appropriate).

---

### 5. Assemble the Homepage in `app/(marketing)/page.tsx`

1. Open `dev/app/(marketing)/page.tsx`.
2. Replace the placeholder content from previous phases with a composition of the new sections, in roughly this order:
   - `<HeroSection />`
   - `<ServicesOverview />`
   - `<StatsSection />`
   - `<EquipmentShowcase />`
   - `<ClientsSection />`
   - `<WhyChooseUs />`
   - `<NewsGrid />`
   - `<CareersCTA />`

3. Ensure imports are correct, respecting any path aliases (e.g., `@/components/sections/HeroSection`).
4. Maintain a logical and accessible heading hierarchy across the page (only one `<h1>` overall, appropriate use of `<h2>`, `<h3>`, etc.).

---

### 6. SEO Metadata for Homepage

1. In `dev/app/(marketing)/page.tsx` (or via a `metadata` export as per Next 14 conventions), define meaningful metadata for the homepage:
   - Title: e.g., "Yellow Power International | Mining Support Services in Africa".
   - Description summarizing the company and services.
   - Basic Open Graph and Twitter metadata if appropriate for this phase (can be minimal, with more detailed SEO in Phase 10).

2. Ensure the metadata configuration does not conflict with the root layout metadata from earlier phases.

---

### 7. Accessibility & Responsiveness Checks

1. Run the dev server from `dev/` with:

   ```bash
   npm run dev
   ```

2. In the browser (e.g., `http://localhost:3000`):
   - Verify that the homepage renders all sections without layout breaks.
   - Test at multiple viewport widths (mobile, tablet, desktop) using devtools.
   - Ensure that navigation (header/footer) still works and looks consistent with the new homepage design.

3. Quick accessibility pass:
   - Check that images have `alt` text (placeholder but meaningful).
   - Ensure interactive elements (buttons, links) are keyboard-focusable and clearly visible.
   - Verify headings are nested logically.

---

### 8. Cleanup, Linting, and Build Verification

Working inside `dev/`:

1. Remove any obsolete placeholder content or components from earlier phases that are no longer used.
2. Ensure all TypeScript files compile with no errors and no unused imports where lint rules would complain.
3. Run:
   - `npm run lint`
   - `npm run build`

   Both must pass successfully.

4. Double-check repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 2

Phase 2 (Homepage Development) is complete when **all** of the following are true:

1. **Homepage Sections Implemented**
   - `HeroSection`, `ServicesOverview`, `StatsSection`, `EquipmentShowcase`, `ClientsSection`, `WhyChooseUs`, `NewsGrid`, and `CareersCTA` exist under `dev/components/sections/` and render correctly.
   - Each section uses the Phase 1 design system (colors, typography, layout) and is responsive.

2. **Reusable UI Components**
   - `ServiceCard`, `StatCounter`, `TestimonialCard`, and `NewsCard` exist under `dev/components/ui/` and are fully typed.
   - Sections reuse these components rather than duplicating markup.

3. **Homepage Assembly & SEO**
   - `dev/app/(marketing)/page.tsx` composes all sections in order and exports appropriate metadata.
   - The page has a clear and accessible heading structure.

4. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - The homepage at `/` renders with all Phase 2 sections, is responsive, and has no console errors.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`, `phase1.md`, and this `phase2.md`).

Once all these conditions are met, Phase 2 is considered **production-ready and fully functional as the marketing homepage**.

Follow these instructions exactly and report each major change you make.
```

---

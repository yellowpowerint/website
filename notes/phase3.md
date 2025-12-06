## Phase 3 Implementation Prompt (About Us Pages, with dev/prod/notes structure)

```markdown
You are an expert frontend engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Mapbox GL**, building production-grade corporate sites on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 3, you must assume that **Phases 0, 1, and 2 are fully completed** per `notes/phase0.md`, `notes/phase1.md`, and `notes/phase2.md`:

- Repo root structure:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root), you already have:
  - A working Next.js 14 App Router app with TypeScript and Tailwind.
  - Phase 1 design system:
    - Brand color tokens via CSS variables + Tailwind theme.
    - Typography via Google Fonts (`next/font/google`) + Tailwind `fontFamily`.
    - shadcn/ui initialized under `dev/components/ui/`.
    - Core layout: `Header`, `Footer`, `MobileNav` under `dev/components/layouts/`, wired in `dev/app/layout.tsx`.
    - Utilities and constants (e.g., `dev/lib/utils`, `dev/lib/constants/company`).
  - Phase 2 homepage:
    - `dev/app/(marketing)/page.tsx` using sections from `dev/components/sections/*`.
    - Fully responsive, lint-clean, and buildable.
  - `npm run lint` and `npm run build` both succeed when run in `dev/`.

If any of these are not true, **fix or complete earlier phases first** before proceeding.

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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`, `phase1.md`, `phase2.md`, this `phase3.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 3 implementation work happens **inside `dev/`**.

---

## Phase 3 Scope (About Us Pages)

You are implementing **Phase 3: About Us Pages** from `notes/phases.md`.

Goal: Build a complete, production-ready **About** section for the marketing site, with multiple subpages and reusable components, all leveraging the existing design system.

Planned pages (within the App Router `(marketing)` segment):

- `dev/app/(marketing)/about/page.tsx` – About main page.
- `dev/app/(marketing)/about/mission-vision/page.tsx` – Mission & Vision.
- `dev/app/(marketing)/about/founder/page.tsx` – Founder’s Story.
- `dev/app/(marketing)/about/leadership/page.tsx` – Leadership Team.
- `dev/app/(marketing)/about/history/page.tsx` – Company History.
- `dev/app/(marketing)/about/global-presence/page.tsx` – Global Presence (Mapbox map).
- `dev/app/(marketing)/about/awards/page.tsx` – Awards & Recognition.

Reusable components to implement:

- `dev/components/sections/Timeline.tsx` – Interactive company history timeline.
- `dev/components/sections/MapSection.tsx` – Mapbox-based global presence section.
- `dev/components/ui/LeadershipCard.tsx` – Leadership team member card.
- `dev/components/ui/AwardCard.tsx` – Award/certification display card.

Mapbox integration:

- Use `mapbox-gl` for maps in the Global Presence page.
- Manage sensitive configuration (Mapbox token) via environment variables (no secrets in code).

---

## Constraints & Quality Bar

- All work must respect folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (run in `dev/`).
  - **Lint successfully** with `npm run lint` (run in `dev/`).
  - Run with `npm run dev` (in `dev/`) without runtime errors when visiting any About page.
- About pages must be:
  - **Responsive** across mobile, tablet, and desktop.
  - **Accessible-minded** (semantic sections, headings, alt text, focusable controls on maps, etc.).
  - **On-brand** using existing colors, typography, and layout system.
- Use idiomatic **Next.js App Router** patterns:
  - Prefer server components for static content pages.
  - Mark interactive/animated components (Mapbox, client-side timelines) with `"use client"` as needed.
  - Use dynamic import for heavy/DOM-only libraries like `mapbox-gl` to avoid SSR issues.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Previous Phases

1. From repo root, make sure `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, resolve issues from Phases 0–2 before proceeding.

---

### 2. Ensure Mapbox Dependencies & Setup

All commands in this section are run **inside `dev/`**.

1. Install Mapbox GL and TypeScript types (if not already installed):

   ```bash
   cd dev
   npm install mapbox-gl
   npm install --save-dev @types/mapbox-gl
   ```

2. Prepare for environment variable usage:
   - The Mapbox public token will be provided via an environment variable named, for example, `NEXT_PUBLIC_MAPBOX_TOKEN`.
   - **Do not** hardcode real tokens into the codebase.
   - Assume a `.env.local` (ignored by Git) will be used in local dev; Vercel environment variables will be configured later.

3. Ensure `next.config.*` (if present) does not conflict with using `NEXT_PUBLIC_*` env vars on the client.

---

### 3. Create Reusable UI Components (Leadership & Awards)

Implement **typed, reusable** UI components in `dev/components/ui/`.

1. **LeadershipCard**
   - File: `dev/components/ui/LeadershipCard.tsx`
   - Responsibilities:
     - Render a leadership team member with:
       - Name
       - Role/Title
       - Short bio or summary
       - Optional photo/avatar (placeholder image from `dev/public/images`)
     - Accept strongly typed props for these fields.
     - Use shadcn `Card` or similar patterns, with Tailwind for layout.

2. **AwardCard**
   - File: `dev/components/ui/AwardCard.tsx`
   - Responsibilities:
     - Render an award/certification item with:
       - Award name
       - Issuing organization
       - Year/date
       - Optional description or badge.
     - Accept typed props and use design system tokens.

3. Ensure both components:
   - Are fully typed (no `any`).
   - Use semantic markup (`<article>`, headings, etc.) where appropriate.
   - Work responsively in both grid and list layouts.

---

### 4. Create Timeline and Map Sections

Implement reusable About-specific sections in `dev/components/sections/`.

1. **Timeline Section**
   - File: `dev/components/sections/Timeline.tsx`
   - Responsibilities:
     - Display the company history from 2017 to present as a vertical or horizontal timeline.
     - Include key milestones (founded 2017, expansion to 3 countries, team growth, major projects, etc.).
     - Use an internal data structure (array of milestones) typed with TypeScript.
     - Use semantic markup and clear visual separation between entries.
     - Optional basic animation (e.g., fade-in on scroll) using Framer Motion, marked as `"use client"` if hooks or motion components are used.

2. **MapSection (Global Presence)**
   - File: `dev/components/sections/MapSection.tsx`
   - Responsibilities:
     - Present a world or regional map showing Yellow Power’s presence in 3 African countries.
     - Use `mapbox-gl` to render an interactive map **client-side only**.
     - Mark component with `"use client"` and use `dynamic` import or `useEffect` to avoid SSR usage of `window`.
     - Read Mapbox token from `process.env.NEXT_PUBLIC_MAPBOX_TOKEN`.
       - If token is missing, render a graceful fallback message instead of crashing.
     - Plot markers for known office locations (can use placeholder coordinates for now).
     - Provide zoom/pan controls; ensure keyboard accessibility where possible.

3. Ensure both sections:
   - Use the design system (colors, typography, spacing).
   - Are responsive.
   - Do not break when rendered on the server (Timeline can be a server or client component depending on animation needs; MapSection must be client-only).

---

### 5. Implement About Pages Under `app/(marketing)/about`

Create the route files for each About page and compose them using the reusable components.

All files are under `dev/app/(marketing)/about/`:

1. **About Main Page** – `page.tsx`
   - Path: `dev/app/(marketing)/about/page.tsx`
   - Content:
     - Overview of the company using mission and vision highlights from the tech doc.
     - High-level stats (may reuse simpler versions of metrics from the homepage).
     - Links or cards to subpages: Mission & Vision, Founder, Leadership, History, Global Presence, Awards.
   - Implement as a **server component** if it only uses static data.

2. **Mission & Vision Page** – `mission-vision/page.tsx`
   - Highlight full mission and vision statements.
   - May include a small grid or infographic layout for core values.
   - Server component with static content.

3. **Founder’s Story Page** – `founder/page.tsx`
   - Provide a narrative about the founder (Mr. Emmanuel Kweku Ganu), based on `ypi_tech_doc.md`.
   - Possible layout:
     - Founder portrait on one side (placeholder image) with text on the other.
     - Timeline or callouts of key career milestones.

4. **Leadership Team Page** – `leadership/page.tsx`
   - Use `LeadershipCard` to render a grid of leadership team members (placeholder data for now).
   - Ensure layout is responsive and accessible.

5. **Company History Page** – `history/page.tsx`
   - Use `Timeline` section to show key milestones year-by-year.
   - Additional narrative text describing the company’s growth.

6. **Global Presence Page** – `global-presence/page.tsx`
   - Use `MapSection` to display interactive Mapbox map with office markers.
   - Provide supporting text summarizing countries, regions, and expansion plans.
   - Ensure the page gracefully handles missing Mapbox token.

7. **Awards & Recognition Page** – `awards/page.tsx`
   - Use `AwardCard` to show a grid/list of awards and certifications (placeholder entries).
   - May also include logos or badges for key certifications.

For each page:
- Use semantic structure with `<main>`, `<section>`, and headings.
- Apply consistent spacing and typography via the design system.
- Keep content realistic but still placeholder where actual client-provided text is not yet available.

---

### 6. Navigation & Linking

1. Ensure the main navigation (Header/MobileNav) includes links to the primary About page and, where appropriate, some of its subpages.
2. Within the About section:
   - Provide internal links/cards on the main About page to each subpage.
   - Use Next.js `Link` for client-side navigation.

3. Confirm that navigating between About subpages is smooth and that the layout remains consistent across them.

---

### 7. SEO Metadata for About Pages

For each About page, define appropriate metadata using Next.js 14 metadata conventions.

1. For example, in each `page.tsx` file or in a dedicated `metadata` export:
   - `about/page.tsx` – title like "About Yellow Power International".
   - `mission-vision/page.tsx` – "Mission & Vision | Yellow Power International".
   - Similar patterns for Founder, Leadership, History, Global Presence, Awards.

2. Include short `description` fields aligned with each page’s purpose.
3. Ensure metadata does not conflict with the root layout metadata.

---

### 8. Testing, Linting, and Build Verification

Working inside `dev/`:

1. Start the dev server:

   ```bash
   npm run dev
   ```

2. Manually test all About routes in the browser:
   - `/about`
   - `/about/mission-vision`
   - `/about/founder`
   - `/about/leadership`
   - `/about/history`
   - `/about/global-presence`
   - `/about/awards`

   Verify:
   - No runtime errors in the terminal or browser console.
   - Layout and typography are consistent and responsive.
   - Map section loads correctly when a token is configured; shows fallback text when not.

3. Stop the dev server and run:
   - `npm run lint`
   - `npm run build`

   Both must complete successfully.

4. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 3

Phase 3 (About Us Pages) is complete when **all** of the following are true:

1. **Routes & Pages**
   - All About pages exist and render without errors:
     - `dev/app/(marketing)/about/page.tsx`
     - `dev/app/(marketing)/about/mission-vision/page.tsx`
     - `dev/app/(marketing)/about/founder/page.tsx`
     - `dev/app/(marketing)/about/leadership/page.tsx`
     - `dev/app/(marketing)/about/history/page.tsx`
     - `dev/app/(marketing)/about/global-presence/page.tsx`
     - `dev/app/(marketing)/about/awards/page.tsx`
   - Pages use semantic HTML and are responsive.

2. **Reusable Components**
   - `LeadershipCard` and `AwardCard` exist under `dev/components/ui/` and are fully typed.
   - `Timeline` and `MapSection` exist under `dev/components/sections/` and are integrated into the relevant pages.
   - `MapSection` uses Mapbox in a client-safe way and reads `NEXT_PUBLIC_MAPBOX_TOKEN` securely.

3. **Navigation & SEO**
   - Header/MobileNav include links into the About section.
   - Internal navigation between About subpages works smoothly.
   - Each About page exports appropriate metadata (title and description).

4. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - All About pages render correctly under `npm run dev` with no console errors.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`, `phase1.md`, `phase2.md`, and this `phase3.md`).

Once all these conditions are met, Phase 3 is considered **production-ready and fully functional for the About section**.

Follow these instructions exactly and report each major change you make.
```

---

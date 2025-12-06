## Phase 4 Implementation Prompt (Services & Solutions Pages, with dev/prod/notes structure)

```markdown
You are an expert frontend engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **React Hook Form**, and **Zod**, building production-grade B2B sites on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 4, you must assume that **Phases 0, 1, 2, and 3 are fully completed** per:

- `notes/phase0.md` – Project setup, Next.js app in `dev/`.
- `notes/phase1.md` – Design system & foundation (colors, typography, layout, shadcn/ui).
- `notes/phase2.md` – Homepage development.
- `notes/phase3.md` – About Us section.

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - App Router is configured with `(marketing)` segment and working homepage (`dev/app/(marketing)/page.tsx`).
  - Design system is applied globally (brand colors, fonts, shadcn/ui, layout components).
  - About section routes under `dev/app/(marketing)/about/*` exist and are production-ready.
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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`, `phase1.md`, `phase2.md`, `phase3.md`, this `phase4.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 4 implementation work happens **inside `dev/`**.

---

## Phase 4 Scope (Services & Solutions Pages)

You are implementing **Phase 4: Services & Solutions Pages** from `notes/phases.md`.

Goal: Build a complete, production-ready **Services & Solutions** section for the marketing site, including:

- Services overview page.
- Individual pages for each of the 5 core services.
- Equipment fleet and Technology & Innovation pages.
- Reusable service-related components.
- A fully functional (frontend) multi-step **Quote Request Form** (validation & UX complete; backend persistence will be done in later phases).

Planned routes under `dev/app/(marketing)/services/`:

- `dev/app/(marketing)/services/page.tsx` – Services Overview.
- `dev/app/(marketing)/services/pre-split-drilling/page.tsx`.
- `dev/app/(marketing)/services/production-drilling/page.tsx`.
- `dev/app/(marketing)/services/reverse-circulation-drilling/page.tsx`.
- `dev/app/(marketing)/services/load-haul/page.tsx`.
- `dev/app/(marketing)/services/construction/page.tsx`.
- `dev/app/(marketing)/services/equipment/page.tsx` – Equipment Fleet.
- `dev/app/(marketing)/services/technology/page.tsx` – Technology & Innovation.

Reusable components to implement (from `phases.md`):

- `dev/components/sections/ServiceDetail.tsx` – Reusable layout for individual service pages.
- `dev/components/ui/EquipmentCard.tsx` – Equipment display card.
- `dev/components/sections/QuoteRequestForm.tsx` – Multi-step quote request form (frontend logic only).
- `dev/components/sections/TechnicalSpecs.tsx` – Specifications display.
- `dev/components/sections/ProjectGallery.tsx` – Gallery for project images.

Quote Request Form behavior:

- Uses **React Hook Form + Zod** for validation.
- Multi-step (service selection → project details → contact info).
- Submits to a **placeholder handler** for now (e.g., console log or toast) – real API will be implemented in Phase 9.

---

## Constraints & Quality Bar

- All work must respect folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (run in `dev/`).
  - **Lint successfully** with `npm run lint` (run in `dev/`).
  - Run with `npm run dev` (in `dev/`) without runtime errors when visiting any Services page.
- Services pages must be:
  - **Responsive** across mobile, tablet, and desktop.
  - **Accessible-minded** (semantic sections, headings, proper labels and error messages on forms).
  - **On-brand** using existing colors, typography, and layout system.
- Quote Request Form must:
  - Provide clear step indicators and navigation.
  - Validate inputs on each step with Zod schemas.
  - Show user-friendly, accessible error messages.
  - Not yet rely on a real backend (no network calls required in this phase).

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Previous Phases

1. From repo root, make sure `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, resolve issues from Phases 0–3 before proceeding.

---

### 2. Confirm Form & Validation Dependencies

All commands in this section are run **inside `dev/`**.

1. In `dev/package.json`, ensure you have:
   - `react-hook-form`
   - `zod`
   - `@hookform/resolvers` (for Zod integration)
   - Existing Phase 0/1 deps: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `framer-motion`, `zustand`, `@tanstack/react-query`, etc.

2. If any form-related dependencies are missing, install them:

   ```bash
   cd dev
   npm install react-hook-form zod @hookform/resolvers
   ```

3. Confirm there are no TypeScript or lint errors introduced by these dependencies.

---

### 3. Define Service & Equipment Data Models

Create typed data models and sample data for services and equipment.

1. Add a new file for services data, e.g.:
   - `dev/lib/constants/services.ts`

2. Define TypeScript types/interfaces:
   - `Service` type with fields like `id`, `slug`, `name`, `shortDescription`, `longDescription`, `keyBenefits`, `applications`, `equipmentTypes`, etc.
   - `Equipment` type with fields like `id`, `name`, `category`, `capacity`, `specs`, `image`, etc.

3. Populate **placeholder data** for:
   - The 5 core services:
     - Pre Split Drilling
     - Production Drilling
     - Reverse Circulation Drilling
     - Load & Haul Operations
     - Construction Services
   - Several example equipment items per category (drills, loaders, trucks, etc.).

4. Export these constants so they can be used by service pages and components.

---

### 4. Create Reusable UI Components for Services

Implement reusable UI elements under `dev/components/ui/` and `dev/components/sections/`.

1. **EquipmentCard**
   - File: `dev/components/ui/EquipmentCard.tsx`
   - Responsibilities:
     - Render equipment name, category, key specs list, and image.
     - Accept a typed `Equipment` prop or equivalent.
     - Use design system tokens; ensure responsiveness.

2. **TechnicalSpecs Section**
   - File: `dev/components/sections/TechnicalSpecs.tsx`
   - Responsibilities:
     - Display technical specification entries (e.g., in a table or definition list).
     - Accept a typed list of spec items (label + value).

3. **ProjectGallery Section**
   - File: `dev/components/sections/ProjectGallery.tsx`
   - Responsibilities:
     - Display a gallery/grid of project-related images.
     - Optional lightbox behavior (can be simple for this phase – even just an image grid with hover effects).

4. Ensure all components:
   - Are fully typed.
   - Use semantic HTML (`<figure>`, `<dl>`, etc., where appropriate).
   - Are responsive and visually consistent with the design system.

---

### 5. Implement ServiceDetail Layout Section

Create a reusable layout for individual service pages.

1. File: `dev/components/sections/ServiceDetail.tsx`
2. Responsibilities:
   - Take a `Service` object (or structured props) and render:
     - Hero section for the service (title, description, CTAs).
     - Sections for:
       - Overview / Applications.
       - Technical specifications (reuse `TechnicalSpecs`).
       - Equipment used (grid of `EquipmentCard`).
       - Safety protocols / case studies (placeholder content for now).
   - Optionally accept "children" for additional per-service custom sections.

3. Ensure the layout is reusable across all 5 service pages, so each page mainly provides data and minor custom text, not unique structure.

---

### 6. Implement Services Overview Page

Create the main services overview page.

1. File: `dev/app/(marketing)/services/page.tsx`
2. Responsibilities:
   - Introduce the Services & Solutions offering.
   - Use data from `lib/constants/services` to render all 5 core services in a comparison-friendly layout (cards or table):
     - Name, short description, key differentiators.
     - "Learn More" link to each individual service page.
   - Include a prominent **"Request Quote"** CTA that scrolls to or links to the Quote Request Form section (on this page or a dedicated anchor/section).

3. Implement as a **server component** if only using static data and UI.

---

### 7. Implement Individual Service Pages

For each service, create a dedicated page under `dev/app/(marketing)/services/`.

1. **Pre Split Drilling** – `pre-split-drilling/page.tsx`
2. **Production Drilling** – `production-drilling/page.tsx`
3. **Reverse Circulation Drilling** – `reverse-circulation-drilling/page.tsx`
4. **Load & Haul Operations** – `load-haul/page.tsx`
5. **Construction Services** – `construction/page.tsx`

For each page:

- Import the relevant `Service` data from `lib/constants/services`.
- Use `ServiceDetail` to render the shared layout.
- Optionally provide custom copy for:
  - Service-specific benefits.
  - Example applications.
  - Safety notes and metrics.
- Ensure the URL structure exactly matches Phase 4 spec (slugs as above).

Pages can be server components, as they mainly use static data.

---

### 8. Implement Equipment Fleet & Technology Pages

1. **Equipment Fleet Page**
   - File: `dev/app/(marketing)/services/equipment/page.tsx`
   - Responsibilities:
     - Use equipment data to render categorized grids of `EquipmentCard` components.
     - Show key spec summaries; link to services that use this equipment.

2. **Technology & Innovation Page**
   - File: `dev/app/(marketing)/services/technology/page.tsx`
   - Responsibilities:
     - Describe technology investments and innovation approach.
     - Use cards/sections to highlight telemetry, maintenance systems, safety tech, etc. (based on `ypi_tech_doc.md`).
     - Optionally reuse `TechnicalSpecs` for technology feature lists.

Both pages should be server components with static data.

---

### 9. Implement QuoteRequestForm (Multi-Step, Frontend-Only)

Create a multi-step quote request form as described in Phase 4.

1. File: `dev/components/sections/QuoteRequestForm.tsx`
2. Mark the component with `"use client"` because it will use React state, React Hook Form, and Zod.
3. Structure:
   - Step 1: **Service Selection**
     - Choose one or more services from the 5 core services.
   - Step 2: **Project Details**
     - Fields like project location, expected start date, duration, required equipment/services, etc.
   - Step 3: **Contact Info**
     - Name, company, email, phone, optional notes.

4. Validation:
   - Use **Zod** schemas for each step’s data shape.
   - Integrate with React Hook Form via `zodResolver` from `@hookform/resolvers`.
   - Show inline errors and accessible error messages.

5. UX behavior:
   - Step indicator (e.g., progress bar or stepper text).
   - Next/Back buttons for step navigation.
   - Disable Next until the current step passes validation.
   - On final submit:
     - For this phase, **do not call a real API**; instead, simulate submission:
       - E.g., log data to console and show a success toast/message.
     - Ensure the component is easy to wire up to a real API route in Phase 9.

6. Integrate into the Services Overview page:
   - Either embed `QuoteRequestForm` directly on `/services` (toward the bottom), or provide a dedicated section with an anchor the user can jump to.

---

### 10. Navigation & Internal Linking

1. Update (if needed) the main navigation so the Services section is clearly accessible.
2. Within the Services section:
   - Ensure `/services` links to each individual service page.
   - Each service page should link back to `/services` and optionally cross-link to related services.
   - Equipment and Technology pages should link to the services they support, and `/services` should link to them.

3. Use Next.js `Link` for client-side navigation.

---

### 11. SEO Metadata for Services Pages

Using Next.js 14 metadata conventions, add appropriate metadata for:

- `/services` – Services & Solutions overview.
- Each individual service page.
- `/services/equipment` – Equipment Fleet.
- `/services/technology` – Technology & Innovation.

Each page should export a `metadata` object (or equivalent) with:
- `title` (clear and descriptive).
- `description` summarizing the page.

This should build on, but not conflict with, the root layout metadata.

---

### 12. Testing, Linting, and Build Verification

Working inside `dev/`:

1. Start the dev server:

   ```bash
   npm run dev
   ```

2. Manually test all Services routes:
   - `/services`
   - `/services/pre-split-drilling`
   - `/services/production-drilling`
   - `/services/reverse-circulation-drilling`
   - `/services/load-haul`
   - `/services/construction`
   - `/services/equipment`
   - `/services/technology`

   Verify:
   - No runtime errors in the terminal or browser console.
   - Layouts are responsive and consistent.
   - QuoteRequestForm behaves correctly: validation, step navigation, submission success message.

3. Stop the dev server and run:
   - `npm run lint`
   - `npm run build`

   Both must complete successfully.

4. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 4

Phase 4 (Services & Solutions Pages) is complete when **all** of the following are true:

1. **Routes & Pages**
   - All planned Services pages exist and render without errors:
     - `dev/app/(marketing)/services/page.tsx`
     - `dev/app/(marketing)/services/pre-split-drilling/page.tsx`
     - `dev/app/(marketing)/services/production-drilling/page.tsx`
     - `dev/app/(marketing)/services/reverse-circulation-drilling/page.tsx`
     - `dev/app/(marketing)/services/load-haul/page.tsx`
     - `dev/app/(marketing)/services/construction/page.tsx`
     - `dev/app/(marketing)/services/equipment/page.tsx`
     - `dev/app/(marketing)/services/technology/page.tsx`
   - Pages use semantic HTML and are responsive.

2. **Reusable Components & Data Models**
   - Typed service and equipment data live under `dev/lib/constants/` and are reused by multiple pages.
   - `EquipmentCard`, `ServiceDetail`, `TechnicalSpecs`, and `ProjectGallery` exist and are integrated.

3. **Quote Request Form**
   - `QuoteRequestForm` exists under `dev/components/sections/`.
   - Uses React Hook Form + Zod with multi-step UX and proper validation.
   - Submits successfully in a frontend-only way (no API yet), providing clear user feedback.

4. **Navigation & SEO**
   - Services are properly linked in the main navigation and within the Services section.
   - Each Services-related page exports appropriate metadata (title and description).

5. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - All Services pages render correctly under `npm run dev` with no console errors.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`, `phase1.md`, `phase2.md`, `phase3.md`, and this `phase4.md`).

Once all these conditions are met, Phase 4 is considered **production-ready and fully functional for the Services & Solutions section**.

Follow these instructions exactly and report each major change you make.
```

---

## Phase 5 Implementation Prompt (Projects, Clients & Partnerships, with dev/prod/notes structure)

```markdown
You are an expert frontend engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and building data-driven, filterable content experiences on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 5, you must assume that **Phases 0–4 are fully completed** per:

- `notes/phase0.md` – Project setup, Next.js app in `dev/`.
- `notes/phase1.md` – Design system & foundation (colors, typography, layout, shadcn/ui).
- `notes/phase2.md` – Homepage development.
- `notes/phase3.md` – About Us section.
- `notes/phase4.md` – Services & Solutions section, including quote form.

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - App Router is configured with `(marketing)` segment and working sections for Home, About, and Services.
  - Design system is applied globally (brand colors, fonts, shadcn/ui components, layout components).
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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase4.md`, this `phase5.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 5 implementation work happens **inside `dev/`**.

---

## Phase 5 Scope (Projects, Clients & Partnerships)

You are implementing **Phase 5: Projects, Clients & Partnerships** from `notes/phases.md`.

Goal: Build a complete, production-ready section that showcases Yellow Power’s **project portfolio**, **case studies**, **clients & testimonials**, **partnership opportunities**, and **supplier portal**, including reusable components and forms.

Planned routes under `dev/app/(marketing)/`:

- `dev/app/(marketing)/projects/page.tsx` – Project Portfolio overview.
- `dev/app/(marketing)/projects/[slug]/page.tsx` – Individual Project pages.
- `dev/app/(marketing)/case-studies/page.tsx` – Case Studies listing.
- `dev/app/(marketing)/clients/page.tsx` – Clients & Testimonials.
- `dev/app/(marketing)/partnerships/page.tsx` – Partnership Opportunities.
- `dev/app/(marketing)/suppliers/page.tsx` – Supplier Portal.

Reusable components to implement (from `phases.md`):

- `dev/components/sections/ProjectCard.tsx` – Project preview card.
- `dev/components/sections/ProjectFilter.tsx` – Project filter controls.
- `dev/components/sections/ProjectGallery.tsx` – Project images gallery with lightbox.
- `dev/components/sections/ProjectTimeline.tsx` – Project-specific timeline.
- `dev/components/ui/ClientLogo.tsx` – Client logo display.
- `dev/components/ui/TestimonialSlider.tsx` – Testimonial carousel.
- `dev/components/forms/PartnershipForm.tsx` – Partnership application form.
- `dev/components/forms/SupplierRegistrationForm.tsx` – Supplier registration form.

All forms in Phase 5 are **frontend-only** for now (no real API calls); server-side persistence and email notifications will be implemented in Phase 9.

---

## Constraints & Quality Bar

- All work must respect folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (run in `dev/`).
  - **Lint successfully** with `npm run lint` (run in `dev/`).
  - Run with `npm run dev` (in `dev/`) without runtime errors when visiting any Phase 5 route.
- Phase 5 pages must be:
  - **Responsive** across mobile, tablet, and desktop.
  - **Accessible-minded** (semantic HTML, filter controls keyboard-friendly, carousel accessible, forms labeled correctly).
  - **On-brand** using existing design system components.
- Forms (Partnership & Supplier) must:
  - Use clear validation (React Hook Form + Zod is recommended for consistency with Phase 4).
  - Provide user-friendly error messages and success states.
  - Not send real network requests in this phase.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Previous Phases

1. From repo root, make sure `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, resolve issues from Phases 0–4 before proceeding.

---

### 2. Define Data Models for Projects, Case Studies, Clients, Partnerships, Suppliers

Create typed data models and placeholder data for this domain.

1. Add a new file, e.g.:
   - `dev/lib/constants/projects.ts`

2. Define TypeScript types/interfaces such as:
   - `Project` – fields like `slug`, `title`, `location`, `services`, `startDate`, `endDate`, `status`, `summary`, `metrics`, `images`, `clientName`, etc.
   - `CaseStudy` – fields like `id`, `title`, `projectSlug`, `industry`, `summary`, `results`, `downloadUrl` (placeholder).
   - `Client` – fields like `id`, `name`, `logo`, `sector`, `description`.
   - `Testimonial` – fields like `id`, `clientName`, `role`, `company`, `quote`, `avatar`.

3. Export **placeholder arrays** of projects, case studies, clients, and testimonials sufficient to:
   - Populate the Project Portfolio grid.
   - Drive the Case Studies listing.
   - Render a Clients & Testimonials page.

4. If useful, create additional constants files, e.g., `clients.ts`, `case-studies.ts`, but keep them under `dev/lib/constants/`.

---

### 3. Implement Reusable UI Components

Create reusable, typed UI components for projects and clients.

1. **ClientLogo**
   - File: `dev/components/ui/ClientLogo.tsx`
   - Responsibilities:
     - Render a client logo (or text placeholder) with accessible alt text.
     - Accept a typed `Client` or relevant prop subset.
     - Support different sizes (e.g., small/large variants) via props.

2. **TestimonialSlider**
   - File: `dev/components/ui/TestimonialSlider.tsx`
   - Responsibilities:
     - Render a carousel of testimonials using `Testimonial` data.
     - Provide basic controls (next/prev), keyboard focus management, and ARIA attributes.
     - May use a simple custom slider or a minimal library-free implementation.
     - Mark as `"use client"` if using `useState`/hooks.

3. Ensure components:
   - Are strongly typed.
   - Use semantic markup (`<figure>`, `<blockquote>`, etc. for testimonials).
   - Integrate seamlessly with the design system.

---

### 4. Implement Project-Focused Sections

Create sections specifically for project listing and details.

1. **ProjectCard**
   - File: `dev/components/sections/ProjectCard.tsx`
   - Responsibilities:
     - Display a single project summary with image, title, location, key services, short description, and link to project detail (`/projects/[slug]`).

2. **ProjectFilter**
   - File: `dev/components/sections/ProjectFilter.tsx`
   - Responsibilities:
     - Provide filter controls for projects by service type, location, and possibly year/status.
     - Should be a client component (`"use client"`) using React state.
     - Expose a typed callback or state for filtered values so the parent can filter the project list.

3. **ProjectGallery** (Phase 5 variant)
   - File: `dev/components/sections/ProjectGallery.tsx`
   - Responsibilities:
     - Display a grid or carousel of project images.
     - Can be reused in both portfolio and individual project pages.

4. **ProjectTimeline**
   - File: `dev/components/sections/ProjectTimeline.tsx`
   - Responsibilities:
     - Render a per-project timeline (phases/milestones within the project).
     - Accept a typed list of milestones.

All sections should:
- Be typed.
- Use semantic `<section>` structure and headings.
- Be responsive and accessible.

---

### 5. Implement Project Portfolio Overview Page

1. File: `dev/app/(marketing)/projects/page.tsx`
2. Responsibilities:
   - Display a filterable grid of projects using `ProjectFilter` and `ProjectCard`.
   - Use static project data from `lib/constants/projects`.
   - Implement filtering **client-side** only (no backend yet):
     - Use `"use client"` at the top of the page **or** move filtering logic into a client child component.
   - Provide a short intro about the portfolio and what types of projects Yellow Power delivers.

3. Ensure:
   - Filters update the visible project list without full page reloads.
   - No runtime errors when no filters are selected or when filters narrow to zero results.

---

### 6. Implement Individual Project Pages

1. File: `dev/app/(marketing)/projects/[slug]/page.tsx`
2. Responsibilities:
   - Use dynamic route params to find the appropriate `Project` in the constants.
   - If no project matches, render Not Found using Next.js conventions.
   - Render a detailed view of the project, including:
     - Overview: title, services used, location, timeframe.
     - Results/metrics (placeholder numeric KPIs).
     - Gallery using `ProjectGallery`.
     - Timeline using `ProjectTimeline`.
     - Client testimonial snippet if available.

3. Implement as a **server component** that fetches data from constants at build time (static or SSG-friendly).

---

### 7. Implement Case Studies Page

1. File: `dev/app/(marketing)/case-studies/page.tsx`
2. Responsibilities:
   - List featured case studies from your constants.
   - Reuse `ProjectCard` or create a slightly different card variant if needed, but prefer reuse.
   - Provide filtering or categorization (by service type, industry) if this can be done via static client-side logic.

3. Include CTAs to download full case study PDFs (these can be placeholder `#` links for now; actual documents to be added later in `public/documents`).

---

### 8. Implement Clients & Testimonials Page

1. File: `dev/app/(marketing)/clients/page.tsx`
2. Responsibilities:
   - Render:
     - **Client logo showcase** using `ClientLogo` for each major client.
     - **Testimonial section** using `TestimonialSlider`.
     - Basic success metrics summary (e.g., number of clients, projects, uptime, etc.).
   - Highlight a "Become a Client" CTA linking to the Partnerships page.

3. Ensure this page is server-rendered with static constants and uses client components only where necessary (e.g., slider).

---

### 9. Implement Partnerships & Supplier Pages + Forms

#### 9.1 Partnership Opportunities Page

1. File: `dev/app/(marketing)/partnerships/page.tsx`
2. Responsibilities:
   - Describe partnership models, benefits, and requirements.
   - Include a **Partnership Application** section embedding `PartnershipForm`.

#### 9.2 Supplier Portal Page

1. File: `dev/app/(marketing)/suppliers/page.tsx`
2. Responsibilities:
   - Describe supplier criteria, process, and benefits.
   - Include a **Supplier Registration** section embedding `SupplierRegistrationForm`.

#### 9.3 PartnershipForm Component

1. File: `dev/components/forms/PartnershipForm.tsx`
2. Mark as `"use client"`.
3. Implement with React Hook Form + Zod:
   - Fields:
     - Company name, contact person, email, phone.
     - Type of partnership (select).
     - Brief proposal/description.
   - Validation:
     - Required fields, valid email, phone format checks (basic).
   - Behavior:
     - On submit, for Phase 5, just simulate success (log and show success message/toast).

#### 9.4 SupplierRegistrationForm Component

1. File: `dev/components/forms/SupplierRegistrationForm.tsx`
2. Mark as `"use client"`.
3. Implement with React Hook Form + Zod:
   - Fields:
     - Company name, registration number, country.
     - Primary contact info.
     - Supplier categories (checkboxes or multi-select).
     - Short description of capabilities.
   - Validation similar to `PartnershipForm`.
   - Behavior:
     - Simulated submission (no real backend) with user feedback.

Both forms must be accessible:
- Associate labels with inputs.
- Display errors next to fields.
- Make success/failure states screen-reader friendly where possible.

---

### 10. Navigation & Internal Linking

1. Ensure main nav has clear entry to:
   - Projects
   - Clients
   - Partnerships
   - Suppliers

2. Within the new pages:
   - Projects overview links to individual project pages.
   - Case Studies link back to Projects and to `/services` where relevant.
   - Clients page links to Partnerships.
   - Partnerships and Suppliers pages cross-link logically (e.g., "Interested in becoming a supplier?" / "Looking for partnership instead?").

3. Use Next.js `Link` for navigation.

---

### 11. SEO Metadata for Phase 5 Pages

For each new route, define appropriate metadata via Next.js 14 conventions.

1. Pages to cover:
   - `/projects`
   - `/projects/[slug]`
   - `/case-studies`
   - `/clients`
   - `/partnerships`
   - `/suppliers`

2. For each, export metadata with:
   - `title` – descriptive of content.
   - `description` – concise summary.

3. Ensure metadata integrates cleanly with the root layout metadata.

---

### 12. Testing, Linting, and Build Verification

Working inside `dev/`:

1. Start the dev server:

   ```bash
   npm run dev
   ```

2. Manually test all Phase 5 routes:
   - `/projects` and a few `/projects/[slug]` URLs.
   - `/case-studies`
   - `/clients`
   - `/partnerships`
   - `/suppliers`

   Verify:
   - No runtime errors in terminal or browser console.
   - Filters on `/projects` work and are intuitive.
   - Testimonial slider and galleries behave correctly across devices.
   - Partnership and Supplier forms validate and show clear success/failure feedback.

3. Stop the dev server and run:
   - `npm run lint`
   - `npm run build`

   Both must complete successfully.

4. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 5

Phase 5 (Projects, Clients & Partnerships) is complete when **all** of the following are true:

1. **Routes & Pages**
   - All planned routes exist and render without errors:
     - `dev/app/(marketing)/projects/page.tsx`
     - `dev/app/(marketing)/projects/[slug]/page.tsx`
     - `dev/app/(marketing)/case-studies/page.tsx`
     - `dev/app/(marketing)/clients/page.tsx`
     - `dev/app/(marketing)/partnerships/page.tsx`
     - `dev/app/(marketing)/suppliers/page.tsx`
   - Pages use semantic HTML and are responsive.

2. **Reusable Components & Data Models**
   - Typed `Project`, `CaseStudy`, `Client`, and `Testimonial` data live under `dev/lib/constants/`.
   - `ProjectCard`, `ProjectFilter`, `ProjectGallery`, `ProjectTimeline`, `ClientLogo`, and `TestimonialSlider` are implemented and integrated.

3. **Forms**
   - `PartnershipForm` and `SupplierRegistrationForm` exist under `dev/components/forms/`.
   - Both use React Hook Form + Zod, with validation, error messages, and simulated submission behavior.

4. **Navigation & SEO**
   - Main navigation and internal links connect Projects, Clients, Partnerships, and Suppliers logically.
   - Each Phase 5 page exports appropriate metadata (title + description).

5. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - All Phase 5 pages render correctly under `npm run dev` with no console errors.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase5.md`).

Once all these conditions are met, Phase 5 is considered **production-ready and fully functional for Projects, Clients & Partnerships**.

Follow these instructions exactly and report each major change you make.
```

---

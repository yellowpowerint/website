## Phase 7 Implementation Prompt (Careers & HR Pages, with dev/prod/notes structure)

```markdown
You are an expert frontend engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **React Hook Form + Zod**, building production-grade career and application flows on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 7, you must assume that **Phases 0–6 are fully completed** per:

- `notes/phase0.md` – Project setup, Next.js app in `dev/`.
- `notes/phase1.md` – Design system & foundation (colors, typography, layout, shadcn/ui).
- `notes/phase2.md` – Homepage development.
- `notes/phase3.md` – About Us section.
- `notes/phase4.md` – Services & Solutions section.
- `notes/phase5.md` – Projects, Clients & Partnerships.
- `notes/phase6.md` – Sustainability & CSR.

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - App Router is configured with `(marketing)` and sections from previous phases.
  - Design system and layout components are in place and reused across pages.
  - Typed constants and utilities exist under `dev/lib/constants` and `dev/lib/utils`.
  - `react-hook-form`, `zod`, and `@hookform/resolvers` are already installed (from earlier phases) or will be installed now.
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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase6.md`, this `phase7.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 7 implementation work happens **inside `dev/`**.

---

## Phase 7 Scope (Careers & HR Pages)

You are implementing **Phase 7: Careers & HR Pages** from `notes/phases.md`.

Goal: Build a complete, production-ready **Careers** section for the marketing site that:

- Showcases Yellow Power as an employer (EVP, culture, benefits).
- Lists jobs with filters and detail pages.
- Provides rich information on training, life at YPI, and the application process.
- Implements a **multi-step Job Application Form** with validation (frontend-only submission for now).

Planned routes under `dev/app/(marketing)/careers/`:

- `dev/app/(marketing)/careers/page.tsx` – Careers Overview.
- `dev/app/(marketing)/careers/jobs/page.tsx` – Job Listings.
- `dev/app/(marketing)/careers/jobs/[jobId]/page.tsx` – Individual Job page.
- `dev/app/(marketing)/careers/training/page.tsx` – Training & Development.
- `dev/app/(marketing)/careers/life-at-ypi/page.tsx` – Life at YPI.
- `dev/app/(marketing)/careers/application-process/page.tsx` – Application Process & FAQ.

Reusable components to implement (from `phases.md`):

- `dev/components/sections/JobCard.tsx` – Job listing card.
- `dev/components/sections/JobFilter.tsx` – Job search & filter controls.
- `dev/components/forms/JobApplicationForm.tsx` – Multi-step job application form with CV upload input.
- `dev/components/sections/CareerPath.tsx` – Career progression visualization.
- `dev/components/sections/BenefitsGrid.tsx` – Benefits display grid.
- `dev/components/ui/EmployeeTestimonial.tsx` – Employee story/testimonial card.

All forms in Phase 7 are **frontend-only** for now (no real API calls or file uploads persisted); backend handling will be added in Phase 9.

---

## Constraints & Quality Bar

- All work must respect folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (run in `dev/`).
  - **Lint successfully** with `npm run lint` (run in `dev/`).
  - Run with `npm run dev` (in `dev/`) without runtime errors when visiting any Careers route.
- Careers pages must be:
  - **Responsive** across mobile, tablet, and desktop.
  - **Accessible-minded** (semantic HTML, job filters keyboard-friendly, forms properly labeled and announced).
  - **On-brand** using the existing design system.
- Job Application Form must:
  - Use React Hook Form + Zod for robust validation.
  - Provide clear step indicators and error messages.
  - Handle file input for CV upload **without** real backend storage yet (e.g., accept file selection but do not persist it).

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Previous Phases

1. From repo root, confirm that `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, resolve issues from Phases 0–6 before proceeding.

---

### 2. Confirm Form & Validation Dependencies

All commands in this section are run **inside `dev/`**.

1. In `dev/package.json`, ensure you have:
   - `react-hook-form`
   - `zod`
   - `@hookform/resolvers`

2. If any are missing, install them:

   ```bash
   cd dev
   npm install react-hook-form zod @hookform/resolvers
   ```

3. Verify there are no TypeScript or lint errors introduced by these changes.

---

### 3. Define Data Models for Jobs, Categories & Testimonials

Create typed models and placeholder datasets for careers-related data.

1. Add a new constants file, e.g.:
   - `dev/lib/constants/careers.ts`

2. Define TypeScript types/interfaces such as:
   - `JobCategory` – `id`, `name`, `slug`.
   - `Job` – `id`, `jobId` (for URL), `title`, `categoryId`, `location`, `employmentType`, `experienceLevel`, `description`, `responsibilities`, `requirements`, `benefits`, `postedDate`.
   - `EmployeeTestimonial` – `id`, `name`, `role`, `department`, `quote`, `image`.
   - `CareerPathStep` – `id`, `title`, `description`, `level`.
   - `Benefit` – `id`, `title`, `description`, `iconKey`.

3. Export **placeholder arrays** of:
   - Job categories (e.g., Drilling Operations, Engineering, Technical, Load & Haul, Construction, Safety & Health, Corporate).
   - Several sample jobs in each category.
   - Employee testimonials.
   - Career path steps for at least one key role (e.g., Drill Operator → Senior Driller → Supervisor).
   - Benefits list.

4. Keep data realistic but clearly placeholder; the backend/CMS will replace it later.

---

### 4. Implement Careers UI Components

Create reusable, typed UI components.

1. **EmployeeTestimonial**
   - File: `dev/components/ui/EmployeeTestimonial.tsx`
   - Responsibilities:
     - Render employee photo (or placeholder), name, role, department, and quote.
     - Accept an `EmployeeTestimonial` prop.
     - Use semantic `<figure>` / `<blockquote>` markup for accessibility.

2. **JobCard**
   - File: `dev/components/sections/JobCard.tsx`
   - Responsibilities:
     - Display job title, category, location, employment type, and a brief summary.
     - Include a "View Details" / "Apply" link to `/careers/jobs/[jobId]`.
     - Accept a typed `Job` prop.

3. **JobFilter**
   - File: `dev/components/sections/JobFilter.tsx`
   - Responsibilities:
     - Provide filter controls (e.g., category, location, experience level).
     - Implement as a client component with `"use client"`.
     - Expose filter state via props callbacks (e.g., `onFilterChange`) or manage filters and render children via render-prop / composition pattern.
   - Ensure filters are keyboard and screen-reader friendly.

4. **CareerPath**
   - File: `dev/components/sections/CareerPath.tsx`
   - Responsibilities:
     - Visualize a series of `CareerPathStep` items in a linear or stepper layout.
     - Emphasize progression for a role (e.g., levels, responsibilities at each stage).

5. **BenefitsGrid**
   - File: `dev/components/sections/BenefitsGrid.tsx`
   - Responsibilities:
     - Render `Benefit` items in a grid layout using icons and brief descriptions.

All components must:
- Use the design system (colors, fonts, spacing, shadcn/ui where appropriate).
- Be fully typed and responsive.

---

### 5. Implement Careers Overview Page

1. File: `dev/app/(marketing)/careers/page.tsx`
2. Responsibilities:
   - Present Yellow Power’s **Employee Value Proposition (EVP)**:
     - Skill development and training.
     - Career growth opportunities.
     - Competitive compensation.
     - Safety-first culture.
     - Community involvement.
   - Showcase key sections:
     - Short intro to job categories.
     - Preview of current openings (e.g., top few `JobCard`s with link to full listings).
     - `BenefitsGrid` for benefits overview.
     - Selected `EmployeeTestimonial` items.
     - CTA: "View All Jobs" (link to `/careers/jobs`) and "Learn About Training" (link to `/careers/training`).

3. Implement as a server component that composes client components where required.

---

### 6. Implement Job Listings & Job Detail Pages

#### 6.1 Job Listings Page

1. File: `dev/app/(marketing)/careers/jobs/page.tsx`
2. Responsibilities:
   - Render a filterable list of jobs.
   - Use `JobFilter` to manage filters.
   - Display a responsive grid or list of `JobCard`s.
   - Implement filtering **client-side** only (no backend yet):
     - Use `"use client"` for the top-level component **or** delegate filtering to a client child.

#### 6.2 Individual Job Page

1. File: `dev/app/(marketing)/careers/jobs/[jobId]/page.tsx`
2. Responsibilities:
   - Use route params to identify the job via data in `lib/constants/careers`.
   - If no job found, render Not Found using Next.js conventions.
   - Display full job details:
     - Title, category, location, employment type.
     - Detailed description, responsibilities, requirements, benefits.
     - Clear call-to-action to apply, scrolling to or embedding `JobApplicationForm`.

3. Implement job detail page as a **server component** that passes necessary data to client components if needed.

---

### 7. Implement Training, Life at YPI & Application Process Pages

1. **Training & Development Page** – `dev/app/(marketing)/careers/training/page.tsx`
   - Describe training programs, certifications, and skill development opportunities.
   - Use `CareerPath` to visualize progression for one or more representative roles.

2. **Life at YPI Page** – `dev/app/(marketing)/careers/life-at-ypi/page.tsx`
   - Showcase culture via images (from `dev/public/images`), employee testimonials, and benefits.
   - Use `EmployeeTestimonial` components and `BenefitsGrid`.

3. **Application Process Page** – `dev/app/(marketing)/careers/application-process/page.tsx`
   - Provide a step-by-step outline of the application process.
   - Include expectations, timelines, and an FAQ section.
   - Link clearly to job listings and job application flows.

All three pages should be server components with static data and composed sections.

---

### 8. Implement JobApplicationForm (Multi-Step, Frontend-Only)

1. File: `dev/components/forms/JobApplicationForm.tsx`
2. Mark as `"use client"`.
3. Use **React Hook Form + Zod** with `@hookform/resolvers`.

4. Structure the form as **multi-step**, for example:
   - Step 1: **Personal Information**
     - Name, email, phone, location.
   - Step 2: **Experience & Role Fit**
     - Years of experience, relevant skills, current role, desired position.
   - Step 3: **CV/Resume Upload & Additional Info**
     - File input for CV/Resume.
     - Textarea for cover letter or additional notes.

5. Behavior:
   - Show a progress indicator or stepper.
   - Validate each step with Zod schemas.
   - Prevent moving to the next step until current fields are valid.
   - For CV input in Phase 7:
     - Use `<input type="file" />` and manage the selected file in component state.
     - Do **not** upload to a server yet; simply treat it as part of the form data in memory.

6. Submission for Phase 7:
   - On final submit, do **not** call a real API.
   - Instead, simulate submission by:
     - Logging the data to console.
     - Showing a success message/toast and optionally resetting the form.

7. Integration:
   - Embed `JobApplicationForm` on each job detail page (`/careers/jobs/[jobId]`), either inline or in a dedicated section.

Ensure the form is accessible:
- Use labels connected to inputs.
- Present errors next to fields and summarize them where appropriate.
- Ensure all steps are keyboard navigable.

---

### 9. Navigation & Internal Linking

1. Ensure main navigation includes an entry for **Careers** (linking to `/careers`).
2. Within Careers pages:
   - `/careers` prominently links to `/careers/jobs`, `/careers/training`, `/careers/life-at-ypi`, and `/careers/application-process`.
   - Job listings and job detail pages cross-link appropriately (e.g., "Back to Job Listings").
   - Training and Life at YPI pages link back to `/careers` and `/careers/jobs` as relevant.

3. Use Next.js `Link` for all internal navigation.

---

### 10. SEO Metadata for Careers Pages

For each Careers route, define appropriate metadata via Next.js 14 conventions.

1. Pages to cover:
   - `/careers`
   - `/careers/jobs`
   - `/careers/jobs/[jobId]`
   - `/careers/training`
   - `/careers/life-at-ypi`
   - `/careers/application-process`

2. For each, export metadata with:
   - `title` – descriptive and unique.
   - `description` – concise summary tailored to the page.

3. Ensure metadata integrates cleanly with the root layout metadata and other sections.

---

### 11. Testing, Linting, and Build Verification

Working inside `dev/`:

1. Start the dev server:

   ```bash
   npm run dev
   ```

2. Manually test all Careers routes:
   - `/careers`
   - `/careers/jobs`
   - Several `/careers/jobs/[jobId]` URLs from the constants.
   - `/careers/training`
   - `/careers/life-at-ypi`
   - `/careers/application-process`

3. Verify:
   - No runtime errors in terminal or browser console.
   - Job filters behave correctly (update listings as expected).
   - JobApplicationForm multi-step flow works: validation, step navigation, success feedback.
   - Layouts are responsive and match the design system.

4. Stop the dev server and run:
   - `npm run lint`
   - `npm run build`

   Both must complete successfully.

5. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 7

Phase 7 (Careers & HR Pages) is complete when **all** of the following are true:

1. **Routes & Pages**
   - All planned routes exist and render without errors:
     - `dev/app/(marketing)/careers/page.tsx`
     - `dev/app/(marketing)/careers/jobs/page.tsx`
     - `dev/app/(marketing)/careers/jobs/[jobId]/page.tsx`
     - `dev/app/(marketing)/careers/training/page.tsx`
     - `dev/app/(marketing)/careers/life-at-ypi/page.tsx`
     - `dev/app/(marketing)/careers/application-process/page.tsx`
   - Pages use semantic HTML and are responsive.

2. **Reusable Components & Data Models**
   - Typed careers-related data lives under `dev/lib/constants/careers.ts`.
   - `JobCard`, `JobFilter`, `CareerPath`, `BenefitsGrid`, and `EmployeeTestimonial` exist and are integrated across Careers pages.

3. **Job Application Form**
   - `JobApplicationForm` exists under `dev/components/forms/` as a multi-step React Hook Form + Zod implementation.
   - It validates input per step, accepts a CV file input, and simulates submission with clear feedback.

4. **Navigation & SEO**
   - Main navigation and internal links connect Careers pages logically with each other and with the rest of the site.
   - Each Careers page exports appropriate metadata (title + description).

5. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - All Careers pages render correctly under `npm run dev` with no console errors.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase7.md`).

Once all these conditions are met, Phase 7 is considered **production-ready and fully functional for the Careers & HR section**.

Follow these instructions exactly and report each major change you make.
```

---

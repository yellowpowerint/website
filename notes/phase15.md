## Phase 15 Implementation Prompt (Content Population & QA, with dev/prod/notes structure)

```markdown
You are an expert full‑stack engineer and web QA lead specializing in **Next.js 14 (App Router)**, **TypeScript**, **content workflows**, **testing**, and **launch readiness** for production sites on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 15, you must assume that **Phases 0–14 are fully completed** per:

- `notes/phase0.md` – Project setup, Next.js app in `dev/`.
- `notes/phase1.md` – Design system & foundation.
- `notes/phase2.md` – Homepage.
- `notes/phase3.md` – About Us.
- `notes/phase4.md` – Services & Solutions.
- `notes/phase5.md` – Projects, Clients & Partnerships.
- `notes/phase6.md` – Sustainability & CSR.
- `notes/phase7.md` – Careers & HR.
- `notes/phase8.md` – News, Media & Contact.
- `notes/phase9.md` – Backend API & Form Handling.
- `notes/phase10.md` – SEO & Performance Optimization.
- `notes/phase11.md` – AI Features Integration.
- `notes/phase12.md` – Admin Dashboard & CMS.
- `notes/phase13.md` – Database Integration.
- `notes/phase14.md` – Advanced Features & Integrations.

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - All features are implemented and DB‑backed.
  - Admin dashboard exists and can manage major content types.
  - AI, SEO, and integrations are in place at least at a basic level.
  - `npm run lint` and `npm run build` succeed when run in `dev/`.

Phase 15 focuses on **filling the site with real content** and performing **comprehensive QA** across devices, browsers, forms, and integrations.

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
  - Markdown specs (`*.md`, design docs, PDFs, etc.).
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase14.md`, this `phase15.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 15 implementation work happens **inside `dev/`** (for code) plus content files/media placed in appropriate `dev/public/*` locations.

---

## Phase 15 Scope (Content Population & QA)

You are implementing **Phase 15: Content Population & QA** from `notes/phases.md`.

Goals:

1. Populate the site with **realistic production content** for:
   - Service descriptions & brochures.
   - Equipment photos & specs.
   - Project & case study content.
   - News & media.
   - Careers & HR (jobs, testimonials, culture).
   - CSR & sustainability content.
2. Gather, optimize, and organize **images, videos, and documents**.
3. Perform **end‑to‑end QA**:
   - Functional tests for pages, forms, search, PowerBot, admin.
   - Cross‑browser & cross‑device checks.
   - Performance, accessibility, and SEO verifications.
4. Fix issues and polish UX based on findings.

---

## Content & QA Constraints

- All media assets belong under `dev/public/` (e.g., `dev/public/images`, `dev/public/documents`).
- Only reference assets that are actually present in `public/`.
- Any stub or placeholder content must be clearly marked for future replacement.
- QA findings should be addressed **in code** (layouts, validations, error handling), not only as notes.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Content Inventory & Plan

1. Review `notes/ypi_tech_doc.md` and existing constants/DB schema to identify all content areas:
   - Services, equipment, projects, news, careers, CSR, etc.
2. Document (outside code, e.g., in `notes/` or external system) a **content checklist** for:
   - Textual content.
   - Images.
   - Videos.
   - PDFs/documents.

(You can keep the checklist in `notes/` or your own system; this prompt focuses on code and file placement.)

---

### 2. Populate Services Content & Brochures

1. Using the admin dashboard (preferred) or seed scripts/constants:
   - Fill out full descriptions for all services:
     - Pre Split Drilling.
     - Production Drilling.
     - Reverse Circulation Drilling.
     - Load & Haul Operations.
     - Construction Services.
2. For each service:
   - Provide detailed overview, features, benefits, typical use cases, and FAQs.
3. Service brochures (PDFs):
   - Place PDFs under `dev/public/documents/services/`.
   - Update frontend components (e.g., ServiceDetail, media pages) to link to these brochures.

Ensure:
- Links are valid and 404‑free.
- Content matches the YPI brand and tone.

---

### 3. Populate Equipment Photos & Specs

1. Place optimized equipment photos under `dev/public/images/equipment/`.
2. Update equipment data (via admin UI or seed) with:
   - Accurate names, categories, specs (capacity, power, usage).
   - Image paths pointing to the new files.
3. Verify:
   - Equipment pages and services sections that reference equipment show correct images.
   - No broken image URLs exist.

---

### 4. Populate Projects, Case Studies & Client Testimonials

1. Projects & Case studies:
   - Create multiple realistic project entries (via admin UI or seed):
     - Title, location, services used, timeline, metrics, results.
     - Upload project photos under `dev/public/images/projects/`.
   - For case studies, include:
     - Problem, solution, results, and key metrics.
     - Optional downloadable PDFs under `dev/public/documents/case-studies/`.

2. Clients & testimonials:
   - Fill in client list with anonymized or approved names.
   - Create testimonial entries with quotes and roles.
   - Ensure `ClientLogo` references real logo images under `dev/public/images/clients/`.

3. Check:
   - `/projects` and `/case-studies` display all entries.
   - Individual project/case pages load correctly and include images.

---

### 5. Populate Careers, CSR, and News Content

1. Careers:
   - Add real job postings (even if some are sample roles) using admin.
   - Ensure job details pages include thorough responsibilities, requirements, and benefits.
   - Fill out `Life at YPI`, training, and application process pages with real narrative text.
   - Add employee testimonials and any culture images.

2. CSR & Sustainability:
   - Populate CSR programs and projects with text and images (community projects, school/health initiatives, etc.).
   - Ensure metrics in SafetyDashboard/ImpactMetrics reflect plausible values.

3. News & Media:
   - Create several news articles and press releases with realistic content and dates.
   - Upload images and ensure they appear in news/media pages.

---

### 6. Document Preparation & Uploads

1. Place key documents under `dev/public/documents/`, e.g.:
   - Company profile PDF.
   - Service brochures.
   - Case study PDFs.
   - Certificates & awards.
   - Safety documentation.
2. Update frontend components (media kit, downloads on services/projects pages) to link to these documents.
3. Verify that downloads work and content is appropriate for public viewing.

---

### 7. Comprehensive Functional QA

Working inside `dev/`:

1. Start dev server:

   ```bash
   npm run dev
   ```

2. Manually test all major flows (desktop and mobile sizes):
   - Navigation through all main menu items and subpages.
   - All forms:
     - Quotes, consultations, partnerships, suppliers, job applications, contact, newsletter.
   - AI features:
     - PowerBot: service, careers, and CSR questions.
     - AI search (if exposed).
   - Admin dashboard:
     - Login/logout.
     - Content management pages.
     - Submissions views.
     - Media library.

3. Fix any **functional bugs** discovered:
   - Broken links.
   - Crashes or console errors.
   - Form validation gaps.

---

### 8. Cross-Browser & Cross-Device Testing

1. Test on major browsers (at least):
   - Chrome.
   - Firefox.
   - Edge.
   - Safari (if possible).

2. Test on mobile devices or simulators:
   - iOS Safari.
   - Chrome Mobile/Android.

3. For each, verify:
   - Layout and responsiveness.
   - Navigation and menus.
   - Forms and interactions.
   - No major layout breakages or unreadable text.

4. Fix CSS/layout issues surfaced by these tests.

---

### 9. Performance & Accessibility QA

1. Run Lighthouse audits (via browser devtools) on key pages:
   - Homepage, Services, Projects, Sustainability, Careers, News, Contact.

2. Verify:
   - Performance score target: **> 90** on mobile and desktop where feasible.
   - Core Web Vitals (LCP, CLS, INP) are within good ranges.

3. Accessibility review:
   - Test keyboard navigation across menus, forms, and interactive components.
   - Use a screen reader to spot obvious issues (labels, landmarks).
   - Check color contrast using available tools.

4. Fix issues by:
   - Adjusting images, lazy loading, or dynamic imports.
   - Improving ARIA attributes, headings, labels, and contrast.

---

### 10. SEO & Analytics Verification

1. Verify SEO basics:
   - All key pages have appropriate titles and descriptions.
   - Structured data (JSON‑LD) validates in external Rich Results testing tools.
   - `/sitemap.xml` and `/robots.txt` are accessible and correct.

2. Analytics & tracking:
   - Ensure Vercel Analytics is active.
   - If GA4 or similar is configured, verify page views/events in the provider dashboard (done outside code; here you only ensure code is correctly wired and does not error).

3. Fix any obvious issues (invalid metadata, broken JSON‑LD, etc.).

---

### 11. Bug Fixes & Final Polish

1. As you discover issues through tests:
   - Fix bugs in components, pages, or API routes.
   - Simplify confusing interactions.
   - Improve copy for clarity and professionalism.

2. Ensure there are **no console errors** in the browser on any main page or interaction.

3. Clean up:
   - Remove unused imports and dead code.
   - Standardize naming and component usage.

---

### 12. Final Linting, Build & Repo Hygiene

Working inside `dev/`:

1. Stop any running dev server.
2. Run:

   ```bash
   npm run lint
   npm run build
   ```

   Both must pass without errors.

3. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 15

Phase 15 (Content Population & QA) is complete when **all** of the following are true:

1. **Content Populated**
   - Services, equipment, projects, case studies, CSR programs, careers, news, and media sections contain realistic, coherent content.
   - Downloadable documents (company profile, brochures, case studies, certificates, safety docs) are present under `dev/public/documents/` and correctly linked.

2. **Media Assets**
   - Equipment, project, team, office, and CSR images exist under `dev/public/images/` and are correctly referenced.
   - Video testimonials and galleries function correctly.

3. **Functional QA Passed**
   - All public pages load correctly with no console errors.
   - All forms submit successfully to their APIs and persist records.
   - AI (PowerBot & search) respond reasonably and safely.
   - Admin dashboard flows (viewing content and submissions) function correctly.

4. **Cross‑Browser & Device QA Passed**
   - Core pages work on major browsers and mobile devices with no major layout or functional issues.

5. **Performance, Accessibility & SEO**
   - Lighthouse performance scores are ~90+ on key pages.
   - Accessibility issues identified in manual testing are addressed.
   - SEO basics (metadata, structured data, sitemap, robots) verify correctly.

6. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase15.md`).

Once all these conditions are met, Phase 15 is considered **production-ready and fully populated & QA‑verified**, paving the way for Phase 16 (Pre‑Launch Preparation).

Follow these instructions exactly and report each major change you make.
```

---

## Phase 10 Implementation Prompt (SEO & Performance Optimization, with dev/prod/notes structure)

```markdown
You are an expert Next.js 14 engineer and web performance/SEO specialist, experienced with **Next.js Metadata API**, **JSON-LD structured data**, **sitemap/robots configuration**, **image & code optimization**, and **Vercel Analytics / Core Web Vitals**.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 10, you must assume that **Phases 0–9 are fully completed** per:

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

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - App Router is configured with `(marketing)` and all major sections.
  - All key marketing pages and forms exist and are wired to API routes.
  - Design system is consistent and responsive.
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
  - Markdown specs (`*.md`, design docs, PDFs, etc.).
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase9.md`, this `phase10.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 10 implementation work happens **inside `dev/`**.

---

## Phase 10 Scope (SEO & Performance Optimization)

You are implementing **Phase 10: SEO & Performance Optimization** from `notes/phases.md`.

Goal: Make the site **search-friendly, share-friendly, and fast**, by:

- Defining rich, consistent metadata for all major pages using the **Next.js 14 Metadata API**.
- Adding **JSON-LD structured data** (Organization, LocalBusiness, Service, JobPosting, BreadcrumbList).
- Implementing a dynamic **sitemap** and **robots.txt**.
- Ensuring proper **image optimization** using `next/image`.
- Improving code-splitting and lazy-loading for heavy components.
- Integrating **analytics** (Vercel Analytics and optional GA4) and verifying Core Web Vitals.
- Performing basic accessibility and Lighthouse checks.

---

## Constraints & Quality Bar

- All work must respect folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (run in `dev/`).
  - **Lint successfully** with `npm run lint` (run in `dev/`).
  - Maintain or improve performance scores (target: Lighthouse > 90 on key pages).
- SEO/metadata must:
  - Provide meaningful `<title>` and `<meta name="description">` for all key routes.
  - Include OG/Twitter tags for major marketing pages.
  - Provide correct canonical URLs and prevent obvious duplicate-content issues.
- Structured data must:
  - Use valid JSON-LD, conforming to schema.org.
  - Pass basic validation (e.g., via external Rich Results Test, outside of this repo).

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Baseline Health

1. From repo root, confirm `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, fix issues before adding more complexity.

---

### 2. Centralize SEO Configuration & Site Constants

1. Create a small SEO helper module, e.g.:
   - `dev/lib/seo/config.ts`

2. Define:
   - `SITE_URL` – production base URL (e.g., `https://yellowpowerinternational.com`).
   - `DEFAULT_TITLE`, `DEFAULT_DESCRIPTION`.
   - `SITE_NAME`, `SITE_LOCALE`, `SOCIAL_HANDLES` (LinkedIn, etc.).

3. Export helpers to build metadata objects, e.g.:
   - `buildMetadata({ title, description, path, ... })`.
   - This helper can assemble `openGraph`, `twitter`, and base metadata structure.

4. Ensure these values are used across pages instead of hardcoding URLs and titles in many places.

---

### 3. Implement Metadata with Next.js 14 Metadata API

Use the Metadata API in **layouts and page files**.

1. Root marketing layout:
   - File: `dev/app/(marketing)/layout.tsx` (or root `app/layout.tsx` if shared).
   - Export a `metadata` object using defaults from `lib/seo/config`.

2. For key marketing pages, add or refine `metadata` exports:
   - `/` – homepage (`dev/app/(marketing)/page.tsx`).
   - `/about` & important subpages.
   - `/services` and core service detail pages.
   - `/projects` and `/projects/[slug]`.
   - `/sustainability` and main subpages.
   - `/careers`, `/careers/jobs`, `/careers/jobs/[jobId]`.
   - `/news`, `/news/[slug]`.
   - `/contact`.

For each:
- Use `buildMetadata` or similar helper to:
  - Set `title` (short, keyword-rich but not spammy).
  - Set `description`.
  - Set `openGraph` fields (url, title, description, type, images if available).
  - Set `twitter` card type (summary or summary_large_image).

3. Ensure no circular imports between metadata helpers and components.

---

### 4. Add JSON-LD Structured Data

Implement structured data under a dedicated directory.

1. Create `dev/lib/structured-data/` with files like:
   - `organization.ts`
   - `local-business.ts`
   - `services.ts`
   - `job-posting.ts`
   - `breadcrumbs.ts`

2. For each, export JSON-LD objects or builder functions, e.g.:

   ```ts
   export const organizationSchema = {
     "@context": "https://schema.org",
     "@type": "Organization",
     "name": "Yellow Power International",
     "url": "https://yellowpowerinternational.com",
     "foundingDate": "2017",
     // ...
   } as const
   ```

3. Inject JSON-LD into appropriate pages using `<script type="application/ld+json">` in server components.
   - E.g., in `app/(marketing)/layout.tsx` or specific pages:

     ```tsx
     <script
       type="application/ld+json"
       suppressHydrationWarning
       dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
     />
     ```

4. Cover at least:
   - **Organization** (site-wide).
   - **LocalBusiness** (for key office locations).
   - **Service** schema for main services pages.
   - **JobPosting** for individual job pages if practical (using job constants).
   - **BreadcrumbList** for major deep pages (services, careers, news article, etc.).

---

### 5. Implement Sitemap & Robots.txt

Use Next.js 14 app routing features for SEO files.

1. Sitemap – `dev/app/sitemap.ts`
   - Implement and export a `sitemap` function per Next.js docs.
   - Include:
     - Static routes (home, about, services, sustainability, careers, news, contact, etc.).
     - Dynamic routes derived from constants:
       - Projects: `/projects/[slug]`.
       - Services (if slugs defined in constants).
       - Jobs: `/careers/jobs/[jobId]`.
       - News articles: `/news/[slug]`.
   - Use `SITE_URL` from `lib/seo/config` when building full URLs.

2. Robots – `dev/app/robots.ts`
   - Export a `robots` function per Next.js docs.
   - Allow crawling of the entire site except any explicit admin/private paths (if any).
   - Reference sitemap URL.

3. Verify that:
   - `/sitemap.xml` returns correct XML.
   - `/robots.txt` returns correct content.

---

### 6. Image Optimization with `next/image`

Audit and improve image usage.

1. Identify major components/pages currently using `<img>` where `next/image` is more appropriate:
   - Hero/Equipment images.
   - Project and CSR galleries.
   - Leadership and team photos.
   - Media galleries.

2. Replace with `next/image` where beneficial:
   - Use `fill` or explicit `width`/`height`.
   - Provide `alt` text.
   - Use `sizes` attribute for responsive layouts.

3. Ensure:
   - Avoid using `next/image` for tiny icons where overhead outweighs benefit.
   - Images are served from `public/` or remote domains configured in `next.config` if needed.

4. Consider lazy loading and blur placeholders where helpful.

---

### 7. Code Splitting & Lazy Loading for Heavy Components

Optimize bundle size and loading behavior.

1. Identify heavy client components:
   - Mapbox-based components (maps).
   - Recharts dashboards (SafetyDashboard, ImpactMetrics).
   - Sliders/carousels.
   - VideoPlayer or MediaGallery with lightbox.

2. Use `next/dynamic` to lazy-load these components where appropriate, for example:

   ```ts
   const SafetyDashboard = dynamic(() => import("@/components/sections/SafetyDashboard"), {
     loading: () => <Skeleton />,
     ssr: false,
   })
   ```

3. Ensure:
   - Critical content remains server-rendered.
   - Heavy interactive components are only loaded on pages where used.

4. Clean up any unused imports or dead code to improve tree-shaking.

---

### 8. Analytics Integration (Vercel Analytics & Optional GA4)

1. Vercel Analytics:
   - Install if not already:

     ```bash
     cd dev
     npm install @vercel/analytics
     ```

   - Integrate via the recommended provider in `app/layout.tsx`.

2. Optional: Google Analytics 4
   - Set up GA4 measurement ID as an environment variable (e.g., `NEXT_PUBLIC_GA_ID`).
   - Add a small analytics component that injects GA script only in production.
   - Ensure no tracking scripts run in development by checking `process.env.NODE_ENV`.

3. Respect privacy and performance:
   - Load external scripts asynchronously.
   - Avoid blocking the main thread or layout.

---

### 9. Performance & Accessibility Checks

1. Start the dev or preview server from `dev/`:

   ```bash
   npm run dev
   ```

2. Using the browser and separate tools (Lighthouse, Web Vitals browser extension, etc., outside this repo):
   - Test key pages:
     - `/` (homepage)
     - `/services`
     - `/projects`
     - `/sustainability`
     - `/careers`
     - `/news`
     - `/contact`
   - Target Core Web Vitals thresholds:
     - LCP < 2.5s
     - FID (or INP proxy) < 100ms
     - CLS < 0.1

3. Based on findings, adjust:
   - Image sizes/quality.
   - Dynamic imports and lazy loading.
   - Remove unnecessary scripts or heavy libraries where possible.

4. Quick accessibility review:
   - Semantic headings and landmarks are consistent.
   - All interactive elements are focusable and have visible focus.
   - Color contrast is acceptable (based on WCAG 2.1 AA).

(Manual testing and tooling are external to this repo, but code changes in this phase should respond to obvious performance/accessibility issues.)

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

## Definition of Done for Phase 10

Phase 10 (SEO & Performance Optimization) is complete when **all** of the following are true:

1. **Metadata & Structured Data**
   - All major pages export meaningful `metadata` using Next.js 14 Metadata API.
   - JSON-LD structured data is implemented for Organization, LocalBusiness (offices), Services, JobPostings (for jobs), and BreadcrumbList where appropriate.

2. **Sitemap & Robots**
   - `dev/app/sitemap.ts` generates a sitemap covering static and dynamic routes.
   - `dev/app/robots.ts` exposes a robots.txt that allows crawling and references the sitemap.

3. **Images & Code Splitting**
   - Key hero, gallery, and media images use `next/image` appropriately.
   - Heavy interactive components are dynamically imported where sensible.

4. **Analytics & Performance**
   - Vercel Analytics is integrated.
   - Optional GA4 integration (if configured) is safely loaded via env var and only in production.
   - Manual tests show acceptable performance and no obvious regressions.

5. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase10.md`).

Once all these conditions are met, Phase 10 is considered **production-ready and fully functional for SEO & performance optimization**.

Follow these instructions exactly and report each major change you make.
```

---

## Phase 8 Implementation Prompt (News, Media & Contact Pages, with dev/prod/notes structure)

```markdown
You are an expert frontend engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **React Hook Form + Zod**, and rich content layouts on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 8, you must assume that **Phases 0–7 are fully completed** per:

- `notes/phase0.md` – Project setup, Next.js app in `dev/`.
- `notes/phase1.md` – Design system & foundation.
- `notes/phase2.md` – Homepage.
- `notes/phase3.md` – About Us.
- `notes/phase4.md` – Services & Solutions.
- `notes/phase5.md` – Projects, Clients & Partnerships.
- `notes/phase6.md` – Sustainability & CSR.
- `notes/phase7.md` – Careers & HR.

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - App Router is configured with `(marketing)` and sections from previous phases.
  - Design system and layout components are in place and reused across pages.
  - Mapbox integration is available from earlier phases (Global Presence / Locations) and uses `NEXT_PUBLIC_MAPBOX_TOKEN`.
  - `react-hook-form`, `zod`, and `@hookform/resolvers` are installed and used.
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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase7.md`, this `phase8.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 8 implementation work happens **inside `dev/`**.

---

## Phase 8 Scope (News, Media & Contact Pages)

You are implementing **Phase 8: News, Media & Contact Pages** from `notes/phases.md`.

Goal: Build complete, production-ready **News**, **Media**, and **Contact** sections that:

- Showcase latest news, press releases, and media assets (images & videos).
- Provide a rich media kit and galleries for visuals.
- Offer a flexible, multi-purpose **Contact page** with category-based forms and office locations.

Planned routes under `dev/app/(marketing)/`:

- `dev/app/(marketing)/news/page.tsx` – News & Media Hub (news listing).
- `dev/app/(marketing)/news/[slug]/page.tsx` – Individual News Article.
- `dev/app/(marketing)/news/press-releases/page.tsx` – Press Releases archive.
- `dev/app/(marketing)/media/page.tsx` – Media Kit.
- `dev/app/(marketing)/media/gallery/page.tsx` – Image Gallery.
- `dev/app/(marketing)/media/videos/page.tsx` – Video Library.
- `dev/app/(marketing)/contact/page.tsx` – Contact page with multi-purpose form & map.
- `dev/app/(marketing)/contact/locations/page.tsx` – Office Locations.

Reusable components (from `phases.md`):

- `dev/components/sections/NewsGrid.tsx` – News articles grid.
- `dev/components/sections/NewsFilter.tsx` – Filtering/search controls for news.
- `dev/components/ui/ShareButtons.tsx` – Social share buttons.
- `dev/components/sections/MediaGallery.tsx` – Image gallery with lightbox.
- `dev/components/sections/VideoPlayer.tsx` – Video player component.
- `dev/components/forms/ContactForm.tsx` – Multi-purpose contact form.
- `dev/components/sections/OfficeCard.tsx` – Office location card.

All forms in Phase 8 are **frontend-only** for now; real API routes and email sending will be added in Phase 9.

---

## Constraints & Quality Bar

- All work must respect folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (run in `dev/`).
  - **Lint successfully** with `npm run lint` (run in `dev/`).
  - Run with `npm run dev` (in `dev/`) without runtime errors when visiting any Phase 8 route.
- Pages must be:
  - **Responsive** across mobile, tablet, and desktop.
  - **Accessible-minded** (semantic headings, focus states, labels on forms, transcripts/alt text where appropriate).
  - **On-brand** using the existing design system.
- Contact form must:
  - Use React Hook Form + Zod.
  - Dynamically adjust fields based on selected inquiry category.
  - Provide clear, accessible validation and success feedback.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Previous Phases

1. From repo root, confirm that `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, resolve issues from earlier phases before proceeding.

---

### 2. Define Data Models for News, Press Releases, Media & Offices

Create typed models and placeholder datasets for news and media.

1. Add a constants file, e.g.:
   - `dev/lib/constants/news.ts`

2. Define TypeScript types/interfaces such as:
   - `NewsArticle` – `slug`, `title`, `excerpt`, `content`, `category`, `tags`, `publishedAt`, `author`, `heroImage`.
   - `PressRelease` – `id`, `title`, `publishedAt`, `summary`, `pdfUrl?`.
   - `MediaImage` – `id`, `title`, `src`, `alt`, `category`, `tags`.
   - `MediaVideo` – `id`, `title`, `thumbnail`, `videoUrl` (YouTube/Vimeo placeholder), `description`, `category`.
   - `OfficeLocation` – `id`, `name`, `address`, `city`, `country`, `phone`, `email?`, `coordinates`.

3. Export **placeholder arrays** for:
   - News articles (mix of categories: Projects, Equipment, Awards, Company News).
   - Press releases.
   - Image gallery items.
   - Video library items.
   - Office locations (at least 3 offices in different countries, with coordinates for Mapbox).

4. If useful, create additional constants files (e.g., `media.ts`, `offices.ts`), but keep them under `dev/lib/constants/`.

---

### 3. Implement News & Media UI Components

Create reusable components under `dev/components/sections/` and `dev/components/ui/`.

1. **NewsGrid**
   - File: `dev/components/sections/NewsGrid.tsx`
   - Responsibilities:
     - Render a responsive grid/list of `NewsArticle` items.
     - Show title, date, category, excerpt, and a link to `/news/[slug]`.

2. **NewsFilter**
   - File: `dev/components/sections/NewsFilter.tsx`
   - Responsibilities:
     - Provide filters (by category, date range, search term).
     - Implement as a client component (`"use client"`) using React state.
     - Expose filter state via callbacks so the parent can filter the news list.

3. **ShareButtons**
   - File: `dev/components/ui/ShareButtons.tsx`
   - Responsibilities:
     - Display social sharing buttons (LinkedIn, X/Twitter, Facebook) for a given article.
     - Accept a URL, title, and optional summary.
     - Use accessible icons/buttons; open share links in new tabs with `rel="noopener noreferrer"`.

4. **MediaGallery**
   - File: `dev/components/sections/MediaGallery.tsx`
   - Responsibilities:
     - Render a grid of `MediaImage` items with a lightbox or modal-style enlargement.
     - Mark as `"use client"` if using stateful lightbox behavior.

5. **VideoPlayer**
   - File: `dev/components/sections/VideoPlayer.tsx`
   - Responsibilities:
     - Render an embedded video (e.g., wrapping `<iframe>` for YouTube/Vimeo) with title and description.
     - Accept a `MediaVideo` or equivalent prop.

All components must be:
- Fully typed.
- Responsive.
- Consistent with the design system.

---

### 4. Implement News Pages

#### 4.1 News & Media Hub Page

1. File: `dev/app/(marketing)/news/page.tsx`
2. Responsibilities:
   - Display a list/grid of recent news articles using `NewsGrid`.
   - Provide filtering/search via `NewsFilter`.
   - Show selected categories (Projects, Equipment, Awards, Company News).

3. Implement filtering on the client side only (no backend yet).

#### 4.2 Individual News Article Page

1. File: `dev/app/(marketing)/news/[slug]/page.tsx`
2. Responsibilities:
   - Use route params to find the article from constants.
   - If not found, render Not Found.
   - Render full article content with:
     - Hero image.
     - Title, date, category, author.
     - Rich-text-style body (can be composed manually or from structured content).
     - `ShareButtons` for social sharing.
     - Section for related articles (e.g., 3 more from same category).

#### 4.3 Press Releases Page

1. File: `dev/app/(marketing)/news/press-releases/page.tsx`
2. Responsibilities:
   - List press releases in reverse chronological order.
   - Provide links to PDF downloads or placeholder URLs.
   - May reuse some of the `NewsGrid` styling or a simple list.

All pages should be server components that compose client components where necessary.

---

### 5. Implement Media Kit, Gallery & Video Library Pages

1. **Media Kit Page** – `dev/app/(marketing)/media/page.tsx`
   - Content:
     - Company logos (with download links).
     - Brand guidelines summary.
     - Fact sheet.
     - Leadership photos.
     - Contact for media inquiries.
   - Use static content and simple sections; later phases can add real downloads.

2. **Image Gallery Page** – `dev/app/(marketing)/media/gallery/page.tsx`
   - Content:
     - Use `MediaGallery` to display curated images from `MediaImage` data.
     - Group by category (equipment, projects, team, CSR) or filter client-side.

3. **Video Library Page** – `dev/app/(marketing)/media/videos/page.tsx`
   - Content:
     - Grid or list of `MediaVideo` entries with thumbnails.
     - Use `VideoPlayer` for currently selected or expanded video.

All media pages should:
- Be server components that feed data to client components (`MediaGallery`, `VideoPlayer`) as needed.
- Maintain consistent layout and navigation back to `/media` and other sections.

---

### 6. Implement OfficeCard & ContactForm Components

#### 6.1 OfficeCard

1. File: `dev/components/sections/OfficeCard.tsx`
2. Responsibilities:
   - Render an office location with name, address, city, country, phone, and email.
   - Accept an `OfficeLocation` prop.
   - Optionally show a small map snippet icon or link to view on map.

#### 6.2 ContactForm (Multi-Purpose, Frontend-Only)

1. File: `dev/components/forms/ContactForm.tsx`
2. Mark as `"use client"`.
3. Use **React Hook Form + Zod** with `@hookform/resolvers`.

4. Behavior:
   - Category select with options:
     - General inquiries.
     - Request for quote/consultation.
     - Partnership inquiries.
     - Supplier registration.
     - Career inquiries.
     - Media inquiries.
   - Dynamically adjust fields based on selected category.
     - Example: Quote requests include project details; supplier includes company & category; careers includes role of interest; media includes outlet & deadline.
   - Common required fields:
     - Name, email, message.
   - Per-category fields validated appropriately via Zod schema(s).

5. Submission (Phase 8):
   - On submit, do **not** call a real API.
   - Simulate submission by logging data and showing a success toast/message.
   - Clear the form or keep entered data with a visual confirmation; either is acceptable as long as UX is clear.

6. Accessibility:
   - Ensure labels are associated with inputs.
   - Announce errors and success states for screen readers.
   - Maintain good keyboard navigation.

---

### 7. Implement Contact & Office Locations Pages

1. **Contact Page** – `dev/app/(marketing)/contact/page.tsx`
   - Content:
     - Intro text explaining contact categories.
     - Embed `ContactForm` prominently.
     - Highlight 24/7 project support hotline and WhatsApp link.
     - Include a small map section or link to full locations page.

2. **Office Locations Page** – `dev/app/(marketing)/contact/locations/page.tsx`
   - Content:
     - List of offices using `OfficeCard` for each `OfficeLocation`.
     - Use Mapbox map (similar to Global Presence) to show markers for each office.
       - Reuse the Mapbox integration pattern from Phase 3.
       - Read token from `NEXT_PUBLIC_MAPBOX_TOKEN` and handle missing token gracefully.

Both pages should:
- Be server components that render client map/contact components as needed.
- Reuse existing layout and design system.

---

### 8. Navigation & Internal Linking

1. Ensure main navigation has an entry for **News & Media** and **Contact**.
2. Within Phase 8 pages:
   - `/news` links to `/news/press-releases` and `/media`.
   - Article pages link back to `/news` and to related content.
   - `/media` links to `/media/gallery`, `/media/videos`, and `/contact` for media inquiries.
   - `/contact` links to `/contact/locations`, and vice versa.

3. Use Next.js `Link` for client-side navigation.

---

### 9. SEO Metadata for News, Media & Contact Pages

For each new route, define appropriate metadata via Next.js 14 conventions.

1. Pages to cover:
   - `/news`
   - `/news/[slug]`
   - `/news/press-releases`
   - `/media`
   - `/media/gallery`
   - `/media/videos`
   - `/contact`
   - `/contact/locations`

2. For each, export metadata with:
   - `title` – descriptive and unique.
   - `description` – concise summary tailored to the page.

3. Ensure metadata integrates cleanly with the root layout metadata.

---

### 10. Testing, Linting, and Build Verification

Working inside `dev/`:

1. Start the dev server:

   ```bash
   npm run dev
   ```

2. Manually test all Phase 8 routes:
   - `/news` and several `/news/[slug]` URLs.
   - `/news/press-releases`
   - `/media`, `/media/gallery`, `/media/videos`
   - `/contact`, `/contact/locations`

3. Verify:
   - No runtime errors in terminal or browser console.
   - News filtering and navigation between articles work.
   - Media gallery and video player behave correctly and are responsive.
   - ContactForm behaves correctly: dynamic fields, validation, success state.
   - Map on `/contact/locations` renders when token is set and fails gracefully otherwise.

4. Stop the dev server and run:
   - `npm run lint`
   - `npm run build`

   Both must complete successfully.

5. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 8

Phase 8 (News, Media & Contact Pages) is complete when **all** of the following are true:

1. **Routes & Pages**
   - All planned routes exist and render without errors:
     - `dev/app/(marketing)/news/page.tsx`
     - `dev/app/(marketing)/news/[slug]/page.tsx`
     - `dev/app/(marketing)/news/press-releases/page.tsx`
     - `dev/app/(marketing)/media/page.tsx`
     - `dev/app/(marketing)/media/gallery/page.tsx`
     - `dev/app/(marketing)/media/videos/page.tsx`
     - `dev/app/(marketing)/contact/page.tsx`
     - `dev/app/(marketing)/contact/locations/page.tsx`
   - Pages use semantic HTML and are responsive.

2. **Reusable Components & Data Models**
   - Typed data for news, press releases, media assets, and offices live under `dev/lib/constants/`.
   - `NewsGrid`, `NewsFilter`, `ShareButtons`, `MediaGallery`, `VideoPlayer`, `ContactForm`, and `OfficeCard` exist and are integrated into their respective pages.

3. **Forms & Maps**
   - `ContactForm` uses React Hook Form + Zod, dynamically adjusts fields by category, and simulates submission with clear feedback.
   - Office locations map is implemented using Mapbox with secure token handling and graceful degradation.

4. **Navigation & SEO**
   - Main navigation and internal links connect News, Media, and Contact pages logically with the rest of the site.
   - Each Phase 8 page exports appropriate metadata (title + description).

5. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - All Phase 8 pages render correctly under `npm run dev` with no console errors.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase8.md`).

Once all these conditions are met, Phase 8 is considered **production-ready and fully functional for the News, Media & Contact sections**.

Follow these instructions exactly and report each major change you make.
```

---

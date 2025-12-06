## Phase 12 Implementation Prompt (Admin Dashboard & CMS, with dev/prod/notes structure)

```markdown
You are an expert full‑stack engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **NextAuth**, **shadcn/ui**, and admin dashboards/CMS-style UIs.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 12, you must assume that **Phases 0–11 are fully completed** per:

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
- `notes/phase10.md` – SEO & Performance.
- `notes/phase11.md` – AI Features Integration.

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - App Router is configured with `(marketing)` and marketing features.
  - Public-facing content and APIs exist for services, projects, careers, forms, search, and AI.
  - There is **no admin UI** yet; Phase 12 will introduce it.
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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase11.md`, this `phase12.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 12 implementation work happens **inside `dev/`**.

---

## Phase 12 Scope (Admin Dashboard & CMS)

You are implementing **Phase 12: Admin Dashboard (CMS)** from `notes/phases.md`.

Goal: Build a secure **admin dashboard** under `/admin` that allows authenticated staff to:

- Sign in to a protected admin area.
- View summary stats and recent submissions.
- Manage content (pages, news, services, projects, equipment, jobs).
- Review and manage form submissions.
- Manage media assets (images/documents).
- View high-level analytics and update basic settings.

This phase focuses on **UI, flows, and wiring to existing APIs/placeholder data**. Full database-backed persistence is introduced in Phase 13; for Phase 12 you may use in-memory or file/constant-based data, with clear seams to replace later.

---

## Security & Auth Constraints

- Use **NextAuth (next-auth)** for authentication.
- All `/admin` routes must be protected and require a valid admin session.
- Admin-only APIs must:
  - Check authentication/authorization server-side.
  - Never expose sensitive data to unauthenticated users.
- Do **not** hardcode passwords or secrets in the repo. Use env vars for providers/secrets.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Baseline Health

1. From repo root, ensure `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, fix issues before implementing the admin dashboard.

---

### 2. Install NextAuth & Admin UI Dependencies

All commands in this section are run **inside `dev/`**.

1. Install NextAuth:

   ```bash
   cd dev
   npm install next-auth
   ```

2. If needed for rich text editor:

   ```bash
   npm install @tiptap/react @tiptap/starter-kit
   ```

3. Ensure TypeScript types are available (NextAuth ships types; add extra types if necessary).

---

### 3. Configure NextAuth for Admin Authentication

1. Set up NextAuth route handler:
   - File: `dev/app/api/auth/[...nextauth]/route.ts`
   - Configure a basic provider for Phase 12, e.g.:
     - **Credentials provider** (admin email/password stored in env variables).
     - or a simple OAuth provider (e.g. GitHub/Google) restricted to specific emails.

2. Use env vars to store admin credentials or allowed emails:
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD` (for credentials provider), or
   - `ALLOWED_ADMIN_EMAILS`, etc.

3. Create a NextAuth config with:
   - `session` strategy (e.g., JWT).
   - `callbacks` to restrict sign-in to admin users.

4. Create an **auth helper** for server-side use:
   - e.g. `dev/lib/auth/getSession.ts` that wraps `getServerSession` and exports typed session.

5. Ensure sessions are available in server components and route handlers for `/admin`.

---

### 4. Implement Admin Login Page

1. File: `dev/app/admin/login/page.tsx`
2. Responsibilities:
   - Provide a login form (email + password or provider button) using shadcn/ui form components.
   - Call NextAuth’s `signIn` function (via `next-auth/react`) on submit.
   - Show error messages for failed login attempts.

3. Mark as `"use client"` since it will use hooks from `next-auth/react`.

4. Redirect authenticated users away from the login page to `/admin`.

---

### 5. Protect Admin Routes

1. Create an **admin layout**:
   - File: `dev/app/admin/layout.tsx`
   - Responsibilities:
     - Check for a valid admin session on the server (`getServerSession`).
     - If no session, redirect to `/admin/login`.
     - Render admin shell (sidebar, header, main content).

2. Structure:
   - Sidebar navigation with links to:
     - Dashboard Home
     - Content (Pages, News)
     - Services
     - Projects & Case Studies
     - Equipment
     - Careers (Jobs & Applications)
     - Submissions
     - Media Library
     - Analytics
     - Settings
   - Header with:
     - Current admin user info.
     - Logout button (calls `signOut`).

3. Use a **distinct admin theme** (e.g., slightly different background, typography accents) while reusing base design tokens.

---

### 6. Build Reusable Admin Components

Create core admin UI primitives under `dev/components/admin/` as per the plan.

1. **Sidebar** – `Sidebar.tsx`
   - Renders nav links grouped by section.
   - Highlights active route.

2. **StatsCard** – `StatsCard.tsx`
   - Displays a metric title, value, trend indicator.
   - Used on dashboard home and analytics.

3. **DataTable** – `DataTable.tsx`
   - Reusable table component with:
     - Columns definition.
     - Sortable headers (optional).
     - Pagination controls (front-end only for now).
   - Accepts generic type parameter for row data.

4. **RichTextEditor** – `RichTextEditor.tsx`
   - Wraps Tiptap (`@tiptap/react` + `@tiptap/starter-kit`).
   - Provides toolbar for basic formatting (bold, italic, headings, lists).
   - Exposes value and onChange so parent can persist content.

5. **FileUploader** – `FileUploader.tsx`
   - Provides file selection (single/multiple) for images/documents.
   - Integrates with existing upload APIs (from Phase 9) or uses stubbed API for Phase 12.
   - Shows upload progress and result URLs.

All admin components must be typed, responsive, and consistent with the overall design.

---

### 7. Implement Admin Dashboard Home

1. File: `dev/app/admin/page.tsx`
2. Responsibilities:
   - Show high-level overview:
     - Key metrics using `StatsCard` (e.g., total quote requests, total job applications).
     - Recent form submissions (latest quotes, contact messages) as a small table.
     - Quick actions (buttons linking to common admin tasks: add news, add job posting, etc.).

3. Data source for Phase 12:
   - Can be from in-memory/sample data, API calls that currently store to logs, or simple mocks.
   - Phase 13 will connect to a real database.

---

### 8. Content Management Pages

Implement UI for managing pages and news.

1. **Pages Management** – `dev/app/admin/content/pages/page.tsx`
   - List of high-level marketing pages.
   - Controls to edit metadata and content blocks (for now, operate on constants or stubbed models).

2. **News Management** – `dev/app/admin/content/news/page.tsx`
   - Table of news articles using `DataTable`.
   - Forms/modals to create, edit, and delete news items.
   - Use `RichTextEditor` for the article body.

3. For Phase 12:
   - Persist changes in memory or a JSON-like structure held in constants or temporary store.
   - Clearly separate persistence layer so Phase 13 can plug in real DB.

---

### 9. Services, Projects, Equipment & Careers Management

Create admin pages that operate over the existing constants/APIs.

1. **Services Management** – `dev/app/admin/services/page.tsx`
   - List of services with edit forms for descriptions, features, and images.
   - Use `FileUploader` for service images.

2. **Projects & Case Studies** – `dev/app/admin/projects/page.tsx`
   - Table of projects with create/edit/delete.
   - Upload project images.
   - Manage associated case study content.

3. **Equipment Management** – `dev/app/admin/equipment/page.tsx`
   - List of equipment with fields like name, category, specs, images.
   - Use `DataTable` + edit dialogs.

4. **Job Postings & Applications**
   - `dev/app/admin/careers/jobs/page.tsx` – Manage job postings.
   - `dev/app/admin/careers/applications/page.tsx` – View job applications list (fetched from API placeholders or sample data).

Again, Phase 12 can treat all data as coming from constants/API stubs, but structure the code so that later DB integration (Phase 13) is straightforward.

---

### 10. Form Submissions Management

1. Routes:
   - `dev/app/admin/submissions/quotes/page.tsx`
   - `dev/app/admin/submissions/consultations/page.tsx`
   - `dev/app/admin/submissions/partnerships/page.tsx`
   - `dev/app/admin/submissions/contact/page.tsx`

2. Responsibilities:
   - Display lists of submissions for each form using `DataTable`.
   - Show key fields (name, email, category, date, status).
   - Allow marking submissions as reviewed.
   - Provide export options (e.g., CSV download stub for Phase 12).

3. Data source:
   - For Phase 12, fetch from API endpoints that currently log or store in a temporary store (or use mocked data).
   - Phase 13 will replace this with true DB queries.

---

### 11. Media Library & Analytics

1. **Media Library** – `dev/app/admin/media/page.tsx`
   - Grid/list of uploaded images and documents.
   - Use `FileUploader` to add new media.
   - Allow filtering/searching by name, tag, or type.

2. **Analytics Dashboard** – `dev/app/admin/analytics/page.tsx`
   - Show high-level metrics derived from:
     - Vercel Analytics (if accessible via API or by manual copy of metrics).
     - Aggregated counts of form submissions or page hits (for now, can be mocked or derived from sample data).
   - Use `StatsCard` and simple charts (optional, reusing Recharts from Phase 6).

---

### 12. Settings Page

1. File: `dev/app/admin/settings/page.tsx`
2. Responsibilities:
   - Forms to update:
     - Company information (name, address, phones, website).
     - Contact email addresses for different departments.
     - Social media links.
     - Basic SEO settings (e.g., default title/description overrides).

3. For Phase 12:
   - Persist data in-memory or via a configuration constants module (with clear TODO for DB integration later).

---

### 13. Navigation, Authorization & UX Polish

1. Ensure all admin routes under `/admin`:
   - Are nested in `app/admin/*`.
   - Use the `admin/layout.tsx` so they are protected and share layout.

2. Authorization:
   - Restrict access to admin pages and relevant API routes.
   - Ensure logout works and clears sessions.

3. UX polish:
   - Breadcrumbs for deep admin routes (optional but recommended).
   - Clear labels, confirmation dialogs for destructive actions (delete).
   - Loading and empty states for tables.

---

### 14. Testing, Linting & Build Verification

Working inside `dev/`:

1. Start the dev server:

   ```bash
   npm run dev
   ```

2. Manually test:
   - `GET /admin/login` – login form works.
   - `POST /api/auth/[...nextauth]` – authentication flow works.
   - Navigating to `/admin` and subpages after login.
   - Basic CRUD flows using mocked or stubbed data.
   - File uploads (if wired to Cloudinary or stub endpoint) and display in Media Library.

3. Check that unauthenticated access to `/admin` redirects to `/admin/login`.

4. Stop the dev server and run:
   - `npm run lint`
   - `npm run build`

   Both must complete successfully.

5. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 12

Phase 12 (Admin Dashboard & CMS) is complete when **all** of the following are true:

1. **Authentication**
   - NextAuth is configured in `dev/app/api/auth/[...nextauth]/route.ts`.
   - Admin login page exists and works at `/admin/login`.
   - All `/admin` pages require a valid admin session and redirect unauthenticated users to login.

2. **Admin Shell & Components**
   - `app/admin/layout.tsx` provides a protected admin layout with sidebar and header.
   - Core admin components (`Sidebar`, `DataTable`, `StatsCard`, `RichTextEditor`, `FileUploader`) exist in `dev/components/admin/` and are used across pages.

3. **Admin Pages**
   - Admin routes exist and render without errors:
     - `app/admin/page.tsx` (dashboard home).
     - `app/admin/content/pages/page.tsx`.
     - `app/admin/content/news/page.tsx`.
     - `app/admin/services/page.tsx`.
     - `app/admin/projects/page.tsx`.
     - `app/admin/equipment/page.tsx`.
     - `app/admin/careers/jobs/page.tsx`.
     - `app/admin/careers/applications/page.tsx`.
     - `app/admin/submissions/*/page.tsx` for quotes, consultations, partnerships, contact.
     - `app/admin/media/page.tsx`.
     - `app/admin/analytics/page.tsx`.
     - `app/admin/settings/page.tsx`.
   - These pages support at least create/edit/delete or view flows over placeholder data.

4. **Security & UX**
   - Admin-only routes and APIs check authentication.
   - No admin functionality is accessible without a valid session.
   - UI has sensible navigation, loading/empty states, and basic error handling.

5. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase12.md`).

Once all these conditions are met, Phase 12 is considered **production-ready and fully functional as a CMS-style admin dashboard (using placeholder data / APIs, ready for DB integration in Phase 13)**.

Follow these instructions exactly and report each major change you make.
```

---

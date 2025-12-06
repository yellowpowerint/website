## Phase 13 Implementation Prompt (Database Integration with Prisma & Postgres, with dev/prod/notes structure)

```markdown
You are an expert full‑stack engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **PostgreSQL**, and **Prisma**, deploying to **Vercel** with a production‑grade database setup.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 13, you must assume that **Phases 0–12 are fully completed** per:

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
- `notes/phase12.md` – Admin Dashboard & CMS (currently using constants / mock data).

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - Public marketing site, APIs and admin UI are implemented, but **most domain data is still coming from constants or in-memory mocks**.
  - Forms are wired to API routes but **do not yet persist to a real database**.
  - `npm run lint` and `npm run build` succeed when run in `dev/`.

Phase 13 will introduce a **real Postgres database** (e.g., Neon), **Prisma ORM**, and update APIs/admin to use the DB instead of placeholder data.

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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase12.md`, this `phase13.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 13 implementation work happens **inside `dev/`**.

---

## Phase 13 Scope (Database Integration)

You are implementing **Phase 13: Database Integration (Optional Advanced)** from `notes/phases.md`.

Goal: Introduce a real **PostgreSQL database** and **Prisma ORM**, and migrate key domain data and APIs from constants/in-memory structures to persistent storage, while keeping the system production‑ready on Vercel.

Focus areas:

- DB setup (Neon or equivalent Postgres).
- Prisma schema covering major entities.
- Migrations and Prisma Client generation.
- Updating API routes to use Prisma.
- Wiring admin dashboard pages to read/write from the database.
- Seed script for initial content.

---

## Security & Infrastructure Constraints

- Database connection string must live in an environment variable: `DATABASE_URL`.
- Do **not** commit `.env` files or raw credentials.
- Use connection‑pool‑friendly config for Vercel (Prisma best practices).
- All Prisma usage must be **server-side only** (no Prisma Client in client components).

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Baseline Health

1. From repo root, ensure `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, resolve issues from previous phases before proceeding.

---

### 2. Set Up PostgreSQL (Neon or Equivalent)

This step involves configuration in external services (no code), but the code must assume:

1. A **PostgreSQL database** is created (e.g., Neon Cloud):
   - Note the connection string (including SSL parameters) for later use as `DATABASE_URL`.

2. In local development (not committed):
   - Add `DATABASE_URL` to `.env.local` inside `dev/` (ignored by Git).

3. On Vercel:
   - Configure `DATABASE_URL` in project environment variables for **Preview** and **Production**.

Do **not** hardcode this URL anywhere in the repo.

---

### 3. Install Prisma & Initialize It

All commands in this section are run **inside `dev/`**.

1. Install Prisma and Prisma Client:

   ```bash
   cd dev
   npm install @prisma/client
   npm install prisma --save-dev
   ```

2. Initialize Prisma:

   ```bash
   npx prisma init
   ```

This will create:
- `dev/prisma/schema.prisma`
- `dev/.env` (you may ignore or delete the generated `.env` file; use `.env.local` and Vercel env instead.)

3. Update Prisma config to use `DATABASE_URL` from env (it will already reference it; just ensure it matches your actual env setup).

---

### 4. Design Prisma Schema (`prisma/schema.prisma`)

Based on `notes/ypi_tech_doc.md` and `notes/phases.md`, model the core entities. At minimum include:

- **Users & Auth (for admin and possibly future clients)**
  - `User` – id, name, email, role, createdAt, updatedAt.
  - Any additional fields needed by NextAuth (e.g., `Account`, `Session` models) if you choose to use Prisma adapter later.

- **Content & Marketing**
  - `Service`
  - `Equipment`
  - `Project`
  - `CaseStudy`
  - `Client`
  - `Testimonial`
  - `NewsArticle`
  - `CSRProgram` (or similar for sustainability/CSR content).

- **Forms & Business Data**
  - `QuoteRequest`
  - `Consultation`
  - `Partnership`
  - `Supplier`
  - `JobPosting`
  - `JobApplication`
  - `ContactSubmission`
  - `NewsletterSubscriber`

- **Safety & Analytics (optional minimal models)**
  - `SafetyRecord`
  - `ChatConversation` / `ChatMessage` (if you plan to persist AI interactions).

Model them with appropriate relations, enums and indexes, guided by the Phase 13 list in `phases.md` and the schema idea in `ypi_tech_doc.md`.

Guidelines:
- Use `id` as `String` with `cuid()` or `Int` with `autoincrement()` where appropriate.
- Add `createdAt` / `updatedAt` timestamps to most tables.
- Use enums for statuses where useful (e.g., `JobApplicationStatus`).

---

### 5. Run Migrations & Generate Prisma Client

1. From `dev/`, after defining the schema, run:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

2. Ensure migrations apply cleanly to your local database.

3. Commit `prisma/schema.prisma` and the `prisma/migrations` directory to version control.

Do **not** commit any `.env` files.

---

### 6. Create a Prisma Client Helper

1. Create `dev/lib/db/prisma.ts` with a **singleton Prisma Client** pattern suitable for Next.js hot reload, e.g.:

   - Use the recommended pattern from Prisma docs for Next.js (global `prisma` variable in dev to avoid multiple instances).

2. Export `prisma` from this module.

3. Ensure this module is only imported from **server-side** code (API routes, server components, server actions), never from client components.

---

### 7. Update API Routes to Use Prisma

Update the API routes created in Phase 9 to read/write from the database instead of mocks or logs.

API routes to update include:

- `/app/api/quotes/route.ts` → `QuoteRequest` table.
- `/app/api/consultations/route.ts` → `Consultation` table.
- `/app/api/partnerships/route.ts` → `Partnership` table.
- `/app/api/suppliers/route.ts` → `Supplier` table.
- `/app/api/careers/applications/route.ts` → `JobApplication` table (and possibly link to `JobPosting`).
- `/app/api/contact/route.ts` → `ContactSubmission` table.
- `/app/api/newsletter/route.ts` → `NewsletterSubscriber` table.

For each:
1. After Zod validation succeeds, use `prisma` to create the relevant record.
2. If email sending fails, decide whether to still persist the record and return partial success; handle gracefully.
3. Ensure errors during DB operations return a sanitized 500 response and do not leak internal details.

---

### 8. Update Admin Dashboard to Use Prisma

Next, wire admin pages (Phase 12) to use real DB data.

1. For listing pages (e.g., admin submissions for quotes, partnerships, contact):
   - Replace mock/constant data with `prisma` queries in server components or server-side data loaders.
   - Use `prisma.quoteRequest.findMany()`, etc.

2. For management pages (services, projects, equipment, news, jobs):
   - Replace constant-based lists with `prisma` queries.
   - For Phase 13, you may:
     - Implement full CRUD via specific admin API routes (`app/api/admin/...`) that use Prisma.
     - Or use **server actions** in App Router to mutate records, if you adopt that pattern.

3. For job applications admin view:
   - Use `prisma.jobApplication.findMany()` to show applications.
   - Display CV URL if stored via uploads in Phase 9.

4. Ensure that **all admin mutations** check authentication/authorization.

---

### 9. Seed Script for Initial Data

1. Create `dev/prisma/seed.ts` to populate initial data for:
   - Services.
   - Sample projects & case studies.
   - Equipment.
   - A few news articles.
   - One or two job postings.

2. In `package.json` (inside `dev/`), add a script, e.g.:

   ```json
   "prisma": {
     "seed": "ts-node prisma/seed.ts"
   }
   ```

   or use plain JS (`node prisma/seed.js`) depending on your setup.

3. Run seeding locally:

   ```bash
   npx prisma db seed
   ```

4. Ensure seeding is **idempotent** or checks for existing records to avoid duplicates on repeated runs.

---

### 10. Performance, Pagination & Filtering

1. For list endpoints and admin tables that read from the DB:
   - Add **basic pagination** support via query params (e.g., `page`, `pageSize`).
   - Add filtering where already supported in the UI (e.g., by service type, status, category).

2. Ensure queries use:
   - Proper `orderBy` (e.g., newest submissions first).
   - Appropriate indexes defined in Prisma schema where necessary (e.g., on `createdAt`, `status`).

3. Keep DB access efficient and avoid N+1 patterns; use `include`/`select` strategically.

---

### 11. Testing, Linting & Build Verification

Working inside `dev/`:

1. Start the dev server:

   ```bash
   npm run dev
   ```

2. Manually test:
   - Submitting forms (quotes, contact, partnerships, suppliers, careers, newsletter) and verify records appear in the admin dashboard.
   - Admin CRUD flows for services, projects, equipment, jobs, and news against the DB.

3. After testing, stop the dev server and run:
   - `npm run lint`
   - `npm run build`

   Both must succeed.

4. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 13

Phase 13 (Database Integration) is complete when **all** of the following are true:

1. **Database & Prisma Setup**
   - A PostgreSQL database exists and is reachable via `DATABASE_URL` (configured in local env and Vercel).
   - Prisma is installed, initialized, and `prisma/schema.prisma` defines core tables (users, services, equipment, projects, case studies, clients, testimonials, quote_requests, partnerships, suppliers, job_postings, job_applications, news_articles, safety_records, csr_programs, chat_conversations, etc. as appropriate).
   - Migrations have been applied successfully and Prisma Client is generated.

2. **Prisma Client Usage**
   - A singleton Prisma Client helper exists in `dev/lib/db/prisma.ts` and is used by server-side code only.

3. **APIs Updated**
   - All key form-handling API routes (quotes, consultations, partnerships, suppliers, job applications, contact, newsletter) create/read records in the database.
   - API responses remain consistent with Phase 9 contracts.

4. **Admin Dashboard Wired to DB**
   - Admin submission views read from the database.
   - Admin management pages for content (services, projects, equipment, jobs, news) read from the database; mutations are routed through Prisma (either via admin APIs or server actions).

5. **Seed Data**
   - A Prisma seed script exists and can populate initial content into the DB.

6. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase13.md`).

Once all these conditions are met, Phase 13 is considered **production-ready and fully functional for database-backed content and form persistence**, enabling richer admin and analytics capabilities.

Follow these instructions exactly and report each major change you make.
```

---

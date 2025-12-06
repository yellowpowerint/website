## Phase 16 Implementation Prompt (Pre-Launch Preparation, with dev/prod/notes structure)

```markdown
You are an expert full‑stack engineer and DevOps/SRE specializing in **Next.js 14 (App Router)**, **Vercel deployments**, **DNS & SSL**, **security hardening**, and **production readiness checks**.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 16, you must assume that **Phases 0–15 are fully completed** per:

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
- `notes/phase15.md` – Content Population & QA.

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - All features are implemented, DB‑backed, and content is populated.
  - Functional, cross‑browser, performance, accessibility, and SEO checks have been done in Phase 15.
  - `npm run lint` and `npm run build` succeed when run in `dev/`.

Phase 16 focuses on **final pre‑launch preparation**:

- Domain and DNS configuration.
- Email and notification configuration.
- Security hardening.
- Monitoring & error tracking.
- Documentation.
- Final legal/compliance checks.
- Production deployment to the main branch and launch checklist.

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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase15.md`, this `phase16.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 16 implementation work happens **inside `dev/`** (for code/config) plus external configuration in DNS, email, and monitoring providers.

---

## Phase 16 Scope (Pre‑Launch Preparation)

You are implementing **Phase 16: Pre‑Launch Preparation** from `notes/phases.md`.

Goals:

1. Configure the **production domain** (e.g., `yellowpowerinternational.com`) with Vercel.
2. Ensure professional **email addresses** and email routing work end‑to‑end.
3. Harden **security** (HTTPS, secrets, headers, basic rate limiting/spam protection).
4. Set up **monitoring**, **analytics**, and **error tracking**.
5. Finalize **documentation** for developers and admins.
6. Conduct final **pre‑launch review** and production deployment.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/` or document external steps in `notes/`.

### 1. Verify Production Readiness Baseline

1. From repo root, ensure `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:

   ```bash
   npm run lint
   npm run build
   ```

   Both must pass.

3. Ensure Phase 15 QA issues have been addressed (no known showstopper bugs, no console errors on main flows).

---

### 2. Domain Configuration (External + Code Awareness)

These steps are mostly external but should be reflected in code/config expectations.

1. Domain:
   - Ensure the production domain (e.g., `yellowpowerinternational.com`) is purchased and managed (e.g., via a registrar or DNS host).
   - Add the domain to the Vercel project (done in Vercel UI, not in code).

2. DNS:
   - Configure DNS records per Vercel instructions (A/ALIAS or CNAME records).
   - Once DNS propagates, Vercel should provision SSL automatically.

3. Code‑side:
   - In `dev/lib/seo/config.ts`, ensure `SITE_URL` is set to the final production URL.
   - Review any environment‑based URL logic to ensure production uses the correct domain.

---

### 3. Email Configuration (Addresses & Notifications)

1. Professional email addresses:
   - Ensure addresses like `info@...`, `sales@...`, `careers@...`, `support@...` are configured at the email provider.
   - Set forwarding or inboxes as needed.

2. Code‑side verification:
   - In `dev/lib/config/env.ts` and any email utilities (`lib/api/email.ts`):
     - Ensure `from` and `to` addresses for notification emails use these professional emails.
   - Confirm all form‑related APIs (quotes, contact, careers, partnerships, suppliers) send to the correct recipients.

3. End‑to‑end tests (in staging/preview environment):
   - Submit each form and verify emails are received in the right inboxes.
   - Adjust subjects and message templates for clarity.

---

### 4. Security Hardening

1. Environment variables:
   - Double‑check that all secrets (API keys, DB URL, email provider keys, AI keys, etc.) are stored only in:
     - `.env.local` (dev, gitignored).
     - Vercel project env vars.
   - Confirm no secrets appear in the repo or in client‑side code.

2. HTTPS enforcement:
   - Vercel enforces HTTPS by default when using managed domain + SSL.
   - Ensure no `http://` hardcoded URLs exist for internal site links.

3. API hardening:
   - Review API routes for basic rate limiting (where implemented) and add simple protections if missing.
   - Ensure any admin or sensitive routes verify authentication/authorization.

4. Security headers (optional but recommended):
   - In `dev/next.config.*`, configure `headers()` to add:
     - `Content-Security-Policy` (CSP) tuned for scripts/images/fonts used.
     - `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, etc.
   - Test that CSP does not block critical scripts (analytics, AI, maps, etc.).

5. Spam protection:
   - Optionally integrate **reCAPTCHA** or similar for high‑risk forms (quote, contact, job application).
   - At minimum, ensure basic server‑side validation and rate limiting minimize abuse.

---

### 5. Monitoring & Error Tracking Setup

1. Vercel Analytics:
   - Confirm Vercel Analytics is enabled for the project.
   - Code‑side: ensure analytics import/component is present in layout as per Phase 10.

2. Error tracking (optional but recommended):
   - Choose a service (e.g., Sentry).
   - If integrating in this phase:
     - Install SDK in `dev/`.
     - Configure DSN via env var.
     - Add minimal initialization, ensuring no errors in dev.

3. Uptime monitoring:
   - Configure external uptime checks (e.g., UptimeRobot, StatusCake) pointing to the production URL.
   - No code changes required, but ensure health of `/` and potentially a simple `/health` endpoint if you choose to add one.

4. Backup strategy (if DB is used):
   - Confirm Neon (or your DB provider) has automatic backups and point‑in‑time recovery configured.
   - Optionally document backup/restore commands in `notes/` or internal docs, not in code.

---

### 6. Documentation

1. `README.md` (in `dev/` root):
   - Ensure README explains:
     - How to set up the project locally.
     - Required env variables.
     - How to run dev server, lint, build.
     - How to run Prisma migrations and seed data.
     - Basic deployment notes for Vercel.

2. API documentation:
   - Either in `README.md` or a dedicated `notes/api.md` (in `notes/`):
     - Document key `/api/*` endpoints, their purpose, inputs, and outputs.

3. Admin user guide:
   - Add or update a doc in `notes/` (e.g., `notes/admin_guide.md`) describing:
     - How to log into `/admin`.
     - How to manage content, media, and submissions.
     - Any roles/permissions assumptions.

4. Content update procedures:
   - Document how non‑technical staff can:
     - Add/edit news.
     - Update job postings.
     - Upload new media.
     - Trigger AI knowledge base updates (if applicable).

---

### 7. Legal & Compliance Review

1. Legal pages:
   - Ensure `Privacy Policy` and `Terms of Service` pages exist (e.g., `/privacy`, `/terms`).
   - Verify links to these pages from footer and other relevant locations.

2. Cookie consent (if required):
   - If using analytics or tracking that requires consent, ensure a cookie banner or consent mechanism is implemented.

3. Content accuracy:
   - Verify that company details (name, addresses, contact info) are correct and consistent across the site.
   - Validate key claims for accuracy and compliance.

---

### 8. Final Production Deployment Workflow

1. Git workflow (outside of code, but influenced by it):
   - Ensure `develop` contains all up‑to‑date changes.
   - Merge `develop` → `main` for production.

2. Code‑side expectations:
   - Ensure no `process.env` checks assume `development` incorrectly in production.
   - Ensure any `NEXT_PUBLIC_*` env vars used in production are set in Vercel.

3. Once `main` is updated and pushed, Vercel will deploy:
   - Confirm build succeeds in Vercel dashboard.
   - Verify production site is available at the custom domain.

---

### 9. Production Smoke Tests

On production deployment (not dev), perform smoke tests:

1. Visit key pages on production domain:
   - `/`, `/about`, `/services`, `/projects`, `/sustainability`, `/careers`, `/news`, `/contact`, `/admin` (login only for admin).

2. Test core flows:
   - Submit each form once (with test data) and verify:
     - Success message.
     - Email notifications received.
     - DB entries created (via admin or direct DB inspection if needed).

3. Test AI and search:
   - Send a few PowerBot queries.
   - Run AI search (if exposed).

4. Check logs and monitoring:
   - Ensure no critical errors appear in Vercel logs.
   - Confirm uptime monitor shows site as up.

---

### 10. Post-Launch Monitoring Plan

1. For the weeks following launch, define regular checks (documented in `notes/` or an ops runbook):
   - Daily: check error logs, form submissions, and key business flows.
   - Weekly: review analytics, search queries, and AI usage.
   - Monthly/quarterly: deeper performance and SEO audits.

2. Ensure someone is responsible (outside code) for reviewing these metrics and triaging issues.

---

### 11. Final Linting, Build & Repo Hygiene

Working inside `dev/`:

1. One last time, run:

   ```bash
   npm run lint
   npm run build
   ```

   Both must pass.

2. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 16

Phase 16 (Pre‑Launch Preparation) is complete when **all** of the following are true:

1. **Domain & Email**
   - Production domain is configured on Vercel and uses HTTPS.
   - Professional email addresses are configured and all form notifications go to correct inboxes.

2. **Security & Secrets**
   - All secrets are stored only in env vars.
   - API keys are not exposed client‑side.
   - Basic security headers and anti‑abuse measures (rate limiting / captcha where appropriate) are in place.

3. **Monitoring & Backups**
   - Vercel Analytics and optional error tracking/uptime monitoring are configured.
   - DB backup/restore options are understood and documented.

4. **Documentation**
   - README is up to date.
   - API documentation and admin guide exist in `notes/`.
   - Content update procedures are documented.

5. **Final Verification**
   - Production smoke tests on the real domain pass for all key flows.
   - No critical issues remain open.

6. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase16.md`).

Once all these conditions are met, Phase 16 is considered **production-ready and fully functional for launch**, and the site is ready to go live on the official domain.

Follow these instructions exactly and report each major change you make.
```

---

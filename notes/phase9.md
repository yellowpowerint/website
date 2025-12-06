## Phase 9 Implementation Prompt (Backend API & Form Handling, with dev/prod/notes structure)

```markdown
You are an expert Next.js 14 and TypeScript engineer with strong experience in **API route handlers**, **Zod validation**, **email integrations (SendGrid/Resend)**, and **file upload handling (Cloudinary/S3)** on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 9, you must assume that **Phases 0–8 are fully completed** per:

- `notes/phase0.md` – Project setup, Next.js app in `dev/`.
- `notes/phase1.md` – Design system & foundation.
- `notes/phase2.md` – Homepage.
- `notes/phase3.md` – About Us.
- `notes/phase4.md` – Services & Solutions.
- `notes/phase5.md` – Projects, Clients & Partnerships.
- `notes/phase6.md` – Sustainability & CSR.
- `notes/phase7.md` – Careers & HR.
- `notes/phase8.md` – News, Media & Contact.

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - App Router is configured with `(marketing)` and all sections from previous phases.
  - Design system, layout components, and front-end forms are implemented and currently **simulate submission on the client side** (no real backend).
  - `react-hook-form`, `zod`, and `@hookform/resolvers` are installed and used in forms.
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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase8.md`, this `phase9.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 9 implementation work happens **inside `dev/`**.

---

## Phase 9 Scope (Backend API & Form Handling)

You are implementing **Phase 9: Backend API & Form Handling** from `notes/phases.md`.

Goal: Turn all key marketing forms into **real API-backed flows** using Next.js App Router **route handlers** under `dev/app/api/`, with:

- Centralized **Zod validation** in `dev/lib/validations/*`.
- **Email notifications** via an external provider (SendGrid or Resend).
- **Optional file uploads** for job applications (e.g., to Cloudinary or S3) with secure env var handling.
- Frontend forms updated to call these APIs and handle success/error states gracefully.

Planned API routes under `dev/app/api/` (from `phases.md`):

- `dev/app/api/auth/` (basic placeholder for now, or minimal stub).
- `dev/app/api/quotes/route.ts` – Quote Request.
- `dev/app/api/consultations/route.ts` – Consultation bookings.
- `dev/app/api/partnerships/route.ts` – Partnership applications.
- `dev/app/api/suppliers/route.ts` – Supplier registrations.
- `dev/app/api/careers/applications/route.ts` – Job applications (with file upload).
- `dev/app/api/contact/route.ts` – General/multi-category contact.
- `dev/app/api/newsletter/route.ts` – Newsletter subscriptions.

Each route will:

- Accept **POST** requests.
- Validate the request body with Zod.
- Optionally send an email notification.
- Optionally handle file upload (for career applications).
- Return structured JSON responses with success/error messages.

Database persistence will be added in later phases; for now, focus on validation, email, and file handling.

---

## Constraints & Quality Bar

- All work must respect folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (run in `dev/`).
  - **Lint successfully** with `npm run lint` (run in `dev/`).
  - Run with `npm run dev` (in `dev/`) without runtime errors when submitting any form.
- API design must:
  - Use Next.js 14 **route handlers** (`export async function POST(...)`) under `app/api/*/route.ts`.
  - Use **Zod** schemas for all external inputs.
  - Never trust `req.json()` without validation.
  - Handle errors gracefully and return consistent JSON error shapes.
- Email & upload handling must:
  - Use environment variables for secrets (no keys in code).
  - Fail gracefully (log and return a safe error, but do not crash) if env vars are missing.

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

### 2. Install Backend-Related Dependencies

All commands in this section are run **inside `dev/`**.

1. Choose an **email provider** (recommended: **Resend** or **SendGrid**). Install the appropriate package, for example:

   ```bash
   cd dev
   # Option A: Resend (recommended with Vercel)
   npm install resend

   # Option B: SendGrid
   # npm install @sendgrid/mail
   ```

2. Choose an **upload provider** for CVs (recommended: **Cloudinary** for simplicity). Install:

   ```bash
   # For Cloudinary
   npm install cloudinary

   # (Alternative, if desired later: S3)
   # npm install @aws-sdk/client-s3
   ```

3. Ensure TypeScript can import these modules without errors.

---

### 3. Configure Environment Variables (Code-Side)

1. Create a small env helper, e.g. `dev/lib/config/env.ts`, that:
   - Reads relevant env vars using `process.env.*`.
   - Exposes typed helpers such as:
     - `EMAIL_PROVIDER` / `RESEND_API_KEY` / `SENDGRID_API_KEY`.
     - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
   - Provides functions that **check presence** of required variables and either:
     - Return them, or
     - Throw/log a descriptive error (for internal use) or mark provider as unavailable.

2. Document expected env vars (to be set in Vercel or `.env.local`, not committed):

   ```text
   RESEND_API_KEY=...
   SENDGRID_API_KEY=...
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   NEXT_PUBLIC_MAPBOX_TOKEN=...
   ```

3. Do **not** create or commit any `.env` file; only reference env vars in code.

---

### 4. Create Validation Schemas in `lib/validations`

Create centralized Zod schemas matching the forms built in Phases 4, 5, 7, and 8.

1. Under `dev/lib/validations/`, create files such as:
   - `quote.ts`
   - `consultation.ts`
   - `partnership.ts`
   - `supplier.ts`
   - `application.ts` (careers)
   - `contact.ts`
   - `newsletter.ts`

2. For each file, define Zod schemas that match the corresponding form fields:
   - **Quote** – service(s), project details, contact info.
   - **Consultation** – topic, preferred time, contact info.
   - **Partnership** – company info, partnership type, proposal summary.
   - **Supplier** – company info, registration number, categories, capabilities.
   - **Application** – personal info, experience, desired role, optional notes; CV metadata (filename, size, type).
   - **Contact** – category, name, email, message, plus category-specific fields.
   - **Newsletter** – email only (with proper email validation).

3. Export both:
   - Zod schema (e.g., `quoteSchema`).
   - TypeScript type inferred from it (e.g., `QuoteInput = z.infer<typeof quoteSchema>`).

---

### 5. Implement Email & Upload Utilities in `lib/api`

Create reusable helpers under `dev/lib/api/` to keep route handlers clean.

1. **Email Utility** – `dev/lib/api/email.ts`
   - Implement a function like `sendEmail(options)` that:
     - Accepts common fields: `to`, `subject`, `text`, `html`.
     - Internally uses Resend or SendGrid depending on configuration.
     - Reads API keys from `lib/config/env`.
     - Handles missing configuration by logging a warning and returning a structured error/success result instead of throwing unhandled exceptions.

2. **Upload Utility** – `dev/lib/api/uploads.ts`
   - If using Cloudinary:
     - Configure the Cloudinary client using env vars from `lib/config/env`.
     - Implement a function like `uploadCvFile(file: File | Blob | Buffer, filename: string)` that uploads CVs and returns a URL.
   - For Phase 9:
     - You can accept `base64` or `multipart` uploads depending on the implementation choice.
     - Keep the implementation simple but secure; enforce file size and type checks.

3. These utilities must be fully typed and only used from server-side code (route handlers).

---

### 6. Implement API Route Handlers in `app/api`

Implement the following route handlers under `dev/app/api/`.

Each route should:
- Export `POST` handler (`export async function POST(req: NextRequest)`).
- Parse `await req.json()` (or form data for file uploads).
- Validate input via Zod schemas from `lib/validations/*`.
- On success, optionally call `sendEmail` and/or `uploadCvFile`.
- Return `NextResponse.json({ success: true, ... })` on success or `{ success: false, error: ... }` on failure with appropriate status codes.

1. **Quote Request API** – `dev/app/api/quotes/route.ts`
   - Validates quote request body with `quoteSchema`.
   - Sends an email to a configured sales address.

2. **Consultation Booking API** – `dev/app/api/consultations/route.ts`
   - Validates consultation data with `consultationSchema`.
   - Sends email notification, optionally with ICS/calendar-friendly info in the message body.

3. **Partnership Application API** – `dev/app/api/partnerships/route.ts`
   - Validates partnership application data.
   - Sends email to business development inbox.

4. **Supplier Registration API** – `dev/app/api/suppliers/route.ts`
   - Validates supplier registration data.
   - Sends email to procurement inbox.

5. **Job Application API** – `dev/app/api/careers/applications/route.ts`
   - Accepts job application payload from the frontend.
   - For Phase 9, you can:
     - Either accept JSON with metadata + base64-encoded CV.
     - Or accept `multipart/form-data` and parse file plus fields.
   - Validate main data with `applicationSchema`.
   - If upload provider is configured, upload CV and include URL in email payload.
   - Send confirmation email to HR inbox and optional acknowledgement to applicant.

6. **Contact Form API** – `dev/app/api/contact/route.ts`
   - Validates contact form body with `contactSchema` (category-based).
   - Routes to the appropriate internal email recipient based on category (BD, HR, media, etc.).

7. **Newsletter Subscription API** – `dev/app/api/newsletter/route.ts`
   - Validates email via `newsletterSchema`.
   - For Phase 9, you may:
     - Store email in an in-memory array/log (dev only) or
     - Call a newsletter provider API later; for now, optional email notification is enough.

8. **Auth API (Optional Stub)** – `dev/app/api/auth/route.ts` or nested structure
   - For Phase 9, this can simply return a 501 Not Implemented or basic stub; real auth will come later.

All handlers must:
- Handle malformed JSON or invalid payloads with appropriate `400` responses and error messages.
- Catch unexpected errors and return `500` with a generic message while logging the real error on the server.

---

### 7. Wire Frontend Forms to the New APIs

Update all previously created forms to call the appropriate API routes instead of simulating submission.

Forms to update include (from earlier phases):

- `QuoteRequestForm` – should POST to `/api/quotes`.
- `PartnershipForm` – should POST to `/api/partnerships`.
- `SupplierRegistrationForm` – should POST to `/api/suppliers`.
- `JobApplicationForm` – should POST to `/api/careers/applications`.
- `ContactForm` – should POST to `/api/contact`.
- `NewsletterSignup` (if implemented) – should POST to `/api/newsletter`.

For each form:

1. Replace client-side "fake" submit logic with an `async` function that:
   - Calls `fetch('/api/...', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })` (or `FormData` for file uploads).
   - Handles non-200 responses by reading JSON and showing error messages.
   - Shows loading states (disabled submit + spinner) during the request.
   - On success, shows a clear success message and optionally resets the form.

2. Keep **client-side Zod validation via React Hook Form** in place; API validation is an additional safety layer, not a replacement.

3. Ensure error messages are user-friendly and accessible (e.g., focus on error summary, ARIA live regions, etc.).

---

### 8. Testing APIs Locally

1. Start the dev server from `dev/`:

   ```bash
   npm run dev
   ```

2. Manually test all forms through the UI:
   - Submit valid and invalid data.
   - Verify that:
     - Client-side validation catches obvious issues.
     - API returns correct error messages for invalid payloads (e.g., missing fields).
     - Success responses trigger correct UI feedback.

3. Optionally, use a tool like Thunder Client/Postman/Insomnia (outside code) to hit the `/api/*` endpoints directly for additional tests.

4. If email or upload env vars are not set:
   - Ensure endpoints handle this gracefully (e.g., log a warning, still return `success: true` with a note that email/ upload is disabled in this environment, or return a controlled error state that the frontend can display).

---

### 9. Linting, Build Verification & Repo Hygiene

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

## Definition of Done for Phase 9

Phase 9 (Backend API & Form Handling) is complete when **all** of the following are true:

1. **API Routes Implemented**
   - The following route handlers exist and behave correctly:
     - `dev/app/api/quotes/route.ts`
     - `dev/app/api/consultations/route.ts`
     - `dev/app/api/partnerships/route.ts`
     - `dev/app/api/suppliers/route.ts`
     - `dev/app/api/careers/applications/route.ts`
     - `dev/app/api/contact/route.ts`
     - `dev/app/api/newsletter/route.ts`
     - Optional: `dev/app/api/auth/*` stub.
   - All routes validate input with Zod and return consistent JSON success/error shapes.

2. **Validation & Utilities**
   - Zod schemas live under `dev/lib/validations/*` for all forms.
   - Email and upload utilities exist under `dev/lib/api/` and are used by route handlers.
   - Env variables are read only via the helper in `dev/lib/config/env.ts`.

3. **Frontend Forms Integrated**
   - All primary forms (quotes, partnerships, suppliers, careers, contact, newsletter) call their corresponding APIs.
   - Forms show proper loading, success, and error states based on API responses.

4. **Environment & Safety**
   - Secrets (API keys, Cloudinary credentials) are **not** hard-coded in the repo.
   - API routes behave sensibly when env vars are missing (no crashes).

5. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - All forms submit successfully under `npm run dev` with no console errors.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase9.md`).

Once all these conditions are met, Phase 9 is considered **production-ready and fully functional for backend API & form handling**.

Follow these instructions exactly and report each major change you make.
```

---

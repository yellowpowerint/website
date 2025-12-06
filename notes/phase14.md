## Phase 14 Implementation Prompt (Advanced Features & Integrations, with dev/prod/notes structure)

```markdown
You are an expert full‑stack engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **Next.js API routes**, **third‑party integrations** (WhatsApp, social media, email marketing, chat), and **i18n (next-intl)**, building production-ready integrations on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 14, you must assume that **Phases 0–13 are fully completed** per:

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
- `notes/phase13.md` – Database Integration (Prisma + Postgres).

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - All core marketing and admin experiences exist and are DB-backed.
  - Forms, APIs, AI features, and admin dashboard are functioning.
  - `npm run lint` and `npm run build` succeed when run in `dev/`.

Phase 14 will add **advanced integrations**:

- WhatsApp Business and live chat enhancements.
- Social media integrations.
- Newsletter system integration (Mailchimp/SendGrid).
- Early client portal scaffolding (future feature; minimal in this phase).
- Video testimonials and richer map interactions.
- Optional multi-language scaffolding (next-intl).

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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase13.md`, this `phase14.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 14 implementation work happens **inside `dev/`**.

---

## Phase 14 Scope (Advanced Features & Integrations)

You are implementing **Phase 14: Advanced Features & Integrations** from `notes/phases.md`.

Goal: Add production-ready **communication, marketing, media, and UX enhancements** on top of the existing platform, specifically:

- WhatsApp Business integration & live chat enhancements.
- Social media sharing/follow & optional feed embeds.
- Newsletter integration with a real email marketing provider.
- Initial scaffolding for a future **client portal**.
- Video testimonials & gallery.
- Interactive map enhancements (projects & offices).
- Optional multi-language scaffolding (next-intl).

Focus on **clean, configurable integrations** that can be enabled/disabled via env vars and are safe for production.

---

## Security & Integration Constraints

- All third‑party keys/tokens must come from environment variables (no secrets in code):
  - `WHATSAPP_BUSINESS_NUMBER` / `WHATSAPP_API_TOKEN?` (if used).
  - `MAILCHIMP_API_KEY` / `MAILCHIMP_AUDIENCE_ID` or equivalent for chosen newsletter provider.
  - `SOCIAL_TWITTER_URL`, `SOCIAL_LINKEDIN_URL`, etc.
- All external calls must:
  - Handle timeouts and network errors gracefully.
  - Fail safely (e.g., disable feature, show friendly error) when misconfigured.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Baseline Health

1. From repo root, ensure `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, fix issues before adding advanced integrations.

---

### 2. WhatsApp Business Integration

1. Decide on **integration mode** for this phase:
   - **Minimum viable**: click‑to‑chat links using `https://wa.me/<number>` or `https://api.whatsapp.com/send?phone=...`.
   - Optional: add support for a future official WhatsApp Business API (just scaffolding, no complex flows yet).

2. Configuration:
   - Add env vars such as:
     - `NEXT_PUBLIC_WHATSAPP_NUMBER` – E.164 phone format.
   - Extend `dev/lib/config/env.ts` with helpers to read this value.

3. UI integration:
   - Add reusable `WhatsAppButton` component under `dev/components/shared/WhatsAppButton.tsx`:
     - Renders a button or link styled with brand colors and WhatsApp icon.
     - Accepts an optional prefilled message.
   - Place WhatsApp CTAs in:
     - Contact page.
     - Header/footer (optional small icon).
     - Key service pages (e.g., service detail pages) as “Chat on WhatsApp”.

4. Ensure:
   - Links open in a new tab on desktop; on mobile, open the WhatsApp app.
   - If env var is missing, button is hidden or disabled gracefully.

---

### 3. Social Media Integration

1. Configuration:
   - Add env vars for social URLs, e.g.:
     - `NEXT_PUBLIC_LINKEDIN_URL`
     - `NEXT_PUBLIC_TWITTER_URL`
     - `NEXT_PUBLIC_FACEBOOK_URL`
   - Extend `lib/config/env.ts` with getters.

2. Follow/Presence:
   - Add a `SocialLinks` component under `dev/components/shared/SocialLinks.tsx`:
     - Shows icons linking to social profiles.
     - Used in footer, About pages, and Contact page.

3. Sharing:
   - Reuse or extend `ShareButtons` from Phase 8 to:
     - Be available on all major content pages (services, projects, case studies, news).
     - Ensure canonical URLs and correct titles/descriptions are used.

4. Optional: LinkedIn feed embed
   - For this phase, only provide a placeholder component (e.g., `LinkedInFeed`) with an iframe or note; actual embed code can be wired later.

---

### 4. Newsletter System Integration

1. Choose newsletter provider consistent with Phase 9 (Mailchimp or SendGrid marketing).

2. Configuration:
   - Env vars like:
     - `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`, `MAILCHIMP_AUDIENCE_ID`.

3. API route:
   - Implement or extend `/app/api/newsletter/route.ts` to:
     - Validate email via Zod.
     - Call the provider API to add/update subscriber.
     - Handle provider errors gracefully.

4. Frontend:
   - Update `NewsletterSignup` component (wherever it lives, e.g., `components/forms/NewsletterSignup.tsx`) to:
     - POST to `/api/newsletter`.
     - Show success/failure messages based on provider response.

5. Optional: Newsletter archive page (static for now)
   - Route: `dev/app/(marketing)/news/newsletter-archive/page.tsx`.
   - List placeholder or manually curated past newsletters.

---

### 5. Client Portal Scaffolding (Future Feature)

Phase 14 does **not** implement a full client portal, but you will:

1. Define the initial route structure:
   - `dev/app/client/page.tsx` – Portal landing (placeholder.
   - `dev/app/client/login/page.tsx` – Login page (can reuse NextAuth later).
   - `dev/app/client/projects/page.tsx` – Placeholder project status dashboard.
   - `dev/app/client/documents/page.tsx` – Placeholder document access.
   - `dev/app/client/requests/page.tsx` – Placeholder service request forms.

2. All client portal routes must:
   - Be isolated from marketing under `/client`.
   - Show clear “Coming Soon” / placeholder content explaining planned capabilities.
   - Be visually distinct but still brand‑aligned.

3. Setup basic layout:
   - `dev/app/client/layout.tsx` – simple layout for future client portal.

4. Do **not** expose any sensitive data or implement real auth/authorization yet; that will come in a future dedicated phase.

---

### 6. Video Testimonials & Gallery Enhancements

1. Data:
   - Extend or create constants (e.g., `dev/lib/constants/media.ts`) to include:
     - Video testimonials (title, speaker, role, video URL, thumbnail).

2. Components:
   - Reuse/extend `VideoPlayer` from Phase 8 to:
     - Support testimonial metadata (speaker name, role, quote).
   - Create `VideoTestimonialCard` under `dev/components/sections/VideoTestimonialCard.tsx`.

3. Integration:
   - Add a video testimonials section to:
     - Careers pages (`life-at-ypi`, maybe homepage).
     - CSR/Sustainability pages (for community project videos).

4. Ensure:
   - Embeds use privacy‑friendly options where possible.
   - Videos are responsive and accessible (captions/transcripts can be stubbed for now but signposted).

---

### 7. Interactive Map Enhancements

Building on Phase 3 & 6 Mapbox work:

1. Projects Map:
   - Add a new section/component, e.g. `ProjectMap` under `dev/components/sections/ProjectMap.tsx`.
   - Show project locations from DB/constants using Mapbox markers.
   - On marker click:
     - Show project summary (name, services, link to project page).

2. Office Locations Enhancements:
   - Improve `/contact/locations` map:
     - Click markers show detailed office info.
     - Possibly cluster markers if many locations.

3. Ensure:
   - Map code remains client‑only and uses `NEXT_PUBLIC_MAPBOX_TOKEN`.
   - If token is missing, degrade gracefully with static list.

---

### 8. Live Chat Support (Optional) & PowerBot Integration

1. Decide whether to integrate a 3rd‑party live chat (Intercom/Crisp/etc.) or rely solely on **PowerBot**:
   - For Phase 14, you may:
     - Add an integration *stub* component, e.g. `ThirdPartyChat` that conditionally loads provider script based on env vars.
     - Or enhance PowerBot behavior to:
       - Better hand off to human contact (collect contact info and send via existing APIs).

2. Configuration:
   - Env vars like:
     - `NEXT_PUBLIC_CHAT_PROVIDER` (e.g., `"intercom" | "crisp" | "none"`).
     - Provider‑specific IDs/keys.

3. Implementation:
   - If provider is enabled, load script asynchronously in layout.
   - If disabled, ensure no script is loaded and only PowerBot appears.

4. Ensure privacy & performance:
   - External scripts are loaded asynchronously/deferred.
   - Ability to disable chat for specific environments.

---

### 9. Multi-Language Support Scaffolding (next-intl)

Multi-language is a **future** feature. In Phase 14 you only:

1. Install next-intl or similar i18n library if desired:

   ```bash
   cd dev
   npm install next-intl
   ```

2. Scaffold basic i18n structure:
   - A top‑level provider in `app/layout.tsx` or an `(intl)` segment.
   - Locale detection strategy (basic, e.g., URL prefix `/en`, `/fr` etc.).
   - Minimal message files (e.g., `en.json`) for a small subset of strings.

3. Integrate language switcher UI (placeholder) in header/footer.

4. Do **not** localize the entire site in this phase; focus on architecture and simple proof‑of‑concept.

---

### 10. Testing, Linting & Build Verification

Working inside `dev/`:

1. Start dev server:

   ```bash
   npm run dev
   ```

2. Manually test:
   - WhatsApp buttons across pages.
   - Social links and sharing behavior.
   - Newsletter signup end‑to‑end with provider (in staging env).
   - Video testimonials rendering and playing correctly.
   - Project & office maps with enhanced interactivity.
   - Client portal placeholder pages under `/client`.
   - Optional chat provider integration & PowerBot behavior.
   - Language switcher (if enabled) and i18n scaffolding.

3. Stop dev server and run:
   - `npm run lint`
   - `npm run build`

   Both must succeed.

4. Confirm repository hygiene:
   - No dev code added outside `dev/`.
   - No docs added outside `notes/`.
   - No scripts/zip/release artifacts added outside `prod/`.

---

## Definition of Done for Phase 14

Phase 14 (Advanced Features & Integrations) is complete when **all** of the following are true:

1. **Integrations Implemented**
   - WhatsApp click‑to‑chat buttons exist and work where configured, or are hidden when not configured.
   - Social follow and share components are integrated on key pages.
   - Newsletter signup uses a real provider API and returns clear success/failure to users.

2. **Client Portal Scaffolding**
   - `/client` route structure exists with layout and placeholder pages.
   - No sensitive data or real auth yet, only clearly labeled placeholders.

3. **Media & Maps Enhancements**
   - Video testimonials section(s) implemented and wired to data.
   - Project/office maps show interactive markers and details.

4. **Chat & i18n Scaffolding**
   - Optional live chat provider can be enabled/disabled via env vars, or PowerBot is enhanced accordingly.
   - i18n scaffolding (next-intl or equivalent) exists with at least one alternate locale stub and language switcher.

5. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase14.md`).

Once all these conditions are met, Phase 14 is considered **production-ready and fully functional for advanced integrations and scaffolding of future features**.

Follow these instructions exactly and report each major change you make.
```

---

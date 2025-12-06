


You are an expert full‑stack engineer and DevOps/SRE specializing in **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Vercel** deployments.

You are working inside the repository:

> [c:/Users/Plange/Downloads/Projects/ypi-website](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website:0:0-0:0)

This repo currently contains planning docs in [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0) (especially [ypi_tech_doc.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/ypi_tech_doc.md:0:0-0:0) and [phases.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/phases.md:0:0-0:0)) and an empty [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) folder, but **no Next.js app yet**.

Your task is to **fully implement Phase 0** from [notes/phases.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/phases.md:0:0-0:0) so that the project is **production‑ready, buildable, and ready to deploy to Vercel**, without touching later phases.

---

## Directory Conventions (MUST FOLLOW)

At the **repository root**, the folders have strict roles:

- [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) – **All development files**
  - Source code (Next.js app), configs, TypeScript, tests, local assets, etc.
  - The **Next.js project root will be [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)**, not the repo root.

- `prod/` – **Production artifacts & deployment assets**
  - Build artifacts you choose to archive, deployment/infra scripts, created zip files, release packages.
  - Do **not** put development source files here.

- [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0) – **All documentation**
  - Markdown specs (`*.md`), design docs, PDFs, and other docs.
  - Existing files in [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0) (like [ypi_tech_doc.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/ypi_tech_doc.md:0:0-0:0), [phases.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/phases.md:0:0-0:0)) must remain here.

Do **not** put dev code outside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0), do **not** put docs outside [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0), and keep any scripts/zip/release bundles under `prod/`.

---

## Context From Project Docs

- Company: **Yellow Power International** (mining support services).
- Frontend: **Next.js 14+ (App Router)** + **TypeScript** + **Tailwind CSS**.
- Hosting: **Vercel**.
- Target structure for the app (inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0), not at repo root):

  ```text
  dev/
    app
      /(marketing)
      /api
    components
      /ui
      /shared
      /sections
      /layouts
    lib
      /utils
      /api
      /constants
    public
      /images
      /documents
    styles
  ```

- Core dependencies expected (from Phase 0):

  ```json
  {
    "dependencies": {
      "next": "^14.2.0",
      "react": "^18.3.0",
      "react-dom": "^18.3.0",
      "typescript": "^5.3.0",
      "tailwindcss": "^3.4.0",
      "framer-motion": "^11.0.0",
      "zod": "^3.22.0",
      "zustand": "^4.5.0",
      "@tanstack/react-query": "^5.0.0"
    }
  }
  ```

Use these docs as guidance; in this task you must **implement Phase 0 concretely inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)**.

---

## Phase 0 Goals

Implement all of the following so that the repo is in a **clean, buildable, production‑ready state**:

1. **Repository Initialization (Next.js app under [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) + baseline structure)**
2. **Core dependencies installed and correctly configured**
3. **TypeScript & ESLint fully configured**
4. **Project structure scaffolded in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)** as specified
5. **Vercel‑ready build scripts and settings** (code‑side)
6. **Basic sanity checks** (`npm run lint`, `npm run build`) pass when run **inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)**

Do **not** implement later phases (design system, homepage sections, backend APIs, AI features, etc.) – just create whatever minimal code is necessary for Phase 0 to compile and run successfully.

---

## Constraints & Quality Bar

- The result must:
  - Build successfully with `npm run build` (run in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)).
  - Lint successfully with `npm run lint` (in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)).
  - Run with `npm run dev` (in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)) without runtime errors on the homepage.
- Use **Next.js 14 App Router** with TypeScript.
- Use **Tailwind CSS** set up via `create-next-app`’s Tailwind template.
- Keep all placeholder UI minimal and generic; later phases will replace them.
- Do not introduce any dead code or unused dependencies.
- Do not change the content of [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0) (they are reference docs).
- **Respect folder roles**:
  - All dev code/config in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0).
  - Scripts/zip/release artifacts in `prod/`.
  - Docs in [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0).

---

## Required Tasks (Step‑by‑Step)

Work through these steps. For each step, explain briefly what you’re doing and then perform the necessary file edits and commands.

### 1. Inspect Current Repo

1. At repo root ([ypi-website](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website:0:0-0:0)), list the current directory contents.
2. Confirm that:
   - [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0) exists and contains [ypi_tech_doc.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/ypi_tech_doc.md:0:0-0:0) and [phases.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/phases.md:0:0-0:0).
   - [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) exists (create if missing).
   - `prod/` exists or is created as an **empty** folder for future production artifacts.
   - There is **no existing Next.js app** inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) yet.

If there **is** existing app code in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0), stop and reconcile before overwriting anything; otherwise proceed.

### 2. Initialize the Next.js 14 App Inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)

1. Treat [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) as the **Next.js project root**.
2. From inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0), initialize a Next.js 14 App Router project with TypeScript, Tailwind, and ESLint:

   ```bash
   cd dev
   npx create-next-app@latest . --typescript --tailwind --app --eslint
   ```

3. Ensure (inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)):
   - `app/` directory exists (App Router).
   - `package.json` includes `next`, `react`, `react-dom`, `typescript`, `eslint`, `tailwindcss`, etc.
   - Default boilerplate files (`app/page.tsx`, `app/layout.tsx`, `styles/globals.css`, Tailwind config, etc.) are created.

Do **not** make design‑system changes yet; Phase 1 will handle that.

### 3. Align Project Structure With the Spec (Inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0))

Refactor/extend the structure inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) to match the planned layout (with minimal content):

1. Under `dev/app/`:
   - Create the **segment directories**:
     - `dev/app/(marketing)/`
     - `dev/app/api/` (empty for now, but present).
   - Move the default `page.tsx` into `(marketing)`:
     - `dev/app/(marketing)/page.tsx` – adjust imports/paths as needed.
   - Ensure there is a `dev/app/layout.tsx` that wraps `(marketing)` correctly (can use the default root layout for now).

2. Create framework directories inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) (empty or with minimal placeholder exports as needed to avoid TS errors):

   - `dev/components/ui/`
   - `dev/components/shared/`
   - `dev/components/sections/`
   - `dev/components/layouts/`
   - `dev/lib/utils/`
   - `dev/lib/api/`
   - `dev/lib/constants/`
   - `dev/public/images/`
   - `dev/public/documents/`
   - `dev/styles/` (already exists from Tailwind; keep `globals.css` there).

For any TypeScript modules you add (e.g. a minimal `dev/lib/utils/index.ts`), ensure they compile (simple placeholder exports are fine).

> Outside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0), only [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0) (docs) and `prod/` (future scripts/zips) should exist; do not add dev code at repo root.

### 4. Install and Configure Core Dependencies

Working **inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)**:

1. Ensure `dev/package.json` includes at least the following with compatible versions (align with `create-next-app` defaults and spec):

   - `next` (14.x)
   - `react`, `react-dom` (18.x)
   - `typescript` (5.x)
   - `tailwindcss` (3.4+)
   - `framer-motion`
   - `zod`
   - `zustand`
   - `@tanstack/react-query`

2. If any are missing, add them and run:

   ```bash
   cd dev
   npm install
   ```

3. Verify that `scripts` in `dev/package.json` include at least:

   - `"dev": "next dev"`
   - `"build": "next build"`
   - `"start": "next start"`
   - `"lint": "next lint"`

### 5. Configure Tailwind CSS Correctly

Inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0):

1. Confirm Tailwind files exist and are wired up:

   - `dev/tailwind.config.ts` (or `.js`)
   - `dev/postcss.config.js`
   - `dev/styles/globals.css` with:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

2. Ensure `dev/app/layout.tsx` (or the segment layout used by `(marketing)`) imports `./styles/globals.css` (correct relative path).

3. Do **not** yet add the custom YPI color palette or fonts; that’s Phase 1.

### 6. TypeScript Configuration

1. Inspect `dev/tsconfig.json`. Ensure:

   - `"strict": true` (or similar strictness).
   - Reasonable `baseUrl` / `paths` (you may add simple path aliases if needed, but keep them minimal for Phase 0).
   - Appropriate `jsx`/`moduleResolution` for Next.js 14 defaults.

2. Make sure there are **no TypeScript errors** from the scaffolded code.

### 7. ESLint Configuration

1. Inspect `.eslintrc.*` in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) created by `create-next-app`.
2. Ensure:
   - It uses the **Next.js ESLint config**.
   - TypeScript is correctly integrated.
   - The `"lint"` script runs successfully on the fresh codebase.

3. Do **not** add complex custom rules at this stage; just ensure a clean baseline.

### 8. Basic Home Page Placeholder

1. In `dev/app/(marketing)/page.tsx`, create a **very simple** placeholder homepage that:

   - Renders the company name “Yellow Power International”.
   - Confirms the stack, e.g. “Next.js 14 + TypeScript + Tailwind”.
   - Uses basic Tailwind utility classes.

2. Ensure this compiles and renders without runtime errors.

### 9. Vercel‑Ready Settings (Code Side)

1. Confirm that the codebase in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) is compatible with Vercel’s defaults:

   - No custom `next.config.js` is strictly required yet, but if present, ensure it doesn’t break builds.
   - Output directory defaults (`.next`) are fine.

2. Add any minimal config needed to ensure a clean build on Vercel, but avoid premature optimization:
   - For Phase 0, **no environment variables are required**. Do not hardcode any secrets.

> Note: When configuring Vercel later, you’ll likely set the project root to [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) (or equivalent monorepo setting) rather than the repo root.

### 10. Git & Branching Readiness

Assume Git is already initialized for the root repo. Your responsibility in this prompt is to make sure:

1. The repo is in a clean, buildable state suitable for committing.
2. You can optionally suggest to the human:

   - Create `develop` branch at repo root:
     ```bash
     git checkout -b develop
     git push origin develop
     ```
   - Then create `phase/01-foundation` for the next phase, after Phase 0 is confirmed.

Do not run git commands automatically unless explicitly allowed by the environment.

### 11. Validation & Final Checks

Before declaring Phase 0 complete, **run and verify inside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)**:

1. `npm run lint`  
   - Must pass with no errors.

2. `npm run build`  
   - Must complete successfully.

3. (Optionally) `npm run dev`  
   - Confirm `http://localhost:3000` renders the placeholder homepage without errors.

If any issues arise, fix them and re‑run the checks until they pass.

Also ensure:

- No dev code has been created outside [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0).
- No docs have been added outside [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0).
- No scripts/zip/release artifacts have been placed outside `prod/`.

---

## Definition of Done for Phase 0

Phase 0 is complete when:

- A **Next.js 14 + TypeScript + Tailwind** app exists under [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) and is its project root.
- The internal structure `dev/app`, `dev/components`, `dev/lib`, `dev/public`, `dev/styles` matches the planned layout.
- Core dependencies (Next, React, Tailwind, TS, framer-motion, zod, zustand, @tanstack/react-query) are installed.
- TypeScript and ESLint are configured and **`npm run lint` passes** (in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)).
- **`npm run build` succeeds** (in [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0)) with no errors.
- The placeholder homepage at `/` renders correctly.
- The repo root hierarchy respects folder roles:
  - [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) – dev code & configs
  - `prod/` – scripts/zip/release artifacts (may be empty now)
  - [notes/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes:0:0-0:0) – docs
- The repo is in a clean state, ready for:
  - Connecting [dev/](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev:0:0-0:0) to Vercel as the project root.
  - Creating `develop` and `phase/01-foundation` branches.
  - Starting Phase 1 work.

Follow these instructions exactly and report each major change you make.
```

---


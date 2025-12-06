## Phase 1 Implementation Prompt (Design System & Foundation, with dev/prod/notes structure)

```markdown
You are an expert frontend engineer and UI systems architect specializing in **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**, with production experience on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

## Assumptions & Starting Point

- **Phase 0 is already fully completed**, following the instructions in `notes/phase0.md`.
- The repo root has the following top-level structure:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- The Next.js project root is **`dev/`**, not the repo root.
- Inside `dev/` you already have at minimum:
  - `dev/app/` with App Router setup and a basic placeholder homepage at `dev/app/(marketing)/page.tsx`.
  - `dev/styles/globals.css` with base Tailwind setup.
  - `dev/tailwind.config.*`, `dev/postcss.config.js`, `dev/tsconfig.json`, `.eslintrc.*`.
  - Scripts in `dev/package.json` (`dev`, `build`, `start`, `lint`) that all work.

If any of these are missing or broken, you must fix/complete Phase 0 **before** doing Phase 1.

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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`, this `phase1.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 1 implementation work happens **inside `dev/`**.

---

## Phase 1 Scope (Design System & Foundation)

You are implementing **Phase 1: Design System & Foundation** from `notes/phases.md`. The goals are to:

1. Establish a **reusable design system** and **UI foundation** that all later phases use.
2. Integrate and configure **shadcn/ui** in the Next.js app.
3. Implement the **YPI brand color system** and **typography**.
4. Build the **core layout components** and **navigation** (header, footer, mobile nav, root layout wiring).
5. Add foundational **utilities and constants** used across the app.
6. Ensure layout and navigation are **responsive and production-ready**.
7. Keep the app **lint-clean and buildable** with `npm run lint` and `npm run build` (from `dev/`).

You should **not** build content-heavy pages (Home sections, About, Services, etc.) in this phase—just the design system and base layout that those pages will plug into.

---

## Constraints & Quality Bar

- All work must respect the folder roles:
  - Dev code & configs in `dev/`.
  - Scripts/zips/release artifacts in `prod/`.
  - Docs in `notes/`.
- The result must:
  - **Build successfully** with `npm run build` (run in `dev/`).
  - **Lint successfully** with `npm run lint` (in `dev/`).
  - Run with `npm run dev` (in `dev/`) without runtime errors on the homepage.
- Design system code must be:
  - **Reusable** (navigation, layout, colors, typography used consistently).
  - **Type-safe** (no TypeScript errors, types for nav items, etc.).
  - **Accessible-minded** (semantic HTML, reasonable aria attributes on nav components where applicable).
- Use idiomatic **Next.js 14 App Router** patterns and **Tailwind + shadcn/ui** best practices.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Phase 0 State

1. From repo root, inspect the structure to confirm:
   - `dev/`, `prod/`, and `notes/` exist.
   - There is a valid Next.js project under `dev/` (with `app/`, `package.json`, etc.).
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If these fail, fix Phase 0 first before proceeding.

---

### 2. Install and Initialize shadcn/ui

All commands in this section are run **inside `dev/`**.

1. Install and initialize shadcn/ui:

   ```bash
   cd dev
   npx shadcn-ui@latest init
   ```

2. Configure shadcn/ui so that:
   - Components are generated under `dev/components/ui` (the default is usually `components` in the project root, which is correct since our root is `dev/`).
   - Tailwind integration is correctly set up (theme extension, plugins, etc.).

3. Install the **core shadcn/ui components** required by Phase 1 (from `phases.md`):
   - Button
   - Card
   - Input
   - Label
   - Textarea
   - Select
   - Dialog
   - Dropdown Menu
   - Navigation Menu
   - Tabs
   - Accordion
   - Badge
   - Separator

   Use the standard shadcn CLI commands (still from `dev/`), e.g.:

   ```bash
   npx shadcn-ui@latest add button card input label textarea select dialog dropdown-menu navigation-menu tabs accordion badge separator
   ```

4. Verify that:
   - Generated components live under `dev/components/ui/*`.
   - They import Tailwind classes and types correctly.
   - There are no TypeScript errors introduced.

---

### 3. Implement YPI Color System in Tailwind & Globals

You will wire the brand palette from `notes/ypi_tech_doc.md` and `notes/phases.md` into Tailwind.

1. In `dev/styles/globals.css`:
   - Keep the existing Tailwind directives:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
   - Under `@layer base`, define CSS variables for the YPI color system, similar to the snippet in `phases.md`:
     - Gold scale (e.g. `--gold-50`, `--gold-100`, `--gold-500`, `--gold-600`).
     - Gray text colors (`--gray-900`, `--gray-800`).
     - Accent colors (`--emerald-500`, `--blue-500`, `--terracotta-500`).
   - Ensure this is placed under `:root { ... }` so it applies globally.

2. In `dev/tailwind.config.*`:
   - Extend `theme` to expose semantic color tokens that reference these CSS variables.
   - For example, create entries like `brand.gold`, `brand.gray`, `brand.accent`, etc., mapped via `var(--gold-500)` style patterns.
   - Do **not** remove Tailwind defaults; only extend.

3. Confirm that a test element (e.g. in the header or placeholder page) can use these colors via Tailwind classes and that the CSS builds correctly.

---

### 4. Configure Typography (Fonts & Tailwind)

1. In `dev/tailwind.config.*`:
   - Extend `theme.fontFamily` to include the three families from the tech doc:
     - `display`: `['Montserrat', 'sans-serif']`
     - `body`: `['Open Sans', 'sans-serif']`
     - `accent`: `['Roboto Condensed', 'sans-serif']`

2. In `dev/app/layout.tsx` (the root layout for the app):
   - Use `next/font/google` to import these fonts (or closest available) from Google Fonts.
   - Wire them into the document `<body>` className so that:
     - The default is the `body` font.
     - Provide utility classes (or CSS via `globals.css`) to apply `display` and `accent` fonts where needed.

3. Update markup in the layout or header to use `font-display`, `font-body`, `font-accent` Tailwind classes where appropriate, verifying the fonts apply.

4. Ensure there are **no TypeScript errors** and no runtime errors from the font imports.

---

### 5. Build Core Layout Components

Create the foundational layout components under `dev/components/layouts/` and wire them into the App Router.

1. Create **Header** component:
   - File: `dev/components/layouts/Header.tsx`
   - Responsibilities:
     - Render the main site navigation bar.
     - Show the company name/logo text for now (e.g., "Yellow Power International").
     - Use the emerging design system: brand colors, fonts, spacing.
     - Use shadcn `NavigationMenu` (desktop) for structured nav.
   - The header must be fully type-safe and not rely on any pages that don’t exist yet (use simple placeholder `href`s that align with planned routes, e.g., `/`, `/about`, `/services`, etc.).

2. Create **Footer** component:
   - File: `dev/components/layouts/Footer.tsx`
   - Responsibilities:
     - Render basic company info (name, year founded, location, contact phones) using constants defined in `lib/constants/company` (see next section).
     - Include simple links or placeholders for social links and legal pages.
     - Use brand colors and typography.

3. Create **MobileNav** component:
   - File: `dev/components/layouts/MobileNav.tsx`
   - Responsibilities:
     - Provide a mobile-friendly navigation experience.
     - Likely uses a menu button in the header that opens a panel/drawer (you may use shadcn `Dialog` or a simple `Sheet` pattern, depending on available components).
     - Reuse the same navigation items as the desktop navigation.

4. Integrate layout components into the **root layout**:
   - File: `dev/app/layout.tsx`
   - Ensure that:
     - `globals.css` is imported.
     - `<Header />` and `<Footer />` wrap the main content.
     - The main region uses appropriate Tailwind classes (background color, max-width container, padding, etc.).
     - The layout supports future nested segments under `(marketing)` and eventually `/dashboard` or other areas.

5. Confirm that visiting the homepage (via the existing `(marketing)/page.tsx`) now shows the new header and footer.

---

### 6. Implement Navigation Structure

Based on `phases.md`, implement the base navigation structure.

1. Define a **typed navigation model**, either:
   - In `dev/lib/constants/navigation.ts`, or
   - Co-located in `Header.tsx` (but using a strongly-typed structure).

   It should include at least top-level items:
   - Home
   - About Us (with potential dropdown children like Overview, Mission & Vision, Leadership, History, etc. – they can be placeholders for now)
   - Services (with links for the 5 core services as placeholders)
   - Sustainability & CSR
   - Partners & Clients
   - Careers
   - News & Media
   - Contact

2. Wire this structure into the Header’s shadcn `NavigationMenu` for desktop.

3. Reuse the same structure in **MobileNav** so the navigation is consistent across breakpoints.

4. Ensure links point to the **planned routes** (e.g., `/about`, `/services`, `/sustainability`, etc.) even if those pages are not yet implemented. Use Next.js `Link` component and make sure there are no type errors.

5. Keep the visual styling simple but polished (spacing, hover states, active states if feasible) using Tailwind and shadcn primitives.

---

### 7. Utility Functions & Company Constants

Implement the shared utilities and constants defined in `phases.md`.

1. Utilities:
   - File: `dev/lib/utils/index.ts`
   - Implement at least:
     - A `cn` function (Tailwind-friendly class name combiner), similar to the standard shadcn utility.
   - Export in a way that other code can import via `@/lib/utils` (ensure `tsconfig.json` has a path alias for `@/*` or similar pointing at `dev` src root).

2. Company constants:
   - File: `dev/lib/constants/company.ts`
   - Implement the constants from the Phase 1 spec, for example:
     - `COMPANY_INFO` with fields: `name`, `founded`, `founder`, `location`, `employees`, `offices`, `phone1`, `phone2`, `website`.
     - `SERVICES` array listing the 5 core services.
   - Use TypeScript interfaces/types to ensure type safety.

3. Update the **Header/Footer** to consume these constants where appropriate (company name, phone numbers, etc.), so they are not hardcoded in multiple places.

4. Confirm that all imports resolve and there are no circular dependencies.

---

### 8. Responsive Design Setup & Verification

1. Verify Tailwind breakpoints in `dev/tailwind.config.*` (default `sm`, `md`, `lg`, `xl`, `2xl` are fine for now).
2. Ensure the **Header + Navigation** behave correctly at different widths:
   - Desktop: show full navigation menu using `NavigationMenu`.
   - Mobile (e.g., `< md`): collapse into a hamburger/menu button that triggers `MobileNav`.

3. Adjust spacing, font sizes, and layout wrappers to look reasonable on both mobile and desktop (no overlapping or clipped content).

4. Manually test via `npm run dev` and resizing the browser.

---

### 9. Cleanup, Linting, and Build Verification

Working inside `dev/`:

1. Remove any leftover boilerplate components or styles from the default `create-next-app` scaffold that are no longer used (e.g., default homepage sections that you’ve replaced with your own minimal placeholder + layout).
2. Ensure all TypeScript files compile without errors.
3. Run:
   - `npm run lint`
   - `npm run build`

   Both must complete successfully.

4. Start the dev server with `npm run dev` and verify:
   - Homepage renders with the new **Header**, **Footer**, and **typography/color system**.
   - Navigation works (links don’t crash, even if some target routes are not yet implemented; they can render the default Not Found for now).
   - No errors appear in the browser console or terminal.

5. Confirm again that:
   - No dev code was added outside `dev/`.
   - No docs were added outside `notes/`.
   - No scripts/zips/releases were added outside `prod/`.

---

## Definition of Done for Phase 1

Phase 1 is complete when **all** of the following are true:

1. **Design System & Foundation Implemented**
   - shadcn/ui is initialized and configured under `dev/components/ui`.
   - Brand **color system** (CSS variables + Tailwind theme extension) is in place.
   - **Typography** (Google fonts via `next/font/google`, Tailwind `fontFamily` config) is correctly wired.

2. **Core Layout & Navigation**
   - `Header`, `Footer`, and `MobileNav` exist under `dev/components/layouts/` and are used in `dev/app/layout.tsx`.
   - Navigation uses a typed nav model and shadcn `NavigationMenu` (or equivalent) on desktop.
   - Navigation collapses to a functional, styled mobile nav.

3. **Utilities & Constants**
   - `dev/lib/utils/index.ts` provides at least a `cn` helper and any other foundational utilities required.
   - `dev/lib/constants/company.ts` exports `COMPANY_INFO` and `SERVICES` as described in `phases.md`.
   - Header/Footer use these constants instead of hardcoding company data.

4. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - The homepage (`/`) renders with the new layout, colors, and typography, and is responsive.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md` and this `phase1.md`).

Once all these conditions are satisfied, Phase 1 is considered **production-ready and fully functional as a foundation** for subsequent phases.

Follow these instructions exactly and report each major change you make.
```

---

## Phase 11 Implementation Prompt (AI Features Integration: PowerBot & Intelligent Search, with dev/prod/notes structure)

```markdown
You are an expert AI and frontend engineer specializing in **Next.js 14 (App Router)**, **TypeScript**, **OpenAI API**, **vector databases (e.g., Pinecone)**, and **LangChain-like retrieval patterns**, building secure, production-grade AI features on Vercel.

You are working inside the repository:

> `c:/Users/Plange/Downloads/Projects/ypi-website`

---

## Assumptions & Starting Point

Before starting Phase 11, you must assume that **Phases 0–10 are fully completed** per:

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

At this point:

- Repo root structure is:
  - `dev/` – Next.js 14 + TypeScript + Tailwind app (project root), configs, dev assets.
  - `prod/` – Reserved for build artifacts, deployment/infra scripts, zip files, release bundles.
  - `notes/` – Documentation (`*.md`, design docs, etc.).
- Inside `dev/` (Next.js project root):
  - App Router is configured with `(marketing)` and all marketing sections.
  - All major content pages and forms exist and are backed by API routes.
  - SEO and performance baseline are in place.
  - `npm run lint` and `npm run build` succeed when run in `dev/`.

If any of these are not true, **fix or complete earlier phases first** before proceeding.

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
  - Existing docs (`ypi_tech_doc.md`, `phases.md`, `phase0.md`–`phase10.md`, this `phase11.md`) stay here.

**Do not** put dev code outside `dev/`, **do not** put docs outside `notes/`, and keep any scripts/zip/release bundles under `prod/`.

All Phase 11 implementation work happens **inside `dev/`**.

---

## Phase 11 Scope (AI Features Integration)

You are implementing **Phase 11: AI Features Integration** from `notes/phases.md` and `notes/ypi_tech_doc.md`.

Goal: Add **AI-powered capabilities** to the YPI website, focusing on:

1. **PowerBot Chat Assistant** – a site-wide AI chatbot for:
   - Service questions (B2B clients).
   - Careers questions (job seekers).
   - General company information.

2. **Intelligent Search** – semantic search over website content and documents.

3. A **basic AI knowledge base** and retrieval pipeline using a vector store (e.g., Pinecone) and OpenAI embeddings.

Phase 11 should produce a **secure, configurable, and minimal** but production-ready foundation for AI features. Advanced personalization and analytics can be implemented in later phases.

---

## Security & Privacy Constraints

- **Never hardcode API keys** or secrets in the repo.
- All AI-related secrets must come from environment variables, e.g.:
  - `OPENAI_API_KEY`
  - `PINECONE_API_KEY`, `PINECONE_ENVIRONMENT`, `PINECONE_INDEX_NAME` (or equivalent for chosen vector DB).
- All external calls must:
  - Handle timeouts and network errors gracefully.
  - Avoid leaking internal error details to end users.
- Ensure user messages **do not get logged with PII** in plain text in server logs beyond what is necessary for debugging.

---

## Required Tasks (Step-by-Step)

Work through these tasks in order. For each major step, briefly describe what you are doing, then make the required file changes inside `dev/`.

### 1. Verify Baseline Health

1. From repo root, ensure `dev/`, `prod/`, and `notes/` exist.
2. From inside `dev/`, run:
   - `npm run lint`
   - `npm run build`

If either command fails, fix issues before integrating AI features.

---

### 2. Install AI & Vector Store Dependencies

All commands in this section are run **inside `dev/`**.

1. Install core AI libraries specified in `phases.md`:

   ```bash
   cd dev
   npm install openai @pinecone-database/pinecone langchain
   ```

   (If you prefer a different vector DB provider consistent with the docs, adjust accordingly but keep the same architectural pattern.)

2. Ensure TypeScript can import these modules without errors.

---

### 3. Configure Environment Variables (AI)

1. In `dev/lib/config/env.ts` (created in Phase 9), extend env helpers with AI-related variables, for example:
   - `OPENAI_API_KEY`
   - `PINECONE_API_KEY`
   - `PINECONE_ENVIRONMENT`
   - `PINECONE_INDEX_NAME`

2. Provide functions/helpers that:
   - Throw or mark configuration as **disabled** if required env vars are missing.
   - Allow the rest of the code to test whether AI features are available and react accordingly (e.g., disabled message in UI instead of crashing).

3. Do **not** log actual API keys; only log whether configuration appears valid.

---

### 4. Implement AI Client & Vector Store Utilities (`lib/ai`)

Create a dedicated AI utility layer so route handlers stay clean.

1. Create a directory `dev/lib/ai/` with modules such as:
   - `openai.ts` – creates and exports a configured OpenAI client.
   - `vector-store.ts` – handles vector DB initialization and basic operations.
   - `documents.ts` – defines types and utilities for knowledge base documents.
   - `retrieval.ts` – implements retrieval-augmented generation (RAG) pipeline.

2. **`openai.ts`**
   - Export a function or singleton `getOpenAIClient()` using `OPENAI_API_KEY`.
   - Configure model name(s) from constants (e.g., `gpt-4.1-mini` or similar), but keep them configurable.

3. **`vector-store.ts`**
   - Initialize Pinecone client using env helpers.
   - Export helper functions, e.g.:
     - `upsertDocuments(docs: AiDocument[])`
     - `queryDocuments(query: string, options: { topK: number })`
   - Keep this minimal and generic; no page-specific logic here.

4. **`documents.ts`**
   - Define a common document type, e.g.:
     - `AiDocument` with fields: `id`, `title`, `content`, `source`, `url`, `type` (e.g., `"service" | "project" | "career" | ...`).
   - Provide helper to map internal content (e.g., service descriptions from constants) into `AiDocument` instances.

5. **`retrieval.ts`**
   - Implement a simple RAG pipeline:
     - Given a `userQuery` and optional `context` (e.g., persona: client vs job seeker),
     - Query vector store for top-k documents.
     - Build a prompt containing relevant snippets and user query.
     - Call OpenAI Chat Completions with a system prompt that encodes YPI’s tone and constraints.
   - Return both the model answer and references to supporting documents.

---

### 5. Seed Initial Knowledge Base (Minimal, Declarative)

For Phase 11, do **not** build a full ingestion pipeline; instead, define minimal structured content for AI.

1. Under `dev/lib/constants/ai-knowledge.ts`, define a curated list of `AiDocument` entries, drawing from:
   - Services overview and core services descriptions.
   - Company overview, mission/vision, leadership summary.
   - Basic careers and job category descriptions.
   - Sustainability highlights.

2. Provide a script-like server function (not a CLI script) in `lib/ai/vector-store.ts`, e.g. `ensureInitialIndex()` that:
   - Checks if the index exists or simply upserts the documents when invoked.
   - This can be triggered from an admin-only API endpoint or a dev-only route (for Phase 11, a simple dev-only manual endpoint is acceptable).

3. Clearly mark any seeding endpoint or code as **dev-only** or restricted in comments and behavior (e.g., require a secret token in env before running).

---

### 6. Implement PowerBot Chat API Route

Create an API route for chat-based interactions.

1. File: `dev/app/api/ai/chat/route.ts`
2. Responsibilities:
   - Accept `POST` requests with a JSON body including:
     - `messages`: chat history (at least `role` + `content`).
     - Optional `persona` or `context` field (e.g., `"client"`, `"job_seeker"`).
   - Validate input with Zod schema in `dev/lib/validations/ai.ts`.
   - Use `retrieval.ts` pipeline to:
     - Retrieve relevant documents.
     - Generate an AI answer.
   - Return JSON like:
     - `{ success: true, answer, sources: [...] }` on success.
     - `{ success: false, error: ... }` on validation or runtime error.

3. System prompt guidelines (baked into the OpenAI call):
   - Always answer as "PowerBot", representing Yellow Power International.
   - Focus on:
     - Explaining services and capabilities.
     - Answering basic careers questions.
     - Providing company information.
   - Do **not** make up specific, unverifiable company facts (e.g., new awards, real client names) beyond what's in the knowledge base.

4. Implement **rate limiting** or simple abuse prevention where feasible (e.g., checking message length, limiting frequency per IP, or using basic in-memory guardrails).

---

### 7. Implement PowerBot Chat Widget UI

Create a site-wide chat widget for PowerBot.

1. File: `dev/components/ai/PowerBot.tsx`
2. Mark as `"use client"`.
3. Responsibilities:
   - Display a chat icon/button fixed in bottom-right corner.
   - On click, open a chat panel with:
     - Message history.
     - Input box and send button.
   - Handle state:
     - Store messages (user + assistant) in component state.
     - Send messages via `fetch('/api/ai/chat')` to the backend.
     - Show loading state while waiting for response.
   - Display answer and, optionally, show short source references (e.g., "Based on: Services page, Careers page").

4. UI considerations:
   - Use shadcn/ui components (Dialog/Sheet, Input, Button, ScrollArea) where appropriate.
   - Ensure the widget works on mobile (responsive panel instead of tiny window).
   - Provide close/minimize behavior.

5. Integration:
   - Include `<PowerBot />` in a top-level layout (e.g., `dev/app/(marketing)/layout.tsx`) so it appears site-wide.
   - Allow disabling the widget via an env-controlled flag (e.g., `NEXT_PUBLIC_ENABLE_POWERBOT`), to turn it off easily if needed.

---

### 8. Implement Intelligent Search API

Create an AI-assisted search route.

1. File: `dev/app/api/ai/search/route.ts`
2. Responsibilities:
   - Accept `POST` requests with JSON body `{ query: string, filters?: {...} }`.
   - Validate with Zod schema in `lib/validations/ai.ts`.
   - Use `vector-store.ts` to run a similarity search.
   - Return a list of relevant documents (title, snippet, url, score).

3. Answer should **not** yet use full AI generative responses (that’s PowerBot’s job). For Phase 11:
   - This endpoint is a **semantic search** endpoint returning ranked results.

4. Ensure the endpoint handles invalid or empty queries gracefully.

---

### 9. Integrate AI Search into the UI (Optional Mini Search)

1. Implement a simple AI search bar component:
   - File: `dev/components/ai/AISearchBar.tsx`
   - Mark as `"use client"`.
   - Responsibilities:
     - Provide an input for natural language queries.
     - On submit, call `/api/ai/search`.
     - Display ranked results with title and snippet, linking to full pages.

2. Integrate the search bar into:
   - Either the global header (if design allows), or
   - A dedicated search page (e.g., `/search`) under `(marketing)`.

3. Keep UI simple and non-overlapping with site navigation.

---

### 10. Testing AI Features Locally

1. Start the dev server from `dev/`:

   ```bash
   npm run dev
   ```

2. Ensure env vars are configured in `.env.local` (not committed):
   - `OPENAI_API_KEY`
   - `PINECONE_*` values
   - `NEXT_PUBLIC_ENABLE_POWERBOT=true` (for local testing)

3. Test via UI:
   - Open the site and use the PowerBot widget to ask:
     - "What drilling services do you offer?"
     - "Tell me about careers at Yellow Power."
     - "What is your sustainability approach?"
   - Verify responses are relevant, safe, and do not hallucinate specifics beyond the knowledge base.

4. Test `/api/ai/search` using the search bar or external tools:
   - Queries like:
     - "Load & haul operations"
     - "Social responsibility programs"
     - "Job openings for drill operators"

5. Validate error handling:
   - What happens if env vars are missing? (Widget should display a friendly error or be disabled.)
   - What happens on network/API errors? (User should see a retryable error, not a crash.)

---

### 11. Linting, Build Verification & Repo Hygiene

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

## Definition of Done for Phase 11

Phase 11 (AI Features Integration) is complete when **all** of the following are true:

1. **AI Infrastructure & Env Config**
   - AI- and vector-store-related env vars are consumed only via `lib/config/env.ts`.
   - OpenAI and vector store clients are wrapped in `lib/ai` utilities.

2. **Knowledge Base & Retrieval**
   - A minimal but structured AI knowledge base exists in `dev/lib/constants/ai-knowledge.ts`.
   - Vector store utilities can upsert and query these documents.
   - A simple RAG pipeline in `lib/ai/retrieval.ts` uses these documents to answer questions.

3. **APIs**
   - `dev/app/api/ai/chat/route.ts` accepts chat requests, validates input, and returns AI answers with source references.
   - `dev/app/api/ai/search/route.ts` accepts search queries, validates input, and returns ranked semantic search results.

4. **UI Integration**
   - `PowerBot` chat widget exists under `dev/components/ai/PowerBot.tsx` and is integrated into a layout so it is accessible site-wide.
   - Optional `AISearchBar` exists and is integrated into the header or a dedicated search page.
   - Both handle loading, success, and error states gracefully.

5. **Security & Safety**
   - No API keys or secrets are hardcoded.
   - AI endpoints degrade gracefully if env vars are missing.
   - System prompts and logic instruct the model to avoid hallucinating unverifiable company facts.

6. **Quality & Structure**
   - `npm run lint` passes in `dev/` with no errors.
   - `npm run build` succeeds in `dev/`.
   - The repo root obeys folder roles:
     - `dev/` – dev code & configs.
     - `prod/` – scripts/zip/release artifacts (may still be empty).
     - `notes/` – docs (including `phase0.md`–`phase11.md`).

Once all these conditions are met, Phase 11 is considered **production-ready and fully functional for core AI features (PowerBot & Intelligent Search)**.

Follow these instructions exactly and report each major change you make.
```

---

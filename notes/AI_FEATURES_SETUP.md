# AI Features Setup Guide

## Overview

Yellow Power International website has **Phase 11 AI features** fully implemented and integrated. The AI features are visible on the homepage and throughout the site when enabled via environment variables.

---

## AI Features Included

### 1. **PowerBot Chat Widget** 🤖
- **Location:** Bottom-right corner of every page (floating gold button)
- **Functionality:** AI-powered chatbot for customer support
- **Features:**
  - Answers questions about services, careers, sustainability
  - Provides company information
  - Context-aware responses
  - Source citations
  - Available 24/7

### 2. **AI Semantic Search** 🔍
- **Location:** Search icon in top-right header
- **Functionality:** Intelligent search across all website content
- **Features:**
  - Semantic understanding (not just keyword matching)
  - Relevance scoring
  - Type-based filtering
  - Source citations
  - Sample queries provided

### 3. **Content Recommendations** ✨
- **Location:** Automatically shown on content pages
- **Functionality:** "You might also like" suggestions
- **Features:**
  - Context-aware recommendations
  - AI-powered similarity matching
  - Relevant content discovery

### 4. **Document Intelligence API** 📄
- **Location:** Admin-only API endpoint
- **Functionality:** Extract information from knowledge base
- **Features:**
  - Summaries, facts, specifications
  - Custom queries
  - Admin token protected

---

## Quick Start (Local Development)

### Step 1: Enable AI Features

The `.env.local` file has already been created with AI features **ENABLED**:

```env
NEXT_PUBLIC_ENABLE_POWERBOT=true
NEXT_PUBLIC_ENABLE_AI_SEARCH=true
```

### Step 2: Start Development Server

```bash
cd dev
npm run dev
```

### Step 3: View AI Features

Open your browser to `http://localhost:3000`

You should see:
- ✅ **Gold PowerBot button** in bottom-right corner
- ✅ **Search icon** in top-right header

---

## What You'll See (Without API Keys)

### PowerBot Chat Widget
- ✅ **Visible:** Gold floating button appears
- ✅ **Opens:** Chat interface opens when clicked
- ❌ **Responses:** Will show error without OpenAI API key
- **Message:** "Failed to send message. Please try again."

### AI Search
- ✅ **Visible:** Search icon in header
- ✅ **Opens:** Search page at `/search`
- ❌ **Results:** Will show error without Pinecone API key
- **Message:** Empty results or error state

### Why This Happens
The UI components are rendered, but the **backend APIs require:**
- OpenAI API key for generating responses
- Pinecone API key for vector search

---

## Full Functionality (With API Keys)

### Step 1: Get API Keys

**OpenAI:**
1. Sign up at https://platform.openai.com/
2. Create API key
3. Copy key (starts with `sk-`)

**Pinecone:**
1. Sign up at https://www.pinecone.io/
2. Create project and index
3. Copy API key and environment

### Step 2: Add to `.env.local`

```env
# Enable AI Features (already set)
NEXT_PUBLIC_ENABLE_POWERBOT=true
NEXT_PUBLIC_ENABLE_AI_SEARCH=true

# Add your API keys here
OPENAI_API_KEY=sk-your-actual-openai-key-here
OPENAI_MODEL=gpt-4-turbo-preview

PINECONE_API_KEY=your-actual-pinecone-key-here
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX_NAME=ypi-knowledge-base
```

### Step 3: Index Knowledge Base

Run the indexing script (if created) or use the document intelligence API to populate Pinecone with the knowledge base from `lib/constants/ai-knowledge.ts`.

### Step 4: Restart Server

```bash
# Stop dev server (Ctrl+C)
npm run dev
```

### Step 5: Test Features

**PowerBot:**
- Click gold button in bottom-right
- Ask: "What services do you offer?"
- Should get AI-generated response with sources

**AI Search:**
- Click search icon in header
- Search: "drilling services"
- Should see relevant results with scores

---

## Troubleshooting

### PowerBot button not visible?
1. Check `.env.local` has `NEXT_PUBLIC_ENABLE_POWERBOT=true`
2. Restart dev server
3. Hard refresh browser (Ctrl+Shift+R)
4. Check browser console for errors

### Search icon not visible?
1. Check `.env.local` has `NEXT_PUBLIC_ENABLE_AI_SEARCH=true`
2. Restart dev server
3. Hard refresh browser (Ctrl+Shift+R)

### PowerBot shows error when chatting?
- This is **expected** without OpenAI API key
- Add `OPENAI_API_KEY` to `.env.local`
- Restart server

### Search shows no results?
- This is **expected** without Pinecone API key and indexed data
- Add `PINECONE_API_KEY` to `.env.local`
- Index knowledge base to Pinecone
- Restart server

---

## Production Deployment

### Environment Variables Required

Set these in your production environment (Vercel, Netlify, etc.):

```env
# Public (visible to browser)
NEXT_PUBLIC_ENABLE_POWERBOT=true
NEXT_PUBLIC_ENABLE_AI_SEARCH=true

# Private (server-side only)
OPENAI_API_KEY=your-production-key
OPENAI_MODEL=gpt-4-turbo-preview
PINECONE_API_KEY=your-production-key
PINECONE_ENVIRONMENT=your-production-env
PINECONE_INDEX_NAME=ypi-knowledge-base
AI_ADMIN_TOKEN=your-secure-admin-token
```

### Vercel Deployment
1. Go to Project Settings → Environment Variables
2. Add all variables above
3. Redeploy

### Security Notes
- Never commit `.env.local` to git
- Use different API keys for dev/staging/production
- Rotate `AI_ADMIN_TOKEN` regularly
- Monitor OpenAI usage/costs

---

## Feature Flags

AI features can be toggled without code changes:

### Disable PowerBot Globally
```env
NEXT_PUBLIC_ENABLE_POWERBOT=false
```

### Disable AI Search Globally
```env
NEXT_PUBLIC_ENABLE_AI_SEARCH=false
```

### Why Disabled by Default?
- Prevents accidental API costs
- Requires explicit opt-in
- Allows testing UI without backend
- Follows best practices for optional features

---

## API Endpoints

### PowerBot Chat
- **Endpoint:** `POST /api/ai/chat`
- **Rate Limit:** 10 requests/minute per IP
- **Auth:** None (public)

### AI Search
- **Endpoint:** `POST /api/ai/search` or `GET /api/ai/search?q=query`
- **Rate Limit:** None
- **Auth:** None (public)

### Content Recommendations
- **Endpoint:** `POST /api/ai/recommendations`
- **Rate Limit:** None
- **Auth:** None (public)

### Document Intelligence
- **Endpoint:** `POST /api/ai/document-query`
- **Rate Limit:** None
- **Auth:** Requires `AI_ADMIN_TOKEN`

---

## Summary

**Current State:**
- ✅ AI features fully implemented
- ✅ UI integrated on homepage and site-wide
- ✅ Feature flags enabled in `.env.local`
- ✅ PowerBot and Search visible when server runs
- ❌ Backend APIs need API keys for full functionality

**To See Features Now:**
1. Start dev server: `npm run dev`
2. Open: `http://localhost:3000`
3. Look for gold button (bottom-right) and search icon (header)

**To Use Features Fully:**
1. Get OpenAI and Pinecone API keys
2. Add to `.env.local`
3. Restart server
4. Test chatbot and search

---

## Screenshots

**PowerBot Chat Widget:**
- Location: Bottom-right corner
- Appearance: Gold floating button with green pulse indicator
- Opens: Chat panel (380×600px)

**AI Search:**
- Location: Top-right header, next to "Get Quote" button
- Appearance: Search icon (magnifying glass)
- Opens: Full search page at `/search`

**Related Content:**
- Location: Bottom of content pages
- Appearance: "You might also like" section with 3 recommendations
- Automatic: Loads based on current page context

---

**Questions?** Check:
- `notes/PHASE11_COMPLETE.md` - Full Phase 11 documentation
- `lib/config/env.ts` - Environment variable configuration
- `components/ai/` - AI component implementations

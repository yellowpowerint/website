# Services Timeline & Setup Guide

**Project:** Yellow Power International Website  
**Current Phase:** Phase 1 Complete ✅  
**Date:** December 6, 2025

---

## 🎯 Services Needed by Phase

This guide explains **when** you need each service and **why**.

---

## ✅ NOW (Phases 1-8): VERCEL ONLY

### What: Vercel
### Why: 
- Frontend hosting for Next.js
- Automatic deployments from GitHub
- Preview deployments for testing
- Next.js API routes (for forms)

### Setup: 
**See `vercel-setup-guide.md` in this folder**

### Cost:
- **Free tier:** Sufficient for development and production
- Includes: Unlimited personal projects, 100GB bandwidth/month

---

## 📧 Phase 9 (Backend API & Form Handling): ADD EMAIL SERVICE

### What: SendGrid or Resend
### Why:
- Send emails from contact forms
- Quote request notifications
- Job application confirmations
- No database needed yet

### Options:

#### Option A: SendGrid (Recommended)
- **Free tier:** 100 emails/day
- **Setup:** https://sendgrid.com/
- **Vercel env var:** `SENDGRID_API_KEY`

#### Option B: Resend
- **Free tier:** 100 emails/day  
- **Setup:** https://resend.com/
- **Vercel env var:** `RESEND_API_KEY`
- **Bonus:** Better developer experience

### Implementation:
```typescript
// dev/app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  
  await resend.emails.send({
    from: 'website@yourdomain.com',
    to: 'info@yourdomain.com',
    subject: 'New Contact Form Submission',
    html: `<p>From: ${name} (${email})</p><p>${message}</p>`
  });
  
  return Response.json({ success: true });
}
```

### When to Set Up:
- ⏰ **Wait until Phase 9** (Backend API & Form Handling)
- Current: Phase 1, so **not needed for 7+ phases**

---

## 🗄️ Phase 13 (Optional): ADD DATABASE

### What: Neon PostgreSQL
### Why:
- Store form submissions in database
- User accounts for admin dashboard
- Job applications storage
- Project/news content management

### Important Notes:
- ⚠️ **Phase 13 is marked as OPTIONAL** in your phases.md
- 💡 You can complete the entire website without a database
- 📧 Forms can just send emails (no database needed)
- 🎯 Only add if you want admin dashboard with data management

### Setup (When Needed):

1. **Create Neon Account:** https://neon.tech/
2. **Create Database:**
   ```
   Database name: ypi_website
   Region: Choose closest to Ghana (Europe/US East)
   ```
3. **Get Connection String:**
   ```
   postgres://[username]:[password]@[endpoint].neon.tech/ypi_website?sslmode=require
   ```
   (Copy the actual connection string from Neon dashboard)
4. **Add to Vercel:**
   ```
   Environment Variable: DATABASE_URL
   Value: [your connection string]
   ```
5. **Install Prisma:**
   ```bash
   cd dev
   npm install @prisma/client
   npm install prisma --save-dev
   ```

### Cost:
- **Free tier:** 0.5GB storage, 100 hours compute/month
- Sufficient for development and small production sites

### When to Set Up:
- ⏰ **Phase 13** (Database Integration - OPTIONAL)
- Current: Phase 1, so **12 phases away**
- **Decision point:** Do you need database? Or just email forms?

---

## 🚫 NOT NEEDED: RENDER

### What: Render
### Why You Don't Need It:
- ❌ Your tech doc mentions NestJS backend, but it's **overkill**
- ✅ Next.js has built-in API routes (runs on Vercel)
- ✅ Can handle forms, APIs, everything in Next.js
- 💰 Saves money (no separate backend hosting)
- 🎯 Simpler architecture (one deployment, not two)

### What Tech Doc Says:
```
Backend: NestJS 10+
```

### What You Should Actually Use:
```
Backend: Next.js API Routes (in dev/app/api/)
```

### Comparison:

#### With Render + NestJS (Complex):
```
Frontend (Vercel) → Backend (Render) → Database (Neon)
                 ↓
         Two deployments
         Two repositories?
         CORS configuration
         More complexity
```

#### With Vercel Only (Simple):
```
Frontend + API Routes (Vercel) → Database (Neon, if needed)
                              ↓
                    One deployment
                    One repository
                    No CORS issues
                    Simpler
```

### When You MIGHT Need Render:
- ⚠️ Only if you have heavy background jobs (unlikely)
- ⚠️ Only if you need separate microservices (overkill)
- ⚠️ Only if Next.js API routes can't handle load (unlikely)

**Verdict:** Skip Render entirely for this project.

---

## 📅 Timeline Summary

```
┌─────────────────────────────────────────────────────────┐
│ Phase 1-8:   Vercel ONLY                                │
│ ✅ Setup:    NOW                                         │
│ 💰 Cost:     FREE                                        │
│ 📍 Guide:    vercel-setup-guide.md                      │
├─────────────────────────────────────────────────────────┤
│ Phase 9:     Vercel + Email Service (SendGrid/Resend)  │
│ ⏰ Setup:    When you reach Phase 9                     │
│ 💰 Cost:     FREE (100 emails/day)                      │
│ 📍 Status:   7 phases away                              │
├─────────────────────────────────────────────────────────┤
│ Phase 13:    Vercel + Email + Database (Neon) OPTIONAL │
│ ⏰ Setup:    Only if you choose to implement Phase 13   │
│ 💰 Cost:     FREE (0.5GB storage)                       │
│ 📍 Status:   12 phases away + OPTIONAL                  │
├─────────────────────────────────────────────────────────┤
│ Render:      NOT NEEDED                                 │
│ ⏰ Setup:    Never                                       │
│ 💰 Cost:     N/A                                         │
│ 📍 Why:      Next.js API routes are sufficient          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Recommended Architecture

### For This Project (Recommended):

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  GitHub Repository (ypi-website)                        │
│  └── dev/ (Next.js app)                                 │
│      ├── app/                                           │
│      │   ├── (marketing)/ ← Pages                       │
│      │   └── api/        ← Backend API routes           │
│      ├── components/                                    │
│      └── lib/                                           │
│                                                          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ↓
         ┌──────────────┐
         │   VERCEL     │  ← All-in-one hosting
         │  (Frontend + │     • Next.js pages
         │   API routes)│     • API endpoints
         └──────┬───────┘     • Email sending
                │
                ↓ (Optional in Phase 13)
         ┌──────────────┐
         │     NEON     │  ← Database (if needed)
         │ (PostgreSQL) │
         └──────────────┘
```

### Benefits:
- ✅ Simple: One deployment
- ✅ Fast: No network latency between frontend/backend
- ✅ Cheap: Free tier covers everything
- ✅ Easy: Manage everything in one repo
- ✅ Integrated: Environment variables, logs, all in one place

---

## 💰 Cost Breakdown

### Current Setup (Phases 1-8):
```
Vercel:  $0/month (Free tier)
Total:   $0/month
```

### Phase 9 (With Forms):
```
Vercel:  $0/month (Free tier)
Resend:  $0/month (Free tier - 100 emails/day)
Total:   $0/month
```

### Phase 13 (With Database - Optional):
```
Vercel:  $0/month (Free tier)
Resend:  $0/month (Free tier - 100 emails/day)
Neon:    $0/month (Free tier - 0.5GB storage)
Total:   $0/month
```

### If You Scale Up (Future):
```
Vercel Pro:  $20/month (if you need more bandwidth)
Resend Pro:  $20/month (if you need 50k emails/month)
Neon Scale:  $19/month (if you need more storage/compute)
Total:       ~$60/month (only if you really scale up)
```

**For now: Everything is FREE** 🎉

---

## 🚀 Action Items

### Immediate (Today):
- [x] Phase 1 complete
- [ ] **Set up Vercel** (follow vercel-setup-guide.md)
- [ ] Deploy Phase 1 to Vercel
- [ ] Test deployment
- [ ] Continue to Phase 2

### Phase 9 (Future):
- [ ] Choose email service (SendGrid or Resend)
- [ ] Create account and get API key
- [ ] Add API key to Vercel environment variables
- [ ] Implement form submission API routes

### Phase 13 (Future - Optional):
- [ ] Decide: Do you need a database?
- [ ] If yes: Set up Neon PostgreSQL
- [ ] If no: Skip Phase 13, continue to Phase 14

### Never:
- [ ] ~~Set up Render~~ (Not needed)
- [ ] ~~Set up separate NestJS backend~~ (Use Next.js API routes)

---

## 📞 Questions to Consider

### Do You Need a Database? (Phase 13 Decision)

**Choose NO if:**
- ✅ Forms just send emails to your inbox
- ✅ You manually track job applications via email
- ✅ You don't need admin dashboard to browse submissions
- ✅ News/content is static (edited in code)

**Choose YES if:**
- ✅ You want admin dashboard to view all form submissions
- ✅ You want to track job applications in a system
- ✅ You want CMS (content management system)
- ✅ You want user accounts/authentication

**My Recommendation:** Start with NO (emails only), add database later if needed.

---

## 🎯 Next Steps

1. **Read** `vercel-setup-guide.md` in this folder
2. **Set up** Vercel account
3. **Deploy** YPI website to Vercel
4. **Continue** with Phase 2 (Homepage Development)

**Good luck! 🚀**

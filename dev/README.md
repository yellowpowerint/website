# Yellow Power International - Website

## Production-Ready Corporate Website

This is the complete Next.js 14 application for Yellow Power International, Ghana's leading mining support services provider.

**Status:** ✅ Phase 16 - Pre-Launch Preparation  
**Last Updated:** December 2025

### Technology Stack

- **Framework:** Next.js 14.2+ (App Router)
- **Language:** TypeScript 5.3+
- **Styling:** Tailwind CSS 3.4+
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **Authentication:** NextAuth.js
- **AI:** OpenAI GPT-4 + Pinecone Vector DB
- **Email:** Resend / SendGrid
- **File Storage:** Cloudinary
- **Maps:** Mapbox GL
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel
- **Domain:** yellowpowerinternational.com

### Project Structure

```
dev/
├── app/
│   ├── (marketing)/          # Public-facing pages (13 sections)
│   │   ├── page.tsx          # Homepage
│   │   ├── about/            # Company information
│   │   ├── services/         # 6 service pages
│   │   ├── projects/         # Project showcase
│   │   ├── sustainability/   # CSR & sustainability
│   │   ├── careers/          # HR & recruitment
│   │   ├── news/             # News & media
│   │   ├── contact/          # Contact pages
│   │   └── ...
│   ├── admin/                # Admin dashboard (10 routes)
│   ├── api/                  # API routes (12 endpoints)
│   │   ├── ai/               # AI features (4 endpoints)
│   │   ├── auth/             # Authentication
│   │   ├── contact/          # Form submissions
│   │   └── ...
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── shared/               # Shared components
│   ├── sections/             # Page sections (30+)
│   ├── forms/                # Form components (8)
│   ├── layouts/              # Layout components
│   └── admin/                # Admin components
├── lib/
│   ├── utils/                # Utility functions
│   ├── api/                  # API clients (email, newsletter, etc.)
│   ├── ai/                   # AI integration (PowerBot, search)
│   ├── auth/                 # Authentication config
│   ├── config/               # Configuration
│   ├── constants/            # Data constants (15+ files)
│   ├── seo/                  # SEO utilities
│   ├── security/             # Rate limiting, security
│   ├── structured-data/      # Schema.org markup
│   └── validations/          # Zod schemas (8)
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── public/
│   ├── images/               # Images (7 categories, 65 placeholders)
│   └── documents/            # PDFs (4 categories, 22 placeholders)
└── styles/                   # Additional styles
```

### Getting Started

#### 1. Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)
- Git

#### 2. Installation

```bash
# Clone the repository
git clone https://github.com/webblabsorg/ypi-website.git
cd ypi-website/dev

# Install dependencies
npm install
```

#### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local and add your credentials:
# - Database URL (DATABASE_URL, DIRECT_URL)
# - Admin credentials (ADMIN_EMAIL, ADMIN_PASSWORD)
# - NextAuth secret (NEXTAUTH_SECRET)
# - Email provider keys (RESEND_API_KEY or SENDGRID_API_KEY)
# - Optional: AI features (OPENAI_API_KEY, PINECONE_*)
# - Optional: Newsletter (MAILCHIMP_* or SENDGRID_*)
```

**Generate NextAuth Secret:**
```bash
openssl rand -base64 32
```

#### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

#### 5. Development Server

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

#### 6. Build & Deploy

```bash
# Lint code
npm run lint

# Type check
npm run type-check

# Build for production
npm run build

# Start production server locally
npm start
```

### Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations

### Company Information

- **Name:** Yellow Power International
- **Founded:** 2017
- **Founder:** Mr. Emmanuel Kweku Ganu
- **Location:** Madina, Greater Accra, Ghana
- **Industry:** Mining Support Services
- **Services:**
  - Pre Split Drilling
  - Production Drilling
  - Reverse Circulation Drilling
  - Load & Haul Operations
  - Construction Services

### Key Features

#### Public Website (88 Pages Generated)
- **Homepage** - Hero, services overview, featured projects
- **About Us** - Company history, leadership, awards, global presence
- **Services** (6 pages) - Production drilling, pre-split drilling, RC drilling, load & haul, construction
- **Projects** - Interactive map, project showcase, client testimonials
- **Sustainability** - CSR initiatives, environmental commitments, safety
- **Careers** - Job listings, application system, company culture
- **News & Media** - Articles, press releases, newsletter archive, media kit
- **Contact** - Multiple contact forms, office locations with maps

#### Admin Dashboard (`/admin`)
- **Content Management** - News articles, job postings, projects
- **Submissions** - Contact forms, job applications, partnership inquiries
- **Media Library** - Image and document management
- **Analytics** - Basic site analytics dashboard
- **Settings** - Site configuration

#### AI Features (Powered by OpenAI GPT-4 + Pinecone)
- **PowerBot** - Intelligent chatbot for mining services queries
- **AI Search** - Semantic search across site content
- **Document Intelligence** - Query company documents and manuals
- **Recommendations** - Personalized service suggestions

#### Integrations
- **WhatsApp** - Direct messaging integration
- **Newsletter** - Mailchimp / SendGrid integration
- **Maps** - Mapbox for office and project locations
- **Social Media** - LinkedIn, Twitter, Facebook, YouTube links
- **Email Notifications** - Automated form submission alerts

### Environment Variables

See `.env.example` for complete list. Required variables:

```env
# Core
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_SITE_URL=https://yellowpowerinternational.com

# Admin
ADMIN_EMAIL=admin@yellowpowerinternational.com
ADMIN_PASSWORD=your-password-here

# Email (Required for forms)
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yellowpowerinternational.com
EMAIL_TO=info@yellowpowerinternational.com

# AI (Optional - disable if not needed)
NEXT_PUBLIC_ENABLE_POWERBOT=false
NEXT_PUBLIC_ENABLE_AI_SEARCH=false
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
```

### Database Schema

See `prisma/schema.prisma` for complete database model. Key entities:

- **NewsArticle** - Blog posts and news
- **JobPosting** - Career opportunities
- **Project** - Project portfolio
- **ContactSubmission** - Contact form submissions
- **JobApplication** - Job applications
- **PartnershipInquiry** - Partnership requests
- **SupplierRegistration** - Supplier applications
- **ConsultationRequest** - Consultation bookings
- **QuoteRequest** - Quote requests
- **User** - Admin users

### Development Phases

This project follows a phased development approach:

- ✅ **Phase 0:** Repository Setup & Infrastructure
- ✅ **Phase 1:** Design System & Foundation
- ✅ **Phase 2:** Homepage Development
- ✅ **Phase 3:** About Us Pages
- ✅ **Phase 4:** Services & Solutions
- ✅ **Phase 5:** Projects, Clients & Partnerships
- ✅ **Phase 6:** Sustainability & CSR
- ✅ **Phase 7:** Careers & HR
- ✅ **Phase 8:** News, Media & Contact
- ✅ **Phase 9:** Backend API & Form Handling
- ✅ **Phase 10:** SEO & Performance Optimization
- ✅ **Phase 11:** AI Features Integration
- ✅ **Phase 12:** Admin Dashboard & CMS
- ✅ **Phase 13:** Database Integration
- ✅ **Phase 14:** Advanced Features & Integrations
- ✅ **Phase 15:** Content Population & QA
- 🔄 **Phase 16:** Pre-Launch Preparation (Current)

See `../notes/phases.md` for detailed phase documentation.

### Deployment

**Vercel (Recommended):**

1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set custom domain: yellowpowerinternational.com
4. Deploy: automatic on push to main branch

**Build Configuration:**
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 18.x
```

### Documentation

- **Technical Docs:** `../notes/ypi_tech_doc.md`
- **Phase Specs:** `../notes/phase*.md`
- **API Docs:** `../notes/api-documentation.md`
- **Admin Guide:** `../notes/admin-guide.md`
- **Deployment Guide:** `../notes/deployment-checklist.md`

### Support & Contact

- **Technical Issues:** Create GitHub issue
- **Company Website:** https://yellowpowerinternational.com
- **Phone:** +233268066942 / 0550099130
- **Email:** info@yellowpowerinternational.com

### License

Proprietary - Yellow Power International © 2025

# Production Deployment Checklist
## Yellow Power International Website

**Version:** 1.0  
**Target Domain:** yellowpowerinternational.com  
**Last Updated:** December 2025

---

## Pre-Deployment Checklist

### Code Quality & Testing

- [ ] **Lint passes** - Run `npm run lint` with 0 errors
- [ ] **Build succeeds** - Run `npm run build` successfully
- [ ] **TypeScript compiles** - No type errors
- [ ] **All tests pass** - Unit and integration tests
- [ ] **No console errors** - Clean browser console on all pages
- [ ] **No TODO/FIXME** - Review and address all code todos

### Environment Configuration

- [ ] **Production env vars set in Vercel**
  - [ ] DATABASE_URL
  - [ ] DIRECT_URL
  - [ ] NEXTAUTH_SECRET
  - [ ] NEXTAUTH_URL (set to production domain)
  - [ ] ADMIN_EMAIL
  - [ ] ADMIN_PASSWORD (or ADMIN_PASSWORD_HASH)
  - [ ] EMAIL_PROVIDER + provider API key
  - [ ] EMAIL_FROM
  - [ ] EMAIL_TO
  - [ ] Department emails (SALES_EMAIL, HR_EMAIL, etc.)
  - [ ] NEXT_PUBLIC_SITE_URL=https://yellowpowerinternational.com
  - [ ] Optional: AI keys (OPENAI_API_KEY, PINECONE_*)
  - [ ] Optional: Newsletter (MAILCHIMP_* or SENDGRID_*)
  - [ ] Optional: Analytics (GA_MEASUREMENT_ID, SENTRY_DSN)

- [ ] **No secrets in code** - All sensitive data in env vars
- [ ] **No .env.local committed** - Verified in .gitignore

### Database

- [ ] **Database created** - Neon PostgreSQL or equivalent
- [ ] **Migrations run** - `npx prisma migrate deploy`
- [ ] **Database seeded** - Initial data populated
- [ ] **Backup configured** - Automatic backups enabled
- [ ] **Connection pooling** - Configured if needed
- [ ] **SSL enforced** - Database uses SSL connection

### Domain & DNS

- [ ] **Domain purchased** - yellowpowerinternational.com registered
- [ ] **Domain added to Vercel** - In Vercel project settings
- [ ] **DNS configured** - A/CNAME records pointing to Vercel
  ```
  A     @       76.76.21.21
  CNAME www     cname.vercel-dns.com
  ```
- [ ] **DNS propagated** - Checked with `nslookup yellowpowerinternational.com`
- [ ] **SSL certificate provisioned** - HTTPS working (Vercel auto)
- [ ] **www redirect** - www.yellowpowerinternational.com → yellowpowerinternational.com

### Email Configuration

- [ ] **Professional emails created**
  - [ ] info@yellowpowerinternational.com
  - [ ] sales@yellowpowerinternational.com
  - [ ] hr@yellowpowerinternational.com
  - [ ] partnerships@yellowpowerinternational.com
  - [ ] procurement@yellowpowerinternational.com
  - [ ] media@yellowpowerinternational.com
  - [ ] support@yellowpowerinternational.com

- [ ] **Email forwarding configured** - To appropriate inboxes
- [ ] **SPF record** - Configured for email provider
- [ ] **DKIM configured** - Email authentication
- [ ] **Email provider API key** - Resend or SendGrid configured
- [ ] **Test email sent** - Verified delivery

### Security

- [ ] **HTTPS enforced** - All http:// redirects to https://
- [ ] **Security headers** - Configured in next.config.mjs
  - [ ] Strict-Transport-Security
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] X-XSS-Protection
  - [ ] Referrer-Policy
  - [ ] Permissions-Policy
  - [ ] Content-Security-Policy

- [ ] **Rate limiting implemented** - API routes protected
- [ ] **Form spam protection** - Honeypot or reCAPTCHA
- [ ] **Admin auth secured** - Strong password, secure session
- [ ] **API keys not exposed** - No NEXT_PUBLIC_ for secrets
- [ ] **SQL injection protected** - Prisma ORM used
- [ ] **XSS protection** - User input sanitized

### Performance

- [ ] **Lighthouse score** - Performance > 90
- [ ] **Core Web Vitals passing**
  - [ ] LCP < 2.5s
  - [ ] FID/INP < 100ms
  - [ ] CLS < 0.1

- [ ] **Images optimized** - Next/Image component used
- [ ] **Lazy loading** - Images and components lazy loaded
- [ ] **Code splitting** - Dynamic imports where appropriate
- [ ] **Bundle size optimized** - Average First Load JS < 200 KB
- [ ] **Fonts optimized** - next/font used
- [ ] **Caching configured** - Static assets cached

### SEO

- [ ] **Sitemap generated** - /sitemap.xml available
- [ ] **Robots.txt configured** - /robots.txt present
- [ ] **Meta tags** - All pages have unique titles & descriptions
- [ ] **Open Graph tags** - Social media sharing configured
- [ ] **Structured data** - Schema.org markup implemented
  - [ ] Organization
  - [ ] LocalBusiness
  - [ ] BreadcrumbList
  - [ ] Article (for news)
  - [ ] JobPosting (for careers)

- [ ] **Canonical URLs** - All pages have canonical tags
- [ ] **Mobile-friendly** - Passes mobile-friendly test
- [ ] **No broken links** - All internal links working
- [ ] **Alt text on images** - All images have descriptive alt text

### Accessibility

- [ ] **WCAG 2.1 AA compliant** - Accessibility tested
- [ ] **Keyboard navigation** - All features keyboard accessible
- [ ] **Screen reader tested** - Works with NVDA/VoiceOver
- [ ] **Color contrast** - Meets contrast requirements
- [ ] **Focus indicators** - Visible focus states
- [ ] **ARIA labels** - Proper ARIA attributes
- [ ] **Semantic HTML** - Proper heading hierarchy

### Content

- [ ] **All pages reviewed** - Content proofread
- [ ] **Contact info accurate** - Phone, email, addresses correct
- [ ] **Legal pages present**
  - [ ] Privacy Policy (/privacy)
  - [ ] Terms of Service (/terms)
  - [ ] Cookie Policy (if needed)

- [ ] **Placeholder content replaced** - Or acknowledged
  - [ ] 65 placeholder images → Real photos (or planned)
  - [ ] 22 placeholder PDFs → Professional documents (or planned)

- [ ] **Company details correct** - All information accurate
- [ ] **Team photos** - Staff photos with consent
- [ ] **Client logos** - Licensing confirmed

### Functionality

- [ ] **All forms tested**
  - [ ] Contact form
  - [ ] Quote request
  - [ ] Job application
  - [ ] Partnership inquiry
  - [ ] Supplier registration
  - [ ] Consultation booking
  - [ ] Newsletter signup

- [ ] **Email notifications working** - All forms send emails
- [ ] **File uploads working** - Resume/document uploads functional
- [ ] **Search working** - Site search returns results
- [ ] **Maps working** - Mapbox integration functional
- [ ] **Admin dashboard accessible** - Login and all features work
- [ ] **AI features** - PowerBot and AI Search (if enabled)
- [ ] **WhatsApp button** - Links to correct number
- [ ] **Social media links** - All links correct and working

### Browser Testing

- [ ] **Chrome** (latest) - All features work
- [ ] **Firefox** (latest) - All features work
- [ ] **Safari** (latest) - All features work
- [ ] **Edge** (latest) - All features work
- [ ] **Mobile Safari** (iOS) - Responsive and functional
- [ ] **Chrome Mobile** (Android) - Responsive and functional

### Monitoring & Analytics

- [ ] **Vercel Analytics enabled** - In Vercel project settings
- [ ] **Google Analytics** - GA4 tracking code (optional)
- [ ] **Sentry configured** - Error tracking (optional)
- [ ] **Uptime monitoring** - UptimeRobot or StatusCake configured
  - [ ] Main site (/monitoring)
  - [ ] API endpoints
  - [ ] Alert email configured

- [ ] **Log monitoring** - Vercel logs reviewed
- [ ] **Performance monitoring** - Core Web Vitals tracked

---

## Deployment Steps

### 1. Final Code Review

```bash
# In dev/ directory
cd dev/

# Run all checks
npm run lint
npm run type-check
npm run build

# Verify build output
# - 88 pages should generate
# - No errors in output
# - Bundle sizes acceptable
```

### 2. Database Preparation

```bash
# Run migrations on production database
npx prisma migrate deploy

# Optionally seed initial data
npx prisma db seed

# Verify connection
npx prisma studio
```

### 3. Environment Variables

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add all required variables (see checklist above)
3. Set for "Production" environment
4. Save and redeploy if variables changed

### 4. Git Workflow

```bash
# Ensure all changes committed
git status

# Merge develop to main
git checkout main
git pull origin main
git merge develop

# Push to trigger deployment
git push origin main
```

### 5. Vercel Deployment

1. Vercel automatically deploys on push to main
2. Monitor deployment in Vercel dashboard
3. Wait for deployment to complete (~2-5 minutes)
4. Check deployment logs for any errors

### 6. DNS Configuration

**If first deployment:**

1. Add domain in Vercel: Project → Settings → Domains
2. Add both:
   - yellowpowerinternational.com
   - www.yellowpowerinternational.com
3. Configure DNS at your registrar:
   ```
   Type  Name  Value
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```
4. Wait for DNS propagation (5 minutes - 48 hours)
5. Vercel auto-provisions SSL certificate

### 7. Verify Deployment

Visit: https://yellowpowerinternational.com

Check:
- [ ] Site loads without errors
- [ ] HTTPS works (green padlock)
- [ ] Homepage displays correctly
- [ ] Navigation works
- [ ] No console errors (F12)

---

## Post-Deployment Testing

### Smoke Tests (Critical Paths)

Run through these key user journeys:

#### 1. Homepage Flow
- [ ] Visit homepage
- [ ] All sections load
- [ ] Images display
- [ ] CTA buttons work

#### 2. Contact Flow
- [ ] Navigate to /contact
- [ ] Fill contact form
- [ ] Submit successfully
- [ ] Verify email received

#### 3. Service Pages
- [ ] Visit /services
- [ ] Click on a service
- [ ] View service details
- [ ] Share buttons work

#### 4. Job Application
- [ ] Visit /careers/jobs
- [ ] View job posting
- [ ] Click "Apply"
- [ ] Upload resume
- [ ] Submit application
- [ ] Verify email received

#### 5. News
- [ ] Visit /news
- [ ] Read article
- [ ] Newsletter signup
- [ ] Verify confirmation

#### 6. Admin Dashboard
- [ ] Visit /admin/login
- [ ] Login with credentials
- [ ] View dashboard
- [ ] Check submissions
- [ ] Create test article

#### 7. AI Features (if enabled)
- [ ] Open PowerBot
- [ ] Send test query
- [ ] Verify response
- [ ] Test AI Search

### Performance Testing

```bash
# Run Lighthouse audit
lighthouse https://yellowpowerinternational.com --view

# Check key pages
lighthouse https://yellowpowerinternational.com/services/production-drilling --view
lighthouse https://yellowpowerinternational.com/contact --view
```

**Targets:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### SEO Verification

- [ ] Visit Google Search Console
- [ ] Submit sitemap: https://yellowpowerinternational.com/sitemap.xml
- [ ] Request indexing for homepage
- [ ] Check robots.txt: https://yellowpowerinternational.com/robots.txt
- [ ] Verify structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Rollback Plan

If critical issues discovered:

### Option 1: Quick Fix

```bash
# Fix issue locally
# Test fix
git add .
git commit -m "hotfix: [description]"
git push origin main
# Vercel auto-deploys
```

### Option 2: Rollback to Previous

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"
4. Deployment instantly rolls back

### Option 3: Maintenance Mode

If major issue, temporarily show maintenance page:
1. Create `maintenance.html` in `public/`
2. Configure Vercel to serve it
3. Fix issues
4. Remove maintenance mode

---

## Post-Launch Monitoring

### First 24 Hours

- [ ] Check every 2 hours for errors
- [ ] Monitor Vercel logs
- [ ] Check form submissions
- [ ] Review email delivery
- [ ] Monitor uptime
- [ ] Check Core Web Vitals
- [ ] Review user feedback

### First Week

- [ ] Daily log review
- [ ] Form submission analytics
- [ ] Email delivery rates
- [ ] Performance metrics
- [ ] Error rates
- [ ] User behavior (Analytics)

### First Month

- [ ] Weekly performance audits
- [ ] SEO rankings check
- [ ] Content updates
- [ ] User feedback review
- [ ] Security audit
- [ ] Backup verification

---

## Support Contacts

**Technical Issues:**
- Vercel Support: https://vercel.com/support
- GitHub Issues: [Repository URL]
- Email: info@yellowpowerinternational.com

**Domain/DNS:**
- Domain Registrar Support

**Email:**
- Resend/SendGrid Support

**Database:**
- Neon Support (if using Neon)

---

## Checklist Sign-Off

**Deployment Date:** _____________

**Deployed By:** _____________

**Verified By:** _____________

**Production URL:** https://yellowpowerinternational.com

**Status:** ☐ Success ☐ Issues Found ☐ Rolled Back

**Notes:**
_________________________________
_________________________________
_________________________________

---

**Next Steps After Successful Deployment:**

1. Update stakeholders
2. Announce launch on social media
3. Submit to search engines
4. Start content marketing
5. Monitor and optimize
6. Plan Phase 17 enhancements

---

**Document Version:** 1.0  
**Last Updated:** December 2025

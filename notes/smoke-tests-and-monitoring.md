# Smoke Tests & Post-Launch Monitoring
## Yellow Power International Website

**Version:** 1.0  
**Last Updated:** December 2025  
**Production URL:** https://yellowpowerinternational.com

---

## Part 1: Smoke Tests

### Overview

Smoke tests are quick, high-level tests to verify critical functionality immediately after deployment. Run these tests on production after every deployment.

**Time Required:** 15-20 minutes  
**When to Run:** Immediately after deployment, before announcing launch

---

### Pre-Flight Checks

Before starting smoke tests:

- [ ] Deployment completed successfully in Vercel
- [ ] No build errors in deployment logs
- [ ] DNS propagated (site accessible)
- [ ] HTTPS working (green padlock)

---

### Test Suite

#### Test 1: Homepage Load

**URL:** https://yellowpowerinternational.com/

**Steps:**
1. Open URL in browser
2. Wait for full page load
3. Scroll through entire page

**Verify:**
- [ ] Page loads within 3 seconds
- [ ] No 404 errors
- [ ] No console errors (F12)
- [ ] Hero image displays
- [ ] All sections visible
- [ ] Navigation menu works
- [ ] Footer displays with correct info

**Expected Result:** Homepage loads completely without errors

---

#### Test 2: Contact Form Submission

**URL:** https://yellowpowerinternational.com/contact

**Steps:**
1. Navigate to Contact page
2. Fill out form:
   ```
   Name: Test User
   Email: test@yellowpowerinternational.com
   Phone: +233268066942
   Category: General
   Subject: Production Deployment Test
   Message: This is a test submission to verify form functionality.
   ```
3. Click "Send Message"

**Verify:**
- [ ] Form accepts input
- [ ] Validation works (try submitting empty)
- [ ] Submission succeeds
- [ ] Success message displays
- [ ] Email received at configured address
- [ ] Email contains correct information

**Expected Result:** Form submits successfully and email arrives within 1 minute

---

#### Test 3: Service Pages

**URLs:** 
- https://yellowpowerinternational.com/services
- https://yellowpowerinternational.com/services/production-drilling

**Steps:**
1. Visit services overview
2. Click on "Production Drilling"
3. Scroll through service detail page
4. Click share button
5. Navigate back using breadcrumbs

**Verify:**
- [ ] Services list displays
- [ ] Service cards clickable
- [ ] Service detail loads
- [ ] Images display
- [ ] Share buttons work
- [ ] Breadcrumb navigation works
- [ ] "Get Quote" CTA present

**Expected Result:** All service pages accessible and functional

---

#### Test 4: Job Application

**URL:** https://yellowpowerinternational.com/careers/jobs

**Steps:**
1. Navigate to Jobs page
2. Click on any job listing
3. Click "Apply Now"
4. Fill application form:
   ```
   First Name: Test
   Last Name: Applicant
   Email: test@example.com
   Phone: +233268066942
   Education: Bachelor's Degree
   Experience: 3 years
   Resume: [Upload test PDF]
   Cover Letter: Test cover letter text
   ```
5. Submit application

**Verify:**
- [ ] Job listings display
- [ ] Job details load
- [ ] Application form opens
- [ ] File upload works
- [ ] Form validation works
- [ ] Submission succeeds
- [ ] Confirmation message shown
- [ ] Email notification received (HR email)

**Expected Result:** Application submitted successfully

---

#### Test 5: News & Media

**URL:** https://yellowpowerinternational.com/news

**Steps:**
1. Visit News page
2. Click on an article
3. Read article
4. Test newsletter signup at bottom

**Verify:**
- [ ] News list displays
- [ ] Articles load correctly
- [ ] Images display
- [ ] Share buttons work
- [ ] Newsletter form submits
- [ ] Press releases page accessible

**Expected Result:** News section fully functional

---

#### Test 6: Projects Portfolio

**URL:** https://yellowpowerinternational.com/projects

**Steps:**
1. Visit Projects page
2. Interact with project map
3. Click on project card
4. View project details

**Verify:**
- [ ] Project map loads (Mapbox)
- [ ] Markers display
- [ ] Click marker shows project info
- [ ] Project cards display
- [ ] Project detail pages load
- [ ] Images display
- [ ] Client testimonials show (if present)

**Expected Result:** Projects section with interactive map works

---

#### Test 7: Admin Dashboard

**URL:** https://yellowpowerinternational.com/admin/login

**Steps:**
1. Navigate to admin login
2. Enter credentials
3. Access dashboard
4. Check submissions
5. View analytics
6. Logout

**Verify:**
- [ ] Login page loads
- [ ] Authentication works
- [ ] Dashboard loads
- [ ] Submissions visible
- [ ] Can navigate all sections
- [ ] Logout works

**Expected Result:** Admin dashboard fully accessible

---

#### Test 8: AI Features (If Enabled)

**PowerBot Test:**

**Steps:**
1. Look for PowerBot icon (bottom right)
2. Click to open chat
3. Send message: "What drilling services do you offer?"
4. Wait for response

**Verify:**
- [ ] PowerBot icon visible
- [ ] Chat window opens
- [ ] Message sends
- [ ] Response received within 10 seconds
- [ ] Response relevant and helpful
- [ ] Can continue conversation

**AI Search Test:**

**Steps:**
1. Find search bar
2. Enter: "safety procedures"
3. View results

**Verify:**
- [ ] Search box accessible
- [ ] Search executes
- [ ] Results display
- [ ] Results relevant
- [ ] Can click through to pages

**Expected Result:** AI features respond correctly

---

#### Test 9: Mobile Responsive

**Device:** Mobile phone or browser dev tools (F12 → Toggle device)

**Steps:**
1. Open homepage on mobile
2. Navigate menu
3. Submit contact form
4. View service page

**Verify:**
- [ ] Layout responsive
- [ ] Navigation menu (hamburger) works
- [ ] Forms usable on mobile
- [ ] Images sized appropriately
- [ ] Touch targets adequate size
- [ ] No horizontal scrolling

**Expected Result:** Site fully functional on mobile

---

#### Test 10: Performance Quick Check

**Tools:** Browser DevTools Network tab

**Steps:**
1. Open DevTools (F12)
2. Go to Network tab
3. Reload homepage
4. Check load time

**Verify:**
- [ ] Page loads under 3 seconds
- [ ] Largest Contentful Paint < 2.5s
- [ ] No failed requests (red in network tab)
- [ ] Images load progressively
- [ ] No console errors

**Expected Result:** Site loads quickly with good performance

---

### Critical Issues

If any test fails:

**Severity: Critical (P0)**
- Site doesn't load
- Forms don't submit
- Database connection fails
- Admin login broken
- Email notifications not sending

**Action:** Rollback deployment immediately

**Severity: High (P1)**
- AI features not working
- Images not loading
- Mobile layout broken
- Performance very slow (>5s load)

**Action:** Fix within 4 hours or rollback

**Severity: Medium (P2)**
- Minor UI issues
- Non-critical page errors
- Single form validation bug

**Action:** Fix in next deployment (24-48h)

---

## Part 2: Post-Launch Monitoring

### Immediate Monitoring (First 24 Hours)

#### Hourly Checks

**Tools Required:**
- Vercel Dashboard
- Email inbox (for form notifications)
- Google Analytics (if configured)
- Uptime monitor dashboard

**Check Every Hour:**

1. **Site Availability**
   - Visit homepage
   - Check uptime monitor status
   - Response time < 3s

2. **Error Logs**
   - Vercel Dashboard → Logs
   - Filter for errors
   - Investigate any 500 errors

3. **Form Submissions**
   - Check admin dashboard
   - Verify email notifications received
   - Response time tracking

4. **Performance**
   - Vercel Analytics → Performance
   - Core Web Vitals status
   - Page load times

**Alert Thresholds:**
- Uptime: < 99% → Investigate
- Error rate: > 1% → Investigate
- Response time: > 5s → Investigate

---

### Daily Monitoring (First Week)

#### Morning Routine (9 AM)

1. **Uptime Check**
   - Review overnight uptime
   - Check any alerts received
   - Verify all services running

2. **Submissions Review**
   - Admin Dashboard → Submissions
   - Count: Contact, Quotes, Applications
   - Respond to urgent inquiries

3. **Error Log Review**
   - Vercel Dashboard → Logs (last 24h)
   - Identify any patterns
   - Fix any recurring errors

4. **Performance Check**
   - Run Lighthouse audit on 3 key pages
   - Check Core Web Vitals
   - Note any degradation

**Metrics to Track:**
```
Date: [____]
Uptime: [____]%
Page Views: [____]
Form Submissions: [____]
Errors: [____]
Avg Load Time: [____]s
Core Web Vitals: Pass/Fail
```

#### Evening Review (6 PM)

1. **Traffic Analysis**
   - Total page views
   - Top pages
   - Traffic sources
   - Device breakdown

2. **User Behavior**
   - Bounce rate
   - Average session duration
   - Pages per session
   - Popular content

3. **Form Analytics**
   - Submission rate
   - Completion rate
   - Drop-off points

4. **AI Usage** (if enabled)
   - PowerBot queries count
   - AI Search usage
   - Common queries

---

### Weekly Monitoring (First Month)

#### Monday Review

**Site Health:**
- [ ] Overall uptime last week
- [ ] Error rate trends
- [ ] Performance trends
- [ ] Any incidents or outages

**Content:**
- [ ] Number of form submissions
- [ ] Top converting pages
- [ ] Most visited pages
- [ ] Bounce rate by page

**Technical:**
- [ ] Database size/growth
- [ ] API usage
- [ ] Failed requests
- [ ] Slow queries

**Security:**
- [ ] Review access logs
- [ ] Check for suspicious activity
- [ ] Failed login attempts
- [ ] Rate limit hits

#### Weekly Tasks

1. **Content Updates**
   - Publish 1-2 news articles
   - Update job postings
   - Add new projects (if any)

2. **Performance Optimization**
   - Identify slow pages
   - Optimize if needed
   - Update images

3. **SEO Check**
   - Google Search Console review
   - Indexing status
   - Search appearance
   - Any crawl errors

4. **Backup Verification**
   - Confirm database backups running
   - Test backup restore (monthly)

---

### Monthly Monitoring (Ongoing)

#### Monthly Report Template

**Period:** [Month Year]

**Traffic & Engagement:**
- Total visits: _______
- Page views: _______
- Unique visitors: _______
- Avg session duration: _______
- Bounce rate: _______
- Top 5 pages: _______

**Forms & Conversions:**
- Contact submissions: _______
- Quote requests: _______
- Job applications: _______
- Newsletter signups: _______
- Conversion rate: _______

**Performance:**
- Avg load time: _______
- Core Web Vitals: Pass/Fail
- Uptime: _______
- Error rate: _______

**SEO:**
- Indexed pages: _______
- Top keywords: _______
- Organic traffic: _______
- Backlinks: _______

**Issues & Resolutions:**
1. [Issue description] - [Resolution]
2. ...

**Action Items for Next Month:**
1. _______
2. _______

---

### Monitoring Tools Setup

#### Required Tools

1. **Vercel Analytics** (Built-in)
   - Enable in Vercel project settings
   - View: Project → Analytics
   - Metrics: Page views, performance, errors

2. **Uptime Monitoring**
   - Service: UptimeRobot (free) or StatusCake
   - Monitor: https://yellowpowerinternational.com
   - Alert: Email + SMS
   - Frequency: Every 5 minutes

3. **Google Analytics 4** (Optional)
   - Create property
   - Add tracking code
   - Set up goals:
     * Contact form submission
     * Quote request
     * Job application
     * Newsletter signup

4. **Google Search Console**
   - Verify ownership
   - Submit sitemap
   - Monitor: Indexing, Performance, Issues

5. **Sentry** (Optional - Error Tracking)
   - Create project
   - Add DSN to env vars
   - Configure alerts

---

### Alert Configuration

#### Critical Alerts (Immediate Action)

**Uptime:**
- Downtime > 2 minutes → SMS + Email
- Response time > 10s → Email

**Errors:**
- 500 errors > 10/hour → Email
- Failed deployments → Email

**Forms:**
- Email delivery failure → Email

#### Warning Alerts (Review Within Hour)

**Performance:**
- Load time > 5s → Email
- Core Web Vitals failing → Daily digest

**Usage:**
- Rate limit exceeded → Email
- Database connection issues → Email

---

### Incident Response

#### If Site Goes Down

1. **Immediate (0-5 min):**
   - Check Vercel status page
   - Check deployment logs
   - Verify DNS
   - Check database connection

2. **Diagnosis (5-15 min):**
   - Identify root cause
   - Check recent changes
   - Review error logs

3. **Resolution (15-30 min):**
   - Apply fix if simple
   - Rollback deployment if complex
   - Communicate with stakeholders

4. **Post-Mortem (24h after):**
   - Document incident
   - Root cause analysis
   - Prevention measures
   - Update runbook

---

### Key Performance Indicators (KPIs)

#### Technical KPIs

**Target Values:**
- Uptime: > 99.9%
- Page Load Time: < 3s (75th percentile)
- Error Rate: < 0.5%
- Core Web Vitals: All passing
- SEO Score: > 95

#### Business KPIs

**Monthly Targets:**
- Form Submissions: [Set based on business goals]
- Quote Requests: [Target]
- Job Applications: [Target]
- Newsletter Subscribers: [Target]
- Organic Traffic Growth: +10% MoM

---

### Escalation Path

**Level 1 - Self-Service:**
- Check this document
- Review logs
- Try basic fixes

**Level 2 - Technical Team:**
- Email: info@yellowpowerinternational.com
- GitHub issues
- Response time: 4 business hours

**Level 3 - Critical Issues:**
- Contact Vercel support
- Database provider support
- Response time: Immediate

---

### Maintenance Windows

**Scheduled Maintenance:**
- Day: Sunday
- Time: 2:00 AM - 4:00 AM GMT
- Frequency: Monthly (if needed)
- Notification: 48 hours advance

**Emergency Maintenance:**
- As needed for critical fixes
- Minimize downtime
- Communicate proactively

---

## Summary Checklist

### Daily (First Week)
- [ ] Check uptime
- [ ] Review error logs
- [ ] Check form submissions
- [ ] Monitor performance

### Weekly (First Month)
- [ ] Run Lighthouse audit
- [ ] Review analytics
- [ ] Check SEO status
- [ ] Security review

### Monthly (Ongoing)
- [ ] Generate monthly report
- [ ] Performance optimization
- [ ] Content updates
- [ ] Backup verification
- [ ] Security audit

---

**Document Version:** 1.0  
**Last Updated:** December 2025

**For questions or issues:**  
Email: info@yellowpowerinternational.com

# Careers Integration - Website to ERP

## Overview
The company website (yellowpowerinternational.com) now connects to the ERP system to display live job postings and accept applications.

## Backend API Endpoints (ERP)

### 1. GET /api/public/careers/jobs
Fetch all open job postings
- Query params: ?category=&location=&type=
- Returns: Array of job objects
- No authentication required

### 2. GET /api/public/careers/jobs/:jobId
Fetch single job details by jobId
- Returns: Single job object
- No authentication required

### 3. POST /api/public/careers/apply
Submit job application
- Body: { jobPostingId, firstName, lastName, email, phone, resumeText, coverLetter, linkedinUrl }
- Creates candidate if new, creates application
- Returns: { success: true, applicationId }
- No authentication required

## Website Integration (ypi-website)

### API Client Created
File: dev/lib/api/erp-careers.ts
- getJobs(filters) - fetch jobs with optional filters
- getJobById(jobId) - fetch single job
- submitApplication(data) - submit application

### Next Steps for Website

1. Update dev/lib/constants/careers.ts:
   - Replace hardcoded JOBS array with API calls
   - Keep JOB_CATEGORIES, BENEFITS, TESTIMONIALS as static

2. Update dev/app/(marketing)/careers/jobs/page.tsx:
   - Import { getJobs } from '@/lib/api/erp-careers'
   - Fetch jobs server-side or client-side
   - Display live data from ERP

3. Update dev/app/(marketing)/careers/jobs/[jobId]/page.tsx:
   - Import { getJobById } from '@/lib/api/erp-careers'
   - Fetch job details from ERP
   - Display live data

4. Create application form component:
   - Import { submitApplication } from '@/lib/api/erp-careers'
   - Form with fields: firstName, lastName, email, phone, resumeText, coverLetter
   - On submit, call submitApplication()
   - Show success/error messages

## Deployment

### ERP Backend
`ash
cd /var/www/mining-erp
git pull origin main
cd dev/backend
npm ci
npm run build
pm2 restart erp-backend
`

### Website
`ash
cd /var/www/ypi-website/dev
# Update pages to use API
npm run build
pm2 restart ypi-website
`

## Environment Variables

Add to website .env:
`
NEXT_PUBLIC_ERP_API_URL=https://erp.yellowpowerinternational.com/api
`

## Testing

1. Test ERP endpoints:
`ash
curl https://erp.yellowpowerinternational.com/api/public/careers/jobs
`

2. Test from website:
- Visit https://yellowpowerinternational.com/careers/jobs
- Should display jobs from ERP
- Click job -> should show details from ERP
- Submit application -> should create in ERP

## Benefits

✅ HR Manager posts jobs in ERP -> automatically appears on website
✅ Applicants apply on website -> automatically creates candidate + application in ERP
✅ HR Manager can screen, interview, and manage all applicants in ERP
✅ Single source of truth for all recruitment data
✅ No manual data entry or syncing required

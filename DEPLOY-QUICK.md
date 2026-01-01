# Quick Deployment Guide

## What's Done:
- Backend API live at erp.yellowpowerinternational.com/api/public/careers
- ApplicationForm component created
- ERP API client created

## Next Steps:

### 1. Create Demo Jobs in ERP
- Login to ERP → HR → Recruitment → Job Postings
- Create 3-5 jobs with Status = OPEN

### 2. Update Website Pages (Need Manual Edits)
Files to update:
- dev/app/(marketing)/careers/page.tsx - fetch from getJobs() API
- dev/app/(marketing)/careers/jobs/page.tsx - fetch from getJobs() API  
- dev/app/(marketing)/careers/jobs/[jobId]/page.tsx - add ApplicationForm

### 3. Deploy to VPS
cd /var/www/yellowpower-website
git pull origin main
cd dev
npm ci
npm run build
pm2 restart ypi-website

### 4. Add .env on VPS
echo "NEXT_PUBLIC_ERP_API_URL=https://erp.yellowpowerinternational.com/api" >> /var/www/yellowpower-website/dev/.env.production

# Content Deployment Guide
## Yellow Power International Website

**Last Updated:** December 31, 2025  
**Repository:** https://github.com/webblabsorg/ypi-website.git  
**Production VPS:** 216.158.230.187

---

## Overview

This guide covers how to add videos, photos, and update content on the YPI website and deploy changes to the production VPS.

---

## Prerequisites

- Access to the local development repository
- SSH access to production VPS (root@216.158.230.187)
- Git configured with SSH authentication

---

## Part 1: Adding Content Locally

### Adding Videos

**Location:** `dev/lib/constants/media.ts`

1. **Get YouTube Video Details:**
   - Video URL format: `https://youtu.be/VIDEO_ID` or `https://www.youtube.com/watch?v=VIDEO_ID`
   - Thumbnail URL: `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`
   - Embed URL: `https://www.youtube.com/embed/VIDEO_ID`

2. **Edit the Media Constants File:**
   ```bash
   # Open the file
   code dev/lib/constants/media.ts
   ```

3. **Add New Video Entry:**
   ```typescript
   export const MEDIA_VIDEOS: MediaVideo[] = [
     {
       id: 'vid-XXX', // Increment the number
       title: 'Your Video Title from YouTube',
       thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg',
       videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
       description: 'Video description from YouTube',
       category: 'Equipment Demo', // or 'Project Showcase', 'Company Overview', etc.
       duration: '3:45', // Optional
       publishedAt: '2025-12-31', // Date in YYYY-MM-DD format
     },
     // ... existing videos
   ];
   ```

4. **Video Categories Available:**
   - `Company Overview`
   - `Equipment Demo`
   - `Project Showcase`
   - `Employee Stories`
   - `CSR Activities`

5. **Update Video Gallery Summary (Optional):**
   If the new video is the first in the array, update the summary in:
   ```
   dev/components/sections/VideoGallery.tsx
   ```
   
   Edit the `MAIN_VIDEO_SUMMARY` constant at the top of the file.

### Adding Photos

**Location:** `dev/lib/constants/media.ts`

1. **Upload Image to Public Folder:**
   ```bash
   # Place images in appropriate folder
   dev/public/images/gallery/your-image.jpg
   ```

2. **Add Image Entry:**
   ```typescript
   export const MEDIA_IMAGES: MediaImage[] = [
     {
       id: 'img-XXX', // Increment the number
       title: 'Descriptive Image Title',
       src: '/images/gallery/your-image.jpg',
       alt: 'Descriptive alt text for accessibility',
       category: 'Equipment', // or 'Projects', 'Team', 'CSR', 'Facilities'
       tags: ['Tag1', 'Tag2', 'Tag3'],
       caption: 'Optional caption text',
       photographer: 'YPI Media Team',
       date: '2025-12-31',
     },
     // ... existing images
   ];
   ```

3. **Image Categories Available:**
   - `Equipment`
   - `Projects`
   - `Team`
   - `CSR`
   - `Facilities`

### Updating Other Content

**News Articles:** `dev/app/(marketing)/news/` - Add new MDX files or update existing ones

**Services:** `dev/lib/constants/services.ts` - Update service descriptions

**Projects:** `dev/lib/constants/projects.ts` - Add or update project information

**Team Members:** `dev/lib/constants/team.ts` - Update leadership and team info

---

## Part 2: Testing Locally

Before deploying, always test your changes locally:

```bash
# Navigate to dev directory
cd dev/

# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Open browser and test
# http://localhost:3000
```

**Test Checklist:**
- [ ] New videos play correctly
- [ ] Images display properly
- [ ] No console errors
- [ ] Content appears in correct sections
- [ ] Mobile view looks good

---

## Part 3: Committing Changes to GitHub

```bash
# Check what files changed
git status

# Add the files you modified
git add dev/lib/constants/media.ts
git add dev/public/images/gallery/your-image.jpg
# Add other files as needed

# Commit with descriptive message
git commit -m "Add new video: [Video Title]"
# or
git commit -m "Add new images to gallery"

# Push to GitHub
git push origin main
```

**Commit Message Best Practices:**
- Be descriptive: "Add Komatsu PC2000 transport video to gallery"
- Reference what changed: "Update team photos and bios"
- Keep it concise but informative

---

## Part 4: Deploying to Production VPS

### Step 1: SSH into the VPS

```bash
ssh -p 22 root@216.158.230.187
# Password: =2pcZVgDY8Ad5PRK6r
```

### Step 2: Navigate to Website Directory

```bash
cd /var/www/yellowpower-website
```

### Step 3: Pull Latest Changes

```bash
# Fetch and pull from GitHub
git fetch origin
git pull origin main

# If there are conflicts, reset to match GitHub exactly
git reset --hard origin/main
```

### Step 4: Rebuild the Application

```bash
# Navigate to dev directory
cd dev

# Install any new dependencies
npm install

# Build the production version
npm run build
```

**Expected Output:**
- ✓ Compiled successfully
- ✓ Linting and checking validity of types
- ✓ Collecting page data
- ✓ Generating static pages (103/103)

### Step 5: Restart the Application

```bash
# Restart PM2 process
pm2 restart ypi-website

# Check status
pm2 status

# View logs if needed
pm2 logs ypi-website --lines 50
```

**Verify PM2 Status:**
```
┌────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┐
│ id │ name        │ mode    │ pid     │ uptime   │ ↺      │ status│ cpu      │
├────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┤
│ 13 │ ypi-website │ fork    │ 3745439 │ 5m       │ 0      │ online│ 0%       │
└────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┘
```

### Step 6: Verify Deployment

```bash
# Test locally on VPS
curl -I http://localhost:3002

# Should return: HTTP/1.1 200 OK
```

### Step 7: Clear Browser Cache and Test

On your local machine:
- **Windows/Linux:** Ctrl + Shift + R
- **Mac:** Cmd + Shift + R

Visit: https://yellowpowerinternational.com

---

## Quick Reference Commands

### Full Deployment (Copy-Paste Ready)

```bash
# On VPS
cd /var/www/yellowpower-website
git fetch origin
git pull origin main
cd dev
npm install
npm run build
pm2 restart ypi-website
pm2 status
curl -I http://localhost:3002
```

### If Git Pull Fails

```bash
# Reset to match GitHub exactly (discards local changes)
cd /var/www/yellowpower-website
git fetch origin
git reset --hard origin/main
cd dev
npm run build
pm2 restart ypi-website
```

### If PM2 Process is Stuck

```bash
# Stop and delete process
pm2 stop ypi-website
pm2 delete ypi-website

# Start fresh
cd /var/www/yellowpower-website/dev
pm2 start npm --name "ypi-website" -- start -- -p 3002
pm2 save
pm2 status
```

---

## Troubleshooting

### Issue: 502 Bad Gateway

**Cause:** App not running on correct port or PM2 process crashed

**Solution:**
```bash
# Check PM2 status
pm2 status

# Check what port app is running on
netstat -tlnp | grep node

# Nginx expects port 3002
# Restart on correct port
pm2 stop ypi-website
pm2 delete ypi-website
cd /var/www/yellowpower-website/dev
pm2 start npm --name "ypi-website" -- start -- -p 3002
pm2 save
```

### Issue: Changes Not Showing

**Possible Causes:**
1. Browser cache
2. Build didn't complete
3. PM2 not restarted

**Solution:**
```bash
# Rebuild and restart
cd /var/www/yellowpower-website/dev
npm run build
pm2 restart ypi-website

# Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
```

### Issue: Git Pull Conflicts

**Solution:**
```bash
# Discard local changes and match GitHub
git fetch origin
git reset --hard origin/main
```

### Issue: Build Errors

**Check for:**
- TypeScript errors
- Missing dependencies
- Syntax errors in code

**Solution:**
```bash
# View full error output
npm run build

# Install missing dependencies
npm install

# Check logs
pm2 logs ypi-website --lines 100
```

---

## Important Notes

1. **Always test locally** before deploying to production
2. **Commit to GitHub first**, then deploy to VPS
3. **The VPS pulls from GitHub** - local changes must be pushed first
4. **Port 3002** - The app must run on port 3002 to match nginx configuration
5. **Clear browser cache** after deployment to see changes
6. **PM2 auto-restarts** - The app will restart automatically if it crashes

---

## File Locations Reference

### On Local Machine
- **Videos/Images:** `dev/lib/constants/media.ts`
- **Services:** `dev/lib/constants/services.ts`
- **Projects:** `dev/lib/constants/projects.ts`
- **Team:** `dev/lib/constants/team.ts`
- **News:** `dev/app/(marketing)/news/`
- **Public Images:** `dev/public/images/`

### On VPS
- **Website Root:** `/var/www/yellowpower-website/`
- **Dev Directory:** `/var/www/yellowpower-website/dev/`
- **Nginx Config:** `/etc/nginx/sites-available/ypi-website`
- **PM2 Logs:** `/root/.pm2/logs/`

---

## Support

**Technical Issues:**
- Check PM2 logs: `pm2 logs ypi-website`
- Check nginx logs: `tail -f /var/log/nginx/error.log`
- Verify app is running: `pm2 status`

**GitHub Issues:**
- Repository: https://github.com/webblabsorg/ypi-website
- Ensure SSH key is added to GitHub account

---

**Document Version:** 1.0  
**Last Updated:** December 31, 2025  
**Maintained By:** Development Team

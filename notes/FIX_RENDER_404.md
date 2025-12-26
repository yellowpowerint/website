# Fix Render 404 Error - Next.js Deployment

**Problem:** Site shows "Not Found" 404 error  
**Cause:** Next.js App Router requires a Node.js server, not static hosting

---

## Solution: Change from Static Site to Web Service

Your Next.js app uses the App Router which needs server-side rendering. Render's Static Site won't work for this.

### **Option 1: Delete and Recreate as Web Service** (Recommended)

#### Step 1: Delete Current Static Site
1. Go to Render Dashboard
2. Click on **"ypi-website"**
3. Click **"Settings"** tab (bottom of left sidebar)
4. Scroll to bottom → Click **"Delete Web Service"**
5. Confirm deletion

#### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Select **"Connect a repository"**
3. Choose **"yellowpowerint/website"**
4. Click **"Connect"**

#### Step 3: Configure Web Service Settings

**Basic:**
- **Name:** `ypi-website`
- **Region:** Choose closest to Ghana (e.g., Frankfurt or Oregon)
- **Branch:** `main`
- **Root Directory:** `dev`

**Build & Deploy:**
- **Runtime:** `Node`
- **Build Command:**
  ```bash
  npm install && npm run build
  ```
- **Start Command:**
  ```bash
  npm start
  ```

**Environment Variables:**
Add these:
- Key: `NODE_VERSION` → Value: `20.x`
- Key: `NODE_ENV` → Value: `production`

**Plan:**
- Select **"Free"** (750 hours/month free)

Click **"Create Web Service"**

---

### **Option 2: Update Existing Service Settings**

If you want to keep the current service:

1. Go to your service in Render
2. Click **"Settings"**
3. Change **"Publish Directory"** to: `out`
4. Update **"Build Command"** to:
   ```bash
   npm install && npm run build && npm run export
   ```
5. Click **"Save Changes"**

But this requires updating your Next.js config first (see below).

---

## Alternative: Configure for Static Export

If you prefer static hosting, modify the Next.js config:

### Update next.config.mjs

Add `output: 'export'`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      // ... existing patterns
    ],
  },
  // ... rest of config
};

export default nextConfig;
```

### Update package.json

Add export script:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next export",
    "lint": "next lint"
  }
}
```

### Push Changes

```bash
git add .
git commit -m "Configure Next.js for static export"
git push origin main
```

Render will auto-deploy with the new config.

---

## Recommended Approach: Web Service

For your Next.js app with App Router, **Web Service is the best option** because:

✅ Supports server-side rendering  
✅ Supports API routes (if you add them later)  
✅ Better performance for dynamic content  
✅ Still free (750 hours/month)  
✅ Auto-scaling included  

---

## Quick Fix Steps

**Do this now:**

1. **Delete current Static Site** in Render
2. **Create new Web Service** with these settings:
   - Root Directory: `dev`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: `NODE_VERSION=20.x`
3. **Wait for deploy** (5-10 minutes)
4. **Test:** Visit your `.onrender.com` URL

---

## After It Works

Once the site loads correctly:
1. Add custom domains (same as before)
2. Update Namecheap DNS
3. SSL will auto-provision

---

**Next Step:** Go to Render and delete the Static Site, then create a new Web Service with the settings above.

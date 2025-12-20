# Render Deployment Guide - Yellow Power International Website

**Domain:** yellowpowerinternational.com  
**GitHub Repository:** https://github.com/yellowpowerint/website  
**Platform:** Render (https://render.com)

---

## Why Render?

Render is a modern cloud platform that offers:
- ✅ **Free tier** with generous limits
- ✅ **No phone verification issues** (unlike AWS)
- ✅ **Automatic deployments** from GitHub
- ✅ **Free SSL certificates**
- ✅ **Global CDN** included
- ✅ **Easy custom domain setup**
- ✅ **Built-in CI/CD**

---

## 🎁 Render Free Tier Benefits

### Static Sites (Perfect for your website)
- **Bandwidth:** 100 GB/month
- **Build minutes:** Unlimited
- **Custom domains:** Unlimited
- **SSL certificates:** Free (auto-renewal)
- **Global CDN:** Included
- **Automatic deploys:** From GitHub

### Web Services (For future ERP backend)
- **750 hours/month** free (enough for 1 service running 24/7)
- **512 MB RAM**
- **0.1 CPU**
- **Automatic HTTPS**

---

## 📋 Prerequisites

Before starting:
- [x] GitHub account created
- [x] Repository created: `yellowpowerint/website`
- [ ] Render account (will create in Step 1)
- [ ] Namecheap domain access
- [ ] Code pushed to GitHub

---

## 🚀 Deployment Steps

### **STEP 1: Create Render Account** (5 minutes)

1. Go to: **https://render.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Choose sign-up method:
   - **GitHub** (Recommended - easiest integration)
   - **GitLab**
   - **Email**

#### If using GitHub sign-up:
1. Click **"Sign up with GitHub"**
2. Authorize Render to access your GitHub account
3. Grant access to the `yellowpowerint` organization
4. Complete profile setup:
   - **Name:** Your name or company name
   - **Email:** Verify email address

✅ **No credit card required for free tier!**

---

### **STEP 2: Connect GitHub Repository** (2 minutes)

After signing up:

1. Render Dashboard → Click **"New +"** (top-right)
2. Select **"Static Site"**
3. Click **"Connect a repository"**
4. If not connected yet:
   - Click **"Configure account"**
   - Select **"yellowpowerint"** organization
   - Choose **"All repositories"** or select **"website"** specifically
   - Click **"Install"**
5. Back in Render, you should now see your repository
6. Click **"Connect"** next to `yellowpowerint/website`

---

### **STEP 3: Configure Static Site** (5 minutes)

Fill in the deployment configuration:

#### Basic Settings
- **Name:** `ypi-website` (or `yellowpower-website`)
  - This creates URL: `ypi-website.onrender.com`
- **Branch:** `main`
- **Root Directory:** `dev` ⚠️ **IMPORTANT**
  - Your Next.js app is in the `dev` folder

#### Build Settings
- **Build Command:** 
  ```bash
  npm install && npm run build
  ```
- **Publish Directory:** 
  ```bash
  .next
  ```

#### Advanced Settings (Click "Advanced")

**Environment Variables:** (Add these)
- Key: `NODE_VERSION`
  - Value: `20.x`

**Auto-Deploy:**
- ✅ Keep **"Auto-Deploy"** enabled (deploys on every push to main)

#### Plan
- Select **"Free"** plan

Click **"Create Static Site"**

---

### **STEP 4: Wait for First Deploy** (5-10 minutes)

Render will now:
1. Clone your repository
2. Install dependencies
3. Build your Next.js app
4. Deploy to CDN

**Monitor progress:**
- You'll see the build logs in real-time
- Status will change from "Building" → "Live"

**Your site will be available at:**
- `https://ypi-website.onrender.com` (or your chosen name)

---

### **STEP 5: Configure Custom Domain** (10 minutes)

#### 5.1 Add Domain in Render

1. In your Static Site dashboard → Click **"Settings"** tab
2. Scroll to **"Custom Domains"** section
3. Click **"Add Custom Domain"**
4. Enter: `yellowpowerinternational.com`
5. Click **"Verify"**
6. Repeat for: `www.yellowpowerinternational.com`

Render will show you DNS records to add:

**For apex domain (yellowpowerinternational.com):**
- Type: `A`
- Name: `@` or blank
- Value: Render's IP address (e.g., `216.24.57.1`)

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: Your Render URL (e.g., `ypi-website.onrender.com`)

#### 5.2 Update Namecheap DNS

1. Login to **Namecheap**
2. **Domain List** → **yellowpowerinternational.com** → **Manage**
3. **Advanced DNS** tab
4. Add/Edit records:

**Add A Record for apex:**
- Type: `A Record`
- Host: `@`
- Value: Render's IP (from Step 5.1)
- TTL: Automatic

**Add CNAME for www:**
- Type: `CNAME Record`
- Host: `www`
- Value: `ypi-website.onrender.com` (your Render URL)
- TTL: Automatic

5. Click **"Save All Changes"**

⏱️ **DNS propagation: 5-60 minutes**

---

### **STEP 6: Enable SSL Certificate** (Automatic)

Once DNS is configured:
1. Render automatically provisions SSL certificates
2. Wait 5-15 minutes after DNS propagation
3. Your site will be available at:
   - `https://yellowpowerinternational.com`
   - `https://www.yellowpowerinternational.com`

**SSL is completely free and auto-renews!**

---

## 📝 Project Structure for Render

Your repository structure:
```
ypi-website/
├── dev/                    ← Root directory for Render
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   ├── next.config.mjs
│   └── ...
├── notes/
├── prod/
└── README.md
```

**Important:** Set **Root Directory** to `dev` in Render settings.

---

## 🔄 Automatic Deployments

Every time you push to GitHub:
1. Render detects the push
2. Automatically starts a new build
3. Deploys the new version
4. Zero downtime deployment

**To deploy updates:**
```bash
git add .
git commit -m "Update website content"
git push origin main
```

Render handles the rest!

---

## 🔧 Render Configuration File (Optional)

You can create a `render.yaml` file in the root for infrastructure-as-code:

```yaml
services:
  - type: web
    name: ypi-website
    env: static
    buildCommand: cd dev && npm install && npm run build
    staticPublishPath: dev/.next
    envVars:
      - key: NODE_VERSION
        value: 20.x
    domains:
      - yellowpowerinternational.com
      - www.yellowpowerinternational.com
```

This is optional but useful for version control of your infrastructure.

---

## 📊 Monitoring & Logs

### View Build Logs
1. Render Dashboard → Your site
2. Click **"Logs"** tab
3. See real-time build and deployment logs

### View Metrics
1. Click **"Metrics"** tab
2. See:
   - Request count
   - Bandwidth usage
   - Build times
   - Deploy history

---

## 🚨 Troubleshooting

### Build fails with "Module not found"
**Solution:** Ensure `package.json` has all dependencies
```bash
cd dev
npm install
```

### "Root directory not found"
**Solution:** Set Root Directory to `dev` in Render settings

### Custom domain not working
**Solution:** 
- Check DNS records in Namecheap
- Wait for DNS propagation (up to 48 hours)
- Verify A record points to correct Render IP
- Use `nslookup yellowpowerinternational.com` to check

### SSL certificate not provisioning
**Solution:**
- Ensure DNS is correctly configured
- Wait 15-30 minutes after DNS propagation
- Check domain verification in Render settings

### Site shows 404
**Solution:**
- Check Publish Directory is set to `.next`
- Verify build completed successfully
- Check build logs for errors

---

## 💰 Cost Comparison

### Render Free Tier
- **Static Site:** FREE
- **100 GB bandwidth/month:** FREE
- **Custom domain:** FREE
- **SSL certificate:** FREE
- **Global CDN:** FREE
- **Automatic deploys:** FREE

**Total: $0/month** ✅

### If you exceed free tier:
- **Bandwidth:** $0.10/GB after 100 GB
- **Typical cost for company website:** Still $0-5/month

---

## 🎯 Next Steps After Deployment

1. **Test the website:**
   - Visit `https://yellowpowerinternational.com`
   - Check all pages load correctly
   - Test on mobile devices
   - Verify SSL certificate

2. **Set up monitoring:**
   - Enable Render notifications
   - Set up uptime monitoring (optional)

3. **Configure email alerts:**
   - Render Dashboard → Account Settings → Notifications
   - Enable deploy notifications

4. **Future: Deploy ERP**
   - Use Render Web Services for backend
   - Use Render PostgreSQL for database
   - All on free tier initially

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Next.js on Render:** https://render.com/docs/deploy-nextjs
- **Custom Domains:** https://render.com/docs/custom-domains
- **Render Community:** https://community.render.com

---

## ✅ Deployment Checklist

- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Static site created with correct settings
- [ ] Root directory set to `dev`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `.next`
- [ ] First deploy successful
- [ ] Custom domain added in Render
- [ ] DNS records updated in Namecheap
- [ ] SSL certificate provisioned
- [ ] Website accessible at yellowpowerinternational.com
- [ ] Auto-deploy enabled

---

**Deployment Date:** December 20, 2024  
**Platform:** Render  
**Status:** Ready to deploy

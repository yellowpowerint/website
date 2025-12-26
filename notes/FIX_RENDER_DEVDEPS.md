# Fix Render Build - DevDependencies Issue

**Problem:** Build fails with "Cannot find module 'autoprefixer'" even after adding package-lock.json

**Root Cause:** `autoprefixer`, `postcss`, and `tailwindcss` are in `devDependencies`, but Render needs them to build the app.

---

## Solution: Update Render Build Command

Render runs `npm install --production` by default, which skips devDependencies. We need to install ALL dependencies during build.

### **Option 1: Change Build Command in Render (Recommended)**

1. Go to Render Dashboard: https://dashboard.render.com
2. Click on **"ypi-website"** service
3. Click **"Settings"** (left sidebar)
4. Find **"Build Command"**
5. Change from:
   ```bash
   npm install && npm run build
   ```
   To:
   ```bash
   npm ci && npm run build
   ```

6. Click **"Save Changes"**
7. Render will automatically redeploy

**Why `npm ci`?**
- Installs ALL dependencies (including devDependencies)
- Uses package-lock.json for exact versions
- Faster and more reliable than `npm install`

---

### **Option 2: Set Environment Variable**

Alternative approach - tell npm to install devDependencies:

1. Render Dashboard → **"ypi-website"** → **"Environment"**
2. Click **"Add Environment Variable"**
3. Add:
   - **Key:** `NPM_CONFIG_PRODUCTION`
   - **Value:** `false`
4. Click **"Save Changes"**

This forces npm to install devDependencies even in production mode.

---

### **Option 3: Move Dependencies to Production**

Move build-time dependencies from `devDependencies` to `dependencies`:

**In package.json, move these:**
- `autoprefixer`
- `postcss`
- `tailwindcss`
- `typescript`

**Keep in devDependencies:**
- `@types/*` packages
- `eslint`
- `eslint-config-next`

Then push to GitHub.

---

## Recommended: Option 1 (Change Build Command)

This is the cleanest solution and follows Next.js best practices.

**Steps:**
1. Render → Settings → Build Command
2. Change to: `npm ci && npm run build`
3. Save Changes
4. Wait 5-10 minutes for rebuild

---

## Why This Happens

Next.js needs these packages at **build time**:
- `tailwindcss` - Process Tailwind CSS
- `postcss` - Transform CSS
- `autoprefixer` - Add vendor prefixes
- `typescript` - Compile TypeScript

These are typically in `devDependencies` because they're not needed at **runtime** (when the app is running), but Render's production build skips them.

---

## After Fixing

Once the build succeeds, you'll see:
```
✓ npm ci completed
✓ npm run build completed
✓ Compiled successfully
✓ Build succeeded 🎉
```

Then your site will be live at: `https://ypi-website.onrender.com`

---

**Action Required:** Go to Render Settings and change Build Command to `npm ci && npm run build`

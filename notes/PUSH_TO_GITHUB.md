# Push to GitHub - Authentication Required

The repository is ready to push, but you need to authenticate with GitHub first.

---

## Current Status

✅ Files staged and committed  
✅ Remote set to: https://github.com/yellowpowerint/website.git  
❌ Push failed - authentication needed

---

## Quick Fix - Push to GitHub

### Method 1: Using Personal Access Token (Easiest)

#### Step 1: Create Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   - **Note:** `YPI Website Deployment`
   - **Expiration:** 90 days
   - **Scopes:** Check ✅ **repo** (all sub-options)
4. Click **"Generate token"**
5. **COPY THE TOKEN** (you won't see it again!)

#### Step 2: Push with Token
Open PowerShell and run:

```powershell
cd "C:\Users\Plange\Downloads\Projects\ypi-website"

# Push to GitHub
git push -u origin main
```

When prompted:
- **Username:** `yellowpowerint` (or your GitHub username if you have access)
- **Password:** Paste the Personal Access Token (not your GitHub password)

---

### Method 2: Using GitHub CLI (Alternative)

```powershell
# Install GitHub CLI from: https://cli.github.com/

# Authenticate
gh auth login

# Follow the prompts to authenticate

# Then push
git push -u origin main
```

---

### Method 3: Check Repository Access

If you're getting permission denied:

1. Verify you have access to the `yellowpowerint` organization
2. Go to: https://github.com/yellowpowerint/website
3. Check if you can see the repository
4. If not, ask the organization owner to add you as a collaborator

---

## After Successful Push

Once the push succeeds, verify:

1. Go to: https://github.com/yellowpowerint/website
2. Check that all files are visible:
   - ✅ `dev/` folder with Next.js app
   - ✅ `notes/` folder with documentation
   - ✅ `prod/` folder with scripts
   - ✅ `README.md`

---

## Next Step: Deploy to Render

After pushing to GitHub, follow these steps:

1. **Create Render account:** https://render.com
2. **Sign up with GitHub** (easiest method)
3. **Connect the repository:** `yellowpowerint/website`
4. **Create Static Site** with these settings:
   - **Root Directory:** `dev`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `.next`
5. **Add custom domain:** `yellowpowerinternational.com`

See `notes/RENDER_DEPLOYMENT.md` for detailed instructions.

---

## Troubleshooting

### "Permission denied"
- Ensure you're using a Personal Access Token, not your password
- Verify you have write access to the repository
- Check you're a member of the `yellowpowerint` organization

### "Repository not found"
- Verify the repository exists: https://github.com/yellowpowerint/website
- Check the repository is not private (or you have access if it is)

### "Authentication failed"
- Token might have expired
- Generate a new token with `repo` scope
- Make sure you copied the entire token

---

**Ready to push?** Follow Method 1 above to authenticate and push your code!

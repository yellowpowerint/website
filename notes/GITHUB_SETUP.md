# GitHub Setup Guide - Yellow Power International

**Organization:** yellowpowerint  
**Repository:** website  
**URL:** https://github.com/yellowpowerint/website

---

## Repository Information

- **Name:** website
- **Description:** Yellow Power International - Official Company Website
- **Visibility:** Public (recommended) or Private
- **Tech Stack:** Next.js 14, TypeScript, Tailwind CSS

---

## Push to GitHub - Step by Step

### Option 1: Fresh Push (Recommended)

If you want to push to the new repository cleanly:

```bash
# Navigate to project root
cd "C:\Users\Plange\Downloads\Projects\ypi-website"

# Remove old remote (if exists)
git remote remove origin

# Add new remote
git remote add origin https://github.com/yellowpowerint/website.git

# Stage all files
git add .

# Commit changes
git commit -m "Initial commit: Yellow Power International website"

# Push to new repository
git push -u origin main
```

### Option 2: Using the provided commands

```bash
cd "C:\Users\Plange\Downloads\Projects\ypi-website"

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit
git commit -m "first commit"

# Rename branch to main
git branch -M main

# Add remote
git remote add origin https://github.com/yellowpowerint/website.git

# Push
git push -u origin main
```

---

## Authentication

You'll need to authenticate with GitHub. Choose one method:

### Method 1: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Settings:
   - **Note:** "YPI Website Deployment"
   - **Expiration:** 90 days (or custom)
   - **Scopes:** Check `repo` (all sub-options)
4. Click **"Generate token"**
5. **Copy the token** (you won't see it again!)

When pushing, use:
- **Username:** `yellowpowerint` (or your GitHub username)
- **Password:** Paste the token

### Method 2: GitHub CLI

```bash
# Install GitHub CLI from: https://cli.github.com/

# Authenticate
gh auth login

# Follow prompts
```

### Method 3: SSH Key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key

# Use SSH remote instead
git remote set-url origin git@github.com:yellowpowerint/website.git
```

---

## Repository Structure

```
website/
├── .git/
├── .gitignore
├── README.md
├── dev/                    # Next.js application
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── next.config.mjs
├── notes/                  # Documentation
│   ├── RENDER_DEPLOYMENT.md
│   ├── GITHUB_SETUP.md
│   ├── aws.md
│   └── ...
└── prod/                   # Production scripts
    └── deploy-to-aws.ps1
```

---

## What Gets Pushed

Files included (based on .gitignore):
- ✅ Source code (`dev/app`, `dev/components`, etc.)
- ✅ Configuration files (`package.json`, `next.config.mjs`)
- ✅ Documentation (`notes/`, `README.md`)
- ✅ Public assets (`dev/public/`)

Files excluded (in .gitignore):
- ❌ `node_modules/`
- ❌ `.next/` (build output)
- ❌ `.env.local` (environment variables)
- ❌ Build artifacts

---

## Verify Push Success

After pushing, verify:

1. Go to: https://github.com/yellowpowerint/website
2. Check that all files are visible
3. Verify `dev/` folder contains your Next.js app
4. Check `notes/` folder has documentation
5. Ensure no sensitive files were pushed (`.env`, etc.)

---

## Branch Protection (Optional)

To protect the main branch:

1. Repository → **Settings** → **Branches**
2. Click **"Add rule"**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
5. Save changes

---

## Collaborators

To add team members:

1. Repository → **Settings** → **Collaborators**
2. Click **"Add people"**
3. Enter GitHub username or email
4. Select permission level:
   - **Read:** View only
   - **Write:** Push access
   - **Admin:** Full access

---

## GitHub Actions (Future CI/CD)

You can set up automatic deployments later:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Trigger Render Deploy
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## Common Issues

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/yellowpowerint/website.git
```

### "Permission denied"
- Check authentication method
- Verify you have write access to the repository
- Use Personal Access Token instead of password

### "Large files rejected"
- Check for accidentally committed `node_modules/`
- Use `.gitignore` to exclude large files
- Remove from history if needed:
  ```bash
  git rm -r --cached node_modules/
  git commit -m "Remove node_modules"
  ```

### "Branch main does not exist"
```bash
git branch -M main
```

---

## Next Steps After Push

1. ✅ Verify files on GitHub
2. ✅ Connect repository to Render
3. ✅ Deploy to production
4. ✅ Configure custom domain

See `RENDER_DEPLOYMENT.md` for deployment instructions.

---

**Created:** December 20, 2024  
**Repository:** https://github.com/yellowpowerint/website

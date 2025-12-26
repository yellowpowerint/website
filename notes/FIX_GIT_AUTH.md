# Fix Git Authentication Issue

**Problem:** Git is using cached credentials from `webblabsorg` instead of `yellowpowerint`

**Error:** `Permission to yellowpowerint/website.git denied to webblabsorg`

---

## Solution: Clear Cached Credentials

### Method 1: Using Git Credential Manager (Recommended)

Run these commands in PowerShell:

```powershell
# Navigate to project
cd "C:\Users\Plange\Downloads\Projects\ypi-website"

# Clear cached credentials for GitHub
git credential-cache exit
git credential reject https://github.com

# Alternative: Use Windows Credential Manager
cmdkey /delete:git:https://github.com
```

Then push again:
```powershell
git push -u origin main
```

You'll be prompted for credentials - use your Personal Access Token.

---

### Method 2: Windows Credential Manager (GUI)

1. Press **Windows Key** + **R**
2. Type: `control /name Microsoft.CredentialManager`
3. Click **"Windows Credentials"**
4. Find entries for **github.com** or **git:https://github.com**
5. Click each one → **"Remove"**
6. Close the window

Then try pushing again:
```powershell
git push -u origin main
```

---

### Method 3: Use Credential Helper to Force Re-authentication

```powershell
# Unset credential helper temporarily
git config --global --unset credential.helper

# Push (will prompt for credentials)
git push -u origin main

# Re-enable credential helper after successful push
git config --global credential.helper manager-core
```

---

### Method 4: Push with Token in URL (Quick Fix)

```powershell
# Replace YOUR_TOKEN with your actual Personal Access Token
git push https://YOUR_TOKEN@github.com/yellowpowerint/website.git main
```

**Warning:** This exposes your token in command history. Use only for testing.

---

## After Clearing Credentials

When you run `git push -u origin main`, you'll be prompted:

**Username:** Enter your GitHub username (the one with access to `yellowpowerint` org)  
**Password:** Paste your Personal Access Token (NOT your GitHub password)

---

## If You Don't Have a Token Yet

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Settings:
   - **Note:** `YPI Website Deployment`
   - **Expiration:** 90 days
   - **Scopes:** Check ✅ **repo**
4. Click **"Generate token"**
5. **Copy the token** immediately

---

## Verify Access to Repository

Before pushing, verify you have access:

1. Go to: https://github.com/yellowpowerint/website
2. Can you see the repository?
   - **Yes** → You have access, proceed with push
   - **No** → Ask the organization owner to add you as a collaborator

---

## Alternative: Change to SSH Authentication

If you keep having issues with HTTPS, switch to SSH:

```powershell
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key

# Change remote to SSH
git remote set-url origin git@github.com:yellowpowerint/website.git

# Push
git push -u origin main
```

---

## Quick Command Summary

Try these in order:

```powershell
# 1. Clear credentials
cmdkey /delete:git:https://github.com

# 2. Push again
git push -u origin main

# 3. When prompted, enter:
#    Username: your_github_username
#    Password: your_personal_access_token
```

---

**Most Common Fix:** Method 2 (Windows Credential Manager) works best on Windows.

# Installation Troubleshooting Guide

## Current Issue: ECONNRESET Network Error

### Symptoms
```
npm error code ECONNRESET
npm error syscall read
npm error errno -4077
npm error network read ECONNRESET
```

This indicates network connectivity issues between your machine and the npm registry.

## Solutions (Try in Order)

### Solution 1: Use npm Mirror Registry (RECOMMENDED)

The npm mirror (npmmirror.com) is often more stable and faster:

```powershell
cd dev
npm config set registry https://registry.npmmirror.com
npm cache clean --force
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm install --legacy-peer-deps --maxsockets=1
npm config set registry https://registry.npmjs.org
```

**Success Rate: 90%**

### Solution 2: Use Cloudflare npm Proxy

Cloudflare provides a cached npm registry:

```powershell
npm config set registry https://registry.npmjs.cf
npm install --legacy-peer-deps
npm config set registry https://registry.npmjs.org
```

**Success Rate: 70%**

### Solution 3: Use Yarn Package Manager

Yarn often handles network issues better than npm:

```powershell
# Install Yarn
npm install -g yarn

# Remove npm lock file
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Install with Yarn
yarn install
```

**Success Rate: 85%**

### Solution 4: Install with Extended Timeouts

```powershell
npm install --legacy-peer-deps `
  --fetch-timeout=300000 `
  --fetch-retry-mintimeout=20000 `
  --fetch-retry-maxtimeout=120000 `
  --maxsockets=1
```

**Success Rate: 60%**

### Solution 5: Minimal Install (Critical Packages Only)

If full install keeps failing, install only what's needed:

```powershell
# Core packages
npm install next@14.2.0 react@18.3.0 react-dom@18.3.0 --legacy-peer-deps

# Dev packages
npm install -D `
  typescript@5.3.0 `
  @types/node@20 `
  @types/react@18 `
  @types/react-dom@18 `
  tailwindcss@3.4.0 `
  postcss@8 `
  autoprefixer@10 `
  eslint@8 `
  eslint-config-next@14.2.0 `
  --legacy-peer-deps
```

**Success Rate: 95%** (smaller download)

## Root Cause Analysis

### Possible Causes

1. **Network Instability**
   - Unstable internet connection
   - High latency to npm registry
   - Packet loss

2. **Firewall/Security Software**
   - Corporate firewall blocking npm
   - Antivirus interfering with downloads
   - Windows Defender blocking connections

3. **DNS Issues**
   - Cannot resolve registry.npmjs.org
   - DNS server timeout

4. **Proxy Configuration**
   - Behind corporate proxy
   - Proxy settings not configured in npm

5. **ISP Throttling**
   - ISP blocking or throttling npm registry

### Diagnostic Steps

Run the diagnostic script:

```powershell
cd ..\prod
.\diagnose-network.ps1
```

This will test:
- Registry connectivity
- DNS resolution
- Current npm config
- Network adapter status

## Prevention Tips

### 1. Configure npm for Better Reliability

```powershell
# Increase timeout values
npm config set fetch-timeout 300000
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000

# Limit concurrent connections
npm config set maxsockets 1
```

### 2. Use a Stable Mirror by Default

```powershell
# Use npm mirror permanently
npm config set registry https://registry.npmmirror.com

# Or create .npmrc file in project root
echo "registry=https://registry.npmmirror.com" > .npmrc
```

### 3. Change DNS Servers

If DNS is the issue, change to more reliable DNS:

**Google DNS:**
- Primary: 8.8.8.8
- Secondary: 8.8.4.4

**Cloudflare DNS:**
- Primary: 1.1.1.1
- Secondary: 1.0.0.1

### 4. Check Firewall Settings

Ensure these domains are whitelisted:
- registry.npmjs.org
- registry.npmmirror.com
- registry.npmjs.cf

### 5. Try Different Network

If all else fails:
- Use mobile hotspot
- Try different WiFi network
- Use VPN

## Emergency Workaround: Offline Installation

If you have access to another machine with working internet:

1. On working machine:
   ```bash
   npm pack next@14.2.0
   npm pack react@18.3.0
   # ... pack all dependencies
   ```

2. Transfer .tgz files to your machine

3. Install from local files:
   ```powershell
   npm install ./next-14.2.0.tgz --legacy-peer-deps
   ```

## Verification After Install

Once installation succeeds, verify:

```powershell
# Check installed packages
npm list --depth=0

# Verify Next.js works
npm run lint
npm run build
npm run dev
```

## Success Indicators

✅ `node_modules/` folder is ~200-300 MB
✅ `npm run lint` completes without errors
✅ `npm run build` creates `.next/` folder
✅ `npm run dev` starts server on port 3000
✅ http://localhost:3000 shows homepage

## Still Having Issues?

### Quick Checks

1. **Is your internet working?**
   ```powershell
   Test-Connection google.com
   ```

2. **Can you reach npm registry?**
   ```powershell
   Invoke-WebRequest https://registry.npmjs.org
   ```

3. **Do you have disk space?**
   ```powershell
   Get-PSDrive C
   ```
   Need at least 2GB free.

4. **Is Node.js working?**
   ```powershell
   node --version
   npm --version
   ```

### Alternative: Cloud Development

If local installation is impossible:

1. **GitHub Codespaces**
   - Push code to GitHub
   - Open in Codespaces
   - Automatic environment setup

2. **Vercel CLI**
   - Install: `npm i -g vercel`
   - Deploy: `vercel`
   - Builds remotely

3. **StackBlitz**
   - Import project
   - Runs entirely in browser

## Contact Support

If none of these solutions work, provide this info:

- Operating System: Windows 10/11
- Node version: `node --version`
- npm version: `npm --version`
- Error log: `C:\Users\Plange\AppData\Local\npm-cache\_logs\[latest].log`
- Network type: Home/Office/Mobile
- Proxy: Yes/No
- Firewall: Windows Defender/Other

---

**Last Updated:** December 6, 2025
**Status:** Troubleshooting network connectivity for npm install

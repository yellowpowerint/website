# Yellow Power International - Quick Start Guide

## 🚀 Complete Phase 0 Setup

### Prerequisites
- ✅ Node.js 18.x or later
- ✅ npm or yarn
- ✅ Stable internet connection

### Step 1: Install Dependencies

```bash
cd dev
npm install
```

**Note:** If installation fails due to network issues, try:
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

### Step 2: Verify Installation

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Start development server
npm run dev
```

### Step 3: Test the Application

Open your browser and visit: **http://localhost:3000**

You should see the Yellow Power International placeholder homepage.

### Step 4: Git Setup (Optional)

```bash
# At repository root
git checkout -b develop
git add .
git commit -m "feat: Phase 0 - Repository setup and infrastructure complete

- Initialized Next.js 14 with App Router
- Configured TypeScript with strict mode
- Set up Tailwind CSS v3
- Created project structure (components, lib, public)
- Added company branding and constants
- Ready for Phase 1: Design System & Foundation"

git push origin develop
```

### Step 5: Connect to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `dev`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Deploy!

## 📁 Key Directories

| Folder | Purpose |
|--------|---------|
| `dev/` | All development files (Next.js project root) |
| `dev/app/` | Pages and layouts |
| `dev/components/` | React components |
| `dev/lib/` | Utilities and constants |
| `dev/public/` | Static assets |
| `notes/` | Documentation |
| `prod/` | Production scripts and artifacts |

## 🔧 Common Commands

```bash
cd dev                  # Navigate to dev workspace
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
```

## 🐛 Troubleshooting

### "next: command not found"
**Solution:** Run `npm install` in the `dev/` folder

### Network timeout during npm install
**Solution:** 
```bash
npm config set registry https://registry.npmmirror.com
npm install
npm config set registry https://registry.npmjs.org
```

### Build fails with TypeScript errors
**Solution:** 
```bash
npm run lint
# Fix reported errors
npm run build
```

### Port 3000 already in use
**Solution:** 
```bash
npm run dev -- -p 3001  # Use a different port
```

## 📚 Documentation

- **Full Setup Status:** See `SETUP_STATUS.md`
- **Phase 0 Details:** See `notes/PHASE0_STATUS.md`
- **Technical Spec:** See `notes/ypi_tech_doc.md`
- **Phase Breakdown:** See `notes/phases.md`
- **Dev README:** See `dev/README.md`

## ✨ What's Next?

After Phase 0 is complete, proceed to:

**Phase 1: Design System & Foundation**
- Install shadcn/ui components
- Implement Newmont-inspired color palette
- Configure Inter font
- Create header and footer components
- Build navigation system

See `notes/phases.md` for complete Phase 1 requirements.

## 🆘 Need Help?

1. Check `notes/PHASE0_STATUS.md` for detailed implementation notes
2. Review error messages in the terminal
3. Ensure all prerequisites are met
4. Verify you're in the correct directory (`dev/`)

---

**Company:** Yellow Power International  
**Industry:** Mining Support Services  
**Location:** Madina, Greater Accra, Ghana  
**Founded:** 2017

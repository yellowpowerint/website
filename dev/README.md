# Yellow Power International - Website

## Phase 0: Repository Setup & Infrastructure

This is the development workspace for the Yellow Power International corporate website.

### Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5.3+
- **Styling:** Tailwind CSS 3.4+
- **Hosting:** Vercel

### Project Structure

```
dev/
├── app/
│   ├── (marketing)/      # Public-facing pages
│   │   └── page.tsx      # Homepage
│   ├── api/              # API routes (future)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # UI components (Phase 1+)
│   ├── shared/           # Shared components
│   ├── sections/         # Page sections
│   └── layouts/          # Layout components
├── lib/
│   ├── utils/            # Utility functions
│   ├── api/              # API client
│   └── constants/        # Constants & configs
├── public/
│   ├── images/           # Image assets
│   └── documents/        # Document assets
└── styles/               # Additional styles
```

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run linter:
   ```bash
   npm run lint
   ```

### Company Information

- **Name:** Yellow Power International
- **Founded:** 2017
- **Founder:** Mr. Emmanuel Kweku Ganu
- **Location:** Madina, Greater Accra, Ghana
- **Industry:** Mining Support Services
- **Services:**
  - Pre Split Drilling
  - Production Drilling
  - Reverse Circulation Drilling
  - Load & Haul Operations
  - Construction Services

### Development Phases

This project follows a phased development approach:

- ✅ **Phase 0:** Repository Setup & Infrastructure (Current)
- 🔄 **Phase 1:** Design System & Foundation
- 📋 **Phase 2:** Homepage Development
- 📋 **Phase 3+:** Additional pages and features

See `../notes/phases.md` for detailed phase documentation.

### Contact

- Phone: +233268066942 / 0550099130
- Website: https://yellowpowerinternational.com/

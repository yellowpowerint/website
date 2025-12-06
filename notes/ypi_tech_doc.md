# Yellow Power International
## Technical & Architectural Development Documentation

**Company:** Yellow Power International  
**Founded:** 2017  
**Founder:** Mr. Emmanuel Kweku Ganu  
**Location:** Madina, Greater Accra, Ghana  
**Industry:** Mining Support Services  
**Company Size:** 201-500 employees  
**Offices:** 3 African countries  
**Contact:** +233268066942 | 0550099130  
**Website:** https://yellowpowerinternational.com/  
**Version:** 1.0  
**Date:** December 2025

---

## Company Overview

**About Yellow Power International:**

Established in 2017 by Mr. Emmanuel Kweku Ganu, Yellow Power International has grown to become one of the largest Mining Support Services companies in Ghana, with over 200 employees and offices in 3 African countries.

Yellow Power International provides comprehensive solutions for the mining industry. With years of experience and a team of experts, the company helps mining clients extract valuable minerals and materials in a safe, efficient, and environmentally responsible manner.

**Core Services:**
- Pre Split Drilling
- Production Drilling
- Reverse Circulation Drilling
- Load & Haul Operations
- Construction Services

In addition to its operations in Ghana, Yellow Power International has established partnerships with mining companies in other countries, allowing it to expand its reach and tap into new markets. The company has invested heavily in the development of new mining technologies, making it one of the leaders in the industry and setting the standard for sustainable mining practices.

**Mission Statement:**
To enrich the lives and the fortunes of the employees of Yellow Power, accomplished through skill development and also working collaboratively with our Clients to ensure their expectations are met and delivering quality without compromise.

**Vision Statement:**
The vision of the company is to become an industry and market leader in the provision of mining, drilling and construction services to mining companies. The company will also strive to be the employer's and customers' choice by ensuring that transparency prevails in its business relationship. The Company will support the operations of mining companies by providing them with state-of-the-art and modern machinery and equipment thereby improving their productivity, lowering operating costs and also assisting them in upgrading their operating skills.

**Corporate Social Responsibility:**
Yellow Power International is dedicated to giving back to the communities where it operates. The company has established CSR programs to support local schools, healthcare facilities, and other community initiatives, and its employees regularly volunteer their time and resources to support these efforts.

---

## Executive Summary

This document outlines the technical architecture, design specifications, and implementation guidelines for Yellow Power International's corporate website. The platform will serve as a comprehensive digital presence for Ghana's leading mining support services company, showcasing our drilling expertise, equipment capabilities, sustainability initiatives, client partnerships, and career opportunities.

### Project Scope
- B2B-focused corporate website with multi-page architecture
- Showcase of drilling and mining support services
- Equipment and technology capabilities presentation
- Client partnership and project portfolio showcase
- AI-powered features for enhanced user experience
- Responsive design optimized for all devices
- Enterprise-grade performance and security
- Integration with CMS and data management systems
- Client portal for project updates and service requests

---

## 1. Design System & Brand Identity

### 1.1 Color Palette
**Based on Newmont Corporation's Professional Color Scheme**

**Primary Colors (Newmont-inspired):**
- Gold Primary: `#FDB714` (Newmont signature gold/yellow)
- Gold Hover: `#E5A313`
- Gold Light: `#FEE9B8`
- Gold Dark: `#C88F0F`

**Secondary Colors:**
- Navy Blue: `#003B5C` (Primary headers, navigation)
- Navy Dark: `#002A42` (Backgrounds, footers)
- Slate Gray: `#5A6B7D` (Secondary text, subtle elements)
- Light Gray: `#F5F7F9` (Section backgrounds)
- White: `#FFFFFF`

**Accent Colors:**
- Teal Green: `#0D9488` (Sustainability sections)
- Deep Blue: `#1E3A8A` (Trust, professionalism)
- Safety Orange: `#F97316` (Safety highlights, urgent CTAs)

**Semantic Colors:**
- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Info: `#3B82F6`

**Text Colors:**
- Primary Text: `#1F2937` (Near black)
- Secondary Text: `#6B7280` (Gray)
- Muted Text: `#9CA3AF` (Light gray)

### 1.2 Typography
**Based on Newmont's Professional Typography System**

**Font Families:**
```javascript
// Newmont-style professional fonts
fontFamily: {
  display: ['Inter', 'system-ui', 'sans-serif'],     // Headlines, hero sections
  body: ['Inter', 'system-ui', 'sans-serif'],        // Body text, paragraphs
  accent: ['Inter', 'system-ui', 'sans-serif'],      // Stats, numbers, captions
  mono: ['Roboto Mono', 'monospace']                 // Code, technical specs
}
```

**Note:** Inter is a professional, highly readable sans-serif font similar to fonts used by Newmont. It provides excellent readability across all devices and screen sizes.

**Alternative:** If you prefer a closer match to Newmont's exact typography, use:
- **Proxima Nova** or **Gotham** (if licensed)
- **Helvetica Neue** or **Arial** (system fonts)

**Font Weights:**
- Thin: 200
- Light: 300
- Regular: 400
- Medium: 500
- Semi-Bold: 600
- Bold: 700
- Extra-Bold: 800

**Type Scale:**
- Hero Display: 4.5rem / 72px (desktop), 2.5rem / 40px (mobile) - Bold
- H1: 3rem / 48px - Bold (font-weight: 700)
- H2: 2.25rem / 36px - Semi-Bold (font-weight: 600)
- H3: 1.875rem / 30px - Semi-Bold (font-weight: 600)
- H4: 1.5rem / 24px - Medium (font-weight: 500)
- H5: 1.25rem / 20px - Medium (font-weight: 500)
- Body Large: 1.125rem / 18px - Regular (font-weight: 400)
- Body: 1rem / 16px - Regular (font-weight: 400)
- Small: 0.875rem / 14px - Regular (font-weight: 400)
- Caption: 0.75rem / 12px - Regular (font-weight: 400)

**Line Heights:**
- Headings: 1.2
- Body: 1.6
- Captions: 1.4

### 1.3 Spacing & Layout

**Container Widths:**
- Max Content: 1440px
- Standard Content: 1200px
- Narrow Content: 960px
- Reading Width: 720px

**Spacing Scale (Tailwind-based):**
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

---

## 2. Technical Architecture

### 2.1 Frontend Architecture

**Framework:** Next.js 14+ (App Router)

**Key Technologies:**
```javascript
{
  "framework": "Next.js 14.2+",
  "language": "TypeScript 5.3+",
  "styling": "Tailwind CSS 3.4+",
  "componentLibrary": "shadcn/ui",
  "stateManagement": "Zustand / React Context",
  "animations": "Framer Motion",
  "forms": "React Hook Form + Zod",
  "dataFetching": "TanStack Query (React Query)",
  "charts": "Recharts / D3.js",
  "maps": "Mapbox GL JS"
}
```

**Project Structure:**
```
/app
  /(marketing)          # Public-facing pages
    /page.tsx           # Homepage
    /about
    /operations
    /sustainability
    /investors
    /careers
    /news
    /contact
  /api                  # API routes
  /dashboard            # Admin dashboard (protected)
/components
  /ui                   # shadcn components
  /shared               # Reusable components
  /sections             # Page sections
  /layouts              # Layout components
/lib
  /utils                # Utility functions
  /api                  # API client
  /constants            # Constants & configs
/public
  /images
  /documents
/styles
  /globals.css
```

### 2.2 Backend Architecture

**Framework:** NestJS 10+

**Key Technologies:**
```javascript
{
  "framework": "NestJS 10+",
  "language": "TypeScript",
  "database": "PostgreSQL 16 (Neon)",
  "orm": "Prisma 5+",
  "authentication": "JWT + Passport",
  "apiDocs": "Swagger/OpenAPI",
  "validation": "class-validator",
  "caching": "Redis (Upstash)",
  "fileStorage": "AWS S3 / Cloudinary",
  "emails": "SendGrid / Resend"
}
```

**Module Structure:**
```
/src
  /auth               # Authentication & authorization
  /users              # User management (admin, clients, partners)
  /content            # CMS content management
  /services           # Service offerings (drilling, load & haul, construction)
  /equipment          # Equipment fleet management
  /projects           # Project portfolio and case studies
  /clients            # Client relationships and testimonials
  /partners           # Partnership and supplier management
  /quotes             # Quote requests and consultations
  /news               # News & press releases
  /careers            # Job postings & applications
  /csr                # CSR programs and community initiatives
  /safety             # Safety records and protocols
  /analytics          # Usage analytics and reporting
  /ai                 # AI-powered features (PowerBot, search, recommendations)
  /notifications      # Email and SMS notifications
  /common             # Shared modules
    /guards
    /interceptors
    /decorators
    /filters
```

### 2.3 Database Schema (Key Entities)

**Core Tables:**
```typescript
// Users & Authentication
- users
- roles
- permissions
- sessions

// Content Management
- pages
- page_sections
- media_library
- documents

// Services & Equipment
- services (Pre Split, Production Drilling, RC, Load & Haul, Construction)
- equipment (drill rigs, haul trucks, loaders, construction equipment)
- equipment_specifications
- service_features

// Projects & Clients
- projects (completed and ongoing)
- project_images
- case_studies
- clients
- client_testimonials
- client_logos

// Business Development
- quote_requests
- consultations
- partnerships
- suppliers
- business_inquiries

// Safety & Compliance
- safety_records
- safety_incidents
- safety_training
- compliance_documents
- certifications

// CSR Programs
- csr_programs
- community_projects
- community_impact_metrics

// News & Media
- news_articles
- press_releases
- media_contacts
- image_gallery
- videos

// Careers
- job_postings
- job_categories
- job_applications
- application_documents
- training_programs

// Locations
- offices (3 African countries)
- project_locations

// AI Features
- chat_conversations
- chat_messages
- document_embeddings
- search_analytics
- user_interactions

// Analytics
- visitor_analytics
- quote_conversion_metrics
- content_performance
```

### 2.4 Deployment & Hosting

**Frontend Hosting:** Vercel
- Automatic deployments from Git
- Edge network for global performance
- Preview deployments for PRs
- Environment variables management

**Backend Hosting:** Render
- Dockerized NestJS application
- Auto-scaling capabilities
- Health checks & monitoring
- Background workers for jobs

**Database:** Neon (Serverless PostgreSQL)
- Automatic scaling
- Point-in-time recovery
- Connection pooling
- Branch databases for development

**CDN & Assets:** Cloudflare / CloudFront
- Image optimization
- Global edge caching
- DDoS protection

---

## 3. Website Structure & Pages

### 3.1 Homepage

**Purpose:** Primary entry point showcasing company services, capabilities, client partnerships, and industry expertise

**Key Sections:**
1. **Hero Section**
   - Full-width immersive video/image carousel showcasing equipment in action
   - Company tagline: "Powering Africa's Mining Future Through Excellence in Drilling & Support Services"
   - Subtitle: "Comprehensive Solutions for the Mining Industry Since 2017"
   - Primary CTA: "Explore Our Services" / "Request a Quote"
   - Secondary CTA: "View Our Projects"

2. **Core Services Overview**
   - Interactive service cards with icons:
     - Pre Split Drilling
     - Production Drilling
     - Reverse Circulation Drilling
     - Load & Haul Operations
     - Construction Services
   - Quick description and "Learn More" link for each

3. **Statistics Bar**
   - Animated counters showing key metrics:
     - "201-500 Employees"
     - "Established 2017"
     - "3 African Countries"
     - "X+ Successful Projects"
     - "X+ Mining Clients Served"
     - "X Million Meters Drilled"

4. **Featured Equipment & Technology**
   - Showcase of state-of-the-art machinery
   - Equipment specifications and capabilities
   - Technology innovations
   - Link to full equipment fleet page

5. **Client Partnerships & Projects**
   - Logos of partner mining companies
   - Featured project case studies (3-card grid)
   - Interactive map showing project locations across 3 African countries
   - Testimonials from mining company clients

6. **Why Choose Yellow Power**
   - Safety record highlights
   - Quality certifications
   - Technology leadership
   - Community commitment
   - Environmental responsibility

7. **Latest News & Updates**
   - 3-column grid of recent articles
   - Project completions, new equipment, awards
   - "View All News" CTA

8. **Career Opportunities**
   - Featured positions (Drill operators, Engineers, Technicians)
   - Employee testimonials video
   - "Join Our Team" CTA

**Technical Implementation:**
```typescript
// Key components
- HeroCarousel (Framer Motion) with equipment videos
- ServiceCards (Interactive hover effects)
- AnimatedStats (Intersection Observer)
- EquipmentShowcase (3D model viewer optional)
- ClientLogos (Infinite scroll carousel)
- ProjectMap (Mapbox GL with project markers)
- TestimonialSlider (Client reviews)
- NewsGrid (Server-side pagination)
```

### 3.2 About Us

**Subpages:**
- Company Overview
- Our Mission & Vision
- Founder's Story (Mr. Emmanuel Kweku Ganu)
- Leadership Team
- Company History (2017 - Present)
- Our Values & Culture
- Awards & Recognition
- Global Presence (3 African Countries)

**Key Features:**
- Timeline component for company history (2017 onwards)
- Founder profile and company origin story
- Leadership bio cards with modal details
- Mission and Vision statement highlights
- Award showcase with filtering
- Downloadable company profile PDF
- Interactive map showing offices across 3 African countries
- Growth milestones and achievements

### 3.3 Services & Solutions

**Primary Services Pages:**

**3.3.1 Pre Split Drilling**
- Service overview and applications
- Technical specifications
- Equipment used
- Safety protocols
- Case studies and project examples
- Request quote CTA

**3.3.2 Production Drilling**
- Service overview and capabilities
- Drilling techniques and methodologies
- Equipment fleet details
- Performance metrics
- Client testimonials
- Request quote CTA

**3.3.3 Reverse Circulation Drilling**
- Service overview and benefits
- Technical capabilities
- Equipment specifications
- Applications in mining
- Project portfolio
- Request quote CTA

**3.3.4 Load & Haul Operations**
- Service overview
- Fleet of haul trucks and loaders
- Capacity and efficiency metrics
- Logistics and coordination
- Client success stories
- Request quote CTA

**3.3.5 Construction Services**
- Service overview
- Types of construction projects (mine infrastructure, roads, etc.)
- Equipment and capabilities
- Project management approach
- Completed projects gallery
- Request quote CTA

**Additional Subpages:**
- All Services Overview
- Equipment Fleet
- Technology & Innovation
- Health & Safety Standards
- Quality Assurance
- Project Portfolio
- Request a Quote

**Key Features:**
- Equipment fleet showcase with 3D models/360° views
- Interactive project map showing completed and ongoing projects
- Service comparison tool
- Equipment specifications database
- Safety statistics dashboard
- Client testimonial videos
- Before/after project galleries
- Downloadable service brochures
- Real-time equipment availability tracker (for clients)

**AI Feature: Services Advisor Chatbot**
```typescript
// B2B clients can ask questions about services
"What drilling method is best for hard rock mining?"
"Show me equipment specifications for production drilling"
"What is your safety record for Load & Haul operations?"
"Do you provide services in West Africa?"
"What is the turnaround time for RC drilling projects?"
```

### 3.4 Sustainability & Corporate Social Responsibility

**Subpages:**
- Sustainability Strategy
- Environmental Responsibility
  - Eco-friendly Equipment & Practices
  - Emissions Reduction
  - Dust & Noise Management
  - Fuel Efficiency Programs
- Safety Excellence
  - Safety Statistics & Record
  - Training Programs
  - Equipment Maintenance Standards
  - Emergency Response Protocols
- Social Responsibility
  - Community Development Programs
  - Local Employment Initiatives
  - Health & Education Support
  - CSR Project Showcase
- Ethical Business Practices
- Supporting Sustainable Mining

**Key Features:**
- Safety statistics dashboard (accident-free days, safety training hours)
- CSR project showcase gallery
- Community impact stories and testimonials
- Environmental commitment statements
- Equipment maintenance and safety protocols
- Employee training and skill development programs
- Interactive timeline of community projects
- Video testimonials from community members and employees

**CSR Highlights:**
- School support programs
- Healthcare facility improvements
- Community infrastructure projects
- Employee volunteer initiatives
- Partnerships with local organizations

**AI Feature: Sustainability & Safety Assistant**
```typescript
// Queries about sustainability and safety practices
"What are your environmental protection measures?"
"Show safety training requirements for drill operators"
"What CSR programs do you support?"
"How do you minimize environmental impact on project sites?"
```

### 3.5 Partners & Clients

**Purpose:** Showcase partnerships, client relationships, and business opportunities

**Subpages:**
- Our Clients
- Client Testimonials
- Case Studies & Success Stories
- Partnership Opportunities
- Supplier & Vendor Information
- Business Inquiries
- Strategic Alliances

**Key Features:**
- Client logo showcase (with permission)
- Detailed case studies with metrics
- Client testimonial videos
- Interactive project success metrics
- Partnership proposal form
- Supplier registration portal
- Downloadable partnership packages
- Industry certifications and accreditations

**Client Success Metrics:**
- Projects completed
- Client satisfaction ratings
- Average project delivery time
- Safety record across client projects
- Equipment uptime statistics

**Call-to-Actions:**
- "Become a Partner"
- "Request a Consultation"
- "View Our Case Studies"
- "Register as a Supplier"

### 3.6 Careers

**Subpages:**
- Why Join Yellow Power
- Current Openings
- Career Categories:
  - Drilling Operations (Drill Operators, Drillers)
  - Engineering (Mining Engineers, Mechanical Engineers, Civil Engineers)
  - Technical Roles (Technicians, Mechanics, Equipment Operators)
  - Load & Haul Operations (Heavy Equipment Operators, Drivers)
  - Construction (Construction Supervisors, Site Engineers)
  - Safety & Health (Safety Officers, HSE Managers)
  - Corporate (HR, Finance, Administration, IT)
- Training & Development Programs
- Apprenticeships & Graduate Programs
- Life at YPI
- Employee Benefits & Culture
- Application Process
- Employee Stories & Testimonials
- Diversity & Inclusion
- FAQs

**Key Features:**
- Job search with filters (location, category, experience level)
- Online application system with CV upload
- Skills requirements by role
- Video testimonials from employees in field roles
- Training and certification programs showcase
- Career progression paths (e.g., Drill Operator → Senior Driller → Drilling Supervisor)
- Benefits package overview
- Culture photo gallery (teams in action, equipment, office)
- Application status tracking
- WhatsApp/SMS application support (for field workers)

**Job Categories Focus:**
- Operational roles (60%): Drillers, operators, technicians
- Technical/Engineering (25%): Engineers, supervisors, specialists
- Corporate/Support (15%): Admin, HR, Finance, IT

**Employee Value Propositions:**
- Skill development and training
- Career growth opportunities
- Competitive compensation
- Work with state-of-the-art equipment
- Safety-first culture
- Community involvement opportunities

**AI Feature: Career Match Assistant**
```typescript
// Personalized job recommendations
"Find drill operator roles in Greater Accra"
"What qualifications do I need for a Production Drilling role?"
"Show me engineering positions"
"What training programs do you offer for new drill operators?"
"Tell me about career progression for equipment operators"
```

### 3.7 News & Media

**Subpages:**
- Latest News
- Press Releases
- Media Kit
- Image Gallery
- Video Library
- Podcasts & Interviews
- Social Media Hub
- Media Contacts

**Key Features:**
- Filterable news grid (date, category, region)
- Search functionality
- Social sharing buttons
- Newsletter signup
- Downloadable media assets
- Press release archive
- RSS feeds

### 3.8 Contact

**Key Features:**
- Interactive contact form with validation
- Multi-purpose inquiry forms:
  - General inquiries
  - Request for quote/consultation
  - Partnership inquiries
  - Supplier registration
  - Career inquiries
  - Media inquiries
- Office locations map across 3 African countries (Mapbox)
- Department directory with direct contacts
- Emergency 24/7 project support hotline
- Live chat support during business hours
- Click-to-call phone numbers: +233268066942, 0550099130
- WhatsApp business integration
- Social media links
- Head Office: Madina, Greater Accra, Ghana

**Contact Categories:**
- Business Development & Partnerships
- Service Inquiries & Quotes
- Human Resources & Careers
- Supplier & Vendor Relations
- Media & Communications
- Customer Support
- Safety & Emergency

---

## 4. AI-Powered Features

### 4.1 Intelligent Site Search

**Technology:** Vector embeddings (Pinecone/Weaviate) + OpenAI GPT

**Capabilities:**
- Natural language search across all content
- Semantic understanding of queries
- Contextual result ranking
- Search suggestions and autocomplete
- Multi-language support (English, Twi)

**Implementation:**
```typescript
// Search API endpoint
POST /api/ai/search
{
  "query": "environmental impact reports",
  "filters": { "category": "sustainability" },
  "limit": 10
}

// Response includes:
- Relevant pages/documents
- Suggested refinements
- Related topics
```

### 4.2 AI Chatbot Assistant

**Named:** "PowerBot" (Yellow Power Virtual Assistant)

**Target Users:**
- Potential mining company clients seeking services
- Job seekers exploring career opportunities
- Partners and suppliers inquiring about collaboration
- General public seeking company information

**Capabilities:**
- Answer questions about drilling and mining support services
- Provide equipment specifications and capabilities
- Explain service offerings and differentiators
- Guide users to relevant pages and resources
- Provide career information and job openings
- Share company background and achievements
- Schedule consultations and service quotes
- Direct to appropriate department contacts
- Support in English (with potential for local languages)
- Connect to human agents for complex inquiries

**Conversation Flows:**
```typescript
// Example B2B interactions
User: "What drilling services do you offer?"
PowerBot: "Yellow Power International provides comprehensive drilling 
          solutions including Pre Split Drilling, Production Drilling, 
          and Reverse Circulation Drilling. Which service would you 
          like to learn more about?"

User: "I need RC drilling services for an exploration project"
PowerBot: "Great! Our Reverse Circulation Drilling service is perfect 
          for exploration. We use state-of-the-art equipment across 
          3 African countries. Would you like to schedule a consultation 
          or receive a detailed quote?"

User: "What equipment do you use for Load & Haul?"
PowerBot: "Our Load & Haul fleet includes modern haul trucks and loaders 
          with high capacity and efficiency. I can share our equipment 
          specifications or connect you with our operations team. 
          What would be most helpful?"

User: "I want to apply for a drill operator position"
PowerBot: "Excellent! We're always looking for skilled drill operators. 
          We have openings in [locations]. Would you like to view current 
          positions or learn about our training programs?"

User: "Tell me about your safety record"
PowerBot: "Safety is our top priority. We maintain [X] accident-free days 
          and invest heavily in safety training and equipment maintenance. 
          You can view our full safety statistics on our Sustainability page. 
          Would you like me to show you more details?"
```

**Integration Points:**
- Embedded on every page (bottom right chat widget)
- Proactive engagement on Service pages and Contact page
- Quick actions: "Request Quote", "View Services", "Explore Careers"
- Handoff to human agents during business hours
- Email follow-up for off-hours inquiries

### 4.3 Document Intelligence

**Technology:** GPT-4 + Document parsing

**Features:**
- AI-powered document summarization
- Key metrics extraction from service brochures and case studies
- Question-answering on technical specifications
- Multi-document comparison (e.g., comparing different drilling methods)
- Equipment manual search and Q&A

**Use Cases:**
```typescript
// Service documentation analysis
"Summarize the capabilities of our RC drilling equipment"
"What are the key differences between Pre Split and Production Drilling?"
"Extract safety protocols from the Load & Haul operations manual"
"Show me all case studies from mining projects in Ghana"
"Compare equipment specifications across our drilling fleet"
"What are the requirements for partnering with Yellow Power?"
```

**Documents Supported:**
- Service brochures and technical specs
- Case studies and project reports
- Equipment manuals and specifications
- Safety and compliance documents
- Partnership and supplier guidelines
- Training materials and certifications

### 4.4 Predictive Analytics Dashboard

**For Internal Users (Admin Panel)**

**Capabilities:**
- Traffic forecasting
- User behavior prediction
- Content performance insights
- A/B test recommendations
- Optimal posting times

### 4.5 Personalized Content Recommendations

**Technology:** Collaborative filtering + Content-based

**Features:**
- Related service recommendations
  - "Clients who viewed Production Drilling also looked at Load & Haul"
- Related case studies and project examples
- "You might also be interested in" sections
- Personalized homepage for returning B2B visitors
- Career recommendations based on browsing behavior
- Recommended equipment specifications based on service interest
- Similar client success stories
- Targeted content for different visitor personas:
  - Mining company decision-makers → Service capabilities, case studies
  - Job seekers → Career paths, training programs
  - Suppliers/Partners → Partnership opportunities, requirements

---

## 5. Component Library (shadcn/ui Extensions)

### 5.1 Core UI Components

**Navigation:**
```typescript
<MegaMenu />           // Multi-level dropdown
<MobileNavigation />   // Responsive mobile menu
<Breadcrumbs />       // Hierarchical navigation
<StickyHeader />      // Scroll-aware header
```

**Content Display:**
```typescript
<HeroSection />       // Hero with video/image
<StatsGrid />         // Animated statistics
<TimelineCard />      // Company history timeline
<TeamCard />          // Leadership profiles
<TestimonialSlider /> // Employee stories
<NewsCard />          // Article preview
<DocumentCard />      // Report downloads
```

**Interactive Elements:**
```typescript
<InteractiveMap />    // Operations locations
<DataChart />         // Financial/production charts
<FilterPanel />       // Advanced filtering
<SearchBar />         // AI-powered search
<Chatbot />          // AI assistant
<VideoPlayer />      // Custom video component
<ImageGallery />     // Lightbox gallery
```

**Forms:**
```typescript
<ContactForm />      // Multi-step contact
<JobApplicationForm /> // Career applications
<NewsletterSignup /> // Email subscription
<InvestorAlertForm /> // Alert preferences
```

### 5.2 Custom Animations

**Using Framer Motion:**
```typescript
// Fade in on scroll
<FadeInSection />

// Parallax effects
<ParallaxImage />

// Number counting animation
<CountUpAnimation />

// Staggered list animations
<StaggeredList />
```

---

## 6. Performance Optimization

### 6.1 Frontend Optimization

**Image Optimization:**
- Next.js Image component for automatic optimization
- WebP format with fallbacks
- Lazy loading below the fold
- Responsive image sizing
- Blur placeholder for smooth loading

**Code Splitting:**
```typescript
// Route-based code splitting (automatic in Next.js)
// Component lazy loading
const HeavyComponent = dynamic(() => import('./HeavyComponent'))
```

**Caching Strategy:**
- Static pages: ISR (Incremental Static Regeneration)
- Dynamic content: Server-side rendering with caching
- API responses: SWR for client-side caching

**Bundle Optimization:**
- Tree shaking unused code
- Minimize third-party dependencies
- Use Tailwind's JIT mode
- Compress JavaScript/CSS

**Target Metrics:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

### 6.2 Backend Optimization

**Database:**
- Indexed queries on frequently accessed fields
- Connection pooling
- Query result caching
- Database query optimization with EXPLAIN

**API Performance:**
```typescript
// Response caching
@UseInterceptors(CacheInterceptor)
@CacheTTL(300) // 5 minutes

// Pagination for large datasets
@Query() pagination: PaginationDto

// GraphQL for flexible data fetching
// (optional: for complex investor data)
```

**Background Jobs:**
- Stock price updates (every 15 min during market hours)
- Report generation
- Email notifications
- Data synchronization

---

## 7. Security Implementation

### 7.1 Authentication & Authorization

**JWT-based Authentication:**
```typescript
// Login flow
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "secure_password"
}

// Returns access token + refresh token
// Access token: 15min expiry
// Refresh token: 7 days expiry
```

**Role-Based Access Control (RBAC):**
```typescript
enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  INVESTOR_RELATIONS = 'investor_relations',
  HR_MANAGER = 'hr_manager',
  VIEWER = 'viewer'
}

// Protected routes use guards
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.EDITOR)
```

### 7.2 Data Security

**Encryption:**
- HTTPS/TLS for all communications
- Encrypted environment variables
- Database encryption at rest
- Secure password hashing (bcrypt)

**Input Validation:**
```typescript
// All API inputs validated with Zod/class-validator
class CreateNewsDto {
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(50)
  content: string;

  @IsEnum(NewsCategory)
  category: NewsCategory;
}
```

**Rate Limiting:**
```typescript
// Prevent abuse
@Throttle(10, 60) // 10 requests per 60 seconds
public async contactForm() {}
```

**XSS & CSRF Protection:**
- Content Security Policy headers
- Sanitize user inputs
- CSRF tokens for forms

### 7.3 Compliance

**GDPR Compliance:**
- Cookie consent banner
- Data privacy policy
- User data export capability
- Right to deletion
- Clear privacy notices

**Accessibility (WCAG 2.1 AA):**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader optimization
- Color contrast compliance
- Alt text for images

---

## 8. Analytics & Monitoring

### 8.1 Analytics Tracking

**Google Analytics 4:**
- Page views
- User demographics
- Conversion tracking
- Custom events

**Custom Event Tracking:**
```typescript
// Track important actions
trackEvent('document_download', {
  document_type: 'annual_report',
  year: '2024'
})

trackEvent('job_application_started', {
  job_title: 'Mining Engineer',
  location: 'Kumasi'
})

trackEvent('investor_alert_signup', {
  alert_types: ['earnings', 'press_releases']
})
```

### 8.2 Error Monitoring

**Sentry Integration:**
- Frontend error tracking
- Backend exception monitoring
- Performance monitoring
- User session replay

### 8.3 Uptime Monitoring

**Tools:** Uptime Robot / Better Uptime
- 1-minute interval checks
- Multi-region monitoring
- SMS/email alerts
- Status page for stakeholders

### 8.4 Performance Monitoring

**Metrics Dashboard:**
- Server response times
- Database query performance
- API endpoint latency
- Frontend Core Web Vitals
- User flow analytics

---

## 9. Content Management System

### 9.1 Admin Dashboard

**Built with:** Next.js + shadcn/ui

**Key Features:**
- User-friendly WYSIWYG editor (Tiptap/Lexical)
- Media library management
- Content scheduling
- Multi-language support
- SEO optimization tools
- Preview before publish
- Version control
- Content approval workflow

**Module Sections:**
```typescript
/dashboard
  /content
    - Pages
    - News articles
    - Press releases
  /operations
    - Site information
    - Production data
    - Safety records
  /careers
    - Job postings
    - Applications
  /investors
    - Reports
    - Presentations
    - Stock data
  /media
    - Images
    - Videos
    - Documents
  /users
    - User management
    - Roles & permissions
  /analytics
    - Traffic reports
    - Engagement metrics
  /settings
    - Site configuration
    - Email templates
    - Integrations
```

### 9.2 Content Types

**Structured Content:**
```typescript
// Page Builder components
- Hero Section
- Text Block (Rich text)
- Image Gallery
- Video Embed
- Stats Grid
- Call-to-Action
- Team Grid
- Timeline
- Accordion/FAQ
- Embed Code

// Each component has customizable properties
interface HeroSectionProps {
  backgroundType: 'image' | 'video' | 'gradient';
  backgroundUrl?: string;
  heading: string;
  subheading?: string;
  ctaButtons: Array<{
    text: string;
    link: string;
    variant: 'primary' | 'secondary';
  }>;
  overlay: boolean;
  height: 'small' | 'medium' | 'large' | 'fullscreen';
}
```

---

## 10. Integration Points

### 10.1 Third-Party Services

**Email Marketing:**
- Mailchimp / SendGrid for newsletters
- Automated investor alerts
- Career application notifications

**Stock Data:**
```typescript
// Real-time stock price API
import { YahooFinance / AlphaVantage } from 'api-client'

// Update every 15 minutes during market hours
const stockData = await getStockPrice('YPI.GH')
```

**Social Media:**
- Social sharing meta tags (Open Graph, Twitter Cards)
- Instagram feed integration
- LinkedIn company page embed
- Twitter timeline widget

**Maps & Locations:**
```typescript
// Mapbox GL for interactive maps
import mapboxgl from 'mapbox-gl'

// Show all mining site locations
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9',
  center: [-1.6163, 6.6666], // Kumasi, Ghana
  zoom: 7
})
```

**Video Hosting:**
- YouTube API for video library
- Vimeo for high-quality corporate videos
- Custom video player with analytics

### 10.2 Internal Systems Integration

**HR System:**
```typescript
// Sync job postings from internal HRIS
POST /api/integration/jobs/sync

// Push applications to HR system
POST /api/integration/applications/submit
```

**ERP Integration:**
```typescript
// Fetch production data
GET /api/integration/erp/production-data
  ?site=obuasi&dateRange=2024-01

// Sync safety records
POST /api/integration/erp/safety-records/sync
```

**Document Management:**
- SharePoint/Document repository integration
- Automated report publishing
- Version control sync

---

## 11. SEO Strategy

### 11.1 Technical SEO

**Meta Tags:**
```typescript
// Dynamic meta tags per page
export const metadata: Metadata = {
  title: 'Yellow Power International | Leading Gold Mining Company in Ghana',
  description: 'Yellow Power International is Ghana\'s premier gold mining company...',
  keywords: 'gold mining, Ghana, sustainable mining, Kumasi',
  openGraph: {
    title: 'Yellow Power International',
    description: '...',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '...',
    description: '...',
    images: ['/twitter-image.jpg'],
  },
}
```

**Structured Data (JSON-LD):**
```typescript
// Organization schema
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Yellow Power International",
  "url": "https://yellowpower.com.gh",
  "logo": "https://yellowpower.com.gh/logo.png",
  "description": "Leading gold mining company in Ghana",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Kumasi",
    "addressRegion": "Ashanti",
    "postalCode": "...",
    "addressCountry": "GH"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+233-...",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://linkedin.com/company/yellow-power",
    "https://twitter.com/yellowpowergh",
    "https://facebook.com/yellowpower"
  ]
}
```

**Sitemap & Robots.txt:**
```typescript
// Auto-generated sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yellowpower.com.gh',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // ... all pages
  ]
}
```

### 11.2 Content SEO

**Best Practices:**
- Descriptive URLs: `/operations/obuasi-gold-mine`
- H1-H6 hierarchy
- Image alt text
- Internal linking strategy
- Mobile-first indexing
- Fast loading times
- Regular content updates

---

## 12. Development Workflow

### 12.1 Version Control

**Git Branching Strategy:**
```
main              # Production
├── staging       # Staging environment
└── develop       # Development
    ├── feature/* # Feature branches
    ├── bugfix/*  # Bug fixes
    └── hotfix/*  # Emergency fixes
```

**Commit Convention:**
```
feat: Add investor alert subscription
fix: Resolve mobile navigation bug
docs: Update API documentation
style: Format code with Prettier
refactor: Optimize database queries
test: Add unit tests for auth module
chore: Update dependencies
```

### 12.2 CI/CD Pipeline

**GitHub Actions / GitLab CI:**
```yaml
# Simplified workflow
name: Deploy

on:
  push:
    branches: [main, staging]

jobs:
  test:
    - Run unit tests
    - Run integration tests
    - Check code quality (ESLint, Prettier)
    - Security scan (Snyk)
  
  build:
    - Build Next.js application
    - Build NestJS application
    - Run database migrations
  
  deploy:
    - Deploy to Vercel (frontend)
    - Deploy to Render (backend)
    - Update database (Neon)
    - Clear CDN cache
    - Run smoke tests
    - Send notifications
```

### 12.3 Testing Strategy

**Frontend Testing:**
```typescript
// Unit tests: Jest + React Testing Library
test('renders hero section correctly', () => {
  render(<HeroSection {...props} />)
  expect(screen.getByRole('heading')).toBeInTheDocument()
})

// E2E tests: Playwright
test('user can submit contact form', async ({ page }) => {
  await page.goto('/contact')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page.locator('.success-message')).toBeVisible()
})
```

**Backend Testing:**
```typescript
// Unit tests: Jest
describe('NewsService', () => {
  it('should create news article', async () => {
    const article = await service.create(createNewsDto)
    expect(article).toHaveProperty('id')
  })
})

// E2E tests: Supertest
it('/api/news (GET)', () => {
  return request(app.getHttpServer())
    .get('/api/news')
    .expect(200)
    .expect((res) => {
      expect(res.body).toBeInstanceOf(Array)
    })
})
```

### 12.4 Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.yellowpower.com.gh
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
OPENAI_API_KEY=sk-xxx

# Backend (.env)
DATABASE_URL=postgresql://user:pass@host/db
JWT_SECRET=xxx
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=xxx
REFRESH_TOKEN_EXPIRES_IN=7d
AWS_S3_BUCKET=yellowpower-assets
SENDGRID_API_KEY=SG.xxx
REDIS_URL=redis://xxx
```

---

## 13. Launch Checklist

### 13.1 Pre-Launch

**Content:**
- [ ] All pages content finalized
- [ ] Images optimized and uploaded
- [ ] Videos encoded and hosted
- [ ] Documents uploaded to library
- [ ] Meta descriptions written
- [ ] Alt text added to images

**Technical:**
- [ ] SSL certificate installed
- [ ] DNS configured
- [ ] Email accounts set up
- [ ] Analytics installed and tested
- [ ] Error monitoring active
- [ ] Backup strategy in place
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Accessibility audit passed
- [ ] Cross-browser testing done

**Legal & Compliance:**
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Cookie consent implemented
- [ ] GDPR compliance verified
- [ ] Copyright notices added

### 13.2 Post-Launch

**Week 1:**
- Monitor error rates
- Check analytics data
- Test all forms
- Verify email deliverability
- Check mobile experience
- Monitor performance metrics

**Week 2-4:**
- Gather user feedback
- Fix critical bugs
- Optimize slow pages
- Update content as needed
- Review SEO performance

**Ongoing:**
- Monthly security updates
- Quarterly content refresh
- Regular performance audits
- Continuous A/B testing
- Feature enhancements

---

## 14. Maintenance & Support

### 14.1 Regular Maintenance

**Daily:**
- Monitor uptime
- Check error logs
- Review analytics

**Weekly:**
- Security updates
- Content updates
- Backup verification

**Monthly:**
- Performance review
- Security audit
- SEO analysis
- User feedback review

**Quarterly:**
- Major feature releases
- Dependency updates
- Comprehensive testing
- Stakeholder reports

### 14.2 Support Tiers

**Tier 1: User Support**
- Contact form inquiries
- General questions
- Navigation assistance
- Password resets

**Tier 2: Technical Support**
- Bug reports
- Performance issues
- Integration problems
- Data discrepancies

**Tier 3: Development Support**
- Feature requests
- API modifications
- Custom integrations
- Architecture changes

---

## 15. Budget Estimates & Timeline

### 15.1 Development Phases

**Phase 1: Foundation (Weeks 1-4)**
- Design system setup
- Base component library
- Authentication system
- Database schema
- Homepage development

**Phase 2: Core Pages (Weeks 5-10)**
- About Us (with founder story)
- Services pages (all 5 core services)
- Equipment fleet showcase
- Sustainability & CSR
- All subpages and content sections

**Phase 3: Advanced Features (Weeks 11-14)**
- Partners & Clients portal
- Case studies and projects
- Careers system
- News & Media
- Quote request system
- Admin CMS

**Phase 4: AI Integration (Weeks 15-16)**
- PowerBot AI chatbot
- Intelligent service search
- Document intelligence for specs and brochures
- B2B personalization engine

**Phase 5: Testing & Launch (Weeks 17-18)**
- Comprehensive testing
- Performance optimization
- Security audit
- Content population
- Soft launch

**Total Timeline:** 18 weeks (4.5 months)

### 15.2 Team Structure

**Core Team:**
- 1 Project Manager
- 1 UI/UX Designer
- 2 Frontend Developers (Next.js)
- 2 Backend Developers (NestJS)
- 1 DevOps Engineer
- 1 QA Engineer
- 1 Content Manager

**Supporting Roles:**
- Security Consultant
- SEO Specialist
- Copywriter
- Video Production Team

---

## 16. Success Metrics

### 16.1 Performance KPIs

**Technical Metrics:**
- Page load time < 2 seconds
- 99.9% uptime
- Lighthouse score > 90
- Zero critical security vulnerabilities

**User Engagement:**
- Average session duration > 4 minutes (B2B research behavior)
- Bounce rate < 35%
- Pages per session > 4
- Return visitor rate > 35%

**B2B Conversion Metrics:**
- Quote requests submitted
- Consultation bookings
- Service inquiry forms completed
- Equipment spec downloads
- Case study downloads
- Partnership applications
- Job applications submitted
- Contact form submissions
- PowerBot conversations with lead quality
- WhatsApp business contacts

**SEO Performance:**
- Organic search traffic growth 20% QoQ
- Top 10 rankings for target keywords
- Domain authority improvement

---

## 17. Risk Management

### 17.1 Identified Risks

**Technical Risks:**
- Third-party API failures → Implement fallbacks and caching
- Database performance issues → Regular optimization and monitoring
- Security breaches → Multi-layer security, regular audits
- Scalability problems → Load testing, auto-scaling infrastructure

**Business Risks:**
- Content delays → Early content planning, dedicated content team
- Stakeholder changes → Agile methodology, regular reviews
- Budget overruns → Clear scope, change request process

**Mitigation Strategies:**
- Regular stakeholder communication
- Agile development methodology
- Comprehensive testing at each phase
- Documentation of all decisions
- Backup and disaster recovery plan

---

## 18. Future Enhancements (Roadmap)

### 18.1 Phase 2 Features (Post-Launch)

**Q1 2026:**
- Mobile app (React Native)
- Virtual reality mine tours
- Advanced analytics dashboard
- Multi-language support (French, Twi, Ga)

**Q2 2026:**
- Blockchain-based supply chain tracking
- Investor portal with real-time data
- Community engagement platform
- Enhanced AI chatbot with voice support

**Q3 2026:**
- ESG reporting automation
- Predictive maintenance dashboard
- Employee self-service portal
- Advanced document management system

**Q4 2026:**
- AR mining equipment visualization
- Drone footage integration
- Live production monitoring
- Stakeholder collaboration platform

### 18.2 Emerging Technologies

**Exploration Areas:**
- Metaverse presence for virtual stakeholder meetings
- AI-powered ESG report generation
- IoT integration for real-time equipment data
- Satellite imagery integration for environmental monitoring
- Blockchain for transparent mineral tracking

---

## 19. Appendices

### 19.1 API Endpoints Reference

**Authentication:**
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/refresh
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

**Content:**
```
GET    /api/pages
GET    /api/pages/:slug
GET    /api/news
GET    /api/news/:id
POST   /api/news (protected)
PUT    /api/news/:id (protected)
DELETE /api/news/:id (protected)
```

**Services & Equipment:**
```
GET    /api/services
GET    /api/services/:id
GET    /api/services/:id/case-studies
GET    /api/equipment
GET    /api/equipment/:id
GET    /api/equipment/specifications
```

**Projects & Clients:**
```
GET    /api/projects
GET    /api/projects/:id
GET    /api/projects/featured
GET    /api/clients/testimonials
GET    /api/case-studies
GET    /api/case-studies/:id
```

**Business Development:**
```
POST   /api/quotes/request
POST   /api/consultations/book
POST   /api/partnerships/apply
POST   /api/suppliers/register
GET    /api/quotes/:id/status
```

**Safety & CSR:**
```
GET    /api/safety/records
GET    /api/safety/statistics
GET    /api/csr/programs
GET    /api/csr/projects
```

**Careers:**
```
GET    /api/careers/jobs
GET    /api/careers/jobs/:id
GET    /api/careers/categories
POST   /api/careers/applications
GET    /api/careers/applications/:id/status
GET    /api/careers/training-programs
```

**Locations:**
```
GET    /api/locations/offices
GET    /api/locations/project-sites
```

**AI Features:**
```
POST   /api/ai/search
POST   /api/ai/chat (PowerBot)
POST   /api/ai/document-query
GET    /api/ai/recommendations
POST   /api/ai/service-advisor
```

### 19.2 Database ERD

```
[Simplified Entity Relationships]

users ──┐
        ├──< sessions
        ├──< user_roles
        └──< activity_logs

pages ──┐
        ├──< page_sections
        ├──< page_versions
        └──< media_relations

services ──┐
           ├──< service_features
           ├──< case_studies
           └──< equipment_used

equipment ──┐
            ├──< equipment_specifications
            ├──< equipment_images
            └──< maintenance_records

projects ──┐
           ├──< project_images
           ├──< project_timeline
           ├──< client (reference)
           └──< services_used

clients ──┐
          ├──< testimonials
          ├──< projects
          └──< client_logo

quote_requests ──┐
                 ├──< quote_messages
                 └──< quote_documents

partnerships ──┐
               └──< partnership_documents

safety_records ──┐
                 ├──< safety_incidents
                 ├──< safety_training
                 └──< certifications

csr_programs ──┐
               ├──< community_projects
               └──< impact_metrics

news_articles ──┐
                ├──< article_categories
                ├──< article_tags
                └──< media_relations

job_postings ──┐
               ├──< job_category
               └──< job_applications ──< application_documents

offices ──┐
          └──< office_contacts

chat_conversations ──┐
                     ├──< chat_messages
                     └──< lead_information
```

### 19.3 Color Palette Specifications
**Newmont-Inspired Professional Color System**

```css
:root {
  /* Primary Gold (Newmont Signature) */
  --gold-50: #FEF8E7;
  --gold-100: #FEE9B8;
  --gold-200: #FDDB8A;
  --gold-300: #FDCD5B;
  --gold-400: #FCBF2D;
  --gold-500: #FDB714; /* Primary Newmont Gold */
  --gold-600: #E5A313;
  --gold-700: #C88F0F;
  --gold-800: #9C6F0B;
  --gold-900: #6F4F08;

  /* Navy Blue (Professional) */
  --navy-50: #E6EEF3;
  --navy-100: #B3CDD9;
  --navy-200: #80ACBF;
  --navy-300: #4D8BA5;
  --navy-400: #1A6A8B;
  --navy-500: #003B5C; /* Primary Navy */
  --navy-600: #002A42; /* Dark Navy */
  --navy-700: #001F30;
  --navy-800: #00141F;
  --navy-900: #000A0F;

  /* Slate Gray */
  --slate-50: #F8F9FA;
  --slate-100: #E9ECEF;
  --slate-200: #DEE2E6;
  --slate-300: #CED4DA;
  --slate-400: #ADB5BD;
  --slate-500: #6C757D;
  --slate-600: #5A6B7D; /* Secondary Text */
  --slate-700: #495057;
  --slate-800: #343A40;
  --slate-900: #212529;

  /* Neutral Grays */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937; /* Primary Text */
  --gray-900: #111827;

  /* Accent Colors */
  --teal-500: #0D9488;    /* Sustainability */
  --teal-600: #0F766E;
  --blue-deep-500: #1E3A8A; /* Trust */
  --blue-deep-600: #1E40AF;
  --orange-500: #F97316;  /* Safety/Urgent */
  --orange-600: #EA580C;

  /* Semantic Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

### 19.4 Typography Scale

```css
/* Font Sizes */
.text-xs     { font-size: 0.75rem;   line-height: 1rem; }     /* 12px */
.text-sm     { font-size: 0.875rem;  line-height: 1.25rem; }  /* 14px */
.text-base   { font-size: 1rem;      line-height: 1.5rem; }   /* 16px */
.text-lg     { font-size: 1.125rem;  line-height: 1.75rem; }  /* 18px */
.text-xl     { font-size: 1.25rem;   line-height: 1.75rem; }  /* 20px */
.text-2xl    { font-size: 1.5rem;    line-height: 2rem; }     /* 24px */
.text-3xl    { font-size: 1.875rem;  line-height: 2.25rem; }  /* 30px */
.text-4xl    { font-size: 2.25rem;   line-height: 2.5rem; }   /* 36px */
.text-5xl    { font-size: 3rem;      line-height: 1; }        /* 48px */
.text-6xl    { font-size: 3.75rem;   line-height: 1; }        /* 60px */
.text-7xl    { font-size: 4.5rem;    line-height: 1; }        /* 72px */

/* Font Weights */
.font-light     { font-weight: 300; }
.font-normal    { font-weight: 400; }
.font-medium    { font-weight: 500; }
.font-semibold  { font-weight: 600; }
.font-bold      { font-weight: 700; }
.font-extrabold { font-weight: 800; }
```

### 19.5 Responsive Breakpoints

```javascript
// Tailwind breakpoints
const breakpoints = {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet portrait
  'lg': '1024px',  // Tablet landscape
  'xl': '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
}
```

### 19.6 Animation Timings

```javascript
// Standard animation durations
const animations = {
  fastest: '100ms',
  faster: '200ms',
  fast: '300ms',
  normal: '400ms',
  slow: '500ms',
  slower: '700ms',
  slowest: '1000ms',
}

// Easing functions
const easings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounceOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
}
```

---

## 20. Glossary

**Terms & Definitions:**

- **ISR:** Incremental Static Regeneration - Next.js feature for updating static pages
- **SSR:** Server-Side Rendering - Rendering pages on the server
- **CSR:** Client-Side Rendering - Rendering pages in the browser
- **JWT:** JSON Web Token - Authentication token standard
- **RBAC:** Role-Based Access Control - Permission system
- **ORM:** Object-Relational Mapping - Database abstraction layer
- **CDN:** Content Delivery Network - Distributed content hosting
- **WCAG:** Web Content Accessibility Guidelines
- **GDPR:** General Data Protection Regulation
- **SEO:** Search Engine Optimization
- **CMS:** Content Management System
- **API:** Application Programming Interface
- **CI/CD:** Continuous Integration/Continuous Deployment
- **KPI:** Key Performance Indicator
- **ERD:** Entity Relationship Diagram
- **CRUD:** Create, Read, Update, Delete operations

---

## Document Control

**Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 2025 | Tech Team | Initial documentation |

**Approval:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| CTO | _________ | _________ | _____ |
| Project Manager | _________ | _________ | _____ |
| Lead Developer | _________ | _________ | _____ |

**Distribution List:**
- Executive Team
- IT Department
- Development Team
- Marketing Team
- External Vendors

---

**End of Document**

*Yellow Power International - Technical & Architectural Development Documentation v1.0*
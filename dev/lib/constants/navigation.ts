/**
 * Navigation structure for Yellow Power International website
 */

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about",
    children: [
      {
        title: "Overview",
        href: "/about",
        description: "Learn about Yellow Power International",
      },
      {
        title: "Mission & Vision",
        href: "/about/mission-vision",
        description: "Our mission, vision, and core values",
      },
      {
        title: "Leadership",
        href: "/about/leadership",
        description: "Meet our leadership team",
      },
      {
        title: "History",
        href: "/about/history",
        description: "Our journey since 2017",
      },
    ],
  },
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Pre Split Drilling",
        href: "/services/pre-split-drilling",
        description: "Professional pre-split drilling services",
      },
      {
        title: "Production Drilling",
        href: "/services/production-drilling",
        description: "Efficient production drilling solutions",
      },
      {
        title: "Reverse Circulation Drilling",
        href: "/services/reverse-circulation-drilling",
        description: "Advanced RC drilling technology",
      },
      {
        title: "Load & Haul Operations",
        href: "/services/load-haul",
        description: "Comprehensive load and haul services",
      },
      {
        title: "Construction Services",
        href: "/services/construction",
        description: "Mining construction expertise",
      },
    ],
  },
  {
    title: "Projects",
    href: "/projects",
    children: [
      {
        title: "Project Portfolio",
        href: "/projects",
        description: "Browse our completed and ongoing projects",
      },
      {
        title: "Case Studies",
        href: "/case-studies",
        description: "Detailed project success stories",
      },
    ],
  },
  {
    title: "Sustainability & CSR",
    href: "/sustainability",
    children: [
      {
        title: "Overview",
        href: "/sustainability",
        description: "Our commitment to sustainability and social responsibility",
      },
      {
        title: "Environmental Responsibility",
        href: "/sustainability/environment",
        description: "Eco-friendly practices and emissions reduction",
      },
      {
        title: "Safety Excellence",
        href: "/sustainability/safety",
        description: "Zero harm philosophy and safety performance",
      },
      {
        title: "CSR Programs",
        href: "/sustainability/csr",
        description: "Community development and social impact",
      },
      {
        title: "CSR Projects",
        href: "/sustainability/csr/projects",
        description: "Explore our community impact initiatives",
      },
      {
        title: "Ethical Business Practices",
        href: "/sustainability/ethics",
        description: "Transparency, compliance, and governance",
      },
    ],
  },
  {
    title: "Partners & Clients",
    href: "/clients",
    children: [
      {
        title: "Our Clients",
        href: "/clients",
        description: "Meet our valued clients and partners",
      },
      {
        title: "Partnership Opportunities",
        href: "/partnerships",
        description: "Explore partnership possibilities",
      },
      {
        title: "Supplier Portal",
        href: "/suppliers",
        description: "Register as an approved supplier",
      },
    ],
  },
  {
    title: "Careers",
    href: "/careers",
    children: [
      {
        title: "Careers Overview",
        href: "/careers",
        description: "Why work with Yellow Power International",
      },
      {
        title: "Job Openings",
        href: "/careers/jobs",
        description: "Browse current opportunities",
      },
      {
        title: "Training & Development",
        href: "/careers/training",
        description: "Learn about our training programs",
      },
      {
        title: "Life at YPI",
        href: "/careers/life-at-ypi",
        description: "Culture, benefits, and employee stories",
      },
      {
        title: "Application Process",
        href: "/careers/application-process",
        description: "How to apply and what to expect",
      },
    ],
  },
  {
    title: "News & Media",
    href: "/news",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const FOOTER_NAV = {
  company: [
    { title: "About Us", href: "/about" },
    { title: "Leadership", href: "/about/leadership" },
    { title: "History", href: "/about/history" },
    { title: "Careers", href: "/careers" },
  ],
  services: [
    { title: "Pre Split Drilling", href: "/services/pre-split-drilling" },
    { title: "Production Drilling", href: "/services/production-drilling" },
    { title: "RC Drilling", href: "/services/reverse-circulation-drilling" },
    { title: "Load & Haul", href: "/services/load-haul" },
    { title: "Construction", href: "/services/construction" },
  ],
  resources: [
    { title: "Projects", href: "/projects" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "News & Media", href: "/news" },
    { title: "Sustainability", href: "/sustainability" },
    { title: "Partners & Clients", href: "/clients" },
    { title: "Contact Us", href: "/contact" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Cookie Policy", href: "/cookies" },
  ],
};

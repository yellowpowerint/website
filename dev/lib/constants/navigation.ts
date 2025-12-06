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
    title: "Sustainability & CSR",
    href: "/sustainability",
  },
  {
    title: "Partners & Clients",
    href: "/clients",
  },
  {
    title: "Careers",
    href: "/careers",
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

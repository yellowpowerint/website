export interface Project {
  slug: string;
  title: string;
  client: string;
  location: string;
  country: string;
  services: string[]; // Service IDs from services.ts
  startDate: string;
  endDate?: string;
  status: "completed" | "ongoing" | "planned";
  summary: string;
  description: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  metrics: {
    label: string;
    value: string;
    icon?: string;
  }[];
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featured: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  projectSlug: string;
  industry: string;
  service: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  downloadUrl?: string;
  featured: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo?: string;
  sector: string;
  description: string;
  projectCount: number;
  partnershipSince?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating?: number;
}

// Project Portfolio Data
export const PROJECTS: Project[] = [
  {
    slug: "tarkwa-gold-mine-production-drilling",
    title: "Tarkwa Gold Mine - Production Drilling Expansion",
    client: "Gold Fields Ghana Ltd",
    location: "Tarkwa",
    country: "Ghana",
    services: ["production-drilling", "load-haul"],
    startDate: "2023-01",
    endDate: "2024-06",
    status: "completed",
    summary: "Large-scale production drilling and material handling for gold mine expansion",
    description: "Comprehensive drilling and load & haul operations supporting a major pit expansion at one of Ghana's largest gold mining operations. Delivered over 150,000 meters of production drilling across 18 months.",
    challenges: [
      "Tight production schedules with minimal downtime tolerance",
      "Complex geology requiring adaptive drilling techniques",
      "Coordination with multiple contractors on active mine site",
      "Strict environmental and safety compliance requirements",
    ],
    solutions: [
      "Deployed 6 Sandvik rotary drill rigs with GPS guidance",
      "Implemented 24/7 operations with skilled crews",
      "Real-time monitoring and reporting systems",
      "Integrated safety protocols with mine-wide systems",
    ],
    results: [
      "Exceeded production targets by 12%",
      "Zero lost-time injuries over 18 months",
      "Maintained 98% equipment availability",
      "Completed ahead of schedule by 3 weeks",
    ],
    metrics: [
      { label: "Drilling Meters", value: "150,000+", icon: "📏" },
      { label: "Equipment Uptime", value: "98%", icon: "⚙️" },
      { label: "Safety Record", value: "0 LTIs", icon: "🛡️" },
      { label: "Project Duration", value: "18 months", icon: "📅" },
    ],
    images: [
      {
        src: "/images/projects/tarkwa-1.jpg",
        alt: "Sandvik drill rig at Tarkwa gold mine",
        caption: "GPS-guided production drilling operations",
      },
      {
        src: "/images/projects/tarkwa-2.jpg",
        alt: "Load and haul operations",
        caption: "Material transport to ROM pad",
      },
      {
        src: "/images/projects/tarkwa-3.jpg",
        alt: "Safety briefing at site",
        caption: "Daily safety briefings with crew",
      },
    ],
    testimonial: {
      quote: "Yellow Power's professionalism and technical expertise were instrumental in delivering this critical expansion on time and within budget. Their safety record speaks volumes.",
      author: "Michael Aboagye",
      role: "Senior Mining Engineer",
    },
    featured: true,
  },
  {
    slug: "obuasi-mine-pre-split-drilling",
    title: "Obuasi Mine - Pre-Split Drilling Programme",
    client: "AngloGold Ashanti",
    location: "Obuasi",
    country: "Ghana",
    services: ["pre-split-drilling"],
    startDate: "2024-03",
    status: "ongoing",
    summary: "Precision pre-split drilling for wall stability in underground-to-openpit transition",
    description: "Specialized pre-split drilling operations to support the transition from underground to open pit mining, ensuring optimal wall stability and controlled blasting outcomes.",
    challenges: [
      "Transition from underground to open pit operations",
      "Critical wall stability requirements",
      "High-precision drilling in challenging rock conditions",
      "Minimal vibration impact on nearby infrastructure",
    ],
    solutions: [
      "Atlas Copco FlexiROC T45 drills with advanced GPS",
      "Real-time monitoring of hole deviation",
      "Experienced crew with specialized training",
      "Adaptive drilling parameters based on rock type",
    ],
    results: [
      "Achieving ±40mm accuracy consistently",
      "Smooth blast results with minimal overbreak",
      "Zero incidents or equipment damage",
      "Client satisfaction rating: 9.5/10",
    ],
    metrics: [
      { label: "Drilling Accuracy", value: "±40mm", icon: "🎯" },
      { label: "Holes Completed", value: "3,200+", icon: "⚙️" },
      { label: "Project Progress", value: "78%", icon: "📊" },
      { label: "Client Rating", value: "9.5/10", icon: "⭐" },
    ],
    images: [
      {
        src: "/images/projects/obuasi-1.jpg",
        alt: "Pre-split drilling operations at Obuasi",
        caption: "Precision drilling along final pit wall",
      },
      {
        src: "/images/projects/obuasi-2.jpg",
        alt: "GPS guidance system",
        caption: "Real-time positioning for millimeter accuracy",
      },
    ],
    testimonial: {
      quote: "The precision and consistency YPI delivers on our pre-split drilling is exactly what we need for this critical phase of our operation.",
      author: "Kwame Mensah",
      role: "Project Manager",
    },
    featured: true,
  },
  {
    slug: "banfora-exploration-drilling",
    title: "Banfora Exploration - RC Drilling Campaign",
    client: "Burkina Mining Corp",
    location: "Banfora",
    country: "Burkina Faso",
    services: ["reverse-circulation-drilling"],
    startDate: "2023-08",
    endDate: "2024-02",
    status: "completed",
    summary: "Comprehensive reverse circulation drilling for gold exploration",
    description: "Six-month RC drilling campaign for mineral exploration, delivering high-quality samples for resource definition at a greenfield gold exploration project.",
    challenges: [
      "Remote location with limited infrastructure",
      "Rainy season logistics challenges",
      "Sample quality and chain of custody requirements",
      "Tight drilling schedule",
    ],
    solutions: [
      "Mobilized Schramm RC rig with support equipment",
      "Established field camp and sample handling facilities",
      "Implemented rigorous QA/QC protocols",
      "Weather-responsive scheduling",
    ],
    results: [
      "12,500 meters drilled across 50 holes",
      "Sample recovery >98%",
      "Zero sample contamination incidents",
      "Contributed to 1.2M oz resource definition",
    ],
    metrics: [
      { label: "Total Meters", value: "12,500m", icon: "📏" },
      { label: "Sample Recovery", value: "98%+", icon: "🔬" },
      { label: "Holes Completed", value: "50", icon: "⚙️" },
      { label: "Resource Defined", value: "1.2M oz", icon: "💎" },
    ],
    images: [
      {
        src: "/images/projects/banfora-1.jpg",
        alt: "RC drilling rig in Burkina Faso",
        caption: "Schramm RC rig at exploration site",
      },
    ],
    featured: false,
  },
  {
    slug: "sikasso-haul-road-construction",
    title: "Sikasso Mine - Haul Road Construction",
    client: "West African Resources",
    location: "Sikasso",
    country: "Mali",
    services: ["construction", "load-haul"],
    startDate: "2024-01",
    endDate: "2024-04",
    status: "completed",
    summary: "Construction of 12km haul road and waste dump infrastructure",
    description: "Complete civil works including haul road construction, waste dump preparation, and drainage systems for new mining operation in Mali.",
    challenges: [
      "Remote location with limited local resources",
      "Tight 4-month completion window",
      "Heavy equipment mobilization across borders",
      "Rainy season planning",
    ],
    solutions: [
      "Mobilized full construction fleet from Ghana",
      "Established on-site maintenance facilities",
      "Implemented accelerated construction methodology",
      "Advanced earthworks ahead of rainy season",
    ],
    results: [
      "12km haul road completed on schedule",
      "Waste dump capacity: 2.5M m³",
      "All quality specs met or exceeded",
      "Zero safety incidents",
    ],
    metrics: [
      { label: "Haul Road Length", value: "12km", icon: "🛣️" },
      { label: "Earthworks", value: "75,000 m³", icon: "🏗️" },
      { label: "Project Duration", value: "4 months", icon: "📅" },
      { label: "Safety Record", value: "0 incidents", icon: "🛡️" },
    ],
    images: [
      {
        src: "/images/projects/sikasso-1.jpg",
        alt: "Haul road construction in Mali",
        caption: "Completed haul road section",
      },
    ],
    featured: false,
  },
  {
    slug: "prestea-underground-drilling",
    title: "Prestea Underground - Exploration Drilling",
    client: "Future Global Resources",
    location: "Prestea",
    country: "Ghana",
    services: ["reverse-circulation-drilling"],
    startDate: "2023-11",
    endDate: "2024-03",
    status: "completed",
    summary: "Underground exploration drilling for resource extension",
    description: "Specialized underground RC drilling operations to extend known gold resources and support mine planning.",
    challenges: [
      "Underground drilling operations",
      "Limited working space",
      "Ventilation and safety considerations",
      "Core loss mitigation",
    ],
    solutions: [
      "Deployed compact underground RC equipment",
      "Implemented enhanced safety protocols",
      "Real-time geological logging",
      "Optimized drill patterns for efficiency",
    ],
    results: [
      "5,200 meters completed underground",
      "Sample recovery >95%",
      "Extended resource by 180,000 oz",
      "Zero underground safety incidents",
    ],
    metrics: [
      { label: "Underground Meters", value: "5,200m", icon: "📏" },
      { label: "Sample Quality", value: "95%+", icon: "✅" },
      { label: "Resource Addition", value: "180K oz", icon: "💎" },
      { label: "Safety Record", value: "0 incidents", icon: "🛡️" },
    ],
    images: [],
    featured: false,
  },
];

// Case Studies
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-001",
    title: "Maximizing Production Efficiency at Tarkwa Gold Mine",
    projectSlug: "tarkwa-gold-mine-production-drilling",
    industry: "Gold Mining",
    service: "Production Drilling",
    summary: "How Yellow Power delivered 12% above-target production through optimized drilling operations and equipment management.",
    challenge: "Client required aggressive production targets with zero tolerance for delays in a complex geological environment.",
    solution: "Implemented GPS-guided drilling fleet with 24/7 operations, real-time monitoring, and predictive maintenance protocols.",
    results: [
      "Exceeded production targets by 12%",
      "Maintained 98% equipment availability",
      "Zero lost-time injuries over 18 months",
      "Completed 3 weeks ahead of schedule",
    ],
    metrics: [
      { label: "Production Increase", value: "+12%" },
      { label: "Equipment Uptime", value: "98%" },
      { label: "Safety Performance", value: "0 LTIs" },
      { label: "Schedule Performance", value: "+3 weeks early" },
    ],
    downloadUrl: "#",
    featured: true,
  },
  {
    id: "cs-002",
    title: "Precision Pre-Split Drilling for Wall Stability",
    projectSlug: "obuasi-mine-pre-split-drilling",
    industry: "Gold Mining",
    service: "Pre-Split Drilling",
    summary: "Delivering millimeter-accurate drilling for critical pit wall stability during underground-to-openpit transition.",
    challenge: "Transition from underground to open pit required extremely precise drilling to ensure wall stability and controlled blasting.",
    solution: "Deployed Atlas Copco FlexiROC drills with advanced GPS guidance and real-time deviation monitoring.",
    results: [
      "Achieved ±40mm accuracy consistently",
      "Zero overbreak incidents",
      "Smooth blast results with minimal vibration",
      "Client satisfaction: 9.5/10",
    ],
    metrics: [
      { label: "Drilling Accuracy", value: "±40mm" },
      { label: "Overbreak Reduction", value: "90%" },
      { label: "Blast Quality", value: "Excellent" },
      { label: "Client Rating", value: "9.5/10" },
    ],
    downloadUrl: "#",
    featured: true,
  },
];

// Client Data
export const CLIENTS: Client[] = [
  {
    id: "client-001",
    name: "Gold Fields Ghana Ltd",
    logo: "/images/clients/goldfields.png",
    sector: "Gold Mining",
    description: "One of Ghana's largest gold producers, operating the Tarkwa and Damang mines.",
    projectCount: 5,
    partnershipSince: "2019",
  },
  {
    id: "client-002",
    name: "AngloGold Ashanti",
    logo: "/images/clients/anglogold.png",
    sector: "Gold Mining",
    description: "Global gold mining company with significant operations in Ghana including Obuasi and Iduapriem mines.",
    projectCount: 8,
    partnershipSince: "2018",
  },
  {
    id: "client-003",
    name: "Newmont Corporation",
    logo: "/images/clients/newmont.png",
    sector: "Gold Mining",
    description: "World's leading gold company with operations at Ahafo and Akyem mines in Ghana.",
    projectCount: 12,
    partnershipSince: "2017",
  },
  {
    id: "client-004",
    name: "Asanko Gold",
    logo: "/images/clients/asanko.png",
    sector: "Gold Mining",
    description: "Operating the Asanko Gold Mine in Ghana's Ashanti region.",
    projectCount: 3,
    partnershipSince: "2021",
  },
  {
    id: "client-005",
    name: "West African Resources",
    logo: "/images/clients/war.png",
    sector: "Gold Mining",
    description: "Developing and operating gold projects in Mali and Burkina Faso.",
    projectCount: 4,
    partnershipSince: "2020",
  },
  {
    id: "client-006",
    name: "Perseus Mining",
    logo: "/images/clients/perseus.png",
    sector: "Gold Mining",
    description: "Gold producer with operations in Ghana and West Africa.",
    projectCount: 6,
    partnershipSince: "2019",
  },
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-001",
    clientName: "Michael Aboagye",
    role: "Senior Mining Engineer",
    company: "Gold Fields Ghana Ltd",
    quote: "Yellow Power's professionalism and technical expertise were instrumental in delivering our expansion on time and within budget. Their safety record speaks volumes about their commitment to excellence.",
    avatar: "/images/testimonials/michael.jpg",
    rating: 5,
  },
  {
    id: "test-002",
    clientName: "Kwame Mensah",
    role: "Project Manager",
    company: "AngloGold Ashanti",
    quote: "The precision and consistency YPI delivers on our pre-split drilling is exactly what we need for this critical phase of our operation. They understand the technical requirements and deliver every time.",
    avatar: "/images/testimonials/kwame.jpg",
    rating: 5,
  },
  {
    id: "test-003",
    clientName: "Sarah Johnson",
    role: "Operations Director",
    company: "Newmont Corporation",
    quote: "We've worked with Yellow Power on multiple projects across our Ghana operations. Their equipment is world-class, their operators are skilled, and their safety culture aligns perfectly with ours.",
    avatar: "/images/testimonials/sarah.jpg",
    rating: 5,
  },
  {
    id: "test-004",
    clientName: "Emmanuel Osei",
    role: "Technical Services Manager",
    company: "Asanko Gold",
    quote: "Yellow Power's RC drilling services helped us define our resource with confidence. The sample quality and their attention to detail made all the difference in our exploration program.",
    avatar: "/images/testimonials/emmanuel.jpg",
    rating: 5,
  },
  {
    id: "test-005",
    clientName: "Fatou Diallo",
    role: "General Manager",
    company: "West African Resources",
    quote: "Building our haul road and infrastructure in Mali required a partner who could mobilize quickly and deliver quality work. Yellow Power exceeded our expectations on every metric.",
    avatar: "/images/testimonials/fatou.jpg",
    rating: 5,
  },
];

// Helper functions
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getProjectsByService(serviceId: string): Project[] {
  return PROJECTS.filter((project) => project.services.includes(serviceId));
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return PROJECTS.filter((project) => project.status === status);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}

export function getCaseStudyByProject(projectSlug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.projectSlug === projectSlug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.featured);
}

export function getClientById(id: string): Client | undefined {
  return CLIENTS.find((client) => client.id === id);
}

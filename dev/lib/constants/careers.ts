/**
 * Careers, Jobs, and HR data models for Yellow Power International
 */

export interface JobCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Job {
  id: string;
  jobId: string; // for URL: /careers/jobs/[jobId]
  title: string;
  categoryId: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract";
  experienceLevel: "Entry Level" | "Mid Level" | "Senior Level" | "Executive";
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDate: string; // ISO date string
  salary?: string;
}

export interface EmployeeTestimonial {
  id: string;
  name: string;
  role: string;
  department: string;
  quote: string;
  story?: string;
  image?: string;
  yearsAtCompany?: number;
}

export interface CareerPathStep {
  id: string;
  title: string;
  description: string;
  level: number;
  skills: string[];
  duration?: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconKey: string; // lucide icon name
}

// Job Categories
export const JOB_CATEGORIES: JobCategory[] = [
  {
    id: "drilling-ops",
    name: "Drilling Operations",
    slug: "drilling-operations",
    description: "Operate and manage drilling equipment on mine sites",
  },
  {
    id: "engineering",
    name: "Engineering",
    slug: "engineering",
    description: "Technical and engineering roles supporting operations",
  },
  {
    id: "technical",
    name: "Technical Roles",
    slug: "technical",
    description: "Specialized technical positions across operations",
  },
  {
    id: "load-haul",
    name: "Load & Haul Operations",
    slug: "load-haul",
    description: "Heavy equipment operators for material movement",
  },
  {
    id: "construction",
    name: "Construction",
    slug: "construction",
    description: "Construction and infrastructure development roles",
  },
  {
    id: "safety-health",
    name: "Safety & Health",
    slug: "safety-health",
    description: "Safety officers and health professionals",
  },
  {
    id: "corporate",
    name: "Corporate",
    slug: "corporate",
    description: "Administration, HR, finance, and support roles",
  },
];

// Sample Jobs
export const JOBS: Job[] = [
  {
    id: "job-001",
    jobId: "senior-production-driller",
    title: "Senior Production Driller",
    categoryId: "drilling-ops",
    location: "Tarkwa, Ghana",
    employmentType: "Full-time",
    experienceLevel: "Senior Level",
    description: "We are seeking an experienced Senior Production Driller to join our operations at Tarkwa. The ideal candidate will have extensive experience in surface mining drilling operations and a proven track record of safety and productivity.",
    responsibilities: [
      "Operate production drill rigs safely and efficiently",
      "Conduct pre-operational inspections and maintenance checks",
      "Interpret drilling plans and specifications",
      "Mentor junior drill operators and trainees",
      "Maintain accurate drilling logs and production records",
      "Ensure compliance with all safety procedures and regulations",
      "Participate in safety meetings and toolbox talks",
      "Report equipment malfunctions and maintenance needs",
    ],
    requirements: [
      "Minimum 5 years experience operating production drill rigs",
      "Valid mining equipment operator certification",
      "Proven safety record with zero lost-time incidents preferred",
      "Ability to work rotating shifts including nights and weekends",
      "Strong understanding of drilling techniques and best practices",
      "Excellent communication skills in English",
      "Physical fitness to perform manual tasks as required",
      "Willingness to work at remote mine sites",
    ],
    benefits: [
      "Competitive salary package",
      "Performance bonuses",
      "Comprehensive health insurance",
      "Life and disability insurance",
      "Paid annual leave (28 days)",
      "Ongoing training and certification support",
      "Career advancement opportunities",
      "Transportation and accommodation provided for remote sites",
    ],
    postedDate: "2024-11-15",
    salary: "Competitive + Benefits",
  },
  {
    id: "job-002",
    jobId: "mining-engineer",
    title: "Mining Engineer",
    categoryId: "engineering",
    location: "Obuasi, Ghana",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    description: "Yellow Power International is looking for a Mining Engineer to support our operations in Obuasi. The role involves planning, design, and supervision of drilling and blasting activities to ensure optimal productivity and safety.",
    responsibilities: [
      "Design and plan drilling patterns for production blasting",
      "Calculate explosive requirements and blast hole specifications",
      "Supervise drilling and blasting operations",
      "Analyze and optimize drilling performance metrics",
      "Conduct site inspections and safety audits",
      "Prepare technical reports and documentation",
      "Collaborate with geologists and operations teams",
      "Implement process improvements to enhance efficiency",
    ],
    requirements: [
      "Bachelor's degree in Mining Engineering or related field",
      "3-5 years experience in surface mining operations",
      "Blasting certification and explosive handling license",
      "Proficiency in mine planning software (e.g., MineSight, Surpac)",
      "Strong analytical and problem-solving skills",
      "Excellent written and verbal communication",
      "Knowledge of mining regulations and safety standards in Ghana",
      "Valid driver's license",
    ],
    benefits: [
      "Attractive salary with performance incentives",
      "Professional development and training opportunities",
      "Health and dental insurance for family",
      "Company vehicle or transport allowance",
      "Housing allowance or company accommodation",
      "Retirement savings plan",
      "Annual performance reviews with salary adjustments",
      "Membership in professional mining associations",
    ],
    postedDate: "2024-11-20",
    salary: "GHS 8,000 - 12,000/month",
  },
  {
    id: "job-003",
    jobId: "haul-truck-operator",
    title: "Haul Truck Operator",
    categoryId: "load-haul",
    location: "Sikasso, Mali",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    description: "Entry-level opportunity for Haul Truck Operators to join our Mali operations. We provide comprehensive training for candidates with mechanical aptitude and a strong safety mindset.",
    responsibilities: [
      "Operate haul trucks to transport materials on mine sites",
      "Perform daily pre-start inspections and safety checks",
      "Follow designated haul routes and traffic management plans",
      "Load materials in coordination with loading equipment operators",
      "Maintain cleanliness and basic maintenance of assigned truck",
      "Report any equipment issues or safety hazards immediately",
      "Complete daily logs and production records",
      "Participate in safety training and meetings",
    ],
    requirements: [
      "Valid heavy vehicle driver's license (Class C or equivalent)",
      "Basic mechanical knowledge and troubleshooting skills",
      "Good physical fitness and health",
      "Ability to work 12-hour shifts in rotating roster",
      "Willingness to live in mine camp accommodation",
      "Basic literacy and numeracy skills",
      "No major traffic violations or accidents in past 3 years",
      "Previous mining or heavy equipment experience is a plus but not required",
    ],
    benefits: [
      "Competitive wages with overtime pay",
      "Free training and certification",
      "Accommodation and meals provided at site",
      "Transportation to and from site",
      "Medical coverage",
      "Paid vacation and public holidays",
      "Career progression opportunities",
      "Safety equipment and PPE provided",
    ],
    postedDate: "2024-12-01",
    salary: "Entry Level + Training",
  },
  {
    id: "job-004",
    jobId: "safety-officer",
    title: "Safety Officer",
    categoryId: "safety-health",
    location: "Multiple Sites, Ghana",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    description: "We are seeking a dedicated Safety Officer to oversee safety programs across our Ghana operations. The role requires travel between sites and a commitment to maintaining our zero-harm culture.",
    responsibilities: [
      "Conduct regular safety inspections and audits",
      "Investigate incidents and near-misses, prepare detailed reports",
      "Deliver safety training and toolbox talks to employees",
      "Ensure compliance with mining safety regulations",
      "Maintain safety records and statistics",
      "Develop and update site-specific safety procedures",
      "Coordinate emergency response drills",
      "Promote safety awareness and best practices",
    ],
    requirements: [
      "Diploma or degree in Occupational Health & Safety",
      "Minimum 3 years experience in mining safety",
      "Certification in First Aid and Emergency Response",
      "Knowledge of Ghana mining safety regulations",
      "Strong interpersonal and communication skills",
      "Proficiency in Microsoft Office and safety management software",
      "Ability to work independently and under pressure",
      "Willingness to travel between sites (70% travel)",
    ],
    benefits: [
      "Competitive salary package",
      "Company vehicle or vehicle allowance",
      "Mobile phone and laptop provided",
      "Professional certification support",
      "Health insurance including family",
      "Annual leave and travel allowances",
      "Career advancement in safety management",
      "Quarterly performance bonuses",
    ],
    postedDate: "2024-11-25",
    salary: "GHS 6,000 - 9,000/month + Benefits",
  },
  {
    id: "job-005",
    jobId: "hr-coordinator",
    title: "HR Coordinator",
    categoryId: "corporate",
    location: "Accra, Ghana",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    description: "Join our Accra head office as an HR Coordinator supporting recruitment, employee relations, and administrative functions. Ideal for an organized individual looking to build a career in Human Resources.",
    responsibilities: [
      "Assist with recruitment processes including job postings and interviews",
      "Maintain employee records and HR databases",
      "Coordinate onboarding and orientation for new hires",
      "Process payroll data and employee documentation",
      "Support employee engagement initiatives",
      "Handle employee inquiries and HR-related questions",
      "Assist with training coordination and logistics",
      "Prepare HR reports and correspondence",
    ],
    requirements: [
      "Bachelor's degree in Human Resources, Business Administration, or related field",
      "0-2 years experience in HR or administrative role",
      "Excellent organizational and time management skills",
      "Proficiency in Microsoft Office (Excel, Word, Outlook)",
      "Strong written and verbal communication in English",
      "Attention to detail and confidentiality",
      "Customer service orientation",
      "Knowledge of Ghana Labour Act is a plus",
    ],
    benefits: [
      "Competitive entry-level salary",
      "Health insurance",
      "Professional development and training",
      "Friendly office environment",
      "Annual leave and sick leave",
      "Career growth within HR department",
      "Transportation allowance",
      "Lunch provided",
    ],
    postedDate: "2024-12-03",
    salary: "GHS 3,500 - 5,000/month",
  },
  {
    id: "job-006",
    jobId: "rc-drill-supervisor",
    title: "RC Drill Supervisor",
    categoryId: "drilling-ops",
    location: "Banfora, Burkina Faso",
    employmentType: "Full-time",
    experienceLevel: "Senior Level",
    description: "Lead our Reverse Circulation drilling crew in Burkina Faso. This supervisory role requires technical expertise and leadership skills to manage a team and ensure exploration drilling success.",
    responsibilities: [
      "Supervise RC drilling crew and daily operations",
      "Ensure drilling meets technical specifications and targets",
      "Conduct safety briefings and enforce safety protocols",
      "Plan and allocate resources for drilling programs",
      "Liaise with geologists and project managers",
      "Manage equipment maintenance and spare parts inventory",
      "Train and mentor junior drill operators",
      "Prepare progress reports and production summaries",
    ],
    requirements: [
      "Minimum 7 years experience in RC drilling operations",
      "At least 3 years in supervisory or leadership role",
      "Strong technical knowledge of RC drilling techniques",
      "Proven leadership and team management skills",
      "Excellent safety record and safety leadership",
      "Fluency in French is highly desirable",
      "Ability to work in remote locations for extended periods",
      "Valid driver's license",
    ],
    benefits: [
      "Excellent salary package",
      "Fly-in/fly-out roster with generous R&R",
      "Accommodation and meals at site",
      "Comprehensive insurance coverage",
      "Performance bonuses",
      "Leadership development programs",
      "International assignment benefits",
      "Visa and work permit support",
    ],
    postedDate: "2024-11-10",
    salary: "Negotiable based on experience",
  },
  {
    id: "job-007",
    jobId: "mechanic-heavy-equipment",
    title: "Heavy Equipment Mechanic",
    categoryId: "technical",
    location: "Tarkwa, Ghana",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    description: "We need a skilled Heavy Equipment Mechanic to maintain our fleet of drilling rigs, loaders, and haul trucks. The role offers hands-on experience with modern mining equipment.",
    responsibilities: [
      "Perform preventive maintenance on drilling rigs and heavy equipment",
      "Diagnose and repair mechanical, hydraulic, and electrical faults",
      "Conduct inspections and recommend equipment improvements",
      "Maintain accurate maintenance logs and service records",
      "Order and manage spare parts inventory",
      "Assist with equipment commissioning and decommissioning",
      "Work collaboratively with operations team",
      "Adhere to safety procedures and lockout/tagout protocols",
    ],
    requirements: [
      "Trade certificate or diploma in Heavy Equipment Mechanics",
      "4-6 years experience maintaining mining or construction equipment",
      "Knowledge of hydraulic, pneumatic, and electrical systems",
      "Ability to read technical manuals and schematics",
      "Experience with diagnostic tools and equipment",
      "Strong problem-solving and troubleshooting skills",
      "Physically fit to work in workshop and field conditions",
      "Flexible to work overtime and emergency callouts",
    ],
    benefits: [
      "Competitive salary",
      "Overtime pay",
      "Technical training and certifications",
      "Health and accident insurance",
      "Tool allowance",
      "Accommodation or housing allowance",
      "Transportation to and from work",
      "Career advancement to senior technician or supervisor",
    ],
    postedDate: "2024-11-28",
    salary: "GHS 5,000 - 7,500/month",
  },
];

// Employee Testimonials
export const EMPLOYEE_TESTIMONIALS: EmployeeTestimonial[] = [
  {
    id: "testimonial-001",
    name: "Emmanuel Osei",
    role: "Senior Drill Operator",
    department: "Drilling Operations",
    quote: "Yellow Power gave me the training and opportunities to grow from an entry-level operator to a senior position. The company truly invests in its people.",
    story: "I started as a trainee with no experience in 2018. Through comprehensive training and mentorship from experienced operators, I quickly learned the technical and safety aspects of drilling. Today, I supervise a crew and train new operators myself. The career progression has been remarkable.",
    yearsAtCompany: 6,
  },
  {
    id: "testimonial-002",
    name: "Fatima Diallo",
    role: "Mining Engineer",
    department: "Engineering",
    quote: "As a woman in mining, I've found Yellow Power to be supportive and inclusive. The company values skills and dedication over anything else.",
    story: "Joining Yellow Power as a junior engineer was a turning point in my career. The company provided me with challenging projects, continuous learning opportunities, and a supportive environment. I've worked on major drilling programs across three countries and have grown both professionally and personally.",
    yearsAtCompany: 4,
  },
  {
    id: "testimonial-003",
    name: "Kwame Boateng",
    role: "Safety Manager",
    department: "Safety & Health",
    quote: "The company's genuine commitment to safety is not just policy—it's lived every day. Management walks the talk when it comes to zero harm.",
    story: "In my 8 years at Yellow Power, I've seen the safety culture strengthen year after year. When I report a concern, it's acted upon immediately. The company provides all necessary resources for safety programs, and leadership actively participates in safety initiatives. It's rewarding to work for a company where safety truly comes first.",
    yearsAtCompany: 8,
  },
  {
    id: "testimonial-004",
    name: "Adjoa Mensah",
    role: "HR Manager",
    department: "Corporate",
    quote: "Yellow Power creates an environment where people want to stay and grow. Our retention rates speak to how employees feel valued here.",
    story: "Managing HR for Yellow Power has been fulfilling because the company genuinely cares about employee wellbeing. From competitive benefits to career development programs and work-life balance initiatives, we put our people first. It's a culture I'm proud to be part of.",
    yearsAtCompany: 5,
  },
  {
    id: "testimonial-005",
    name: "Moussa Koné",
    role: "Haul Truck Operator",
    department: "Load & Haul",
    quote: "I started with no skills, and Yellow Power trained me completely. Now I operate million-dollar equipment and support my family well.",
    story: "Coming from a farming background with limited education, I never imagined operating heavy machinery. Yellow Power's training program gave me practical skills and safety knowledge. The salary allows me to support my family and even save for my children's education. I'm grateful for this opportunity.",
    yearsAtCompany: 3,
  },
];

// Career Path Example (Drilling Operations)
export const DRILLING_CAREER_PATH: CareerPathStep[] = [
  {
    id: "step-1",
    title: "Trainee Drill Operator",
    description: "Begin your career with comprehensive training in drilling fundamentals, safety procedures, and equipment operation.",
    level: 1,
    skills: ["Basic drilling knowledge", "Safety compliance", "Equipment familiarization", "Teamwork"],
    duration: "6-12 months",
  },
  {
    id: "step-2",
    title: "Junior Drill Operator",
    description: "Operate drilling equipment under supervision while building experience and proficiency.",
    level: 2,
    skills: ["Independent operation", "Routine maintenance", "Production tracking", "Problem identification"],
    duration: "2-3 years",
  },
  {
    id: "step-3",
    title: "Senior Drill Operator",
    description: "Lead drilling activities with full operational responsibility and mentor junior operators.",
    level: 3,
    skills: ["Advanced drilling techniques", "Mentoring", "Quality control", "Efficiency optimization"],
    duration: "3-5 years",
  },
  {
    id: "step-4",
    title: "Lead Driller / Supervisor",
    description: "Supervise drilling crews, coordinate activities, and ensure performance targets are met.",
    level: 4,
    skills: ["Team leadership", "Planning and coordination", "Performance management", "Stakeholder communication"],
    duration: "3-5 years",
  },
  {
    id: "step-5",
    title: "Drilling Manager",
    description: "Manage all drilling operations across sites, lead strategic initiatives, and drive continuous improvement.",
    level: 5,
    skills: ["Strategic planning", "Budget management", "Contract negotiation", "Operational excellence"],
    duration: "5+ years",
  },
];

// Benefits
export const BENEFITS: Benefit[] = [
  {
    id: "benefit-001",
    title: "Competitive Compensation",
    description: "Market-leading salaries with regular reviews and performance bonuses",
    iconKey: "DollarSign",
  },
  {
    id: "benefit-002",
    title: "Health Insurance",
    description: "Comprehensive medical, dental, and vision coverage for you and your family",
    iconKey: "Heart",
  },
  {
    id: "benefit-003",
    title: "Training & Development",
    description: "Ongoing skills training, certifications, and career advancement programs",
    iconKey: "GraduationCap",
  },
  {
    id: "benefit-004",
    title: "Paid Leave",
    description: "Generous annual leave, sick leave, and public holidays",
    iconKey: "Calendar",
  },
  {
    id: "benefit-005",
    title: "Safety First",
    description: "Industry-leading safety standards and protective equipment",
    iconKey: "Shield",
  },
  {
    id: "benefit-006",
    title: "Work-Life Balance",
    description: "Flexible schedules and support for personal wellbeing",
    iconKey: "Scale",
  },
  {
    id: "benefit-007",
    title: "Career Growth",
    description: "Clear progression paths and internal promotion opportunities",
    iconKey: "TrendingUp",
  },
  {
    id: "benefit-008",
    title: "Transportation",
    description: "Company transportation or transport allowances for remote sites",
    iconKey: "Bus",
  },
  {
    id: "benefit-009",
    title: "Accommodation",
    description: "Housing provided or allowances for site-based positions",
    iconKey: "Home",
  },
  {
    id: "benefit-010",
    title: "Life Insurance",
    description: "Life and disability insurance coverage for all employees",
    iconKey: "Shield",
  },
  {
    id: "benefit-011",
    title: "Retirement Plan",
    description: "Retirement savings plan with employer contributions",
    iconKey: "Landmark",
  },
  {
    id: "benefit-012",
    title: "Recognition Programs",
    description: "Employee recognition and rewards for outstanding performance",
    iconKey: "Award",
  },
];

// Helper Functions
export function getJobById(jobId: string): Job | undefined {
  return JOBS.find((job) => job.jobId === jobId);
}

export function getJobsByCategory(categoryId: string): Job[] {
  return JOBS.filter((job) => job.categoryId === categoryId);
}

export function getCategoryById(categoryId: string): JobCategory | undefined {
  return JOB_CATEGORIES.find((cat) => cat.id === categoryId);
}

export function getJobsByExperienceLevel(level: Job["experienceLevel"]): Job[] {
  return JOBS.filter((job) => job.experienceLevel === level);
}

export function getJobsByLocation(location: string): Job[] {
  return JOBS.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()));
}

export function getRecentJobs(limit: number = 5): Job[] {
  return [...JOBS]
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, limit);
}

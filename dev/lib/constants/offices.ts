// Office locations and contact information

export interface OfficeLocation {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isHeadquarters?: boolean;
  operatingHours?: string;
  services?: string[];
}

// Office locations across 4 African countries and North America
export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'office-gh-accra',
    name: 'Head Office - Madina',
    country: 'Ghana',
    city: 'Madina, Greater Accra',
    address: 'Madina Estate, Greater Accra Region, Ghana',
    phone: '+233 268 066 942',
    email: 'info@yellowpowerinternational.com',
    coordinates: {
      lat: 5.6892,
      lng: -0.1679,
    },
    isHeadquarters: true,
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 8:00 AM - 12:00 PM',
    services: [
      'Corporate Administration',
      'Business Development',
      'Human Resources',
      'Finance & Accounting',
      'Project Management',
      'Equipment Maintenance',
    ],
  },
  {
    id: 'office-gh-kumasi',
    name: 'Kumasi Operations Center',
    country: 'Ghana',
    city: 'Kumasi, Ashanti Region',
    address: 'Adum, Kumasi, Ashanti Region, Ghana',
    phone: '+233 550 099 130',
    email: 'kumasi@yellowpowerinternational.com',
    coordinates: {
      lat: 6.6885,
      lng: -1.6244,
    },
    operatingHours: 'Monday - Saturday: 7:00 AM - 6:00 PM',
    services: [
      'Drilling Operations',
      'Load & Haul Services',
      'Equipment Deployment',
      'Field Support',
      'Project Coordination',
    ],
  },
  {
    id: 'office-bf-ouaga',
    name: 'Burkina Faso Office',
    country: 'Burkina Faso',
    city: 'Ouagadougou',
    address: 'Ouaga 2000, Ouagadougou, Burkina Faso',
    phone: '+226 25 37 XX XX',
    email: 'burkinafaso@yellowpowerinternational.com',
    coordinates: {
      lat: 12.3686,
      lng: -1.5275,
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    services: [
      'Production Drilling',
      'RC Drilling',
      'Load & Haul Services',
      'Local Operations Management',
    ],
  },
  {
    id: 'office-ci-abidjan',
    name: 'Côte d\'Ivoire Office',
    country: 'Côte d\'Ivoire',
    city: 'Abidjan',
    address: 'Plateau, Abidjan, Côte d\'Ivoire',
    phone: '+225 27 20 XX XX XX',
    email: 'cotedivoire@yellowpowerinternational.com',
    coordinates: {
      lat: 5.3364,
      lng: -4.0267,
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    services: [
      'Drilling Services',
      'Construction Services',
      'Equipment Support',
      'Regional Operations',
    ],
  },
  {
    id: 'office-ml-bamako',
    name: 'Mali Operations Office',
    country: 'Mali',
    city: 'Bamako',
    address: 'Bamako, Mali',
    phone: '+223 20 XX XX XX',
    email: 'mali@yellowpowerinternational.com',
    coordinates: {
      lat: 12.6392,
      lng: -8.0029,
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    services: [
      'Drilling Services',
      'Load & Haul Services',
      'Project Support',
    ],
  },
  {
    id: 'office-ca-canada',
    name: 'North America Office - Canada',
    country: 'Canada',
    city: 'Canada',
    address: 'Canada',
    phone: '+1 XXX XXX XXXX',
    email: 'canada@yellowpowerinternational.com',
    coordinates: {
      lat: 56.1304,
      lng: -106.3468,
    },
    operatingHours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    services: [
      'Mining Support Services',
      'Project Coordination',
    ],
  },
];

// Department contacts for Contact page
export interface DepartmentContact {
  department: string;
  description: string;
  email: string;
  phone?: string;
}

export const DEPARTMENT_CONTACTS: DepartmentContact[] = [
  {
    department: 'Business Development & Sales',
    description: 'Service inquiries, quotes, and new business opportunities',
    email: 'sales@yellowpowerinternational.com',
    phone: '+233 268 066 942',
  },
  {
    department: 'Human Resources & Careers',
    description: 'Job applications, career inquiries, and employee relations',
    email: 'hr@yellowpowerinternational.com',
    phone: '+233 550 099 130',
  },
  {
    department: 'Partnerships & Supplier Relations',
    description: 'Partnership opportunities and supplier registration',
    email: 'partnerships@yellowpowerinternational.com',
  },
  {
    department: 'Media & Communications',
    description: 'Press inquiries, media kits, and company information',
    email: 'media@yellowpowerinternational.com',
  },
  {
    department: 'Project Support & Operations',
    description: 'Project updates, operational support, and technical inquiries',
    email: 'operations@yellowpowerinternational.com',
    phone: '+233 268 066 942',
  },
  {
    department: 'Finance & Administration',
    description: 'Billing inquiries, payments, and administrative matters',
    email: 'finance@yellowpowerinternational.com',
  },
];

// Emergency contact
export const EMERGENCY_CONTACT = {
  title: '24/7 Project Support Hotline',
  phone: '+233 268 066 942',
  description: 'For urgent project-related matters and emergency support',
};

// Social media and other contact channels
export const SOCIAL_MEDIA = {
  facebook: 'https://facebook.com/yellowpowerintl',
  linkedin: 'https://linkedin.com/company/yellow-power-international',
  twitter: 'https://twitter.com/yellowpowerintl',
  instagram: 'https://instagram.com/yellowpowerintl',
  whatsapp: 'https://wa.me/233268066942',
  youtube: 'https://youtube.com/@yellowpowerintl',
};

// Helper functions
export function getOfficeByCountry(country: string): OfficeLocation[] {
  return OFFICE_LOCATIONS.filter((office) => office.country === country);
}

export function getHeadquarters(): OfficeLocation | undefined {
  return OFFICE_LOCATIONS.find((office) => office.isHeadquarters);
}

export function getOfficeById(id: string): OfficeLocation | undefined {
  return OFFICE_LOCATIONS.find((office) => office.id === id);
}

export function getAllCountries(): string[] {
  return Array.from(new Set(OFFICE_LOCATIONS.map((office) => office.country)));
}

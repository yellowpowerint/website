/**
 * Company information constants for Yellow Power International
 */

export interface CompanyInfo {
  name: string;
  founded: number;
  founder: string;
  location: string;
  employees: string;
  offices: number;
  phone1: string;
  phone2: string;
  website: string;
  email: string;
}

export const COMPANY_INFO: CompanyInfo = {
  name: "Yellow Power International",
  founded: 2017,
  founder: "Mr. Emmanuel Kweku Ganu",
  location: "Madina, Greater Accra, Ghana",
  employees: "501+",
  offices: 3,
  phone1: "+233268066942",
  phone2: "0550099130",
  website: "https://yellowpowerinternational.com/",
  email: "info@yellowpowerinternational.com",
};

export const SERVICES = [
  "Pre Split Drilling",
  "Production Drilling",
  "Reverse Circulation Drilling",
  "Load & Haul Operations",
  "Construction Services",
] as const;

export type Service = typeof SERVICES[number];

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/yellow-power-international",
  facebook: "https://www.facebook.com/yellowpowerintl",
  twitter: "https://twitter.com/yellowpowerintl",
  instagram: "https://www.instagram.com/yellowpowerintl",
};

export const OFFICE_LOCATIONS = [
  {
    country: "Ghana",
    city: "Madina, Greater Accra",
    address: "Madina, Greater Accra Region",
    phone: "+233268066942",
    isPrimary: true,
  },
  // Additional offices to be added as information becomes available
] as const;

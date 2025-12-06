// Video testimonials data

export interface VideoTestimonial {
  id: string;
  title: string;
  speaker: string;
  role: string;
  company?: string;
  videoUrl: string;
  thumbnail: string;
  quote: string;
  duration: string;
  category: 'employee' | 'client' | 'community' | 'training';
  publishedAt: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'testimonial-john-mensah',
    title: 'Excellence in Drilling Operations',
    speaker: 'John Mensah',
    role: 'Senior Production Driller',
    company: 'Yellow Power International',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/testimonials/john-mensah.jpg',
    quote: 'Working at YPI has transformed my career. The training programs and modern equipment make us industry leaders.',
    duration: '2:45',
    category: 'employee',
    publishedAt: '2024-11-15',
  },
  {
    id: 'testimonial-sarah-osei',
    title: 'Safety First Culture',
    speaker: 'Sarah Osei',
    role: 'Safety Officer',
    company: 'Yellow Power International',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/testimonials/sarah-osei.jpg',
    quote: 'YPI\'s commitment to safety is unmatched. We maintain zero-accident records through rigorous training and protocols.',
    duration: '3:20',
    category: 'employee',
    publishedAt: '2024-10-20',
  },
  {
    id: 'testimonial-mining-director',
    title: 'Trusted Mining Partner',
    speaker: 'Dr. Michael Boateng',
    role: 'Operations Director',
    company: 'Tarkwa Gold Mine',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/testimonials/client-boateng.jpg',
    quote: 'YPI has been our drilling partner for 5 years. Their professionalism and reliability are exceptional.',
    duration: '4:10',
    category: 'client',
    publishedAt: '2024-09-10',
  },
  {
    id: 'testimonial-community-leader',
    title: 'Community Impact',
    speaker: 'Chief Kwame Addo',
    role: 'Community Leader',
    company: 'Akyem Community',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/testimonials/chief-addo.jpg',
    quote: 'YPI\'s CSR programs have transformed our community - from education support to healthcare initiatives.',
    duration: '3:50',
    category: 'community',
    publishedAt: '2024-08-05',
  },
  {
    id: 'testimonial-trainee',
    title: 'World-Class Training',
    speaker: 'Kwame Appiah',
    role: 'Drilling Trainee',
    company: 'Yellow Power International',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/testimonials/trainee-appiah.jpg',
    quote: 'The training program at YPI gave me skills I never thought I\'d have. Now I operate million-dollar equipment.',
    duration: '2:30',
    category: 'training',
    publishedAt: '2024-07-12',
  },
  {
    id: 'testimonial-equipment-operator',
    title: 'Modern Equipment Excellence',
    speaker: 'Ama Frimpong',
    role: 'Load & Haul Operator',
    company: 'Yellow Power International',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/testimonials/ama-frimpong.jpg',
    quote: 'YPI invests in the latest technology. We operate state-of-the-art machinery that makes our work efficient and safe.',
    duration: '3:05',
    category: 'employee',
    publishedAt: '2024-06-18',
  },
];

// Helper functions
export function getTestimonialById(id: string): VideoTestimonial | undefined {
  return VIDEO_TESTIMONIALS.find((t) => t.id === id);
}

export function getTestimonialsByCategory(category: VideoTestimonial['category']): VideoTestimonial[] {
  return VIDEO_TESTIMONIALS.filter((t) => t.category === category);
}

export function getEmployeeTestimonials(): VideoTestimonial[] {
  return getTestimonialsByCategory('employee');
}

export function getClientTestimonials(): VideoTestimonial[] {
  return getTestimonialsByCategory('client');
}

export function getCommunityTestimonials(): VideoTestimonial[] {
  return getTestimonialsByCategory('community');
}

export function getLatestTestimonials(limit: number = 3): VideoTestimonial[] {
  return VIDEO_TESTIMONIALS.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, limit);
}

// Media library data models and constants (images and videos)

export interface MediaImage {
  id: string;
  title: string;
  src: string;
  alt: string;
  category: 'Equipment' | 'Projects' | 'Team' | 'CSR' | 'Facilities';
  tags: string[];
  caption?: string;
  photographer?: string;
  date?: string;
}

export interface MediaVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string; // YouTube or Vimeo URL
  description: string;
  category: 'Company Overview' | 'Equipment Demo' | 'Project Showcase' | 'Employee Stories' | 'CSR Activities';
  duration?: string;
  publishedAt: string;
}

// Sample media images
export const MEDIA_IMAGES: MediaImage[] = [
  // Equipment category
  {
    id: 'img-001',
    title: 'Sandvik DI550 Surface Drill Rig in Operation',
    src: '/images/gallery/sandvik-drill-rig.jpg',
    alt: 'Sandvik DI550 surface drill rig operating at mining site',
    category: 'Equipment',
    tags: ['Drilling', 'Equipment', 'Sandvik'],
    caption: 'State-of-the-art Sandvik DI550 conducting production drilling operations',
    photographer: 'YPI Media Team',
    date: '2024-10-15',
  },
  {
    id: 'img-002',
    title: 'Caterpillar 777G Haul Truck Fleet',
    src: '/images/gallery/cat-haul-trucks.jpg',
    alt: 'Fleet of Caterpillar 777G haul trucks lined up',
    category: 'Equipment',
    tags: ['Load & Haul', 'Equipment', 'Caterpillar'],
    caption: 'Our fleet of CAT 777G haul trucks ready for deployment',
    photographer: 'YPI Media Team',
    date: '2024-09-20',
  },
  {
    id: 'img-003',
    title: 'RC Drilling Equipment at Exploration Site',
    src: '/images/gallery/rc-drilling-site.jpg',
    alt: 'Reverse circulation drilling equipment at exploration site',
    category: 'Equipment',
    tags: ['RC Drilling', 'Exploration', 'Equipment'],
    caption: 'Schramm T450XD RC drill rig conducting exploration drilling',
    photographer: 'YPI Media Team',
    date: '2024-08-10',
  },
  {
    id: 'img-004',
    title: 'Komatsu PC1250 Excavator Loading',
    src: '/images/gallery/komatsu-excavator.jpg',
    alt: 'Komatsu PC1250 excavator loading material',
    category: 'Equipment',
    tags: ['Load & Haul', 'Equipment', 'Komatsu'],
    caption: 'Komatsu PC1250 excavator in load and haul operations',
    photographer: 'YPI Media Team',
    date: '2024-07-25',
  },

  // Projects category
  {
    id: 'img-005',
    title: 'Tarkwa Gold Mine Production Drilling',
    src: '/images/gallery/tarkwa-project.jpg',
    alt: 'Production drilling operations at Tarkwa Gold Mine',
    category: 'Projects',
    tags: ['Tarkwa', 'Production Drilling', 'Ghana'],
    caption: 'Successful production drilling project at Tarkwa Gold Mine',
    photographer: 'YPI Media Team',
    date: '2024-11-10',
  },
  {
    id: 'img-006',
    title: 'Obuasi Mine Pre-Split Drilling',
    src: '/images/gallery/obuasi-project.jpg',
    alt: 'Pre-split drilling operations at Obuasi Mine',
    category: 'Projects',
    tags: ['Obuasi', 'Pre-Split Drilling', 'Ghana'],
    caption: 'Pre-split drilling operations for AngloGold Ashanti at Obuasi',
    photographer: 'YPI Media Team',
    date: '2024-09-15',
  },
  {
    id: 'img-007',
    title: 'Exploration Project Northern Ghana',
    src: '/images/gallery/northern-exploration.jpg',
    alt: 'Exploration drilling project in northern Ghana',
    category: 'Projects',
    tags: ['Exploration', 'RC Drilling', 'Ghana'],
    caption: 'RC exploration drilling program in northern Ghana',
    photographer: 'YPI Media Team',
    date: '2024-07-20',
  },
  {
    id: 'img-008',
    title: 'Burkina Faso Project Launch',
    src: '/images/gallery/burkina-project.jpg',
    alt: 'Equipment deployment at project site in Burkina Faso',
    category: 'Projects',
    tags: ['Burkina Faso', 'International', 'Expansion'],
    caption: 'Launch of operations at first project site in Burkina Faso',
    photographer: 'YPI Media Team',
    date: '2024-08-15',
  },

  // Team category
  {
    id: 'img-009',
    title: 'Drill Operators Team',
    src: '/images/gallery/drill-operators.jpg',
    alt: 'Team of professional drill operators',
    category: 'Team',
    tags: ['Team', 'Operators', 'People'],
    caption: 'Our skilled team of certified drill operators',
    photographer: 'YPI Media Team',
    date: '2024-06-10',
  },
  {
    id: 'img-010',
    title: 'Engineering Team Meeting',
    src: '/images/gallery/engineering-team.jpg',
    alt: 'Engineering team in planning meeting',
    category: 'Team',
    tags: ['Team', 'Engineering', 'Planning'],
    caption: 'Engineering team planning operations at project site',
    photographer: 'YPI Media Team',
    date: '2024-05-20',
  },
  {
    id: 'img-011',
    title: 'Safety Training Session',
    src: '/images/gallery/safety-training.jpg',
    alt: 'Safety training session for field personnel',
    category: 'Team',
    tags: ['Team', 'Safety', 'Training'],
    caption: 'Regular safety training sessions for all field personnel',
    photographer: 'YPI Media Team',
    date: '2024-04-15',
  },

  // CSR category
  {
    id: 'img-012',
    title: 'School Renovation Project',
    src: '/images/gallery/school-project.jpg',
    alt: 'Community school renovation supported by YPI',
    category: 'CSR',
    tags: ['CSR', 'Education', 'Community'],
    caption: 'Renovated school facility in local mining community',
    photographer: 'YPI Media Team',
    date: '2024-10-05',
  },
  {
    id: 'img-013',
    title: 'Healthcare Facility Support',
    src: '/images/gallery/healthcare-support.jpg',
    alt: 'Healthcare facility improvements sponsored by YPI',
    category: 'CSR',
    tags: ['CSR', 'Healthcare', 'Community'],
    caption: 'Medical equipment donation to community healthcare center',
    photographer: 'YPI Media Team',
    date: '2024-08-25',
  },
  {
    id: 'img-014',
    title: 'Community Water Project',
    src: '/images/gallery/water-project.jpg',
    alt: 'Clean water access project in mining community',
    category: 'CSR',
    tags: ['CSR', 'Water', 'Infrastructure'],
    caption: 'Clean water access project benefiting local community',
    photographer: 'YPI Media Team',
    date: '2024-06-30',
  },

  // Facilities category
  {
    id: 'img-015',
    title: 'YPI Head Office Accra',
    src: '/images/gallery/head-office.jpg',
    alt: 'Yellow Power International head office building',
    category: 'Facilities',
    tags: ['Facilities', 'Office', 'Ghana'],
    caption: 'YPI head office in Madina, Greater Accra',
    photographer: 'YPI Media Team',
    date: '2024-03-15',
  },
  {
    id: 'img-016',
    title: 'Equipment Maintenance Workshop',
    src: '/images/gallery/workshop.jpg',
    alt: 'State-of-the-art equipment maintenance workshop',
    category: 'Facilities',
    tags: ['Facilities', 'Workshop', 'Maintenance'],
    caption: 'Modern equipment maintenance and repair facility',
    photographer: 'YPI Media Team',
    date: '2024-02-20',
  },
];

// Sample media videos
export const MEDIA_VIDEOS: MediaVideo[] = [
  {
    id: 'vid-001',
    title: 'Yellow Power International - Company Overview 2024',
    thumbnail: 'https://img.youtube.com/vi/S6jOoxGpYPQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/S6jOoxGpYPQ',
    description: 'Comprehensive overview of YPI\'s services, capabilities, and commitment to excellence in mining support services across West Africa.',
    category: 'Company Overview',
    duration: '5:30',
    publishedAt: '2024-10-01',
  },
  {
    id: 'vid-002',
    title: 'Sandvik DI550 Surface Drill in Action',
    thumbnail: 'https://img.youtube.com/vi/LYCuXGh9vrc/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/LYCuXGh9vrc',
    description: 'Watch our state-of-the-art Sandvik DI550 surface drill rig in operation, demonstrating precision and efficiency in production drilling.',
    category: 'Equipment Demo',
    duration: '3:45',
    publishedAt: '2024-09-15',
  },
  {
    id: 'vid-003',
    title: 'Tarkwa Production Drilling Project Success Story',
    thumbnail: 'https://img.youtube.com/vi/TjXfmlDXXmw/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/TjXfmlDXXmw',
    description: 'Highlights from our successful 50,000+ meter production drilling project at Tarkwa Gold Mine, completed ahead of schedule.',
    category: 'Project Showcase',
    duration: '4:20',
    publishedAt: '2024-11-20',
  },
  {
    id: 'vid-004',
    title: 'Life as a Drill Operator at YPI',
    thumbnail: 'https://img.youtube.com/vi/plB8FtMnbM4/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/plB8FtMnbM4',
    description: 'Meet our drill operators and learn about the rewarding career opportunities and training programs available at Yellow Power International.',
    category: 'Employee Stories',
    duration: '6:15',
    publishedAt: '2024-08-10',
  },
  {
    id: 'vid-005',
    title: 'RC Drilling for Exploration - Technical Overview',
    thumbnail: 'https://img.youtube.com/vi/E0asqkI5o-E/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/E0asqkI5o-E',
    description: 'Technical overview of Reverse Circulation drilling methods and their critical role in mineral exploration.',
    category: 'Equipment Demo',
    duration: '5:00',
    publishedAt: '2024-07-25',
  },
  {
    id: 'vid-006',
    title: 'YPI Community Impact - Education Initiatives',
    thumbnail: 'https://img.youtube.com/vi/nmBdu8w3TmE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/nmBdu8w3TmE',
    description: 'How Yellow Power International supports education in mining communities through school renovations and scholarship programs.',
    category: 'CSR Activities',
    duration: '4:40',
    publishedAt: '2024-10-15',
  },
  {
    id: 'vid-007',
    title: 'Safety First - YPI Safety Culture',
    thumbnail: 'https://img.youtube.com/vi/c7vwyujeGYg/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/c7vwyujeGYg',
    description: 'Discover how YPI maintains industry-leading safety standards and has achieved over 1,000 days without a lost-time incident.',
    category: 'Company Overview',
    duration: '5:50',
    publishedAt: '2024-09-05',
  },
  {
    id: 'vid-008',
    title: 'Load & Haul Operations Excellence',
    thumbnail: 'https://img.youtube.com/vi/vi348QAXN3E/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/vi348QAXN3E',
    description: 'Efficient load and haul operations featuring our fleet of Caterpillar haul trucks and Komatsu excavators.',
    category: 'Equipment Demo',
    duration: '3:30',
    publishedAt: '2024-06-20',
  },
  {
    id: 'vid-009',
    title: 'Wassa Akyempim Golden Star Site Visit',
    thumbnail: 'https://img.youtube.com/vi/M04AiirkLpY/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/M04AiirkLpY',
    description: 'On-the-ground footage from a site visit at Wassa Akyempim, highlighting safety practices, field supervision, and coordination between YPI crews and client teams.',
    category: 'Project Showcase',
    publishedAt: '2024-01-01',
  },
];

// Media categories
export const MEDIA_IMAGE_CATEGORIES = [
  'All',
  'Equipment',
  'Projects',
  'Team',
  'CSR',
  'Facilities',
] as const;

export const MEDIA_VIDEO_CATEGORIES = [
  'All',
  'Company Overview',
  'Equipment Demo',
  'Project Showcase',
  'Employee Stories',
  'CSR Activities',
] as const;

// Helper functions
export function getImagesByCategory(category: string): MediaImage[] {
  if (category === 'All') return MEDIA_IMAGES;
  return MEDIA_IMAGES.filter((image) => image.category === category);
}

export function getVideosByCategory(category: string): MediaVideo[] {
  if (category === 'All') return MEDIA_VIDEOS;
  return MEDIA_VIDEOS.filter((video) => video.category === category);
}

export function getImageById(id: string): MediaImage | undefined {
  return MEDIA_IMAGES.find((image) => image.id === id);
}

export function getVideoById(id: string): MediaVideo | undefined {
  return MEDIA_VIDEOS.find((video) => video.id === id);
}

// News articles, press releases data models and constants

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Projects' | 'Equipment' | 'Awards' | 'Company News';
  tags: string[];
  publishedAt: string;
  author: string;
  heroImage: string;
  featured?: boolean;
}

export interface PressRelease {
  id: string;
  title: string;
  publishedAt: string;
  summary: string;
  pdfUrl?: string;
}

// Sample news articles
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'all-smiles-at-bibiani-site',
    title: 'All smiles at Bibiani site',
    excerpt:
      'Yellow Power International teams at Bibiani marked another strong shift with a focus on safety, uptime, and teamwork—keeping drilling and mining support operations running smoothly.',
    content: `
      <p>There were plenty of reasons to smile at Yellow Power International’s Bibiani site this week as our field teams wrapped up another high-performing shift with safety, coordination, and equipment readiness at the center of operations. The positive energy on site reflects the professionalism and commitment our people bring every day—whether supporting drilling, load &amp; haul, or civil works activities for our mining partners.</p>

      <p>From pre-start inspections to end-of-shift reporting, the Bibiani crews maintained strict adherence to HSE standards while delivering reliable output. Our supervisors and operators worked side-by-side to keep equipment availability high and ensure work fronts remained productive, even under changing site conditions.</p>

      <p>Yellow Power International continues to strengthen its operational footprint across Ghana by investing in people, procedures, and fleet reliability. Moments like these—where teams can pause for a quick photo and share a laugh—are a reminder that strong performance is built on strong culture.</p>

      <p>We thank our Bibiani teams and our client partners for their ongoing collaboration as we continue delivering safe, efficient, and dependable mining support services across West Africa.</p>
    `,
    category: 'Company News',
    tags: ['Bibiani', 'Site Operations', 'Safety', 'Teamwork', 'Mining Support'],
    publishedAt: '2025-12-17',
    author: 'YPI Communications Team',
    heroImage: '/images/news/staff-all-smiles-in-bibini-site.jpg',
  },
  {
    slug: 'wassa-akyempim-golden-star-project-day-6',
    title: 'Wassa Akyempim Golden Star Project Day 6',
    excerpt:
      'Advanced trench drainage construction with continuous geotextile installation and strict quality control at the Wassa Akyempim Golden Star Project.',
    content: `
      <p>Yellow Power International's systematic approach to trench drainage construction reaches an advanced stage during day six of the Wassa Akyempim Golden Star Project, where meticulous geotextile installation and quality control procedures ensure long-term infrastructure performance. This phase demonstrates the company's commitment to engineering excellence through careful execution of critical underground drainage systems.</p>
      
      <p>The project team navigates the challenging terrain with precision, installing continuous geotextile fabric along deep trenches that will form the backbone of the site's water management network. Yellow Power International's construction supervisors work closely with field personnel to ensure proper fabric overlap, tension control, and anchoring techniques that prevent material displacement during subsequent backfilling operations. This attention to installation details directly impacts the drainage system's effectiveness over its operational lifespan.</p>
      
      <p>CAT excavators positioned strategically throughout the site support the drainage installation work, demonstrating Yellow Power International's capacity to coordinate multiple construction zones simultaneously without compromising safety or quality standards. The scale of operations visible across the expansive mining landscape illustrates the company's ability to manage large-scale civil engineering projects that require substantial resource mobilization and logistical planning.</p>
      
      <p>Safety remains paramount, with all personnel equipped with complete personal protective equipment including hard hats, high-visibility vests, and safety boots appropriate for the excavation environment. Yellow Power International's integrated approach to project delivery—combining equipment resources, technical expertise, and experienced personnel—positions them as a reliable partner for clients requiring comprehensive civil works solutions in Ghana's competitive mining sector.</p>
    `,
    category: 'Projects',
    tags: ['Wassa Akyempim', 'Golden Star', 'Drainage', 'Geotextile', 'Projects'],
    publishedAt: '2025-12-08',
    author: 'YPI Communications Team',
    heroImage: '/images/news/wassa-akyempim-golden-star-project-day-6.jpg',
  },
  {
    slug: 'wassa-akyempim-golden-star-project-day-5',
    title: 'Wassa Akyempim Golden Star Project Day 5',
    excerpt:
      'Critical slope stabilization and erosion control works using geotextile fabrics and aggregate backfill at the Wassa Akyempim Golden Star Project.',
    content: `
      <p>Yellow Power International demonstrates advanced erosion control and geotechnical engineering capabilities during the fifth phase of the Wassa Akyempim Golden Star Project, focusing on critical slope stabilization and drainage infrastructure. This operation highlights the company's understanding of sustainable construction practices that protect engineered structures from Ghana's tropical weather conditions and seasonal rainfall.</p>
      
      <p>The installation of geotextile fabric combined with aggregate backfill represents sophisticated soil engineering techniques that prevent erosion while maintaining site functionality. Yellow Power International's CAT backhoe loader precisely places crushed stone materials over the geotextile layer, creating a composite system that distributes loads effectively while allowing controlled water infiltration. This methodology is essential for long-term infrastructure stability in mining environments where heavy equipment traffic and intense rainfall can compromise unprepared surfaces.</p>
      
      <p>A safety supervisor in high-visibility reflective clothing monitors the operation, ensuring compliance with Yellow Power International's strict safety protocols and quality standards. The dramatic backdrop of engineered slopes showcases the scale of earthworks already completed, with visible horizontal benching patterns that control surface water runoff and minimize erosion potential on steep grades.</p>
      
      <p>The integration of erosion control measures during active construction phases rather than as afterthoughts demonstrates Yellow Power International's proactive project management approach. This forward-thinking methodology reduces long-term maintenance costs for clients while ensuring environmental compliance throughout the project lifecycle. The company's expertise in combining multiple civil engineering disciplines—earthworks, drainage, geotechnical engineering, and erosion control—establishes them as a comprehensive solution provider for Ghana's complex mining infrastructure projects.</p>
    `,
    category: 'Projects',
    tags: ['Wassa Akyempim', 'Golden Star', 'Erosion Control', 'Geotechnical', 'Drainage'],
    publishedAt: '2025-12-07',
    author: 'YPI Communications Team',
    heroImage: '/images/news/wassa-akyempim-golden-star-project-day-5.jpg',
  },
  {
    slug: 'wassa-akyempim-golden-star-project-day-4',
    title: 'Wassa Akyempim Golden Star Project Day 4',
    excerpt:
      'Precision concrete foundation construction for permanent mining infrastructure at the Wassa Akyempim Golden Star Project.',
    content: `
      <p>Yellow Power International's concrete construction expertise takes center stage during the fourth phase of the Wassa Akyempim Golden Star Project, where precision foundation work forms the structural basis for permanent mining infrastructure. This operation demonstrates the company's capability in delivering high-quality concrete works that meet stringent engineering specifications required for industrial mining facilities.</p>
      
      <p>The foundation construction process involves meticulous excavation, formwork installation, and concrete placement executed by Yellow Power International's experienced construction team. Workers equipped with appropriate safety gear including hard hats and high-visibility vests collaborate efficiently to ensure proper concrete consolidation and finishing. The freshly placed concrete visible in the foundation pit represents critical structural elements that will support heavy equipment or processing facilities.</p>
      
      <p>Quality control measures are evident throughout the operation, with supervisory staff monitoring concrete placement procedures to ensure compliance with mix design specifications and placement techniques. The wooden formwork systems installed around the perimeter demonstrate traditional craftsmanship combined with modern engineering principles, creating accurate dimensional control for the foundation elements.</p>
      
      <p>Yellow Power International's approach to concrete construction emphasizes teamwork and attention to detail, with multiple trades coordinating their activities to maintain project schedules while ensuring structural integrity. The company's ability to manage complex concrete operations in remote mining locations showcases their comprehensive service offering that extends beyond earthworks to include specialized civil engineering construction. This integrated capability allows clients to rely on a single contractor for multiple project phases, streamlining coordination and ensuring consistent quality standards throughout the Wassa Akyempim Golden Star Project.</p>
    `,
    category: 'Projects',
    tags: ['Wassa Akyempim', 'Golden Star', 'Concrete', 'Foundations', 'Construction'],
    publishedAt: '2025-12-06',
    author: 'YPI Communications Team',
    heroImage: '/images/news/wassa-akyempim-golden-star-project-day-4.jpg',
  },
  {
    slug: 'wassa-akyempim-golden-star-project-day-3',
    title: 'Wassa Akyempim Golden Star Project Day 3',
    excerpt:
      'Large-scale earthworks and engineered slopes transforming the Wassa Akyempim site into functional mining infrastructure.',
    content: `
      <p>Yellow Power International showcases its large-scale earthmoving capabilities during the third phase of operations at the Wassa Akyempim Golden Star Project, where extensive site grading and mass earthworks transform the natural landscape into functional mining infrastructure. This ambitious undertaking demonstrates the company's capacity to manage complex terrain modification projects that span multiple hectares of challenging topography.</p>
      
      <p>The aerial perspective reveals the magnitude of Yellow Power International's operations, with multiple heavy equipment units working in coordinated sequences across the expansive site. The distinctive red laterite soil, characteristic of Ghana's mineral-rich regions, has been systematically excavated, graded, and compacted to create level platforms and engineered slopes essential for mining operations. The company's fleet of yellow compaction equipment maintains precise grade control across the vast working area.</p>
      
      <p>Strategic placement of geotextile-reinforced drainage systems is visible as serpentine channels cutting through the prepared surfaces, demonstrating Yellow Power International's integrated approach to site development. These drainage features ensure that water management infrastructure is incorporated during construction rather than retrofitted later, reflecting professional engineering practices that enhance long-term site stability.</p>
      
      <p>The engineered slopes visible in the background showcase careful attention to geotechnical stability, with controlled gradient angles that prevent erosion while maximizing usable flat areas. Yellow Power International's project management expertise coordinates multiple operations simultaneously, maintaining productivity while adhering to safety protocols and quality standards. This comprehensive approach to mass earthworks positions the company as a capable partner for large-scale mining infrastructure development throughout Ghana.</p>
    `,
    category: 'Projects',
    tags: ['Wassa Akyempim', 'Golden Star', 'Earthworks', 'Site Development', 'Infrastructure'],
    publishedAt: '2025-12-05',
    author: 'YPI Communications Team',
    heroImage: '/images/news/wassa-akyempim-golden-star-project-day-3.jpg',
  },
  {
    slug: 'wassa-akyempim-golden-star-project-day-2',
    title: 'Wassa Akyempim Golden Star Project Day 2',
    excerpt:
      'Engineered drainage channel construction using high-strength geotextile systems at the Wassa Akyempim Golden Star Project.',
    content: `
      <p>Yellow Power International's continued operations at the Wassa Akyempim Golden Star Project demonstrate their expertise in specialized drainage and water management systems essential for mining infrastructure. This phase of the project focuses on the installation of engineered drainage channels utilizing advanced geotextile technology and precision excavation techniques to ensure effective water control across the mining site.</p>
      
      <p>The drainage construction involves the strategic placement of high-strength geotextile fabric along excavated channels, which serves multiple critical functions including soil separation, filtration, and reinforcement. Yellow Power International's experienced civil engineering team carefully positions the geotextile material to prevent soil migration while allowing controlled water flow, a crucial requirement in Ghana's tropical climate where heavy rainfall can impact mining operations.</p>
      
      <p>Working with CAT excavators and supporting equipment, the company executes precise trenching operations that follow engineered drainage plans designed to channel surface water away from critical infrastructure areas. The backfilling process incorporates selected granular materials that work in conjunction with the geotextile system to create robust, long-lasting drainage solutions capable of handling high water volumes during the rainy season.</p>
      
      <p>Yellow Power International's attention to detail is evident in the careful handling and placement of materials, with supervisory personnel ensuring compliance with technical specifications throughout the installation process. This systematic approach to drainage construction reflects the company's understanding that effective water management is fundamental to maintaining operational efficiency and structural integrity in mining environments, ultimately contributing to the long-term success of the Wassa Akyempim Golden Star Project.</p>
    `,
    category: 'Projects',
    tags: ['Wassa Akyempim', 'Golden Star', 'Drainage', 'Geotextile', 'Water Management'],
    publishedAt: '2025-12-04',
    author: 'YPI Communications Team',
    heroImage: '/images/news/wassa-akyempim-golden-star-project-day-2.jpg',
  },
  {
    slug: 'sunny-adt-fleet-expansion',
    title: 'Sunny ADT',
    excerpt:
      'Strategic deployment of SANY SAT40C articulated dump trucks to enhance Yellow Power International’s material hauling operations across Ghana.',
    content: `
      <p>Yellow Power International has significantly enhanced its fleet capabilities with the acquisition and deployment of SANY SAT40C articulated dump trucks (ADT), representing a major advancement in their material hauling operations across Ghana. This strategic investment demonstrates the company's commitment to utilizing world-class equipment that combines productivity, durability, and operational efficiency in challenging terrain conditions.</p>
      
      <p>The SANY SAT40C articulated dump truck features a robust 40-ton payload capacity, making it ideal for large-scale earthmoving projects in Ghana's mining and infrastructure sectors. The distinctive six-wheel configuration provides exceptional traction and stability on uneven surfaces, while the articulated steering system allows for superior maneuverability in confined spaces and rough terrain conditions commonly encountered on construction sites.</p>
      
      <p>Yellow Power International's operators benefit from the SAT40C's advanced ergonomic cabin design, which includes intuitive controls, enhanced visibility, and climate control systems that ensure operator comfort during extended work shifts. The truck's powerful engine delivers reliable performance while meeting modern emission standards, reflecting the company's environmental consciousness.</p>
      
      <p>The heavy-duty suspension system and reinforced chassis design enable the SAT40C to withstand the rigorous demands of continuous operation in Ghana's mining environments. Yellow Power International maintains these specialized vehicles to the highest standards, ensuring maximum uptime and productivity. The deployment of SANY equipment showcases the company's partnership with leading global manufacturers to deliver efficient material transport solutions that meet the demanding requirements of modern construction and mining operations in Ghana.</p>
    `,
    category: 'Equipment',
    tags: ['SANY', 'ADT', 'Haulage', 'Fleet Expansion', 'Equipment'],
    publishedAt: '2025-12-03',
    author: 'YPI Communications Team',
    heroImage: '/images/news/sunny-adt-fleet-expansion.jpg',
  },
  {
    slug: 'benso-project-drilling',
    title: 'Benso Project Drilling',
    excerpt:
      'Specialized geotechnical drilling operations at the Benso Project using a MULTISTAR rig to support exploration and ground investigation.',
    content: `
      <p>Yellow Power International has expanded its service portfolio in Ghana with specialized geotechnical drilling operations at the Benso Project, utilizing advanced drilling technology to support mining exploration and ground investigation requirements. The company deployed a sophisticated MULTISTAR drill rig equipped with modern hydraulic systems and precision control panels, demonstrating their capability in complex subsurface investigation work.</p>
      
      <p>The drilling operations feature state-of-the-art equipment capable of penetrating various geological formations encountered in Ghana's mineral-rich regions. The MULTISTAR rig's robust design allows for deep drilling applications essential for resource evaluation, geotechnical assessment, and foundation design verification. Yellow Power International's trained drilling operators manage the sophisticated control systems that regulate drilling parameters including rotation speed, hydraulic pressure, and penetration rates.</p>
      
      <p>Safety remains paramount throughout the drilling operations, with personnel equipped with appropriate personal protective equipment and adherence to strict operational protocols. The company's commitment to environmental responsibility is evident in their controlled drilling procedures that minimize surface disturbance while maximizing data collection efficiency.</p>
      
      <p>The Benso Project drilling activities support critical decision-making processes for mining development, providing essential geological data that informs resource estimation and mine planning. Yellow Power International's investment in modern drilling equipment positions them as a comprehensive service provider capable of delivering integrated solutions from initial exploration through to mine construction and operation.</p>
    `,
    category: 'Projects',
    tags: ['Benso', 'Drilling', 'Geotechnical', 'Exploration', 'Projects'],
    publishedAt: '2025-12-02',
    author: 'YPI Communications Team',
    heroImage: '/images/news/benso-project-drilling.jpg',
  },
  {
    slug: 'wassa-akyempim-golden-star-project',
    title: 'Wassa Akyempim Golden Star Project',
    excerpt:
      'Comprehensive earthworks, compaction, and mining infrastructure development for the Wassa Akyempim Golden Star Project in Ghana’s Western Region.',
    content: `
      <p>Yellow Power International has demonstrated exceptional expertise in delivering comprehensive earthworks and site preparation services for the Wassa Akyempim Golden Star Project in Ghana's Western Region. This mining infrastructure development showcases the company's commitment to supporting Ghana's gold mining sector through professional construction and ground engineering solutions.</p>
      
      <p>The project involves extensive site development work, including mass earthworks, soil compaction, and foundation preparation for critical mining infrastructure. Yellow Power International deployed state-of-the-art HAMM brand vibratory rollers and modern compaction equipment to ensure optimal soil density and stability across the project site. The precision compaction work is essential for creating stable platforms that can support heavy mining equipment and structures.</p>
      
      <p>The project scope extends beyond basic earthworks to include the preparation of construction pads, installation of reinforced concrete foundations, and development of internal haul roads. Yellow Power International's commitment to safety and quality is evident in the controlled work environment, where proper compaction verification procedures ensure compliance with international mining infrastructure standards. Through this project, Yellow Power International continues to establish itself as a trusted partner in Ghana's mining sector.</p>
    `,
    category: 'Projects',
    tags: ['Wassa Akyempim', 'Golden Star', 'Earthworks', 'Compaction', 'Ghana'],
    publishedAt: '2025-12-01',
    author: 'YPI Communications Team',
    heroImage: '/images/news/wassa-akyempim-golden-star-project.jpg',
  },
  {
    slug: 'ypi-completes-major-project-tarkwa',
    title: 'Yellow Power International Completes Major Production Drilling Project at Tarkwa',
    excerpt: 'Successfully completed a 6-month production drilling contract at one of Ghana\'s largest gold mines, drilling over 50,000 meters.',
    content: `
      <p>Yellow Power International is proud to announce the successful completion of a major production drilling project at the Tarkwa Gold Mine in Ghana's Western Region. The six-month contract, which concluded ahead of schedule, involved drilling over 50,000 meters of blast holes for the mine's production operations.</p>
      
      <p>The project showcased YPI's commitment to excellence and safety, achieving zero lost-time incidents throughout the entire operation. Our team of skilled drill operators and technicians worked around the clock using state-of-the-art Atlas Copco drill rigs to ensure maximum productivity and efficiency.</p>
      
      <p>"This project demonstrates our capability to handle large-scale mining operations while maintaining the highest safety standards," said Emmanuel Kweku Ganu, Founder and CEO of Yellow Power International. "Our team's dedication and expertise were key to delivering this project on time and within budget."</p>
      
      <p>The Tarkwa project utilized YPI's fleet of modern production drilling equipment, including multiple Sandvik DR460i rotary blast hole drills. These state-of-the-art machines enabled the team to achieve drilling rates of up to 300 meters per day, significantly exceeding industry standards.</p>
      
      <h3>Key Project Highlights</h3>
      <ul>
        <li>Total meters drilled: 50,000+</li>
        <li>Zero lost-time incidents</li>
        <li>Completed 2 weeks ahead of schedule</li>
        <li>Average drilling rate: 280 meters/day</li>
        <li>Peak productivity: 350 meters/day</li>
      </ul>
      
      <p>This successful project has further strengthened YPI's reputation as a leading mining support services provider in Ghana and across West Africa. The company continues to expand its operations and invest in cutting-edge equipment to serve the growing needs of the mining industry.</p>
    `,
    category: 'Projects',
    tags: ['Production Drilling', 'Tarkwa', 'Project Completion', 'Safety'],
    publishedAt: '2024-11-15',
    author: 'YPI Communications Team',
    heroImage: '/images/news/tarkwa-project.jpg',
    featured: true,
  },
  {
    slug: 'new-fleet-expansion-2024',
    title: 'YPI Invests $5M in New Equipment Fleet Expansion',
    excerpt: 'Major investment in state-of-the-art drilling equipment and haul trucks to expand service capabilities across Africa.',
    content: `
      <p>Yellow Power International has announced a significant $5 million investment in new equipment, marking one of the largest fleet expansions in the company's history. The investment includes the acquisition of advanced drilling rigs, haul trucks, and auxiliary equipment to support growing demand across Ghana, Burkina Faso, and Côte d'Ivoire.</p>
      
      <p>The new equipment includes three Sandvik DI550 surface drilling rigs, four Caterpillar 777G haul trucks, two Komatsu PC1250 excavators, and various support vehicles. All equipment features the latest technology for improved productivity, fuel efficiency, and operator safety.</p>
      
      <h3>Equipment Breakdown</h3>
      <ul>
        <li><strong>Drilling Equipment:</strong> 3 x Sandvik DI550 surface drills with automated rod handling</li>
        <li><strong>Haul Trucks:</strong> 4 x Caterpillar 777G (100-ton capacity)</li>
        <li><strong>Excavators:</strong> 2 x Komatsu PC1250 (120-ton class)</li>
        <li><strong>Support Equipment:</strong> Graders, water trucks, fuel bowsers</li>
      </ul>
      
      <p>"This investment demonstrates our commitment to providing our clients with the most advanced and reliable equipment in the industry," said Mr. Ganu. "The new fleet will enable us to take on larger projects and deliver even better results for our mining partners."</p>
      
      <p>The equipment procurement process began six months ago and involved comprehensive evaluations of various manufacturers. YPI selected equipment based on reliability, performance, fuel efficiency, and after-sales support availability in Africa.</p>
      
      <p>The new equipment is expected to increase YPI's operational capacity by 40% and will be deployed across multiple project sites starting in January 2025. All operators and maintenance personnel are currently undergoing intensive training programs to ensure optimal equipment utilization and maintenance.</p>
    `,
    category: 'Equipment',
    tags: ['Fleet Expansion', 'Investment', 'New Equipment', 'Growth'],
    publishedAt: '2024-10-28',
    author: 'YPI Communications Team',
    heroImage: '/images/news/new-equipment.jpg',
    featured: true,
  },
  {
    slug: 'ypi-wins-excellence-award',
    title: 'YPI Wins "Mining Support Services Excellence Award 2024"',
    excerpt: 'Recognized for outstanding safety record, operational excellence, and contribution to Ghana\'s mining industry.',
    content: `
      <p>Yellow Power International has been honored with the prestigious "Mining Support Services Excellence Award 2024" at the Ghana Mining Industry Awards held in Accra. The award recognizes YPI's exceptional safety record, operational excellence, and significant contribution to the growth of Ghana's mining sector.</p>
      
      <p>The Ghana Chamber of Mines, which organized the awards ceremony, highlighted YPI's achievement of over 1,000 consecutive days without a lost-time incident across all operations. This safety milestone represents approximately 2.5 million man-hours worked without a serious injury.</p>
      
      <h3>Award Recognition Criteria</h3>
      <ul>
        <li>Outstanding safety performance and HSE management</li>
        <li>Operational excellence and client satisfaction</li>
        <li>Investment in modern equipment and technology</li>
        <li>Contribution to local employment and skills development</li>
        <li>Corporate social responsibility initiatives</li>
      </ul>
      
      <p>"This award belongs to our entire team – from our drill operators in the field to our support staff in the offices," said Emmanuel Kweku Ganu while accepting the award. "Their dedication to safety, quality, and excellence has made Yellow Power International a trusted partner in Ghana's mining industry."</p>
      
      <p>The judges particularly commended YPI's investment in employee training and development, noting that the company has trained over 150 drill operators and heavy equipment operators since 2017. Many of these trained personnel have gone on to leadership positions within the company and the broader mining industry.</p>
      
      <p>YPI also received special recognition for its community engagement programs, including support for local schools, healthcare facilities, and infrastructure development in mining communities.</p>
    `,
    category: 'Awards',
    tags: ['Awards', 'Recognition', 'Safety', 'Excellence'],
    publishedAt: '2024-09-20',
    author: 'YPI Communications Team',
    heroImage: '/images/news/excellence-award.jpg',
    featured: true,
  },
  {
    slug: 'burkina-faso-operations-launch',
    title: 'YPI Launches Operations in Burkina Faso',
    excerpt: 'Expanding regional presence with new office and equipment deployment to support growing mining activities in West Africa.',
    content: `
      <p>Yellow Power International has officially launched operations in Burkina Faso, marking a significant milestone in the company's regional expansion strategy. The new office in Ouagadougou will serve as a hub for YPI's operations across Burkina Faso and will support the company's growing portfolio of projects in the country.</p>
      
      <p>The Burkina Faso office is YPI's third international location, complementing existing operations in Ghana and Côte d'Ivoire. The launch comes in response to increasing demand for professional drilling and mining support services from major mining companies operating in Burkina Faso's gold mining belt.</p>
      
      <p>"Burkina Faso represents an exciting growth opportunity for YPI," explained Mr. Ganu. "The country's mining sector is expanding rapidly, and we're well-positioned to provide the high-quality services that mining companies need to succeed."</p>
      
      <h3>Initial Operations</h3>
      <ul>
        <li>Office location: Ouagadougou, Burkina Faso</li>
        <li>Initial team: 25 personnel (local and expatriate)</li>
        <li>Equipment deployed: 2 drill rigs, 3 haul trucks, support vehicles</li>
        <li>Services offered: Production drilling, reverse circulation drilling, load & haul</li>
        <li>Active contracts: 2 major mining projects secured</li>
      </ul>
      
      <p>YPI has already secured two significant contracts with major mining companies in Burkina Faso, with drilling operations expected to commence in January 2025. The company plans to recruit and train local personnel, contributing to employment creation and skills development in the region.</p>
      
      <p>The Burkina Faso expansion is part of YPI's broader strategy to establish a strong presence across West Africa's major mining countries. The company is also evaluating opportunities in Mali and Senegal as part of its long-term growth plans.</p>
    `,
    category: 'Company News',
    tags: ['Expansion', 'Burkina Faso', 'International', 'Growth'],
    publishedAt: '2024-08-10',
    author: 'YPI Communications Team',
    heroImage: '/images/news/burkina-faso-launch.jpg',
  },
  {
    slug: 'rc-drilling-exploration-success',
    title: 'YPI Reverse Circulation Drilling Team Discovers High-Grade Mineralization',
    excerpt: 'Exploration drilling project in northern Ghana identifies promising gold mineralization zones for client.',
    content: `
      <p>Yellow Power International's Reverse Circulation (RC) drilling team has contributed to a significant exploration success in northern Ghana, where drilling operations identified multiple zones of high-grade gold mineralization. The discovery marks an important milestone for both YPI and the exploration company client.</p>
      
      <p>The RC drilling program, which spanned four months and included over 15,000 meters of drilling across 85 holes, was conducted using YPI's state-of-the-art Schramm T450XD RC drill rigs. The project showcased YPI's technical expertise in exploration drilling and sample collection.</p>
      
      <h3>Project Details</h3>
      <ul>
        <li>Location: Northern Ghana (Specific location confidential)</li>
        <li>Drilling method: Reverse Circulation (RC)</li>
        <li>Total meters drilled: 15,000+</li>
        <li>Number of holes: 85</li>
        <li>Duration: 4 months</li>
        <li>Discovery: Multiple high-grade gold mineralization zones</li>
      </ul>
      
      <p>"Exploration drilling requires precision, quality control, and meticulous attention to sampling procedures," explained YPI's Chief Geologist. "Our team's expertise and our investment in quality RC equipment enabled us to deliver reliable, high-quality samples that led to this discovery."</p>
      
      <p>RC drilling is a critical service in mineral exploration, providing rapid drilling speeds and continuous rock chip samples that geologists use to identify mineralization. YPI's RC drilling services include quality control measures such as duplicate sampling, field standards, and regular equipment calibration to ensure sample integrity.</p>
      
      <p>Following this exploration success, the client has already committed to a second phase of drilling, which will further delineate the mineralized zones and is expected to commence in Q1 2025. YPI will continue to provide RC drilling services for the expanded program.</p>
      
      <p>This project reinforces YPI's reputation as a leading exploration drilling contractor in West Africa and demonstrates the company's technical capabilities in supporting mineral discoveries.</p>
    `,
    category: 'Projects',
    tags: ['RC Drilling', 'Exploration', 'Success', 'Gold'],
    publishedAt: '2024-07-15',
    author: 'YPI Communications Team',
    heroImage: '/images/news/rc-drilling.jpg',
  },
  {
    slug: 'iso-certification-achievement',
    title: 'YPI Achieves ISO 45001 and ISO 14001 Certification',
    excerpt: 'International certification for occupational health & safety and environmental management systems.',
    content: `
      <p>Yellow Power International has successfully achieved ISO 45001:2018 (Occupational Health and Safety Management) and ISO 14001:2015 (Environmental Management Systems) certifications, reinforcing the company's commitment to world-class safety and environmental standards.</p>
      
      <p>The certifications, awarded by an internationally accredited certification body following rigorous audits, validate YPI's systematic approach to managing health, safety, and environmental risks across all operations.</p>
      
      <h3>Certification Scope</h3>
      <ul>
        <li><strong>ISO 45001:2018</strong> - Occupational Health and Safety Management Systems</li>
        <li><strong>ISO 14001:2015</strong> - Environmental Management Systems</li>
        <li><strong>Scope:</strong> Drilling services, load & haul operations, and construction services</li>
        <li><strong>Coverage:</strong> All YPI operations in Ghana, Côte d'Ivoire, and Burkina Faso</li>
      </ul>
      
      <p>"These certifications demonstrate to our clients and stakeholders that YPI operates to internationally recognized standards," said the YPI HSE Manager. "They provide independent verification of our safety and environmental management systems and our commitment to continuous improvement."</p>
      
      <p>The certification process involved comprehensive documentation of YPI's HSE policies, procedures, and practices, followed by detailed on-site audits at multiple locations. The auditors assessed everything from risk management processes to emergency response procedures, training programs, and incident investigation systems.</p>
      
      <p>To achieve and maintain these certifications, YPI underwent extensive preparation, including:</p>
      <ul>
        <li>Development and implementation of comprehensive management systems</li>
        <li>Training of all personnel on new procedures and requirements</li>
        <li>Internal audits to identify and address gaps</li>
        <li>Establishment of performance indicators and monitoring systems</li>
        <li>Integration of continuous improvement processes</li>
      </ul>
      
      <p>The certifications are valid for three years, with annual surveillance audits to ensure ongoing compliance. YPI has committed to maintaining and continuously improving its HSE management systems in line with these international standards.</p>
    `,
    category: 'Company News',
    tags: ['Certification', 'ISO', 'Safety', 'Environment'],
    publishedAt: '2024-06-05',
    author: 'YPI Communications Team',
    heroImage: '/images/news/iso-certification.jpg',
  },
];

// Sample press releases
export const PRESS_RELEASES: PressRelease[] = [
  {
    id: 'pr-001',
    title: 'Yellow Power International Announces Q4 2024 Financial Results',
    publishedAt: '2024-11-30',
    summary: 'YPI reports 35% revenue growth year-over-year, driven by increased project activity and fleet expansion.',
    pdfUrl: '/documents/press-releases/q4-2024-results.pdf',
  },
  {
    id: 'pr-002',
    title: 'YPI Partners with Leading Equipment Manufacturer for West Africa Distribution',
    publishedAt: '2024-10-15',
    summary: 'Strategic partnership to provide sales, service, and parts support for drilling equipment across West Africa.',
    pdfUrl: '/documents/press-releases/equipment-partnership.pdf',
  },
  {
    id: 'pr-003',
    title: 'Yellow Power International Launches Graduate Training Program',
    publishedAt: '2024-09-01',
    summary: 'New program aims to train 50 mining engineering graduates annually in drilling and mining operations.',
    pdfUrl: '/documents/press-releases/graduate-program-launch.pdf',
  },
  {
    id: 'pr-004',
    title: 'YPI Commits to Net-Zero Carbon Emissions by 2035',
    publishedAt: '2024-07-20',
    summary: 'Comprehensive sustainability strategy includes transition to electric equipment and renewable energy.',
    pdfUrl: '/documents/press-releases/net-zero-commitment.pdf',
  },
  {
    id: 'pr-005',
    title: 'Yellow Power International Opens New Regional Office in Côte d\'Ivoire',
    publishedAt: '2024-05-10',
    summary: 'Expansion into Ivorian mining sector with new office in Abidjan and equipment deployment.',
    pdfUrl: '/documents/press-releases/cote-divoire-office.pdf',
  },
];

// News categories for filtering
export const NEWS_CATEGORIES = [
  'All',
  'Projects',
  'Equipment',
  'Awards',
  'Company News',
] as const;

// Helper functions
export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.slug === slug);
}

export function getFeaturedNews(): NewsArticle[] {
  return NEWS_ARTICLES.filter((article) => article.featured);
}

export function getNewsByCategory(category: string): NewsArticle[] {
  if (category === 'All') return NEWS_ARTICLES;
  return NEWS_ARTICLES.filter((article) => article.category === category);
}

export function getRelatedNews(currentSlug: string, limit: number = 3): NewsArticle[] {
  const currentArticle = getNewsArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  return NEWS_ARTICLES
    .filter(
      (article) =>
        article.slug !== currentSlug && article.category === currentArticle.category
    )
    .slice(0, limit);
}

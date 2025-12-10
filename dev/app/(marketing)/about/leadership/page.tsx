import type { Metadata } from "next";
import { LeadershipCard } from "@/components/ui/LeadershipCard";

export const metadata: Metadata = {
  title: "Leadership Team | Yellow Power International",
  description: "Meet the executive leadership team driving Yellow Power International's success across Africa.",
};

const leaders = [
  {
    name: "Emmanuel Kweku Ganu",
    role: "Founder & Chief Executive Officer",
    bio: "Visionary leader with decades of mining industry experience. Founded YPI in 2017 with a mission to deliver world-class mining support services across Africa.",
    photo: "/images/leadership/emmanuel-kweku-ganu.jpg",
  },
  {
    name: "Yussif Osuman",
    role: "Chief Operating Officer (COO)",
    bio: "Yussif Osuman oversees day-to-day operations across all Yellow Power International sites, ensuring projects are delivered safely, efficiently, and to the highest technical standards. He focuses on operational excellence, resource optimization, and building high-performing field teams across West Africa.",
    photo: "/images/leadership/yussif-osuman.jpg",
  },
  {
    name: "Elvis Agobo",
    role: "Operations Manager",
    bio: "Elvis Agobo has accrued credible local and expatriate experience around Mining and related operations in West Africa and Africa at large.",
    photo: "/images/leadership/elvis-agobo.jpg",
  },
  {
    name: "Seth A Hackman",
    role: "Deputy Operations Manager",
    bio: "Supports operations leadership across all active sites, coordinating field teams and ensuring project delivery meets Yellow Power's safety and performance standards.",
    photo: "/images/leadership/seth-a-hackman.jpg",
  },
  {
    name: "Senyo Fleku",
    role: "Finance Manager",
    bio: "Senyo Fleku is a knowledgeable Finance Manager with over 10 years proven history of working in the banking sector and mining industry. Skilled in Negotiation, Business Planning, Financial Risk, and Risk Management.",
    photo: "/images/leadership/senyo-fleku.jpg",
  },
  {
    name: "Henry Odonkor",
    role: "Human Resource Manager",
    bio: "Mr. Odonkor has got extensive training and working experience in the Mining Industry and Public Relations. Holder of Master in Corporate Communications and Human Resources Management.",
    photo: "/images/leadership/henry-odonkor.jpg",
  },
  {
    name: "Solomon Kuupole",
    role: "Commercial Manager",
    bio: "Solomon Kuupole is an experienced Commercial Manager with a demonstrated history of working in the mining & metals industry. Skilled in SAP Warehouse Management, Warehouse Operations, Marketing, Team Leadership, and SAP Products. Strong operations professional graduated from University of Ghana.",
    photo: "/images/leadership/solomon-kuupole.jpg",
  },
  {
    name: "Michael Oduro-Debrah",
    role: "Systems Admin. Manager",
    bio: "An experienced Computer scientist, an expert in infrastructure, security planning and daily operations management. He is accustomed to driving efficiency and effectiveness by developing, delivering and supporting strategic plans and guiding navigation of modern technology, optimizing security standards, improving planning processes and managing systems implementation.",
    photo: "/images/leadership/michael-oduro-debrah.jpg",
  },
];

export default function LeadershipPage() {
  return (
    <main>
      {/* Hero */}
      <section className="text-white py-20" style={{ backgroundColor: '#003087' }}>
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Leadership Team
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Meet the executives driving excellence and innovation across our operations
          </p>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leaders.map((leader) => (
              <LeadershipCard
                key={leader.name}
                name={leader.name}
                role={leader.role}
                bio={leader.bio}
                photo={leader.photo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals to join our growing organization
          </p>
          <a
            href="/careers"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-600 text-navy font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </main>
  );
}

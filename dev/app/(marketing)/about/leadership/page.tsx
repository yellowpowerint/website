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
  },
  {
    name: "Kwame Mensah",
    role: "Chief Operations Officer",
    bio: "20+ years of operational excellence in mining services. Oversees all drilling and hauling operations across our three African locations.",
  },
  {
    name: "Abena Osei",
    role: "Chief Financial Officer",
    bio: "Strategic financial leadership with expertise in scaling operations. Drives financial planning and sustainable growth initiatives.",
  },
  {
    name: "Kofi Asante",
    role: "VP of Safety & Compliance",
    bio: "Industry-recognized safety expert. Maintains our zero-accident goal and ensures compliance with international safety standards.",
  },
  {
    name: "Ama Boateng",
    role: "VP of Human Resources",
    bio: "Champions talent development and employee growth. Leads recruitment, training, and retention strategies for our 201-500 member team.",
  },
  {
    name: "Yaw Addo",
    role: "VP of Equipment & Technology",
    bio: "Technology innovator bringing modern solutions to mining operations. Manages our fleet and implements cutting-edge drilling systems.",
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

import type { Metadata } from "next";
import { AwardCard } from "@/components/ui/AwardCard";
import { Award, Shield, Star, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Awards & Recognition | Yellow Power International",
  description: "Discover the industry awards and certifications that recognize our commitment to excellence in mining services.",
};

const awards = [
  {
    title: "Safety Excellence Award",
    organization: "African Mining Safety Council",
    year: 2024,
    description: "Recognized for maintaining an outstanding safety record and implementing innovative safety protocols across all operations.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Best Mining Support Services Provider",
    organization: "West African Mining Awards",
    year: 2023,
    description: "Honored for delivering exceptional drilling and support services to mining operations across the region.",
    icon: <Trophy className="h-6 w-6" />,
  },
  {
    title: "Environmental Responsibility Award",
    organization: "Ghana Environmental Protection Agency",
    year: 2023,
    description: "Commended for sustainable practices and minimal environmental impact in mining operations.",
    icon: <Star className="h-6 w-6" />,
  },
  {
    title: "Excellence in Equipment Management",
    organization: "African Equipment Excellence Forum",
    year: 2022,
    description: "Recognized for maintaining world-class equipment standards and implementing cutting-edge maintenance protocols.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Employer of Choice",
    organization: "Ghana HR Excellence Awards",
    year: 2022,
    description: "Honored for outstanding employee development programs and workplace culture.",
    icon: <Star className="h-6 w-6" />,
  },
  {
    title: "Quality Service Certification",
    organization: "International Mining Standards Board",
    year: 2021,
    description: "Certified for meeting and exceeding international quality standards in mining support services.",
    icon: <Award className="h-6 w-6" />,
  },
];

const certifications = [
  "ISO 9001:2015 Quality Management",
  "ISO 14001:2015 Environmental Management",
  "ISO 45001:2018 Occupational Health & Safety",
  "Mining Industry Safety Certification (MISC)",
  "Equipment Operator Certification Standards",
];

export default function AwardsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="text-white py-20" style={{ backgroundColor: '#003087' }}>
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Awards & Recognition
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Industry honors that reflect our commitment to excellence, safety, and innovation
          </p>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">
              Industry Awards
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recognition from leading industry organizations for our outstanding performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {awards.map((award) => (
              <AwardCard
                key={award.title}
                title={award.title}
                organization={award.organization}
                year={award.year}
                description={award.description}
                icon={award.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">
              Certifications & Standards
            </h2>
            <p className="text-gray-600">
              Maintaining the highest international standards in all our operations
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-gold flex-shrink-0" />
                  <span className="text-navy font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-16 bg-navy text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Our Commitment to Excellence
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            These awards and certifications reflect our unwavering dedication to safety, quality, 
            and innovation. We continuously strive to exceed industry standards and deliver 
            exceptional value to our clients while maintaining the highest ethical standards.
          </p>
        </div>
      </section>
    </main>
  );
}

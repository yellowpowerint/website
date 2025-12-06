import { Shield, Award, Users, Heart } from "lucide-react";

const reasons = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Safety Excellence",
    description: "Industry-leading safety record with comprehensive training programs and strict adherence to international safety standards."
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Quality Certifications",
    description: "Certified to meet global quality standards, ensuring consistent delivery of premium services across all our operations."
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Experienced Team",
    description: "201-500 skilled professionals with decades of combined experience in African mining operations."
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Community Commitment",
    description: "Dedicated CSR programs supporting local communities through education, healthcare, and sustainable development initiatives."
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Why Choose Yellow Power International
          </h2>
          <p className="text-lg text-gray-600">
            Setting the standard for excellence in mining support services across Africa
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 text-gold mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";

const featuredRoles = [
  "Drilling Operators",
  "Equipment Maintenance Technicians",
  "Safety Officers"
];

export function CareersCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-8 md:p-12 lg:p-16">
            {/* Content */}
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/20 text-gold mb-6">
                <Briefcase className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Growing Team
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Be part of a dynamic team shaping the future of mining support services in Africa. 
                We offer competitive compensation, comprehensive training, and excellent career growth opportunities.
              </p>

              <div className="mb-8">
                <p className="text-sm font-semibold text-gold mb-3">Featured Positions:</p>
                <div className="flex flex-wrap gap-2">
                  {featuredRoles.map((role, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy font-semibold" asChild>
                <Link href="/careers">
                  View Open Positions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2">201-500</div>
                <div className="text-sm text-gray-300">Team Members</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2">3</div>
                <div className="text-sm text-gray-300">Countries</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2">8+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2">100%</div>
                <div className="text-sm text-gray-300">Safety Focused</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

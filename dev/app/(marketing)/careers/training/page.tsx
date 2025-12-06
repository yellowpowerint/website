import type { Metadata} from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CareerPath } from "@/components/sections/CareerPath";
import { DRILLING_CAREER_PATH } from "@/lib/constants/careers";
import { GraduationCap, Award, TrendingUp, Users, BookOpen, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Training & Development | Yellow Power Careers",
  description: "Comprehensive training programs, certifications, and career development opportunities at Yellow Power International. Invest in your future with structured learning paths.",
};

export default function TrainingPage() {
  const programs = [
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Technical Skills Training",
      description: "Hands-on training in equipment operation, maintenance, and safety procedures",
      features: ["Equipment operation certification", "Maintenance procedures", "Troubleshooting skills", "Safety protocols"],
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Professional Certifications",
      description: "Support for industry-recognized certifications and licenses",
      features: ["Mining equipment operator licenses", "Safety certifications", "Technical certifications", "Leadership qualifications"],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Leadership Development",
      description: "Programs for aspiring supervisors and managers",
      features: ["Supervisory skills", "Team management", "Performance management", "Strategic planning"],
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Continuous Learning",
      description: "Ongoing education and skill enhancement opportunities",
      features: ["Online courses", "Workshops and seminars", "Cross-functional training", "Mentorship programs"],
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-purple-600 to-purple-700 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <GraduationCap className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Training & Development</h1>
            <p className="text-xl text-purple-100">
              Invest in your future with comprehensive training programs and clear career progression paths
            </p>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Training Programs</h2>
            <p className="text-gray-600">
              Structured learning opportunities at every stage of your career
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, i) => (
              <Card key={i} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center text-purple-700 mb-4">
                    {program.icon}
                  </div>
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <p className="text-gray-600">{program.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {program.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="text-purple-600 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Path Example */}
      <CareerPath steps={DRILLING_CAREER_PATH} title="Career Progression Example: Drilling Operations" />

      {/* Training Approach */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Training Approach</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">Structured Progression</h3>
                <p className="text-sm text-gray-600">
                  Clear pathways from entry-level to leadership positions with defined milestones
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">Mentorship</h3>
                <p className="text-sm text-gray-600">
                  Learn from experienced professionals who guide your development
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">Recognized Credentials</h3>
                <p className="text-sm text-gray-600">
                  Industry-recognized certifications that enhance your professional value
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Learning Journey</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join Yellow Power and access comprehensive training from day one
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/careers/jobs">Browse Open Positions</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/careers">Back to Careers</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

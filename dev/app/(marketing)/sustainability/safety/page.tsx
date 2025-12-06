import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, GraduationCap, Wrench, AlertTriangle, FileCheck, HeartPulse } from "lucide-react";

// Dynamic import for SafetyDashboard (contains Recharts components)
const SafetyDashboard = dynamic(
  () => import("@/components/sections/SafetyDashboard").then((mod) => mod.SafetyDashboard),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <p className="text-gray-500">Loading safety metrics...</p>
      </div>
    ),
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Safety Excellence | Yellow Power International",
  description: "Our zero harm philosophy, comprehensive safety training, and industry-leading safety standards. View our safety dashboard and performance metrics.",
};

export default function SafetyPage() {
  const programs = [
    {
      title: "Comprehensive Training Programs",
      icon: <GraduationCap className="h-8 w-8" />,
      description: "All employees receive extensive safety training before beginning work",
      points: [
        "Pre-employment safety orientation",
        "Equipment-specific operation training",
        "Monthly safety refresher courses",
        "Emergency response training",
        "Leadership safety training for supervisors",
      ],
    },
    {
      title: "Equipment Maintenance Excellence",
      icon: <Wrench className="h-8 w-8" />,
      description: "Rigorous maintenance protocols ensure equipment operates safely",
      points: [
        "Daily pre-operational inspections",
        "Scheduled preventive maintenance",
        "98.5% maintenance completion rate",
        "Modern diagnostic tools and systems",
        "Equipment replacement program",
      ],
    },
    {
      title: "Emergency Response Protocols",
      icon: <AlertTriangle className="h-8 w-8" />,
      description: "Prepared for any situation with comprehensive emergency plans",
      points: [
        "Site-specific emergency response plans",
        "24/7 emergency response teams",
        "Regular emergency drills and simulations",
        "First aid and medical response capabilities",
        "Evacuation procedures and assembly points",
      ],
    },
    {
      title: "Safety Audits & Inspections",
      icon: <FileCheck className="h-8 w-8" />,
      description: "Continuous monitoring and improvement of safety standards",
      points: [
        "Daily workplace inspections",
        "Monthly comprehensive safety audits",
        "Third-party safety assessments",
        "Near-miss investigation and reporting",
        "Corrective action tracking",
      ],
    },
    {
      title: "Health & Wellness",
      icon: <HeartPulse className="h-8 w-8" />,
      description: "Supporting overall employee health and well-being",
      points: [
        "Regular health screenings",
        "Occupational health monitoring",
        "Mental health support programs",
        "Fitness and wellness initiatives",
        "Substance abuse prevention",
      ],
    },
    {
      title: "Safety Certifications",
      icon: <Shield className="h-8 w-8" />,
      description: "Industry-recognized certifications and standards",
      points: [
        "ISO 45001 Occupational Health & Safety",
        "Mining industry safety certifications",
        "Regular compliance audits",
        "International safety standards",
        "Continuous improvement systems",
      ],
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-800 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Safety Excellence</h1>
            <p className="text-xl text-blue-100">
              Zero harm is not just a goal – it&apos;s our fundamental commitment to every employee, contractor, and community member
            </p>
          </div>
        </div>
      </section>

      {/* Safety Dashboard */}
      <SafetyDashboard />

      {/* Safety Programs */}
      <section className="py-16">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Safety Programs</h2>
            <p className="text-gray-600">
              Multi-layered approach to workplace safety and employee well-being
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program.title} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-4">
                    {program.icon}
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <p className="text-sm text-gray-600">{program.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {program.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Culture */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Building a Strong Safety Culture</h2>
            <p className="text-gray-600">
              Safety is everyone&apos;s responsibility, from leadership to frontline workers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Safety Principles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-navy mb-2">1. Leadership Commitment</h4>
                    <p className="text-sm text-gray-700">Safety starts at the top. Our leadership demonstrates visible commitment to safety through actions and decisions.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">2. Employee Engagement</h4>
                    <p className="text-sm text-gray-700">Workers are involved in safety planning, risk assessment, and continuous improvement initiatives.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">3. Hazard Identification</h4>
                    <p className="text-sm text-gray-700">Proactive identification and mitigation of risks before incidents occur.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">4. Continuous Improvement</h4>
                    <p className="text-sm text-gray-700">Learning from incidents and near-misses to prevent future occurrences.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Stop Work Authority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-4">
                  <p className="font-bold text-red-900 mb-2">Every employee has the right and responsibility to stop work if they identify an unsafe condition.</p>
                  <p className="text-sm text-red-800">No production target is worth compromising safety. We empower all workers to halt operations when hazards are present, without fear of repercussion.</p>
                </div>
                
                <div className="space-y-3 mt-6">
                  <h4 className="font-semibold text-navy">When to Stop Work:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Immediate danger to self or others</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Equipment malfunction or unsafe condition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Unclear or inadequate safety procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Environmental or community risk</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Join a Company That Prioritizes Your Safety
          </h2>
          <p className="text-gray-600 mb-8">
            Looking for a career in mining with a company that truly cares about employee well-being?
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/careers">Explore Career Opportunities</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sustainability">View All Sustainability Initiatives</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Shield, Heart, Scale } from "lucide-react";

// Dynamic import for ImpactMetrics (contains Recharts components)
const ImpactMetrics = dynamic(
  () => import("@/components/sections/ImpactMetrics").then((mod) => mod.ImpactMetrics),
  {
    loading: () => (
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <p className="text-gray-500">Loading impact metrics...</p>
      </div>
    ),
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Sustainability & CSR | Yellow Power International",
  description: "Our commitment to environmental responsibility, safety excellence, and community development across West Africa. Discover our sustainability initiatives and CSR programs.",
};

export default function SustainabilityPage() {
  const pillars = [
    {
      title: "Environmental Responsibility",
      description: "Eco-friendly practices, emissions reduction, and resource conservation",
      icon: <Leaf className="h-8 w-8" />,
      href: "/sustainability/environment",
      color: "from-green-500 to-teal-600",
      stats: "18% CO2 reduction in 2024",
    },
    {
      title: "Safety Excellence",
      description: "Zero harm philosophy, continuous training, and industry-leading safety standards",
      icon: <Shield className="h-8 w-8" />,
      href: "/sustainability/safety",
      color: "from-blue-500 to-indigo-600",
      stats: "487 accident-free days",
    },
    {
      title: "CSR & Community Impact",
      description: "Education, healthcare, infrastructure, and community development programs",
      icon: <Heart className="h-8 w-8" />,
      href: "/sustainability/csr",
      color: "from-red-500 to-pink-600",
      stats: "22,000+ beneficiaries",
    },
    {
      title: "Ethical Business Practices",
      description: "Transparency, compliance, and responsible corporate governance",
      icon: <Scale className="h-8 w-8" />,
      href: "/sustainability/ethics",
      color: "from-purple-500 to-violet-600",
      stats: "100% compliance record",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-green-600 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sustainability & Corporate Social Responsibility
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Building a sustainable future through responsible operations, safety excellence, and meaningful community impact
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100" asChild>
                <Link href="/sustainability/csr">View Our CSR Programs</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/sustainability/safety">Safety Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Sustainability Commitment</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Yellow Power International, sustainability is not an afterthought – it&apos;s woven into the fabric of our operations. We believe that business success and social responsibility go hand in hand.
            </p>
          </div>

          <div className="bg-navy text-white p-8 rounded-2xl mb-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gold mb-2">Zero Harm</div>
                <p className="text-gray-300">Our unwavering commitment to safety</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold mb-2">Net Positive</div>
                <p className="text-gray-300">Creating more value than we consume</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold mb-2">Long-term Impact</div>
                <p className="text-gray-300">Sustainable community development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Four Pillars of Sustainability</h2>
            <p className="text-gray-600">Comprehensive approach to responsible business</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="hover:shadow-2xl transition-all group overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${pillar.color}`} />
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${pillar.color} text-white p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                      {pillar.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{pillar.title}</CardTitle>
                      <CardDescription className="text-base">{pillar.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gold">{pillar.stats}</div>
                    <Button variant="outline" asChild>
                      <Link href={pillar.href}>Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <ImpactMetrics focus="all" showCharts={false} />

      {/* UN SDGs Alignment */}
      <section className="py-16 bg-navy text-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Aligned with UN Sustainable Development Goals</h2>
            <p className="text-gray-300">
              Our sustainability initiatives contribute to multiple UN SDGs
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: 3, title: "Good Health and Well-being" },
              { number: 4, title: "Quality Education" },
              { number: 8, title: "Decent Work and Economic Growth" },
              { number: 13, title: "Climate Action" },
            ].map((sdg) => (
              <div key={sdg.number} className="bg-white/10 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-gold mb-2">SDG {sdg.number}</div>
                <p className="text-sm">{sdg.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Get Involved in Our Sustainability Journey
          </h2>
          <p className="text-gray-600 mb-8">
            Whether you&apos;re a partner, client, or community member, there are many ways to engage with our sustainability initiatives.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/sustainability/csr/projects">View CSR Projects</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/partnerships">Partnership Opportunities</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

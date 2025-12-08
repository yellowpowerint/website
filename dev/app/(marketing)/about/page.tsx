import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, Eye, Users, Award, History, Globe } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants/company";

export const metadata: Metadata = {
  title: "About Us | Yellow Power International",
  description: "Learn about Yellow Power International's mission, vision, and commitment to excellence in mining support services across Africa since 2017.",
};

const aboutLinks = [
  {
    title: "Mission & Vision",
    description: "Our purpose, values, and commitment to excellence",
    href: "/about/mission-vision",
    icon: <Target className="h-6 w-6" />,
  },
  {
    title: "Founder's Story",
    description: "The journey of Mr. Emmanuel Kweku Ganu",
    href: "/about/founder",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Leadership Team",
    description: "Meet the executives leading our organization",
    href: "/about/leadership",
    icon: <Eye className="h-6 w-6" />,
  },
  {
    title: "Company History",
    description: "Our growth and milestones since 2017",
    href: "/about/history",
    icon: <History className="h-6 w-6" />,
  },
  {
    title: "Global Presence",
    description: "Our operations across 3 African countries",
    href: "/about/global-presence",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: "Awards & Recognition",
    description: "Industry honors and certifications",
    href: "/about/awards",
    icon: <Award className="h-6 w-6" />,
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="text-white py-20" style={{ backgroundColor: '#FDB714' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About {COMPANY_INFO.name}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Since {COMPANY_INFO.founded}, we have been committed to delivering exceptional 
              mining support services across Africa, powered by our skilled team of {COMPANY_INFO.employees} professionals 
              operating in {COMPANY_INFO.offices} countries.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Overview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl">
              <Target className="h-12 w-12 text-gold mb-4" />
              <h2 className="text-2xl font-bold text-navy mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To enrich the lives and fortunes of our employees through skill development, 
                working collaboratively with clients to meet their expectations and delivering 
                quality without compromise.
              </p>
            </div>
            <div className="p-8 bg-gradient-to-br from-navy/10 to-navy/5 rounded-2xl">
              <Eye className="h-12 w-12 text-navy mb-4" />
              <h2 className="text-2xl font-bold text-navy mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become an industry and market leader in providing mining, drilling, and 
                construction services, being the employer and customer&apos;s choice through 
                transparency and state-of-the-art technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Learn More About Us
            </h2>
            <p className="text-lg text-gray-600">
              Discover our story, leadership, and commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {aboutLinks.map((link) => (
              <Card key={link.href} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-navy transition-colors">
                    {link.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-navy group-hover:text-gold transition-colors">
                    {link.title}
                  </CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto font-medium text-navy hover:text-gold" asChild>
                    <Link href={link.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

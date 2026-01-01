import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCard } from "@/components/sections/JobCard";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { EmployeeTestimonial } from "@/components/ui/EmployeeTestimonial";
import { BENEFITS, EMPLOYEE_TESTIMONIALS, JOB_CATEGORIES } from "@/lib/constants/careers";
import { Users, TrendingUp, Award, Heart, ArrowRight, Briefcase } from "lucide-react";
import { getJobs } from "@/lib/api/erp-careers";

export const metadata: Metadata = {
  title: "Careers at Yellow Power International | Join Our Team",
  description: "Explore career opportunities at Yellow Power International. Competitive benefits, training programs, and clear career paths in the mining services industry across West Africa.",
};

export default async function CareersPage() {
  const allJobs = await getJobs();
  const recentJobs = allJobs.slice(0, 3);

  const evpPillars = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Career Growth",
      description: "Clear progression paths with structured development programs and internal promotion opportunities",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Continuous Learning",
      description: "Comprehensive training, certifications, and skill development programs throughout your career",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Safety First",
      description: "Industry-leading safety standards and a genuine commitment to zero harm for all employees",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Inclusive Culture",
      description: "Diverse and supportive workplace where everyone's contributions are valued and recognized",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="text-white py-20" style={{ backgroundColor: '#003087' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6 text-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Build Your Career With Us</h1>
            <p className="text-xl text-gray-300 mb-8">
              Join Yellow Power International and be part of a team that&apos;s powering Africa&apos;s mining future through excellence, innovation, and people development
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
                <Link href="/careers/jobs">
                  Browse Open Positions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-navy border-white hover:bg-white hover:text-navy"
                asChild
              >
                <Link href="/careers/life-at-ypi">Life at YPI</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us - EVP */}
      <section className="py-16">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Why Choose Yellow Power?</h2>
            <p className="text-gray-600">Our Employee Value Proposition</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {evpPillars.map((pillar, i) => (
              <Card key={i} className="text-center hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center text-gold mx-auto mb-4">
                    {pillar.icon}
                  </div>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Explore Career Areas</h2>
            <p className="text-gray-600">Opportunities across diverse functions and disciplines</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {JOB_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/careers/jobs?category=${category.id}`}
                className="block p-6 bg-white rounded-lg border-2 border-transparent hover:border-gold hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-navy text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Openings */}
      <section className="py-16">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Latest Job Openings</h2>
            <p className="text-gray-600">Discover your next opportunity</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/careers/jobs">
                View All {allJobs.length} Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsGrid benefits={BENEFITS.slice(0, 6)} title="What We Offer" columns={3} />

      {/* Employee Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Hear From Our Team</h2>
            <p className="text-gray-600">Real stories from Yellow Power employees</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMPLOYEE_TESTIMONIALS.slice(0, 3).map((testimonial) => (
              <EmployeeTestimonial key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore our training programs, learn about life at YPI, and understand our application process
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/careers/training">Training & Development</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-navy border-white hover:bg-white hover:text-navy"
              asChild
            >
              <Link href="/careers/application-process">Application Process</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-navy border-white hover:bg-white hover:text-navy"
              asChild
            >
              <Link href="/careers/life-at-ypi">Life at YPI</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

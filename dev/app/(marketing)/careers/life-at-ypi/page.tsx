import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { EmployeeTestimonial } from "@/components/ui/EmployeeTestimonial";
import { BENEFITS, EMPLOYEE_TESTIMONIALS } from "@/lib/constants/careers";
import { Heart, Users, Sparkles, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Life at Yellow Power International | Company Culture & Benefits",
  description: "Discover what it's like to work at Yellow Power International. Learn about our culture, benefits, work environment, and employee experiences.",
};

export default function LifeAtYPIPage() {
  const cultureValues = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "People First",
      description: "We prioritize the wellbeing, safety, and development of every team member",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We set high standards and support each other in achieving them",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Teamwork",
      description: "Success comes from collaboration and mutual respect",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Innovation",
      description: "We encourage new ideas and continuous improvement",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-pink-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Life at Yellow Power</h1>
            <p className="text-xl text-pink-100">
              More than just a workplace – join a team that values safety, growth, and community
            </p>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-16">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Culture & Values</h2>
            <p className="text-gray-600">
              The principles that guide how we work and treat each other
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((value, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-navy text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Stories From Our Team</h2>
            <p className="text-gray-600">
              Hear directly from employees about their experiences at Yellow Power
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMPLOYEE_TESTIMONIALS.map((testimonial) => (
              <EmployeeTestimonial
                key={testimonial.id}
                testimonial={testimonial}
                variant="detailed"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsGrid benefits={BENEFITS} title="Comprehensive Benefits Package" columns={4} />

      {/* Work Environment */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">What to Expect</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-navy mb-4">Diverse & Inclusive</h3>
              <p className="text-gray-700 mb-4">
                We celebrate diversity and create an environment where everyone feels valued and included. Our team represents different backgrounds, experiences, and perspectives.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Equal opportunity employer</li>
                <li>• Women in mining initiatives</li>
                <li>• Multicultural workforce</li>
                <li>• Inclusive decision-making</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-navy mb-4">Work-Life Balance</h3>
              <p className="text-gray-700 mb-4">
                We understand the importance of balance and offer flexible arrangements, generous leave, and support for personal wellbeing.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Rotating shift schedules</li>
                <li>• Generous annual leave</li>
                <li>• Family-friendly policies</li>
                <li>• Mental health support</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-navy mb-4">Community Involvement</h3>
              <p className="text-gray-700 mb-4">
                We&apos;re proud of our CSR initiatives and encourage employees to participate in community development programs and volunteer activities.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Employee volunteer programs</li>
                <li>• Community development projects</li>
                <li>• Educational partnerships</li>
                <li>• Local hiring preference</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-navy mb-4">Recognition & Rewards</h3>
              <p className="text-gray-700 mb-4">
                Outstanding performance and contributions are recognized through various programs, bonuses, and advancement opportunities.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Performance bonuses</li>
                <li>• Employee of the month</li>
                <li>• Long service awards</li>
                <li>• Safety excellence recognition</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">Join Our Team</h2>
          <p className="text-gray-600 mb-8">
            Ready to become part of the Yellow Power family? Explore open positions and start your application today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/careers/jobs">View Open Positions</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/careers/training">Training & Development</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

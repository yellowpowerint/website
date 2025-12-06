import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Search, UserCheck, Calendar, CheckCircle2, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Process & FAQ | Yellow Power Careers",
  description: "Learn about our hiring process, what to expect during interviews, and get answers to frequently asked questions about careers at Yellow Power International.",
};

export default function ApplicationProcessPage() {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Step 1: Find Your Role",
      description: "Browse our job listings and identify positions that match your skills and career goals",
      tips: ["Review job requirements carefully", "Consider multiple roles if qualified", "Note the application deadline"],
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Step 2: Submit Application",
      description: "Complete the online application form with your details, CV, and cover letter",
      tips: ["Tailor your CV to the role", "Write a compelling cover letter", "Double-check all information"],
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Step 3: Initial Screening",
      description: "Our HR team reviews applications and shortlists candidates (typically 3-5 days)",
      tips: ["Check your email regularly", "Respond promptly to any requests", "Be prepared for a phone screening"],
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Step 4: Interview Process",
      description: "Participate in interviews with HR and technical managers (may include multiple rounds)",
      tips: ["Research the company", "Prepare examples of your work", "Ask thoughtful questions"],
    },
    {
      icon: <CheckCircle2 className="h-8 w-8" />,
      title: "Step 5: Offer & Onboarding",
      description: "Receive job offer, complete pre-employment checks, and begin orientation",
      tips: ["Review offer carefully", "Complete required documents promptly", "Attend orientation fully prepared"],
    },
  ];

  const faqs = [
    {
      question: "How long does the hiring process take?",
      answer: "Typically 2-4 weeks from application to offer, depending on the position and number of candidates. We aim to keep you informed at every stage.",
    },
    {
      question: "What should I prepare for the interview?",
      answer: "Review the job description, research Yellow Power's services and values, prepare examples demonstrating your relevant experience, and have questions ready about the role and company.",
    },
    {
      question: "Do I need prior mining experience?",
      answer: "It depends on the role. Some positions (especially entry-level) offer full training, while senior roles typically require industry experience. Check the job requirements for specifics.",
    },
    {
      question: "Can I apply for multiple positions?",
      answer: "Yes, you can apply for multiple roles if you meet the requirements. However, we recommend focusing on positions that best match your skills and career goals.",
    },
    {
      question: "What happens if I'm not selected?",
      answer: "We keep applications on file for 6 months. If a suitable position opens up, we may contact you. You're also welcome to apply for other roles as they become available.",
    },
    {
      question: "Do you sponsor work permits for international candidates?",
      answer: "For key positions, we may consider sponsorship. This is determined on a case-by-case basis depending on the role and the candidate's qualifications.",
    },
    {
      question: "What are your working hours?",
      answer: "Most roles operate on rotating shift schedules (e.g., 12-hour shifts). Corporate roles typically follow standard business hours. Specific details are provided during the interview process.",
    },
    {
      question: "Do you hire fresh graduates?",
      answer: "Yes! We have entry-level programs and trainee positions for graduates in engineering, technical fields, and business administration. These roles include comprehensive training.",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 mx-auto mb-6 text-teal-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Application Process</h1>
            <p className="text-xl text-teal-100">
              Understand our hiring process and what to expect at each stage of your application
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Our Hiring Process</h2>
            <p className="text-gray-600">From application to offer – here&apos;s what to expect</p>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <Card key={i} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 flex-shrink-0">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="ml-20">
                    <h4 className="font-semibold text-navy mb-2 text-sm">Tips for Success:</h4>
                    <ul className="space-y-1">
                      {step.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-teal-600 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Typical Timeline</h2>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">Application Submission</span>
                  <span className="text-sm text-gray-600">Day 0</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">Initial Review & Screening</span>
                  <span className="text-sm text-gray-600">Days 1-5</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">Phone/Video Interview</span>
                  <span className="text-sm text-gray-600">Week 2</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">Technical/In-Person Interview</span>
                  <span className="text-sm text-gray-600">Week 3</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">Background Checks & References</span>
                  <span className="text-sm text-gray-600">Week 3-4</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-navy">Job Offer</span>
                  <span className="text-sm text-gray-600">Week 4+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 mx-auto text-navy mb-4" />
            <h2 className="text-3xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our HR team is here to help. Contact us for more information about careers at Yellow Power.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/careers/jobs">Browse Open Positions</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">Contact HR Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

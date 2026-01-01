import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";
import { getJobById as getJobByIdERP } from "@/lib/api/erp-careers";
import { getCategoryById } from "@/lib/constants/careers";
import { MapPin, Briefcase, TrendingUp, Calendar, CheckCircle2, DollarSign, ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo/config";
import { generateBreadcrumbSchema, COMMON_BREADCRUMBS } from "@/lib/structured-data/breadcrumbs";

interface JobPageProps {
  params: {
    jobId: string;
  };
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const job = await getJobByIdERP(params.jobId);

  if (!job) {
    return {
      title: "Job Not Found | Yellow Power International",
    };
  }

  return buildMetadata({
    title: `${job.title} - ${job.location}`,
    description: `Join Yellow Power International as ${job.title} in ${job.location}. ${job.description}`,
    path: `/careers/jobs/${params.jobId}`,
    type: "article",
  });
}

export default async function JobPage({ params }: JobPageProps) {
  const job = await getJobByIdERP(params.jobId);

  if (!job) {
    notFound();
  }

  const category = getCategoryById(job.department);

  // Parse requirements, responsibilities, qualifications, benefits from text
  const requirements = job.requirements ? job.requirements.split('\n').filter(Boolean) : [];
  const responsibilities = job.responsibilities ? job.responsibilities.split('\n').filter(Boolean) : [];
  const qualifications = job.qualifications ? job.qualifications.split('\n').filter(Boolean) : [];
  const benefits = job.benefits ? job.benefits.split('\n').filter(Boolean) : [];

  // Create JobPosting structured data
  const employmentTypeMap: Record<string, string> = {
    "FULL_TIME": "FULL_TIME",
    "PART_TIME": "PART_TIME",
    "CONTRACT": "CONTRACTOR",
  };

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.openDate,
    employmentType: employmentTypeMap[job.jobType] || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Yellow Power International",
      sameAs: "https://yellowpowerinternational.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "GH",
      },
    },
    ...((job.salaryMin || job.salaryMax) && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "GHS",
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salaryMin,
          maxValue: job.salaryMax,
          unitText: "MONTH",
        },
      },
    }),
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    ...COMMON_BREADCRUMBS.careers,
    { name: 'Jobs', path: '/careers/jobs' },
    { name: job.title, path: `/careers/jobs/${params.jobId}` },
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingSchema),
        }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
        suppressHydrationWarning
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-indigo-900 to-navy-700 text-white py-16">
        <div className="container max-w-6xl">
          <Link
            href="/careers/jobs"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Job Listings
          </Link>

          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="outline" className="border-gold text-gold">
              {category?.name || job.department}
            </Badge>
            <Badge variant="outline" className="border-white text-white">
              {job.jobType}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{job.title}</h1>

          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>{job.jobType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Posted {new Date(job.openDate).toLocaleDateString()}</span>
            </div>
          </div>

          {(job.salaryMin || job.salaryMax) && (
            <div className="mt-6 inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-gold" />
              <span className="font-semibold text-gold">
                {job.salaryMin && job.salaryMax ? `GHS ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}` : 'Competitive'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Job Details */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requirements & Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What We Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Job Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Category</div>
                    <div className="text-navy">{category?.name}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Location</div>
                    <div className="text-navy">{job.location}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Employment Type</div>
                    <div className="text-navy">{job.employmentType}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Experience Level</div>
                    <div className="text-navy">{job.experienceLevel}</div>
                  </div>
                  {job.salary && (
                    <>
                      <Separator />
                      <div>
                        <div className="text-sm font-semibold text-gray-600 mb-1">Compensation</div>
                        <div className="text-gold font-semibold">{job.salary}</div>
                      </div>
                    </>
                  )}
                  <Separator />
                  <Button className="w-full bg-gold hover:bg-gold-600 text-navy" asChild>
                    <a href="#apply">Apply Now</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Questions?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Have questions about this role or the application process?
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/careers/application-process">Application Process</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">Contact HR Team</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <JobApplicationForm jobTitle={job.title} jobId={job.jobId} />
        </div>
      </section>

      {/* Learn More */}
      <section className="py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Learn More About Working With Us
          </h2>
          <p className="text-gray-600 mb-8">
            Discover our training programs, company culture, and career development opportunities
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/careers/training">Training & Development</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/careers/life-at-ypi">Life at YPI</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/careers/jobs">View All Jobs</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

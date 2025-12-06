import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, CheckCircle2, Quote } from "lucide-react";
import { getProjectBySlug, PROJECTS } from "@/lib/constants/projects";
import { SERVICES } from "@/lib/constants/services";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Yellow Power International`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Badge className={project.status === "completed" ? "bg-green-500" : "bg-blue-500"}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {project.location}, {project.country}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-gray-300">{project.summary}</p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gold" />
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="font-medium">{project.startDate} {project.endDate && `- ${project.endDate}`}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Client</p>
                  <p className="font-semibold text-navy">{project.client}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Services Provided</p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((serviceId) => {
                      const service = SERVICES.find((s) => s.id === serviceId);
                      return service ? (
                        <Badge key={serviceId} variant="outline">{service.name}</Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-navy">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-xl text-center">
                    <div className="text-3xl mb-2">{metric.icon}</div>
                    <div className="text-2xl font-bold text-navy mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">Project Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.results.map((result, i) => (
              <div key={i} className="flex gap-3 bg-white p-6 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="bg-navy text-white p-12 rounded-2xl relative">
              <Quote className="h-16 w-16 text-gold/20 absolute top-6 left-6" />
              <blockquote className="text-xl italic mb-6 relative z-10">
                &quot;{project.testimonial.quote}&quot;
              </blockquote>
              <div className="relative z-10">
                <p className="font-semibold text-gold">{project.testimonial.author}</p>
                <p className="text-gray-300">{project.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">Start Your Project</h2>
          <p className="text-lg text-gray-600 mb-8">
            Ready to discuss your mining project requirements?
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gold hover:bg-gold-600 text-navy" asChild>
              <Link href="/services#quote-form">Request a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">View More Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

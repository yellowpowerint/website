import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/constants/projects";

export const metadata: Metadata = {
  title: "Case Studies | Yellow Power International",
  description: "Explore detailed case studies showcasing our successful mining projects and innovative solutions across West Africa.",
};

export default function CaseStudiesPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-gray-300">
              Deep dives into our most successful projects, showcasing innovative solutions and measurable results
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {CASE_STUDIES.map((study) => (
              <Card key={study.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-gold">{study.industry}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{study.service}</span>
                  </div>
                  <CardTitle className="text-2xl">{study.title}</CardTitle>
                  <CardDescription>{study.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Challenge</h4>
                    <p className="text-gray-600 text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Solution</h4>
                    <p className="text-gray-600 text-sm">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-3">Key Results</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {study.metrics.map((metric, i) => (
                        <div key={i} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-lg font-bold text-gold">{metric.value}</div>
                          <div className="text-xs text-gray-600">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/projects/${study.projectSlug}`}>
                        View Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {study.downloadUrl && (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={study.downloadUrl}>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Publications | Yellow Power International",
  description: "Access our technical papers, research reports, and industry publications on mining support services and sustainable practices.",
};

const publications = [
  {
    title: "Annual Sustainability Report 2024",
    description: "Comprehensive overview of our environmental, social, and governance initiatives and performance metrics for 2024.",
    category: "Sustainability",
    date: "December 2024",
    pages: 45,
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    title: "Best Practices in Pre-Split Drilling",
    description: "Technical guide covering advanced pre-split drilling methodologies and safety protocols in open-pit mining operations.",
    category: "Technical Paper",
    date: "September 2024",
    pages: 28,
    downloadUrl: "/downloads/pre-split-drilling-guide.pdf",
  },
  {
    title: "Mining Equipment Optimization Study",
    description: "Research paper on maximizing equipment efficiency and reducing operational costs in mining support services.",
    category: "Research",
    date: "July 2024",
    pages: 36,
    downloadUrl: "/downloads/equipment-optimization-study.pdf",
  },
  {
    title: "Safety Performance Report 2024",
    description: "Annual safety statistics, incident analysis, and continuous improvement initiatives across all our operations.",
    category: "Safety",
    date: "June 2024",
    pages: 22,
    downloadUrl: "/downloads/safety-report-2024.pdf",
  },
  {
    title: "Community Impact Assessment",
    description: "Evaluation of our corporate social responsibility programs and their impact on local communities in operational areas.",
    category: "CSR",
    date: "May 2024",
    pages: 31,
    downloadUrl: "/downloads/community-impact-2024.pdf",
  },
  {
    title: "Reverse Circulation Drilling: A Technical Overview",
    description: "Detailed technical documentation on RC drilling technology, applications, and advantages in mineral exploration.",
    category: "Technical Paper",
    date: "March 2024",
    pages: 19,
    downloadUrl: "/downloads/rc-drilling-overview.pdf",
  },
];

const categories = ["All", "Sustainability", "Technical Paper", "Research", "Safety", "CSR"];

export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy-900 to-navy-800 text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Publications & Resources
            </h1>
            <p className="text-xl text-gray-300">
              Access our latest technical papers, research reports, sustainability documentation, 
              and industry insights from Yellow Power International.
            </p>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category === "All" ? "bg-gold-500 hover:bg-gold-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Publications List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publications.map((publication, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-gold-100 rounded-lg">
                      <FileText className="h-6 w-6 text-gold-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {publication.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{publication.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {publication.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{publication.date}</span>
                    </div>
                    <span>{publication.pages} pages</span>
                  </div>
                  <Button 
                    className="w-full bg-gold-500 hover:bg-gold-600" 
                    asChild
                  >
                    <a href={publication.downloadUrl} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-6">
              Subscribe to receive notifications when we publish new reports, technical papers, 
              and industry insights.
            </p>
            <Button 
              size="lg" 
              className="bg-gold-500 hover:bg-gold-600"
              asChild
            >
              <a href="/contact?subject=Newsletter">Subscribe to Newsletter</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

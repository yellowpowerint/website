import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/lib/constants/services";
import { QuoteRequestForm } from "@/components/sections/QuoteRequestForm";
import { buildMetadata } from "@/lib/seo/config";
import { generateServiceSchemas } from "@/lib/structured-data/services";
import { generateBreadcrumbSchema, COMMON_BREADCRUMBS } from "@/lib/structured-data/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Services & Solutions - Drilling, Mining & Construction",
  description: "Comprehensive mining support services including production drilling, pre-split drilling, load & haul operations, and construction services across West Africa. Expert mining contractor with modern equipment fleet.",
  path: "/services",
});

export default function ServicesPage() {
  const serviceSchemas = generateServiceSchemas();
  const breadcrumbSchema = generateBreadcrumbSchema(COMMON_BREADCRUMBS.services);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchemas),
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
      <section className="text-white py-20" style={{ backgroundColor: '#FDB714' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Services & Solutions
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Comprehensive mining support services delivered with excellence, safety, and innovation. 
              From precision drilling to material handling and construction, we power your mining operations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Five specialized service offerings designed to meet the diverse needs of modern mining operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {SERVICES.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-navy transition-colors">
                    <div className="text-2xl">
                      {service.icon === "Drill" && "⚙️"}
                      {service.icon === "Construction" && "🏗️"}
                      {service.icon === "Search" && "🔍"}
                      {service.icon === "Truck" && "🚛"}
                      {service.icon === "Hammer" && "🔨"}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-navy group-hover:text-gold transition-colors">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {service.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <p className="text-sm font-semibold text-navy">Key Benefits:</p>
                    <ul className="space-y-2">
                      {service.keyBenefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="ghost" className="p-0 h-auto font-medium text-navy hover:text-gold" asChild>
                    <Link href={`/services/${service.slug}`}>
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

      {/* Service Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Service Capabilities Comparison
            </h2>
            <p className="text-lg text-gray-600">
              Understanding our service offerings at a glance
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Service</th>
                  <th className="px-6 py-4 text-left">Primary Application</th>
                  <th className="px-6 py-4 text-left">Equipment Fleet</th>
                  <th className="px-6 py-4 text-left">Capacity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-navy">Pre-Split Drilling</td>
                  <td className="px-6 py-4 text-gray-700">Wall stability & control</td>
                  <td className="px-6 py-4 text-gray-700">Atlas Copco ROC drills</td>
                  <td className="px-6 py-4 text-gray-700">300-500m/shift</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-navy">Production Drilling</td>
                  <td className="px-6 py-4 text-gray-700">Mass ore extraction</td>
                  <td className="px-6 py-4 text-gray-700">Sandvik rotary drills</td>
                  <td className="px-6 py-4 text-gray-700">1,000-2,000m/shift</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-navy">RC Drilling</td>
                  <td className="px-6 py-4 text-gray-700">Exploration & sampling</td>
                  <td className="px-6 py-4 text-gray-700">Schramm RC rigs</td>
                  <td className="px-6 py-4 text-gray-700">150-300m/day</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-navy">Load & Haul</td>
                  <td className="px-6 py-4 text-gray-700">Material transport</td>
                  <td className="px-6 py-4 text-gray-700">20+ trucks, 10+ loaders</td>
                  <td className="px-6 py-4 text-gray-700">40-100 tonne trucks</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-navy">Construction</td>
                  <td className="px-6 py-4 text-gray-700">Infrastructure build</td>
                  <td className="px-6 py-4 text-gray-700">15+ construction machines</td>
                  <td className="px-6 py-4 text-gray-700">50,000 m³/month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Supporting Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-3xl mb-3">🔧</div>
                <CardTitle>Equipment Fleet</CardTitle>
                <CardDescription>
                  Modern, well-maintained equipment fleet with comprehensive maintenance programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href="/services/equipment">
                    View Equipment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-3xl mb-3">💡</div>
                <CardTitle>Technology & Innovation</CardTitle>
                <CardDescription>
                  GPS-guided systems, real-time monitoring, and cutting-edge technology investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href="/services/technology">
                    Explore Technology
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section id="quote-form" className="py-20 bg-gray-50">
        <div className="container">
          <QuoteRequestForm />
        </div>
      </section>
    </main>
  );
}

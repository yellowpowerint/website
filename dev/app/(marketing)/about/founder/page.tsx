import type { Metadata} from "next";
import Image from "next/image";
import { Quote, Lightbulb, Target, TrendingUp } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants/company";

export const metadata: Metadata = {
  title: "Founder's Story | Yellow Power International",
  description: `Learn about ${COMPANY_INFO.founder}, the visionary founder behind Yellow Power International's success story.`,
};

export default function FounderPage() {
  return (
    <main>
      {/* Hero */}
      <section className="text-white py-20 pt-32" style={{ backgroundColor: '#FDB714' }}>
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Founder&apos;s Story
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            The Vision and Leadership of {COMPANY_INFO.founder}
          </p>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Founder Image */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
              <Image 
                src="/images/founder-ganu.jpg"
                alt="Mr. Emmanuel Kweku Ganu - Founder & CEO"
                fill
                className="object-cover"
                quality={100}
                priority
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-navy mb-4">
                {COMPANY_INFO.founder}
              </h2>
              <p className="text-gold font-semibold mb-6">
                Founder & Chief Executive Officer
              </p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  In {COMPANY_INFO.founded}, {COMPANY_INFO.founder} founded Yellow Power International 
                  with a clear vision: to build a world-class mining support services company that 
                  would set new standards for excellence in the African mining industry.
                </p>
                <p>
                  With decades of experience in the mining sector, Mr. Ganu recognized the need for 
                  a company that could deliver reliable, safe, and technologically advanced solutions 
                  to mining operations across the continent.
                </p>
                <p>
                  Under his leadership, Yellow Power International has grown from a startup to a 
                  leading mining support services provider with operations in {COMPANY_INFO.offices} African countries 
                  and a team of {COMPANY_INFO.employees} dedicated professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Leadership Philosophy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl">
              <Lightbulb className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2">Innovation</h3>
              <p className="text-gray-600">
                Embrace cutting-edge technology and modern practices to stay ahead
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl">
              <Target className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2">Excellence</h3>
              <p className="text-gray-600">
                Deliver quality without compromise in every project we undertake
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl">
              <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2">Growth</h3>
              <p className="text-gray-600">
                Invest in people, equipment, and capabilities for sustainable expansion
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-12 p-8 bg-navy text-white rounded-2xl relative">
            <Quote className="h-12 w-12 text-gold/20 absolute top-6 left-6" />
            <blockquote className="text-xl font-medium text-center relative z-10 max-w-3xl mx-auto">
              &quot;Our success is built on the dedication of our team, the trust of our clients, 
              and our unwavering commitment to safety and quality in everything we do.&quot;
            </blockquote>
            <p className="text-center mt-6 text-gold font-semibold">
              - {COMPANY_INFO.founder}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

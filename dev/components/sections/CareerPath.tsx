import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import type { CareerPathStep } from "@/lib/constants/careers";

interface CareerPathProps {
  steps: CareerPathStep[];
  title?: string;
}

export function CareerPath({ steps, title = "Career Progression Path" }: CareerPathProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">{title}</h2>
            <p className="text-gray-600">
              Clear progression opportunities with structured development at each stage
            </p>
          </div>
        )}

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold to-navy hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Level indicator */}
                <div className="absolute left-0 top-6 w-16 h-16 bg-gradient-to-br from-gold to-gold-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg hidden md:flex">
                  {step.level}
                </div>

                {/* Card */}
                <Card className="md:ml-24 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                        {step.duration && (
                          <Badge variant="outline" className="text-navy border-navy">
                            {step.duration}
                          </Badge>
                        )}
                      </div>
                      {/* Mobile level indicator */}
                      <div className="md:hidden w-12 h-12 bg-gradient-to-br from-gold to-gold-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {step.level}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{step.description}</p>

                    <div className="mt-4">
                      <h4 className="font-semibold text-navy mb-3 text-sm">Key Skills & Competencies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                          >
                            {index < steps.length - 1 ? (
                              <Circle className="h-3 w-3 text-gold fill-gold" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            )}
                            <span className="text-gray-700">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

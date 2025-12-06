import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Heart,
  GraduationCap,
  Calendar,
  Shield,
  Scale,
  TrendingUp,
  Bus,
  Home,
  Landmark,
  Award,
} from "lucide-react";
import type { Benefit } from "@/lib/constants/careers";

interface BenefitsGridProps {
  benefits: Benefit[];
  title?: string;
  columns?: 2 | 3 | 4;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DollarSign,
  Heart,
  GraduationCap,
  Calendar,
  Shield,
  Scale,
  TrendingUp,
  Bus,
  Home,
  Landmark,
  Award,
};

export function BenefitsGrid({ benefits, title, columns = 3 }: BenefitsGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <section className="py-16">
      <div className="container max-w-7xl">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">{title}</h2>
            <p className="text-gray-600">
              Comprehensive benefits package designed to support you and your family
            </p>
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-6`}>
          {benefits.map((benefit) => {
            const IconComponent = iconMap[benefit.iconKey] || Award;

            return (
              <Card key={benefit.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-3">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

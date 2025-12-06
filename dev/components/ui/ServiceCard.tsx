import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href: string;
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        {icon && (
          <div className="mb-4 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
            {icon}
          </div>
        )}
        <CardTitle className="text-xl font-semibold text-navy group-hover:text-gold transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base mb-4 line-clamp-3">
          {description}
        </CardDescription>
        <Button variant="ghost" className="group/btn p-0 h-auto font-medium text-navy hover:text-gold" asChild>
          <Link href={href}>
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

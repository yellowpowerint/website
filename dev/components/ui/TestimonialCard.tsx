import Image from "next/image";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export function TestimonialCard({ 
  name, 
  role, 
  company, 
  content,
  avatar 
}: TestimonialCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-gold/20 mb-4" />
        <p className="text-gray-700 mb-6 italic line-clamp-4">
          &quot;{content}&quot;
        </p>
        <div className="flex items-center gap-3">
          {avatar ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image 
                src={avatar} 
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy font-semibold">
              {name.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-semibold text-navy">{name}</div>
            <div className="text-sm text-gray-600">
              {role}, {company}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  category?: string;
  image?: string;
}

export function NewsCard({ 
  title, 
  excerpt, 
  date, 
  href, 
  category,
  image 
}: NewsCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
      {image && (
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {category && (
            <span className="absolute top-4 left-4 bg-gold text-navy px-3 py-1 text-xs font-semibold rounded-full z-10">
              {category}
            </span>
          )}
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</time>
        </div>
        <CardTitle className="text-xl font-semibold text-navy group-hover:text-gold transition-colors line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-600 line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="group/btn p-0 h-auto font-medium text-navy hover:text-gold" asChild>
          <Link href={href}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

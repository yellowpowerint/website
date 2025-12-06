import Link from "next/link";
import { NewsCard } from "@/components/ui/NewsCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    title: "Yellow Power International Expands Operations to New Region",
    excerpt: "We are proud to announce the expansion of our services into a new African market, bringing our expertise in mining support to more communities.",
    date: "2025-11-15",
    href: "/news/expansion-announcement",
    category: "Company News"
  },
  {
    title: "New Fleet of Advanced Drilling Equipment Deployed",
    excerpt: "Investment in state-of-the-art drilling technology enhances our capability to deliver superior results while maintaining our commitment to safety.",
    date: "2025-10-28",
    href: "/news/new-equipment",
    category: "Equipment"
  },
  {
    title: "YPI Receives Safety Excellence Award for 2025",
    excerpt: "Recognition for maintaining an outstanding safety record and implementing innovative safety protocols across all our mining operations.",
    date: "2025-10-10",
    href: "/news/safety-award",
    category: "Awards"
  }
];

export function NewsGrid() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Latest News & Updates
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed about our latest developments and achievements
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex" asChild>
            <Link href="/news">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {newsItems.map((item, index) => (
            <NewsCard
              key={index}
              title={item.title}
              excerpt={item.excerpt}
              date={item.date}
              href={item.href}
              category={item.category}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/news">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

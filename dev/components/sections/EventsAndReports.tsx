"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

interface Event {
  date: string;
  month: string;
  year: string;
  title: string;
}

interface Report {
  title: string;
  image: string;
  fileSize: string;
  downloadLink: string;
}

const upcomingEvents: Event[] = [
  {
    date: "15",
    month: "Mar",
    year: "2025",
    title: "Annual General Meeting and Stakeholder Forum in Accra",
  },
  {
    date: "28",
    month: "Apr",
    year: "2025",
    title: "Safety Excellence Workshop for Mining Operations",
  },
  {
    date: "10",
    month: "Jun",
    year: "2025",
    title: "Mining Technology & Innovation Summit in Ghana",
  },
];

const reports: Report[] = [
  {
    title: "YPI Annual Report 2024",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop",
    fileSize: "12.5 MB",
    downloadLink: "#",
  },
  {
    title: "Safety & Operations Report 2024",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=400&auto=format&fit=crop",
    fileSize: "8.2 MB",
    downloadLink: "#",
  },
  {
    title: "Sustainability Report 2024",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=400&auto=format&fit=crop",
    fileSize: "6.8 MB",
    downloadLink: "#",
  },
];

export function EventsAndReports() {
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#f2f4f5" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Upcoming Events */}
          <div>
            <div className="rounded-lg p-6 md:p-8" style={{ backgroundColor: '#FDB714' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Upcoming events
              </h2>

              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="pb-6 border-b border-white/20 last:border-0 last:pb-0"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 text-white">
                        <div className="text-xl font-bold">{event.date} {event.month}</div>
                        <div className="text-sm opacity-90">{event.year}</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm md:text-base leading-relaxed">
                          {event.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-white font-semibold hover:underline group"
                >
                  <span>All Events</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Latest Reports */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Our latest reports
            </h2>
            <p className="text-gray-600 mb-6">
              Download our reports for financial year 2024
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {reports.map((report, index) => (
                <Link
                  key={index}
                  href={report.downloadLink}
                  className="group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Report Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={report.image}
                      alt={report.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>

                  {/* Report Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-gray-900 mb-3 min-h-[40px] line-clamp-2">
                      {report.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">PDF {report.fileSize}</span>
                      <Download className="h-5 w-5 text-gold-600 group-hover:text-gold-700" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Calendar, CheckCircle2 } from "lucide-react";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

interface ProjectTimelineProps {
  items: TimelineItem[];
  title?: string;
}

export function ProjectTimeline({ items, title = "Project Timeline" }: ProjectTimelineProps) {
  return (
    <section className="py-12">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold text-navy mb-8 text-center">{title}</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold/50 to-gray-300" />

          {/* Timeline items */}
          <div className="space-y-12">
            {items.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className={`inline-block ${index % 2 === 0 ? "md:float-right" : "md:float-left"}`}>
                    <div className={`bg-white rounded-lg p-6 shadow-md max-w-md ${
                      item.status === "current" ? "border-2 border-gold" : ""
                    }`}>
                      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{item.date}</span>
                        {item.status === "completed" && (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-navy mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      {item.status === "current" && (
                        <span className="inline-block mt-2 text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Center marker */}
                <div
                  className={`absolute left-8 md:left-1/2 top-0 w-4 h-4 -ml-2 rounded-full border-4 border-white shadow-lg ${
                    item.status === "completed"
                      ? "bg-green-500"
                      : item.status === "current"
                      ? "bg-gold"
                      : "bg-gray-300"
                  }`}
                />

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

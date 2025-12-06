import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/constants/projects";
import { SERVICES } from "@/lib/constants/services";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    completed: "bg-green-100 text-green-800",
    ongoing: "bg-blue-100 text-blue-800",
    planned: "bg-gray-100 text-gray-800",
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {project.images.length > 0 ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge className={statusColors[project.status]}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>
        </div>
      ) : (
        <div className="relative h-48 bg-gradient-to-br from-navy/10 to-gold/10 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">🏗️</div>
            <Badge className={statusColors[project.status]}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-xl font-semibold text-navy group-hover:text-gold transition-colors line-clamp-2">
          {project.title}
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <span className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            {project.location}, {project.country}
          </span>
          <span className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            {new Date(project.startDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
            {project.endDate &&
              ` - ${new Date(project.endDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}`}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.summary}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.services.slice(0, 3).map((serviceId) => {
            const service = SERVICES.find((s) => s.id === serviceId);
            return service ? (
              <Badge key={serviceId} variant="outline" className="text-xs">
                {service.name}
              </Badge>
            ) : null;
          })}
          {project.services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.services.length - 3} more
            </Badge>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-navy hover:text-gold font-medium transition-colors"
        >
          View Project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

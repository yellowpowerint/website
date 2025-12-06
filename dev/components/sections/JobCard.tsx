import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock, TrendingUp } from "lucide-react";
import type { Job } from "@/lib/constants/careers";
import { getCategoryById } from "@/lib/constants/careers";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const category = getCategoryById(job.categoryId);
  
  // Calculate days since posted
  const daysSincePosted = Math.floor(
    (new Date().getTime() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="hover:shadow-xl transition-all h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className="text-gold border-gold">
            {category?.name || "General"}
          </Badge>
          {daysSincePosted <= 7 && (
            <Badge className="bg-green-100 text-green-800 border-green-300">New</Badge>
          )}
        </div>
        <CardTitle className="text-2xl line-clamp-2">{job.title}</CardTitle>
        <CardDescription className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>{job.experienceLevel}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Posted {daysSincePosted} {daysSincePosted === 1 ? "day" : "days"} ago</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
        
        {job.salary && (
          <div className="mb-4 p-3 bg-gold/10 rounded-lg">
            <div className="text-sm font-semibold text-gray-700">Salary</div>
            <div className="text-gold font-bold">{job.salary}</div>
          </div>
        )}

        <div className="mt-auto pt-4">
          <Button className="w-full bg-gold hover:bg-gold-600 text-navy" asChild>
            <Link href={`/careers/jobs/${job.jobId}`}>
              View Details & Apply
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

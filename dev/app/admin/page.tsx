/**
 * Admin Dashboard Home
 * Overview of key metrics and recent activity
 */

import { StatsCard } from '@/components/admin/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Briefcase, Inbox, Plus } from 'lucide-react';
import Link from 'next/link';

// TODO: Phase 13 - Replace with real database queries
const mockStats = {
  totalQuotes: 127,
  totalApplications: 89,
  totalProjects: 45,
  pendingSubmissions: 23,
};

const recentSubmissions = [
  { id: 1, type: 'Quote', name: 'Acme Mining Co.', date: '2025-12-05', status: 'New' },
  { id: 2, type: 'Application', name: 'John Mensah', date: '2025-12-05', status: 'New' },
  { id: 3, type: 'Contact', name: 'Sarah Osei', date: '2025-12-04', status: 'Reviewed' },
  { id: 4, type: 'Partnership', name: 'Global Equipment Ltd.', date: '2025-12-04', status: 'New' },
  { id: 5, type: 'Quote', name: 'Gold Fields Ghana', date: '2025-12-03', status: 'Reviewed' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Quote Requests"
          value={mockStats.totalQuotes}
          trend="up"
          trendValue="+12%"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatsCard
          title="Job Applications"
          value={mockStats.totalApplications}
          trend="up"
          trendValue="+8%"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Active Projects"
          value={mockStats.totalProjects}
          trend="neutral"
          trendValue="0%"
          icon={<Briefcase className="h-4 w-4" />}
        />
        <StatsCard
          title="Pending Submissions"
          value={mockStats.pendingSubmissions}
          trend="down"
          trendValue="-5%"
          icon={<Inbox className="h-4 w-4" />}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common admin tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link href="/admin/content/news">
                <Plus className="h-5 w-5" />
                <span>Add News Article</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link href="/admin/careers/jobs">
                <Plus className="h-5 w-5" />
                <span>Post Job Opening</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link href="/admin/submissions/quotes">
                <Inbox className="h-5 w-5" />
                <span>Review Quotes</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>Latest form submissions and applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="font-medium text-navy">{submission.name}</div>
                  <div className="text-sm text-gray-600">{submission.type}</div>
                </div>
                <div className="text-sm text-gray-500">{submission.date}</div>
                <div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      submission.status === 'New'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

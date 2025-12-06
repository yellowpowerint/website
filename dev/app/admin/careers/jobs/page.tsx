/**
 * Job Postings Management
 * Manage job listings
 * TODO: Phase 13 - Add job posting CRUD
 */

import { Card, CardContent } from '@/components/ui/card';

export default function JobsManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Job Postings</h1>
        <p className="text-gray-600 mt-1">Create and manage job openings</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">Job posting management UI coming in Phase 13</p>
        </CardContent>
      </Card>
    </div>
  );
}

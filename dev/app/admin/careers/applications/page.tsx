/**
 * Job Applications Management
 * View and manage job applications
 * TODO: Phase 13 - Add applications review interface
 */

import { Card, CardContent } from '@/components/ui/card';

export default function ApplicationsManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Job Applications</h1>
        <p className="text-gray-600 mt-1">Review and manage job applications</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">Applications management UI coming in Phase 13</p>
        </CardContent>
      </Card>
    </div>
  );
}

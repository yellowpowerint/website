/**
 * Projects Management
 * Manage project portfolio
 * TODO: Phase 13 - Add full project management
 */

import { Card, CardContent } from '@/components/ui/card';

export default function ProjectsManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Projects Management</h1>
        <p className="text-gray-600 mt-1">Manage project portfolio and case studies</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">Projects management UI coming in Phase 13</p>
        </CardContent>
      </Card>
    </div>
  );
}

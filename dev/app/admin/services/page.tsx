/**
 * Services Management
 * Manage service offerings
 * TODO: Phase 13 - Add full service management with database
 */

import { Card, CardContent } from '@/components/ui/card';

export default function ServicesManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Services Management</h1>
        <p className="text-gray-600 mt-1">Manage service offerings and descriptions</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">Services management UI coming in Phase 13</p>
        </CardContent>
      </Card>
    </div>
  );
}

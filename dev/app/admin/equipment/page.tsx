/**
 * Equipment Management
 * Manage equipment fleet
 * TODO: Phase 13 - Add equipment CRUD
 */

import { Card, CardContent } from '@/components/ui/card';

export default function EquipmentManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Equipment Management</h1>
        <p className="text-gray-600 mt-1">Manage equipment fleet and specifications</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">Equipment management UI coming in Phase 13</p>
        </CardContent>
      </Card>
    </div>
  );
}

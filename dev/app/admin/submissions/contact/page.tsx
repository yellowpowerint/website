/**
 * Contact Submissions Management
 * TODO: Phase 13 - Full implementation
 */

import { Card, CardContent } from '@/components/ui/card';

export default function ContactSubmissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Contact Submissions</h1>
        <p className="text-gray-600 mt-1">View and manage contact form submissions</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">Contact submissions UI coming in Phase 13</p>
        </CardContent>
      </Card>
    </div>
  );
}

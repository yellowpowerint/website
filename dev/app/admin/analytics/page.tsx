/**
 * Analytics Dashboard
 * View site analytics
 * TODO: Phase 13 - Connect to real analytics data
 */

import { Card, CardContent } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Analytics</h1>
        <p className="text-gray-600 mt-1">View website analytics and metrics</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">Analytics dashboard coming in Phase 13</p>
        </CardContent>
      </Card>
    </div>
  );
}

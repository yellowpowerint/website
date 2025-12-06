/**
 * Media Library
 * Manage images and documents
 * TODO: Phase 13 - Full media management
 */

import { Card, CardContent } from '@/components/ui/card';

export default function MediaLibraryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy">Media Library</h1>
        <p className="text-gray-600 mt-1">Manage images and documents</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">Media library UI coming in Phase 13</p>
        </CardContent>
      </Card>
    </div>
  );
}

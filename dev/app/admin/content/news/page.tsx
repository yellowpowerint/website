/**
 * News Content Management
 * Manage news articles
 * TODO: Phase 13 - Add full CRUD functionality with database
 */

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function NewsManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">News Management</h1>
          <p className="text-gray-600 mt-1">Create and manage news articles</p>
        </div>
        <Button className="bg-gold hover:bg-gold-600 text-navy">
          <Plus className="h-4 w-4 mr-2" />
          Add News Article
        </Button>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">News management UI will be implemented in Phase 13</p>
          <p className="text-sm text-gray-400 mt-2">
            This page will allow creating, editing, and deleting news articles with rich text editor
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

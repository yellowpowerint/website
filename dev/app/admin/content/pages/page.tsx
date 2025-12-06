'use client';

/**
 * Pages Management
 * Manage website pages and content
 */

import { useState } from 'react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  lastModified: string;
}

// TODO: Phase 13 - Replace with database queries
const mockPages: Page[] = [
  { id: '1', title: 'About Us', slug: '/about', status: 'published', lastModified: '2025-12-01' },
  { id: '2', title: 'Services', slug: '/services', status: 'published', lastModified: '2025-12-02' },
  { id: '3', title: 'Sustainability', slug: '/sustainability', status: 'published', lastModified: '2025-12-03' },
  { id: '4', title: 'Careers', slug: '/careers', status: 'published', lastModified: '2025-11-28' },
  { id: '5', title: 'Contact', slug: '/contact', status: 'published', lastModified: '2025-11-25' },
];

export default function PagesManagementPage() {
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState<{ title: string; slug: string; status: 'published' | 'draft' }>({ 
    title: '', 
    slug: '', 
    status: 'draft' 
  });

  const columns: Column<Page>[] = [
    {
      key: 'title',
      label: 'Page Title',
      sortable: true,
    },
    {
      key: 'slug',
      label: 'URL Slug',
      sortable: true,
      render: (page) => <code className="text-sm">{page.slug}</code>,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (page) => (
        <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
          {page.status}
        </Badge>
      ),
    },
    {
      key: 'lastModified',
      label: 'Last Modified',
      sortable: true,
      render: (page) => new Date(page.lastModified).toLocaleDateString(),
    },
  ];

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({ title: page.title, slug: page.slug, status: page.status });
    setIsDialogOpen(true);
  };

  const handleDelete = (pageId: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter((p) => p.id !== pageId));
    }
  };

  const handleSave = () => {
    if (editingPage) {
      // Update existing page
      setPages(
        pages.map((p) =>
          p.id === editingPage.id
            ? { ...p, ...formData, lastModified: new Date().toISOString().split('T')[0] }
            : p
        )
      );
    } else {
      // Create new page
      const newPage: Page = {
        id: String(pages.length + 1),
        ...formData,
        lastModified: new Date().toISOString().split('T')[0],
      };
      setPages([...pages, newPage]);
    }
    setIsDialogOpen(false);
    setEditingPage(null);
    setFormData({ title: '', slug: '', status: 'draft' });
  };

  const handleNewPage = () => {
    setEditingPage(null);
    setFormData({ title: '', slug: '', status: 'draft' });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Pages Management</h1>
          <p className="text-gray-600 mt-1">Manage website pages and metadata</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewPage} className="bg-gold hover:bg-gold-600 text-navy">
              <Plus className="h-4 w-4 mr-2" />
              Add Page
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPage ? 'Edit Page' : 'Create New Page'}</DialogTitle>
              <DialogDescription>
                {editingPage
                  ? 'Update the page details below'
                  : 'Add a new page to the website'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="About Us"
                />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="/about"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-gold hover:bg-gold-600 text-navy">
                {editingPage ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={pages}
        columns={columns}
        keyExtractor={(page) => page.id}
        actions={(page) => (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleEdit(page)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(page.id)}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        )}
        emptyMessage="No pages found"
      />

      <div className="text-xs text-gray-500 italic">
        Note: This is Phase 12 implementation with mock data. Phase 13 will add database persistence.
      </div>
    </div>
  );
}

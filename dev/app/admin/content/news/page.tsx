'use client';

/**
 * News Content Management
 * Manage news articles with CRUD operations
 */

import { useState } from 'react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
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

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  status: 'published' | 'draft';
  excerpt: string;
  content: string;
}

// TODO: Phase 13 - Replace with database queries
const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'YPI Expands Operations to Côte d\'Ivoire',
    category: 'Company News',
    author: 'Admin',
    publishedDate: '2025-12-01',
    status: 'published',
    excerpt: 'Yellow Power International announces expansion into new West African markets',
    content: '<p>Yellow Power International is excited to announce our expansion into Côte d\'Ivoire...</p>',
  },
  {
    id: '2',
    title: 'New Fleet of Equipment Arrives',
    category: 'Equipment',
    author: 'Admin',
    publishedDate: '2025-11-28',
    status: 'published',
    excerpt: '10 new drilling rigs and support vehicles join our fleet',
    content: '<p>We have invested in state-of-the-art equipment...</p>',
  },
  {
    id: '3',
    title: 'Safety Excellence Award',
    category: 'Awards',
    author: 'Admin',
    publishedDate: '2025-11-20',
    status: 'published',
    excerpt: 'YPI recognized for outstanding safety performance',
    content: '<p>Our commitment to safety has been recognized...</p>',
  },
];

export default function NewsManagementPage() {
  const [articles, setArticles] = useState<NewsArticle[]>(mockNews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    excerpt: string;
    content: string;
    status: 'published' | 'draft';
  }>({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    status: 'draft',
  });

  const columns: Column<NewsArticle>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
    },
    {
      key: 'publishedDate',
      label: 'Published',
      sortable: true,
      render: (article) => new Date(article.publishedDate).toLocaleDateString(),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (article) => (
        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
          {article.status}
        </Badge>
      ),
    },
  ];

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content,
      status: article.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (articleId: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter((a) => a.id !== articleId));
    }
  };

  const handleSave = () => {
    if (editingArticle) {
      setArticles(
        articles.map((a) =>
          a.id === editingArticle.id
            ? { ...a, ...formData, publishedDate: new Date().toISOString().split('T')[0] }
            : a
        )
      );
    } else {
      const newArticle: NewsArticle = {
        id: String(articles.length + 1),
        ...formData,
        author: 'Admin',
        publishedDate: new Date().toISOString().split('T')[0],
      };
      setArticles([...articles, newArticle]);
    }
    setIsDialogOpen(false);
    setEditingArticle(null);
    setFormData({ title: '', category: '', excerpt: '', content: '', status: 'draft' });
  };

  const handleNewArticle = () => {
    setEditingArticle(null);
    setFormData({ title: '', category: '', excerpt: '', content: '', status: 'draft' });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">News Management</h1>
          <p className="text-gray-600 mt-1">Create and manage news articles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewArticle} className="bg-gold hover:bg-gold-600 text-navy">
              <Plus className="h-4 w-4 mr-2" />
              Add News Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingArticle ? 'Edit Article' : 'Create News Article'}</DialogTitle>
              <DialogDescription>
                {editingArticle ? 'Update the article details below' : 'Write a new news article'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Article title"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Company News, Equipment, Awards, etc."
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary of the article"
                />
              </div>
              <div>
                <Label>Content</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
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
                {editingArticle ? 'Update' : 'Publish'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={articles}
        columns={columns}
        keyExtractor={(article) => article.id}
        actions={(article) => (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleEdit(article)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(article.id)}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        )}
        emptyMessage="No news articles yet"
      />

      <div className="text-xs text-gray-500 italic">
        Note: This is Phase 12 implementation with mock data. Phase 13 will add database persistence.
      </div>
    </div>
  );
}

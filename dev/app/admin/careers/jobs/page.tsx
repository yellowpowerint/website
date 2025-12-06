'use client';

/**
 * Job Postings Management
 * Manage job listings with CRUD operations
 */

import { useState } from 'react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'open' | 'closed';
  postedDate: string;
}

// TODO: Phase 13 - Replace with database queries
const mockJobs: Job[] = [
  { id: '1', title: 'Drill Operator', department: 'Operations', location: 'Tarkwa', type: 'Full-time', status: 'open', postedDate: '2025-12-01' },
  { id: '2', title: 'Equipment Mechanic', department: 'Maintenance', location: 'Obuasi', type: 'Full-time', status: 'open', postedDate: '2025-11-28' },
  { id: '3', title: 'Safety Officer', department: 'HSE', location: 'Bibiani', type: 'Full-time', status: 'open', postedDate: '2025-11-25' },
  { id: '4', title: 'Geologist', department: 'Technical', location: 'Accra', type: 'Full-time', status: 'closed', postedDate: '2025-11-15' },
];

export default function JobsManagementPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  const columns: Column<Job>[] = [
    { key: 'title', label: 'Job Title', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (job) => (
        <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
          {job.status}
        </Badge>
      ),
    },
    {
      key: 'postedDate',
      label: 'Posted',
      sortable: true,
      render: (job) => new Date(job.postedDate).toLocaleDateString(),
    },
  ];

  const handleDelete = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter((j) => j.id !== jobId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Job Postings</h1>
          <p className="text-gray-600 mt-1">Create and manage job openings</p>
        </div>
        <Button className="bg-gold hover:bg-gold-600 text-navy">
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      <DataTable
        data={jobs}
        columns={columns}
        keyExtractor={(job) => job.id}
        actions={(job) => (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        )}
        emptyMessage="No job postings found"
      />

      <div className="text-xs text-gray-500 italic">
        Note: Phase 12 implementation with mock data. Phase 13 will add full job posting forms and applicant tracking.
      </div>
    </div>
  );
}

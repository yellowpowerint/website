'use client';

/**
 * Consultation Submissions Management
 * View and manage consultation booking requests
 */

import { useState } from 'react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';

interface Consultation {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  preferredDate: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'scheduled' | 'completed' | 'cancelled';
}

// TODO: Phase 13 - Replace with database queries
const mockConsultations: Consultation[] = [
  {
    id: '1',
    companyName: 'Golden Star Resources',
    contactName: 'Emmanuel Akoto',
    email: 'e.akoto@goldenstar.com',
    phone: '+233244567890',
    serviceInterest: 'Production Drilling',
    preferredDate: '2025-12-15',
    message: 'Looking to discuss drilling capacity for our new site',
    submittedAt: '2025-12-05T08:30:00Z',
    status: 'new',
  },
  {
    id: '2',
    companyName: 'AngloGold Ashanti',
    contactName: 'Abena Mensah',
    email: 'abena.m@anglogoldashanti.com',
    phone: '+233501234567',
    serviceInterest: 'Grade Control Services',
    preferredDate: '2025-12-18',
    message: 'Need consultation on grade control optimization',
    submittedAt: '2025-12-04T14:20:00Z',
    status: 'scheduled',
  },
  {
    id: '3',
    companyName: 'Perseus Mining',
    contactName: 'Kwame Owusu',
    email: 'k.owusu@perseusmining.com',
    phone: '+233242345678',
    serviceInterest: 'Load & Haul Operations',
    preferredDate: '2025-12-10',
    message: 'Exploring load and haul partnership options',
    submittedAt: '2025-12-03T10:15:00Z',
    status: 'completed',
  },
];

export default function ConsultationsPage() {
  const [consultations] = useState<Consultation[]>(mockConsultations);

  const columns: Column<Consultation>[] = [
    {
      key: 'companyName',
      label: 'Company',
      sortable: true,
    },
    {
      key: 'contactName',
      label: 'Contact Person',
      sortable: true,
    },
    {
      key: 'serviceInterest',
      label: 'Service',
      sortable: true,
    },
    {
      key: 'preferredDate',
      label: 'Preferred Date',
      sortable: true,
      render: (item) => new Date(item.preferredDate).toLocaleDateString(),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
          new: 'default',
          scheduled: 'secondary',
          completed: 'outline',
          cancelled: 'destructive',
        };
        return <Badge variant={variants[item.status]}>{item.status}</Badge>;
      },
    },
    {
      key: 'submittedAt',
      label: 'Submitted',
      sortable: true,
      render: (item) => new Date(item.submittedAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Consultation Requests</h1>
          <p className="text-gray-600 mt-1">Manage consultation booking requests</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <DataTable
        data={consultations}
        columns={columns}
        keyExtractor={(item) => item.id}
        actions={() => (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button size="sm" variant="outline">
              Schedule
            </Button>
          </div>
        )}
        itemsPerPage={10}
        emptyMessage="No consultation requests yet"
      />

      <div className="text-xs text-gray-500 italic">
        Note: This is Phase 12 implementation with mock data. Phase 13 will add database persistence and scheduling integration.
      </div>
    </div>
  );
}

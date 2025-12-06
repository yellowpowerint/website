'use client';

/**
 * Services Management
 * Manage service offerings with CRUD operations
 */

import { useState } from 'react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'inactive';
  description: string;
}

// TODO: Phase 13 - Replace with database queries
const mockServices: Service[] = [
  { id: '1', name: 'Production Drilling', category: 'Drilling', status: 'active', description: 'Large-scale production drilling services' },
  { id: '2', name: 'Grade Control Drilling', category: 'Drilling', status: 'active', description: 'Precision grade control for ore management' },
  { id: '3', name: 'Load & Haul Operations', category: 'Operations', status: 'active', description: 'Complete load and haul fleet management' },
  { id: '4', name: 'Pre-Split Drilling', category: 'Blasting', status: 'active', description: 'Pre-split and trim blasting services' },
  { id: '5', name: 'Equipment Maintenance', category: 'Support', status: 'active', description: 'On-site maintenance and repair' },
];

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>(mockServices);

  const columns: Column<Service>[] = [
    { key: 'name', label: 'Service Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (service) => (
        <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
          {service.status}
        </Badge>
      ),
    },
    { key: 'description', label: 'Description' },
  ];

  const handleDelete = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter((s) => s.id !== serviceId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Services Management</h1>
          <p className="text-gray-600 mt-1">Manage service offerings and descriptions</p>
        </div>
        <Button className="bg-gold hover:bg-gold-600 text-navy">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <DataTable
        data={services}
        columns={columns}
        keyExtractor={(service) => service.id}
        actions={(service) => (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        )}
        emptyMessage="No services found"
      />

      <div className="text-xs text-gray-500 italic">
        Note: Phase 12 implementation with mock data. Phase 13 will add full CRUD forms and database persistence.
      </div>
    </div>
  );
}

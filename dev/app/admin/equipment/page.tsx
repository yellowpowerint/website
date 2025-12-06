'use client';

/**
 * Equipment Management
 * Manage equipment fleet with CRUD operations
 */

import { useState } from 'react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  status: 'operational' | 'maintenance' | 'inactive';
  location: string;
}

// TODO: Phase 13 - Replace with database queries
const mockEquipment: Equipment[] = [
  { id: '1', name: 'DR-01', type: 'Drill Rig', model: 'Atlas Copco DM45', status: 'operational', location: 'Tarkwa Site' },
  { id: '2', name: 'DR-02', type: 'Drill Rig', model: 'Sandvik DP1500i', status: 'operational', location: 'Obuasi Site' },
  { id: '3', name: 'LD-05', type: 'Loader', model: 'CAT 992K', status: 'maintenance', location: 'Workshop' },
  { id: '4', name: 'HT-12', type: 'Haul Truck', model: 'Komatsu HD785', status: 'operational', location: 'Tarkwa Site' },
  { id: '5', name: 'DR-03', type: 'Drill Rig', model: 'Sandvik Leopard DI650i', status: 'operational', location: 'Bibiani Site' },
];

export default function EquipmentManagementPage() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);

  const columns: Column<Equipment>[] = [
    { key: 'name', label: 'Equipment ID', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'model', label: 'Model', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
          operational: 'default',
          maintenance: 'secondary',
          inactive: 'destructive',
        };
        return <Badge variant={variants[item.status]}>{item.status}</Badge>;
      },
    },
    { key: 'location', label: 'Location', sortable: true },
  ];

  const handleDelete = (equipmentId: string) => {
    if (confirm('Are you sure you want to delete this equipment?')) {
      setEquipment(equipment.filter((e) => e.id !== equipmentId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Equipment Management</h1>
          <p className="text-gray-600 mt-1">Manage equipment fleet and specifications</p>
        </div>
        <Button className="bg-gold hover:bg-gold-600 text-navy">
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      <DataTable
        data={equipment}
        columns={columns}
        keyExtractor={(item) => item.id}
        actions={(item) => (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        )}
        emptyMessage="No equipment found"
      />

      <div className="text-xs text-gray-500 italic">
        Note: Phase 12 implementation with mock data. Phase 13 will add full CRUD forms and maintenance tracking.
      </div>
    </div>
  );
}

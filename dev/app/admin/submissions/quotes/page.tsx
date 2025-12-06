/**
 * Quote Submissions Management
 * View and manage quote requests
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';

// TODO: Phase 13 - Replace with real database queries
const mockQuotes = [
  {
    id: '1',
    companyName: 'Acme Mining Corporation',
    contactName: 'John Doe',
    email: 'john@acmemining.com',
    phone: '+233244123456',
    service: 'Production Drilling',
    message: 'Interested in production drilling services for our Tarkwa site',
    submittedAt: '2025-12-05T10:30:00Z',
    status: 'new',
  },
  {
    id: '2',
    companyName: 'Gold Fields Ghana',
    contactName: 'Sarah Mensah',
    email: 'sarah@goldfields.com',
    phone: '+233501234567',
    service: 'Load & Haul Operations',
    message: 'Need load and haul services for Q1 2026',
    submittedAt: '2025-12-04T14:15:00Z',
    status: 'reviewed',
  },
  {
    id: '3',
    companyName: 'Newmont Ghana',
    contactName: 'Michael Addo',
    email: 'michael.addo@newmont.com',
    phone: '+233242345678',
    service: 'Pre-Split Drilling',
    message: 'Looking for pre-split drilling at our Ahafo site',
    submittedAt: '2025-12-03T09:20:00Z',
    status: 'responded',
  },
];

export default function QuoteSubmissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Quote Requests</h1>
          <p className="text-gray-600 mt-1">Manage and respond to quote requests</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4">
        {mockQuotes.map((quote) => (
          <Card key={quote.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{quote.companyName}</CardTitle>
                  <CardDescription>
                    {quote.contactName} • {quote.email} • {quote.phone}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    quote.status === 'new'
                      ? 'default'
                      : quote.status === 'reviewed'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700">Service Requested</div>
                  <div className="text-sm text-gray-900">{quote.service}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Message</div>
                  <div className="text-sm text-gray-900">{quote.message}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Submitted</div>
                  <div className="text-sm text-gray-900">
                    {new Date(quote.submittedAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="bg-gold hover:bg-gold-600 text-navy">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Mark as Reviewed
                  </Button>
                  <Button size="sm" variant="outline">
                    Send Response
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockQuotes.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No quote requests yet</p>
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-gray-500 italic">
        Note: This is Phase 12 implementation using mock data. Phase 13 will connect to the database.
      </div>
    </div>
  );
}

/**
 * Admin Settings Page
 * Manage site settings and configuration
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

// TODO: Phase 13 - Store settings in database
const currentSettings = {
  companyName: 'Yellow Power International',
  email: 'info@yellowpowerinternational.com',
  phone1: '+233268066942',
  phone2: '0550099130',
  address: 'Madina, Greater Accra, Ghana',
  seoTitle: 'Yellow Power International - Leading Mining Services in West Africa',
  seoDescription: 'Comprehensive drilling, load & haul, and mining support services across Ghana, Burkina Faso, and Côte d\'Ivoire since 2017.',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-navy">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your site settings and configuration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Basic company details displayed on the website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue={currentSettings.companyName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={currentSettings.email} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone1">Primary Phone</Label>
              <Input id="phone1" defaultValue={currentSettings.phone1} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone2">Secondary Phone</Label>
              <Input id="phone2" defaultValue={currentSettings.phone2} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" defaultValue={currentSettings.address} rows={3} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Default SEO metadata for the website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">Default Page Title</Label>
            <Input id="seoTitle" defaultValue={currentSettings.seoTitle} />
            <p className="text-xs text-gray-500">Used as default title for pages without custom titles</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoDescription">Default Meta Description</Label>
            <Textarea
              id="seoDescription"
              defaultValue={currentSettings.seoDescription}
              rows={3}
            />
            <p className="text-xs text-gray-500">
              Used as default description for pages without custom descriptions
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-gold hover:bg-gold-600 text-navy">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>

      <div className="text-xs text-gray-500 italic">
        Note: Settings changes are currently in-memory. Phase 13 will add database persistence.
      </div>
    </div>
  );
}

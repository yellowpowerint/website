import type { Metadata } from 'next';
import { LocationsClient } from './LocationsClient';
import { buildMetadata } from '@/lib/seo/config';
import { generateLocalBusinessSchemas } from '@/lib/structured-data/local-business';
import { generateBreadcrumbSchema, COMMON_BREADCRUMBS } from '@/lib/structured-data/breadcrumbs';

export const metadata: Metadata = buildMetadata({
  title: 'Our Locations - Offices Across West Africa',
  description: 'Yellow Power International offices in Ghana, Burkina Faso, and Côte d\'Ivoire. Contact information, addresses, and directions for all our locations.',
  path: '/contact/locations',
});

export default function OfficeLocationsPage() {
  const localBusinessSchemas = generateLocalBusinessSchemas();
  const breadcrumbSchema = generateBreadcrumbSchema([
    ...COMMON_BREADCRUMBS.contact,
    { name: 'Locations', path: '/contact/locations' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchemas),
        }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
        suppressHydrationWarning
      />
      <LocationsClient />
    </>
  );
}

/**
 * Admin Layout
 * Protects all admin routes and provides admin shell
 */

import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth/getSession';
import { Sidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader session={session} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

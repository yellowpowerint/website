/**
 * Admin Layout
 * Protects admin routes (except login) and provides admin shell
 */

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getAdminSession } from '@/lib/auth/getSession';
import { Sidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current path
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // Skip authentication check for login page
  const isLoginPage = pathname === '/admin/login' || pathname.includes('/admin/login');
  
  if (isLoginPage) {
    // Render login page without admin shell
    return <>{children}</>;
  }

  // Check authentication for all other admin routes
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

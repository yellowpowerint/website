'use client';

/**
 * Admin Sidebar Navigation
 * Provides navigation for admin dashboard
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderOpen,
  Wrench,
  Users,
  Inbox,
  Image,
  BarChart3,
  Settings,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: <FileText className="h-5 w-5" />,
    children: [
      { title: 'News', href: '/admin/content/news', icon: <ChevronRight className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Services',
    href: '/admin/services',
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: 'Projects',
    href: '/admin/projects',
    icon: <FolderOpen className="h-5 w-5" />,
  },
  {
    title: 'Equipment',
    href: '/admin/equipment',
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    title: 'Careers',
    href: '/admin/careers',
    icon: <Users className="h-5 w-5" />,
    children: [
      { title: 'Jobs', href: '/admin/careers/jobs', icon: <ChevronRight className="h-4 w-4" /> },
      { title: 'Applications', href: '/admin/careers/applications', icon: <ChevronRight className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Submissions',
    href: '/admin/submissions',
    icon: <Inbox className="h-5 w-5" />,
    children: [
      { title: 'Quotes', href: '/admin/submissions/quotes', icon: <ChevronRight className="h-4 w-4" /> },
      { title: 'Contact', href: '/admin/submissions/contact', icon: <ChevronRight className="h-4 w-4" /> },
      { title: 'Partnerships', href: '/admin/submissions/partnerships', icon: <ChevronRight className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Media Library',
    href: '/admin/media',
    icon: <Image className="h-5 w-5" />,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <Link href="/admin" className="flex items-center gap-2" aria-label="Admin Dashboard Home">
          <div className="h-10 w-10 rounded-lg bg-gold flex items-center justify-center">
            <span className="text-navy font-bold text-xl">YPI</span>
          </div>
          <div>
            <div className="font-semibold">Admin</div>
            <div className="text-xs text-gray-400">Dashboard</div>
          </div>
        </Link>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive(item.href)
                  ? 'bg-gold text-navy font-medium'
                  : 'text-gray-300 hover:bg-gray-800'
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
            {item.children && isActive(item.href) && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors',
                      pathname === child.href
                        ? 'text-gold font-medium'
                        : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {child.icon}
                    <span>{child.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

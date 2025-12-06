/**
 * Server-side session helpers for admin authentication
 */

import { getServerSession } from 'next-auth';
import { authOptions } from './config';

export interface AdminSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  expires: string;
}

/**
 * Get current admin session (server-side only)
 * Returns null if not authenticated
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const session = await getServerSession(authOptions);
  return session as AdminSession | null;
}

/**
 * Require admin session (throws if not authenticated)
 * Use in API routes and server components
 */
export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  
  if (!session) {
    throw new Error('Unauthorized: Admin session required');
  }

  return session;
}

/**
 * Check if user is authenticated admin
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return session !== null && session.user.role === 'admin';
}

/**
 * NextAuth configuration for admin authentication
 * Uses credentials provider for Phase 12 (simple admin login)
 * Can be extended with OAuth providers in future
 */

import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Admin credentials from environment
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yellowpowerinternational.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; // bcrypt hash
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Fallback for dev (plain text)

/**
 * NextAuth configuration
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if email matches admin email
        if (credentials.email !== ADMIN_EMAIL) {
          return null;
        }

        // Verify password
        let isValid = false;

        if (ADMIN_PASSWORD_HASH) {
          // Production: use bcrypt hash
          isValid = await bcrypt.compare(credentials.password, ADMIN_PASSWORD_HASH);
        } else if (ADMIN_PASSWORD) {
          // Development: allow plain text password
          isValid = credentials.password === ADMIN_PASSWORD;
        } else {
          // No password configured
          console.error('No admin password configured. Set ADMIN_PASSWORD or ADMIN_PASSWORD_HASH');
          return null;
        }

        if (!isValid) {
          return null;
        }

        // Return user object
        return {
          id: '1',
          email: ADMIN_EMAIL,
          name: 'Admin User',
          role: 'admin',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

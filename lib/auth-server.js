// lib/auth-server.js
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;
  
  if (!token) return null;
  
  return {
    token,
    role: cookieStore.get('userRole')?.value,
    isAuthenticated: true
  };
}

export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.role !== 'admin') {
    redirect('/unauthorized');
  }
  return session;
}
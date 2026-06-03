// File: proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Ganti nama fungsi dari "middleware" menjadi "proxy"
export function proxy(request: NextRequest) {
  // 2. Isi fungsi di dalamnya TIDAK PERLU diganti
  // Logika kamu di sini, misalnya:
  // return checkAuth(request);
  return NextResponse.next();
}

// 3. Bagian config dan matcher TIDAK PERLU diubah
export const config = {
  matcher: '/:path*',
};
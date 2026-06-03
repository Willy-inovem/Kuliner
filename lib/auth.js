// lib/auth.js

// Fungsi manual untuk parse cookie
function parseCookies(cookieString) {
  const cookies = {};
  if (!cookieString) return cookies;
  
  cookieString.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts[0].trim();
    // Menggunakan slice & join agar jika nilai cookie memiliki karakter '=', tidak terpotong
    const value = parts.slice(1).join('='); 
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  
  return cookies;
}

// ========== SERVER-SIDE FUNCTIONS ==========
export function getServerSession(ctx) {
  const cookieString = ctx?.req?.headers?.cookie || '';
  const cookies = parseCookies(cookieString);
  
  const token = cookies.authToken;
  const userRole = cookies.userRole;
  
  if (!token) return null;
  
  return {
    token,
    role: userRole,
    isAuthenticated: true
  };
}

export function getUserRole(ctx) {
  const session = getServerSession(ctx);
  return session?.role || null;
}

export function isAuthenticatedServer(ctx) {
  const session = getServerSession(ctx);
  return !!session;
}

export function isAdminServer(ctx) {
  const role = getUserRole(ctx);
  return role?.toUpperCase() === 'ADMIN'; 
}

// ========== CLIENT-SIDE FUNCTIONS ==========

// 🔥 PERBAIKAN: Ambil token tanpa memotong karakter '=' di dalam token
export function getToken() {
  if (typeof window === 'undefined') return null;
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(row => row.trim().startsWith('authToken='));
  if (!tokenCookie) return null;
  
  // Mengambil seluruh string setelah karakter '=' pertama demi keamanan full token JWT
  const cookieValue = tokenCookie.trim().substring(tokenCookie.trim().indexOf('=') + 1);
  return decodeURIComponent(cookieValue);
}

// 🔥 PERBAIKAN: Ambil role user dengan aman
export function getClientRole() {
  if (typeof window === 'undefined') return null;
  const cookies = document.cookie.split(';');
  const roleCookie = cookies.find(row => row.trim().startsWith('userRole='));
  if (!roleCookie) return null;
  
  const cookieValue = roleCookie.trim().substring(roleCookie.trim().indexOf('=') + 1);
  return decodeURIComponent(cookieValue);
}

// Cek apakah user sudah login (client-side)
export function isAuthenticated() {
  return !!getToken();
}

// Cek apakah user adalah admin (client-side)
export function isAdmin() {
  return getClientRole()?.toUpperCase() === 'ADMIN'; 
}

// Set token dan role ke cookie (Ditambahkan encodeURIComponent & SameSite)
export function setAuthToken(token, roleOrUser = null) {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setDate(expires.getDate() + 7); // Berlaku 7 hari
  
  document.cookie = `authToken=${encodeURIComponent(token)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
  
  if (roleOrUser) {
    const role = typeof roleOrUser === 'object' ? roleOrUser.role : roleOrUser;
    document.cookie = `userRole=${encodeURIComponent(role)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
  }
}

// Hapus token (logout)
export function removeAuthToken() {
  if (typeof window === 'undefined') return;
  
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

// Logout + redirect ke login
export function logout() {
  removeAuthToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login'; 
  }
}

// Alias biar kompatibel
export const getClientToken = getToken;
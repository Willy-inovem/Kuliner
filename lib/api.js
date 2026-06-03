import { getToken } from './auth';

// 1. Gunakan nama variabel env yang sesuai (NEXT_PUBLIC_API_BASE_URL)
// Jika di .env.local tidak ada, akan otomatis pakai URL Railway.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://kuliner-backend-production.up.railway.app';

// 2. Fungsi fetchAPI Pintar (Otomatis sisipkan token jika user sudah login)
async function fetchAPI(endpoint, options = {}) {
  const token = getToken(); // Ambil token secara otomatis
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Jika token ada, otomatis masukkan ke header Authorization
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'Terjadi kesalahan pada sistem.';
    try {
      // Coba tangkap pesan error dari backend
      const errorData = await response.json();
      
      // 🔥 PERBAIKAN: Tangani format error validasi backend (array of strings)
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message.join(' | ');
      } else {
        errorMessage = errorData.message || errorData.error || `Status: ${response.status}`;
      }
    } catch (e) {
      // Jika yang dikembalikan backend bukan JSON (misal HTML/Server Down)
      errorMessage = `Gagal terhubung ke server (HTTP Error ${response.status})`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// ========== AUTHENTICATION ==========
export async function login(credentials) {
  return fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function register(userData) {
  return fetchAPI('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

// ========== MENU (PUBLIC) ==========
export async function getMenus() {
  return fetchAPI('/menu');
}

export async function getMenuById(id) {
  return fetchAPI(`/menu/${id}`);
}

// ========== CATEGORY ==========
export async function getCategories() {
  return fetchAPI('/category');
}

// ========== ORDER (AUTHENTICATED) ==========
export async function createOrder(orderData) {
  return fetchAPI('/order', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function getOrders() {
  return fetchAPI('/order');
}

// ========== ADMIN ==========
export async function createMenu(menuData) {
  return fetchAPI('/menu', {
    method: 'POST',
    body: JSON.stringify(menuData),
  });
}

export async function updateMenu(id, menuData) {
  return fetchAPI(`/menu/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(menuData),
  });
}

export async function deleteMenu(id) {
  return fetchAPI(`/menu/${id}`, {
    method: 'DELETE',
  });
}

export async function createCategory(categoryData) {
  return fetchAPI('/category', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  });
}
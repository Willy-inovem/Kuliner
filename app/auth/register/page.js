'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link untuk navigasi
import { register } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  // Perbaikan State Mismatch: Sesuaikan kunci state dengan input handler (username)
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await register(form);
      // Asumsi API mengembalikan struktur yang konsisten
      if (result.id || result.success || result.message === 'Registration successful') {
        alert('🎉 Registrasi berhasil! Silakan login dengan akun baru Anda.');
        router.push('/login');
      } else {
        alert('Registrasi gagal: ' + (result.message || 'Terjadi kesalahan'));
      }
    } catch (error) {
      alert('Terjadi kesalahan sistem: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Wrapper Full Screen dengan Background Gradient Lembut
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-amber-100 p-4 font-sans">
      
      {/* Card Registrasi Modern */}
      <div className="max-w-md w-full bg-amber-950 rounded-2xl shadow-2xl p-8 border border-amber-900 transform transition-all">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-3">
             {/* Icon Placeholder - Bisa diganti Logo */}
            <span className="text-4xl">🍽️</span> 
            <h1 className="text-3xl font-extrabold text-amber-50 tracking-tight">
              Daftar Akun
            </h1>
          </div>
          <p className="text-amber-200/70 text-sm">
            Bergabunglah untuk mulai menjelajahi rasa Nusantara
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Input Username */}
          <div className="space-y-1">
            <label htmlFor="username" className="text-sm font-medium text-amber-100 block ml-1">
              Username
            </label>
            <input
              id="username"
              type="text" // Diubah dari 'username' (invalid type) ke 'text'
              placeholder="Masukkan username unik Anda"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 bg-amber-900/50 border border-amber-800 rounded-xl text-white placeholder-amber-600/60 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
              required
            />
          </div>

          {/* Input Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-amber-100 block ml-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 bg-amber-900/50 border border-amber-800 rounded-xl text-white placeholder-amber-600/60 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
              required
            />
          </div>

          {/* Input Role (styled select) */}
          <div className="space-y-1">
            <label htmlFor="role" className="text-sm font-medium text-amber-100 block ml-1">
              Daftar Sebagai
            </label>
            <div className="relative">
              <select
                id="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 bg-amber-900/50 border border-amber-800 rounded-xl text-white appearance-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none cursor-pointer"
              >
                <option value="user" className="bg-amber-950 text-white">Pelanggan</option>
                <option value="admin" className="bg-amber-950 text-white">Administrator</option>
              </select>
              {/* Custom Arrow Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-amber-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tombol Register Bergradasi */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3.5 px-4 rounded-xl hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-amber-500/30 transform hover:scale-[1.02] transition-all duration-200 disabled:from-stone-400 disabled:to-stone-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  {/* Loading Spinner Simple */}
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Mendaftarkan...
                </>
              ) : (
                'Buat Akun Sekarang'
              )}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center border-t border-amber-900 pt-6">
          <p className="text-amber-200/60 text-sm">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="font-semibold text-amber-300 hover:text-amber-100 transition-colors underline underline-offset-2">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
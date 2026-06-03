'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Import fungsi API & Auth yang dibutuhkan
import { getMenus, createMenu } from '@/lib/api';
import { isAdmin } from '@/lib/auth';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  // State untuk Data Dashboard
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalMenu: 0, totalKategori: 0 });
  const [activeTab, setActiveTab] = useState('menu');

  // State untuk Modal Tambah Menu
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '', price: '' });

  // 1. Jalankan Proteksi Admin Terlebih Dahulu
  useEffect(() => {
    const adminStatus = isAdmin();
    setIsUserAdmin(adminStatus);
    
    if (!adminStatus) {
      router.push('/dashboard'); // Lempar ke home jika bukan admin
    } else {
      // ✨ PERBAIKAN UX: Hanya matikan loading jika user BENAR-BENAR admin
      setLoading(false);
      fetchDashboardData(); // Langsung ambil data jika admin terverifikasi
    }
  }, [router]);

  // 2. Fungsi Ambil Data (Memanfaatkan lib/api.js yang baru)
  const fetchDashboardData = async () => {
    try {
      setError(null);
      const data = await getMenus();
      const menuList = Array.isArray(data) ? data : (data.data || []);
      
      setMenus(menuList);
      setStats({
        totalMenu: menuList.length,
        totalKategori: [...new Set(menuList.map(item => item.category || item.kategori))].filter(Boolean).length || 0
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // 3. Fungsi Submit Menu Baru
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price)
      };

      await createMenu(payload); // Token disisipkan otomatis oleh api.js

      setFormData({ name: '', category: '', price: '' });
      setIsModalOpen(false);
      alert('Menu kuliner baru berhasil ditambahkan!');
      fetchDashboardData(); 
    } catch (err) {
      alert(`Gagal: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Tampilan Loading Utama (Bukan Admin maupun sedang proses cek)
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <span className="text-gray-600 font-medium mt-4">Memverifikasi Hak Akses Admin...</span>
      </div>
    );
  }

  // Jika lolos verifikasi, tampilkan Dashboard Manajemen Kuliner seutuhnya
  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="flex items-center justify-center h-16 bg-slate-950 border-b border-slate-800">
          <span className="text-xl font-bold tracking-wider text-orange-500">🍱 Admin Jos Gandos</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <button onClick={() => setActiveTab('menu')} className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition ${activeTab === 'menu' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <span className="mr-3 text-lg">🍔</span> Manajemen Menu
          </button>
        </nav>
      </aside>

      {/* KONTEN UTAMA */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="text-sm text-gray-500 font-medium">Panel Kendali Admin Kuliner</div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Selamat Datang, Admin</h1>
            <p className="text-sm text-gray-500 mt-1">Gunakan halaman terproteksi ini untuk memanipulasi database menu.</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-6 rounded-xl">
              <p className="text-sm text-red-700 font-bold">Gagal mengambil data: {error}</p>
            </div>
          )}

          {/* Grid Statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Total Menu</span>
                <h3 className="text-3xl font-black text-gray-800 mt-2">{stats.totalMenu} Item</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">🍔</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Kategori</span>
                <h3 className="text-3xl font-black text-gray-800 mt-2">{stats.totalKategori} Jenis</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">📂</div>
            </div>
          </div>

          {/* Tabel Menu */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Daftar Menu</h2>
              <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition">
                + Tambah Menu Baru
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-left">
                <thead className="bg-gray-50/70 text-xs text-gray-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Nama Kuliner</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Harga</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                  {menus.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center text-gray-400">📭 Database kosong atau tidak ada respon API.</td>
                    </tr>
                  ) : (
                    menus.map((menu, index) => (
                      <tr key={menu.id || index} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4 font-semibold text-gray-900">{menu.name || menu.nama}</td>
                        <td className="px-6 py-4">{menu.category || menu.kategori || 'Umum'}</td>
                        <td className="px-6 py-4 font-bold text-gray-900">Rp {(menu.price || menu.harga || 0).toLocaleString('id-ID')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL TAMBAH DATA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl mx-4">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-800">Tambah Menu Kuliner</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Menu</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Contoh: Ayam Bakar" className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-orange-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kategori</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required placeholder="Contoh: Makanan" className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-orange-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Harga (Rp)</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required placeholder="25000" className="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-orange-500 text-sm" />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-xl">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl disabled:opacity-50">
                  {submitting ? 'Menyimpan...' : 'Simpan Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
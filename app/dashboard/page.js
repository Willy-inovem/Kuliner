'use client'

import { useState, useEffect } from 'react';
// 🔥 PASTIKAN SEMUA FUNGSI INI ADA DI API.JS ANDA
import { getMenus, createMenu, getCategories, createCategory } from '@/lib/api'; 

export default function DashboardPage() {
  // ================= STATE TAB AKTIF =================
  const [activeTab, setActiveTab] = useState('dashboard');

  // ================= STATE UNTUK MENU & DASHBOARD =================
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalMenu: 0, totalKategori: 0 });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '', 
    price: '',
    stock: '' 
  });

  // ================= STATE UNTUK KATEGORI =================
  const [categories, setCategories] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCategorySubmitting, setIsCategorySubmitting] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // ================= FUNGSI FETCH DATA (MENU & KATEGORI) =================
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Ambil data Menu dan Kategori secara bersamaan dari API
      const [menuData, categoryData] = await Promise.all([
        getMenus(),
        getCategories()
      ]);
      
      const menuList = Array.isArray(menuData) ? menuData : (menuData.data || []);
      const categoryList = Array.isArray(categoryData) ? categoryData : (categoryData.data || []);
      
      setMenus(menuList);
      setCategories(categoryList);
      setStats({
        totalMenu: menuList.length,
        totalKategori: categoryList.length
      });

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ================= FUNGSI SUBMIT MENU BARU =================
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
        categoryId: Number(formData.categoryId), 
        price: Number(formData.price), 
        stock: Number(formData.stock) 
      };

      await createMenu(payload);

      setFormData({ name: '', categoryId: '', price: '', stock: '' });
      setIsModalOpen(false);
      alert('Menu kuliner baru berhasil ditambahkan!');
      fetchDashboardData(); 

    } catch (err) {
      console.error(err);
      alert(`Gagal menambah menu: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // ================= FUNGSI SUBMIT KATEGORI BARU =================
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      alert("Nama kategori tidak boleh kosong!");
      return;
    }

    try {
      setIsCategorySubmitting(true);
      await createCategory({ name: newCategoryName }); 
      
      alert("Kategori berhasil ditambahkan!");
      setIsCategoryModalOpen(false);
      setNewCategoryName("");
      fetchDashboardData(); // Refresh data biar tabel langsung update
    } catch (error) {
      alert(`Gagal menambahkan kategori: ${error.message}`);
    } finally {
      setIsCategorySubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="flex items-center justify-center h-16 bg-slate-950 border-b border-slate-800">
          <span className="text-xl font-bold tracking-wider text-orange-500">🍱 Kuliner Jos Gandos</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition ${activeTab === 'dashboard' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="mr-3 text-lg">📊</span> Statistik Utama
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition ${activeTab === 'menu' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="mr-3 text-lg">🍔</span> Manajemen Menu
          </button>
          <button 
            onClick={() => setActiveTab('kategori')}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition ${activeTab === 'kategori' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="mr-3 text-lg">📂</span> Kategori Produk
          </button>
        </nav>

        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm">A</div>
            <span className="text-sm font-medium text-slate-300">Administrator</span>
          </div>
          <button className="text-slate-400 hover:text-red-400 text-sm">🚪 Logout</button>
        </div>
      </aside>

      {/* ================= KONTEN UTAMA ================= */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        
        {/* Topbar */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="hidden md:block text-sm text-gray-500 font-medium">
            Hari ini: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex items-center space-x-4">
            <span className="relative inline-block cursor-pointer text-xl">🔔</span>
            <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-8">
          
          {/* TAMPILAN LOADING / ERROR GLOBAL */}
          {loading && (
            <div className="flex flex-col justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <span className="ml-3 text-gray-600 font-medium mt-4">Memuat data...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-6 rounded-xl shadow-sm">
              <span className="font-bold text-red-800">Gagal Memuat Data: </span>
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* ================= TAMPILAN TAB DASHBOARD ================= */}
              {activeTab === 'dashboard' && (
                <div className="max-w-5xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Statistik Utama</h1>
                    <p className="text-sm text-gray-500 mt-1">Ringkasan data aplikasi Kuliner Jos Gandos saat ini.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Menu Aktif</span>
                        <h3 className="text-4xl font-black text-gray-800 mt-2">{stats.totalMenu} <span className="text-sm font-normal text-gray-500">Item</span></h3>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">🍔</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori Kuliner</span>
                        <h3 className="text-4xl font-black text-gray-800 mt-2">{stats.totalKategori} <span className="text-sm font-normal text-gray-500">Jenis</span></h3>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">📂</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= TAMPILAN TAB MENU ================= */}
              {activeTab === 'menu' && (
                <div className="max-w-5xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Menu</h1>
                    <p className="text-sm text-gray-500 mt-1">Kelola data menu, harga, dan ketersediaan kuliner Anda di sini.</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-gray-800">Daftar Menu Makanan & Minuman</h2>
                      </div>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
                      >
                        + Tambah Menu Baru
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-100 text-left">
                        <thead className="bg-gray-50/70 text-xs text-gray-500 uppercase font-bold tracking-wider">
                          <tr>
                            <th className="px-6 py-4">Nama Kuliner</th>
                            <th className="px-6 py-4">Kategori (ID)</th>
                            <th className="px-6 py-4">Harga Jual</th>
                            <th className="px-6 py-4">Stok</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                          {menus.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-400">Tidak ada data menu.</td></tr>
                          ) : (
                            menus.map((menu, index) => (
                              <tr key={menu.id || index} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-semibold text-gray-900">{menu.name || menu.nama || 'Tanpa Nama'}</td>
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-50 text-orange-700">
                                    {menu.category?.name || menu.category || menu.kategori || `ID: ${menu.categoryId || '-'}`}
                                  </span>
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900">Rp {(menu.price || menu.harga || 0).toLocaleString('id-ID')}</td>
                                <td className="px-6 py-4 font-medium text-gray-700">{menu.stock !== undefined ? menu.stock : '-'}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= TAMPILAN TAB KATEGORI ================= */}
              {activeTab === 'kategori' && (
                <div className="max-w-5xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Kategori</h1>
                    <p className="text-gray-500 mt-1">Kelola daftar kategori untuk menu kuliner Anda di sini.</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Daftar Kategori Kuliner</h2>
                      <button 
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors shadow-sm text-sm"
                      >
                        + Tambah Kategori Baru
                      </button>
                    </div>

                    {categories.length === 0 ? (
                      <div className="text-center py-10 text-gray-500">📂 Belum ada kategori.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                              <th className="py-4 px-4 font-semibold">ID</th>
                              <th className="py-4 px-4 font-semibold">Nama Kategori</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories.map((category) => (
                              <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4 font-medium text-gray-900">{category.id}</td>
                                <td className="py-4 px-4 text-gray-700">{category.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ================= MODAL TAMBAH MENU ================= */}
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
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ID Kategori</label>
                  <input type="number" name="categoryId" value={formData.categoryId} onChange={handleInputChange} required min="1" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stok Awal</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required min="0" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Harga (Rp)</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 text-sm" />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-gray-500 bg-gray-100 rounded-xl">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 text-sm font-semibold text-white bg-orange-500 rounded-xl">{submitting ? 'Menyimpan...' : 'Simpan Menu'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL TAMBAH KATEGORI ================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl mx-4">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-800">Tambah Kategori Baru</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Kategori</label>
                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required placeholder="Contoh: Makanan, Minuman..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 text-sm" autoFocus />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-gray-500 bg-gray-100 rounded-xl">Batal</button>
                <button type="submit" disabled={isCategorySubmitting} className="px-5 py-2.5 text-sm font-semibold text-white bg-orange-500 rounded-xl">{isCategorySubmitting ? 'Menyimpan...' : 'Simpan Kategori'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
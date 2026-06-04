'use client'

import { useState, useEffect } from 'react';
import { getMenus, createMenu, updateMenu, deleteMenu, getCategories, createCategory } from '@/lib/api';
import { logout } from '@/lib/auth';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // ===== STATE MENU =====
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalMenu: 0, totalKategori: 0 });

  // ===== STATE MODAL MENU =====
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMenuId, setEditMenuId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [menuForm, setMenuForm] = useState({ name: '', categoryId: '', price: '', stock: '' });

  // ===== STATE MODAL HAPUS =====
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { id, name }
  const [deleting, setDeleting] = useState(false);

  // ===== STATE MODAL KATEGORI =====
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCategorySubmitting, setIsCategorySubmitting] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // ===== FETCH DATA =====
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [menuData, categoryData] = await Promise.all([getMenus(), getCategories()]);
      const menuList = Array.isArray(menuData) ? menuData : (menuData.data || []);
      const categoryList = Array.isArray(categoryData) ? categoryData : (categoryData.data || []);
      setMenus(menuList);
      setCategories(categoryList);
      setStats({ totalMenu: menuList.length, totalKategori: categoryList.length });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ===== MENU CRUD =====
  const openAddMenu = () => {
    setIsEditMode(false);
    setEditMenuId(null);
    setMenuForm({ name: '', categoryId: '', price: '', stock: '' });
    setIsMenuModalOpen(true);
  };

  const openEditMenu = (menu) => {
    setIsEditMode(true);
    setEditMenuId(menu.id);
    setMenuForm({
      name: menu.name || '',
      categoryId: menu.categoryId || menu.category?.id || '',
      price: menu.price || '',
      stock: menu.stock || '',
    });
    setIsMenuModalOpen(true);
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        name: menuForm.name,
        categoryId: Number(menuForm.categoryId),
        price: Number(menuForm.price),
        stock: Number(menuForm.stock),
      };
      if (isEditMode) {
        await updateMenu(editMenuId, payload);
      } else {
        await createMenu(payload);
      }
      setIsMenuModalOpen(false);
      fetchData();
    } catch (err) {
      alert(`Gagal: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMenu = async () => {
    if (!deleteConfirm) return;
    try {
      setDeleting(true);
      await deleteMenu(deleteConfirm.id);
      setDeleteConfirm(null);
      fetchData();
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  // ===== KATEGORI =====
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      setIsCategorySubmitting(true);
      await createCategory({ name: newCategoryName });
      setIsCategoryModalOpen(false);
      setNewCategoryName('');
      fetchData();
    } catch (err) {
      alert(`Gagal: ${err.message}`);
    } finally {
      setIsCategorySubmitting(false);
    }
  };

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Statistik Utama' },
    { id: 'menu', icon: '🍔', label: 'Manajemen Menu' },
    { id: 'kategori', icon: '📂', label: 'Kategori Produk' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

      {/* ===== SIDEBAR ===== */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="flex items-center justify-center h-16 bg-slate-950 border-b border-slate-800">
          <span className="text-lg font-bold tracking-wide text-orange-400">🍱 Kuliner Jos Gandos</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition ${activeTab === item.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <span className="mr-3 text-lg">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm">A</div>
            <span className="text-sm font-medium text-slate-300">Administrator</span>
          </div>
          <button onClick={logout} className="text-slate-400 hover:text-red-400 text-sm transition">🚪</button>
        </div>
      </aside>

      {/* ===== KONTEN UTAMA ===== */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm z-10">
          <p className="text-sm text-gray-500 font-medium hidden md:block">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xl cursor-pointer">🔔</span>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="Avatar" className="w-9 h-9 rounded-full object-cover border-2 border-orange-200" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8">

          {loading && (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-100">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-500 font-medium">Memuat data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-xl">
              <span className="font-bold text-red-700">Error: </span>
              <span className="text-red-600">{error}</span>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* ===== TAB DASHBOARD ===== */}
              {activeTab === 'dashboard' && (
                <div className="max-w-5xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Statistik Utama</h1>
                    <p className="text-gray-500 mt-1 text-sm">Ringkasan data aplikasi Kuliner Jos Gandos.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Menu Aktif</p>
                        <h3 className="text-4xl font-black text-gray-800 mt-2">{stats.totalMenu} <span className="text-sm font-normal text-gray-500">Item</span></h3>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">🍔</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori Kuliner</p>
                        <h3 className="text-4xl font-black text-gray-800 mt-2">{stats.totalKategori} <span className="text-sm font-normal text-gray-500">Jenis</span></h3>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">📂</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== TAB MENU ===== */}
              {activeTab === 'menu' && (
                <div className="max-w-5xl mx-auto">
                  <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">Manajemen Menu</h1>
                    <p className="text-gray-500 mt-1 text-sm">Kelola data menu, harga, dan stok kuliner Anda.</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h2 className="text-base font-bold text-gray-800">Daftar Menu Makanan & Minuman</h2>
                      <button onClick={openAddMenu} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm active:scale-95">
                        + Tambah Menu
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-100 text-left">
                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold tracking-wider">
                          <tr>
                            <th className="px-6 py-4">Nama Kuliner</th>
                            <th className="px-6 py-4">Kategori</th>
                            <th className="px-6 py-4">Harga</th>
                            <th className="px-6 py-4">Stok</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                          {menus.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400">Belum ada menu.</td></tr>
                          ) : menus.map((menu, i) => (
                            <tr key={menu.id || i} className="hover:bg-orange-50/30 transition">
                              <td className="px-6 py-4 font-semibold text-gray-900">{menu.name || '-'}</td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-50 text-orange-700">
                                  {menu.category?.name || `ID: ${menu.categoryId || '-'}`}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-bold text-gray-900">Rp {(menu.price || 0).toLocaleString('id-ID')}</td>
                              <td className="px-6 py-4">
                                <span className={`font-semibold ${menu.stock <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                                  {menu.stock ?? '-'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => openEditMenu(menu)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 transition active:scale-95"
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm({ id: menu.id, name: menu.name })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition active:scale-95"
                                  >
                                    🗑️ Hapus
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== TAB KATEGORI ===== */}
              {activeTab === 'kategori' && (
                <div className="max-w-5xl mx-auto">
                  <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">Manajemen Kategori</h1>
                    <p className="text-gray-500 mt-1 text-sm">Kelola kategori untuk menu kuliner Anda.</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-base font-bold text-gray-800">Daftar Kategori</h2>
                      <button onClick={() => setIsCategoryModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-5 rounded-xl transition text-sm active:scale-95">
                        + Tambah Kategori
                      </button>
                    </div>
                    {categories.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">📂 Belum ada kategori.</div>
                    ) : (
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                            <th className="py-3 px-4">ID</th>
                            <th className="py-3 px-4">Nama Kategori</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map(cat => (
                            <tr key={cat.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition">
                              <td className="py-4 px-4 font-bold text-gray-400 text-sm">{cat.id}</td>
                              <td className="py-4 px-4 font-semibold text-gray-800">{cat.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ===== MODAL TAMBAH / EDIT MENU ===== */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
              <h3 className="text-lg font-extrabold text-gray-900">{isEditMode ? '✏️ Edit Menu' : '➕ Tambah Menu Baru'}</h3>
              <button onClick={() => setIsMenuModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold transition">✕</button>
            </div>
            <form onSubmit={handleMenuSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Nama Menu</label>
                <input type="text" value={menuForm.name} onChange={e => setMenuForm({...menuForm, name: e.target.value})} required placeholder="Contoh: Nasi Goreng Spesial" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none text-sm transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Kategori</label>
                <select value={menuForm.categoryId} onChange={e => setMenuForm({...menuForm, categoryId: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-400 outline-none text-sm transition">
                  <option value="">-- Pilih Kategori --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Harga (Rp)</label>
                  <input type="number" value={menuForm.price} onChange={e => setMenuForm({...menuForm, price: e.target.value})} required min="0" placeholder="25000" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-400 outline-none text-sm transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Stok</label>
                  <input type="number" value={menuForm.stock} onChange={e => setMenuForm({...menuForm, stock: e.target.value})} required min="0" placeholder="10" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-400 outline-none text-sm transition" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 mt-2">
                <button type="button" onClick={() => setIsMenuModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition disabled:opacity-60 active:scale-95">
                  {submitting ? 'Menyimpan...' : isEditMode ? 'Simpan Perubahan' : 'Tambah Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL KONFIRMASI HAPUS ===== */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🗑️</div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Hapus Menu?</h3>
            <p className="text-gray-500 text-sm mb-6">Menu <strong className="text-gray-800">"{deleteConfirm.name}"</strong> akan dihapus permanen dan tidak bisa dikembalikan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition">Batal</button>
              <button onClick={handleDeleteMenu} disabled={deleting} className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition disabled:opacity-60 active:scale-95">
                {deleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL TAMBAH KATEGORI ===== */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
              <h3 className="text-lg font-extrabold text-gray-900">➕ Tambah Kategori</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold transition">✕</button>
            </div>
            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Nama Kategori</label>
                <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} required placeholder="Contoh: Makanan, Minuman..." autoFocus className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-400 outline-none text-sm transition" />
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition">Batal</button>
                <button type="submit" disabled={isCategorySubmitting} className="px-5 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition disabled:opacity-60 active:scale-95">
                  {isCategorySubmitting ? 'Menyimpan...' : 'Simpan Kategori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { getCategories, createCategory } from "../../../lib/api"; // Sesuaikan path ini dengan letak file api.js Anda

export default function KategoriPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk form tambah kategori
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi untuk mengambil data kategori dari backend
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fetchCategories saat halaman pertama kali dimuat
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fungsi untuk mengirim data kategori baru ke backend
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      alert("Nama kategori tidak boleh kosong!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Sesuaikan struktur body ("name") ini dengan yang diminta oleh backend NestJS Anda
      await createCategory({ name: newCategoryName }); 
      
      alert("Kategori berhasil ditambahkan!");
      setIsModalOpen(false);
      setNewCategoryName("");
      
      // Ambil ulang data terbaru setelah berhasil menambah
      fetchCategories(); 
    } catch (error) {
      alert(`Gagal menambahkan kategori: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Kategori</h1>
        <p className="text-gray-500">Kelola daftar kategori untuk menu kuliner Anda di sini.</p>
      </div>

      {/* Box Utama */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Daftar Kategori Kuliner</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors shadow-sm"
          >
            + Tambah Kategori Baru
          </button>
        </div>

        {/* Tabel Data Kategori */}
        {isLoading ? (
          <div className="text-center py-10 text-gray-500 animate-pulse">
            Memuat data kategori...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-10 text-gray-500 flex flex-col items-center">
            <span className="text-4xl mb-3">📂</span>
            <p>Belum ada kategori yang ditambahkan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="py-4 px-4 font-semibold">ID</th>
                  <th className="py-4 px-4 font-semibold">Nama Kategori</th>
                  <th className="py-4 px-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 font-medium text-gray-900">{category.id}</td>
                    <td className="py-4 px-4 text-gray-700">{category.name}</td>
                    <td className="py-4 px-4 text-right">
                      {/* Tombol Hapus / Edit bisa Anda tambahkan di sini ke depannya */}
                      <span className="text-sm text-gray-400 italic">Hanya lihat</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal / Popup Tambah Kategori */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tambah Kategori Baru</h3>
            
            <form onSubmit={handleAddCategory}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Kategori
                </label>
                <input 
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Contoh: Makanan, Minuman, Cemilan..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
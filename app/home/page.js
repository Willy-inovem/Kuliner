'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { getClientRole, logout } from "@/lib/auth";

export default function Home() {
  const [role, setRole] = useState(null);
  const [greeting, setGreeting] = useState("Selamat Datang");

  useEffect(() => {
    const userRole = getClientRole();
    setRole(userRole);

    const hour = new Date().getHours();
    if (hour < 11) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 18) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0] font-sans text-gray-900 overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-orange-100/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md shadow-orange-200 group-hover:scale-105 transition-transform">
              <span className="text-xl">🍽️</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-orange-400 uppercase">Restoran</span>
              <span className="text-lg font-black tracking-tight text-gray-900">KulinerApecu</span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-500">
            <Link href="#menu" className="hover:text-orange-500 transition-colors">Menu Spesial</Link>
            <Link href="#promo" className="hover:text-orange-500 transition-colors">Promo</Link>
            <Link href="/order" className="hover:text-orange-500 transition-colors">Order</Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/order"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-full transition border border-orange-200"
            >
              🛵 Pesan
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full transition shadow-md shadow-orange-200 active:scale-95"
            >
              Keluar
            </button>
          </div>
        </div>
      </nav>

      {/* ================= GREETING HERO ================= */}
      <main className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-6">

        {/* Dekorasi */}
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-orange-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />

        {/* Greeting Banner */}
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-[2rem] overflow-hidden p-8 md:p-12 text-white mb-8 shadow-xl shadow-orange-200">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-orange-200 font-semibold text-sm mb-1 uppercase tracking-widest">{greeting} 👋</p>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Mau makan apa hari ini?</h1>
              <p className="text-orange-100 text-base max-w-md">Temukan hidangan favoritmu dan pesan sekarang. Siap diantar dalam 30 menit!</p>
            </div>
            <Link
              href="/order"
              className="shrink-0 flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-black px-7 py-4 rounded-2xl transition shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-base"
            >
              🛵 Pesan Sekarang
            </Link>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: "🍽️", value: "50+", label: "Menu Tersedia", color: "bg-orange-50 border-orange-100" },
            { icon: "⭐", value: "4.9", label: "Rating Kami", color: "bg-yellow-50 border-yellow-100" },
            { icon: "🛵", value: "30 mnt", label: "Estimasi Antar", color: "bg-green-50 border-green-100" },
            { icon: "🎉", value: "10rb+", label: "Pelanggan Puas", color: "bg-blue-50 border-blue-100" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} border rounded-2xl p-5 flex flex-col items-center text-center gap-1`}>
              <span className="text-3xl mb-1">{stat.icon}</span>
              <span className="text-2xl font-black text-gray-900">{stat.value}</span>
              <span className="text-xs text-gray-500 font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </main>

      {/* ================= MENU SECTION ================= */}
      <section id="menu" className="max-w-7xl mx-auto px-6 lg:px-10 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">Menu Spesial</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Pilihan Terbaik Kami</h2>
          </div>
          <Link href="/menu" className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
            Lihat Semua
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { name: "Nasi Goreng Spesial", desc: "Nasi goreng dengan telur, ayam, dan sambal ulek khas kami.", price: "Rp 35.000", tag: "Best Seller", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", tagColor: "bg-orange-500" },
            { name: "Soto Ayam Lamongan", desc: "Kuah bening segar dengan potongan ayam kampung dan perkedel.", price: "Rp 28.000", tag: "Favorit", img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop", tagColor: "bg-green-500" },
            { name: "Rendang Daging Sapi", desc: "Rendang autentik Padang dimasak perlahan selama 4 jam.", price: "Rp 55.000", tag: "Premium", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop", tagColor: "bg-red-500" },
          ].map((item, i) => (
            <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className={`absolute top-3 left-3 ${item.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>{item.tag}</div>
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-base text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-orange-500">{item.price}</span>
                  <Link href="/order" className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white text-sm font-bold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95">
                    Pesan
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROMO SECTION ================= */}
      <section id="promo" className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 font-bold text-xs uppercase tracking-widest mb-2">🎉 Promo</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Penawaran Spesial</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Promo 1 */}
          <div className="relative bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-7 text-white overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-1/4 -translate-y-1/4" />
            <p className="text-orange-100 text-xs font-bold uppercase tracking-widest mb-2">Promo Hari Ini</p>
            <h3 className="text-2xl font-extrabold mb-2">Diskon 20% Order Pertama!</h3>
            <p className="text-orange-100 text-sm mb-5">Gunakan kode promo saat checkout dan nikmati harga spesial.</p>
            <div className="inline-flex items-center gap-3 bg-white/20 border border-dashed border-white/50 rounded-xl px-5 py-2.5 mb-5">
              <span className="text-xl font-black tracking-widest">KULINER20</span>
            </div>
            <br />
            <Link href="/order" className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-black px-6 py-3 rounded-xl transition text-sm active:scale-95">
              Klaim Sekarang 🚀
            </Link>
          </div>

          {/* Promo 2 */}
          <div className="relative bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl p-7 text-white overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-1/4 -translate-y-1/4" />
            <p className="text-green-100 text-xs font-bold uppercase tracking-widest mb-2">Gratis Ongkir</p>
            <h3 className="text-2xl font-extrabold mb-2">Order di Atas Rp 50rb!</h3>
            <p className="text-green-100 text-sm mb-5">Pesan menu favoritmu senilai minimal Rp 50.000 dan nikmati gratis ongkos kirim ke seluruh area.</p>
            <Link href="/order" className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-green-50 font-black px-6 py-3 rounded-xl transition text-sm active:scale-95">
              Order Sekarang 🛵
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-sm">🍽️</div>
            <span className="font-black text-lg">KulinerApecu</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 KulinerApecu. Semua hak dilindungi.</p>
          <div className="flex items-center gap-6 text-sm text-gray-400 font-medium">
            <Link href="#menu" className="hover:text-orange-400 transition-colors">Menu</Link>
            <Link href="#promo" className="hover:text-orange-400 transition-colors">Promo</Link>
            <Link href="/order" className="hover:text-orange-400 transition-colors">Order</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
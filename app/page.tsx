import Link from "next/link";

export default function Home() {
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
            <Link href="#menu" className="hover:text-orange-500 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-orange-400 hover:after:w-full after:transition-all">
              Menu Spesial
            </Link>
            <Link href="#promo" className="hover:text-orange-500 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-orange-400 hover:after:w-full after:transition-all">
              Promo Bulan Ini
            </Link>
            <Link href="order" className="hover:text-orange-500 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-orange-400 hover:after:w-full after:transition-all">
              Order
            </Link>
          </div>

          {/* Tombol Aksi */}
          <Link
            href="auth/login"
            className="group flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full transition-all shadow-lg shadow-orange-300/40 hover:shadow-orange-400/50 hover:scale-105 active:scale-95"
          >
            <span>Masuk</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <main className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-20 min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24">

        {/* Dekoratif Background */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />

        {/* Bagian Teks (Kiri) */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-orange-100 border border-orange-200/80 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-orange-700 font-bold text-xs uppercase tracking-widest">🔥 Restoran Terfavorit 2024</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-gray-900 tracking-tight">
            Rasakan Sensasi
            <br className="hidden md:block" />
            <span className="relative inline-block mt-1">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
                Rasa Nusantara
              </span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-orange-100 -skew-x-2 z-0 rounded" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
            Sajikan hidangan istimewa dengan rempah pilihan. Nikmati pengalaman kuliner yang tak terlupakan bersama orang-orang tersayang hari ini.
          </p>

          {/* Tombol CTA */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
            <Link
              href="/menu"
              className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-orange-300/40 hover:shadow-orange-400/50 hover:scale-[1.03] active:scale-95 text-base"
            >
              <span>📖</span>
              <span>Lihat Menu Kami</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link
              href="order"
              className="flex items-center justify-center gap-2.5 bg-white hover:bg-orange-50 text-gray-800 border-2 border-gray-200 hover:border-orange-300 px-8 py-4 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md active:scale-95 text-base"
            >
              <span>🛵</span>
              <span>Pesan Sekarang</span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-5">
            <div className="flex -space-x-3">
              <img className="w-11 h-11 rounded-full border-2 border-white object-cover shadow-md" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User 1" />
              <img className="w-11 h-11 rounded-full border-2 border-white object-cover shadow-md" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="User 2" />
              <img className="w-11 h-11 rounded-full border-2 border-white object-cover shadow-md" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User 3" />
              <div className="w-11 h-11 rounded-full border-2 border-white bg-orange-500 flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-black">+9k</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-sm text-gray-500">Disukai <strong className="text-gray-900 font-bold">10.000+</strong> pelanggan</p>
            </div>
          </div>
        </div>

        {/* Bagian Gambar (Kanan) */}
        <div className="flex-1 w-full max-w-md relative mt-10 md:mt-0">

          {/* Efek Glow */}
          <div className="absolute inset-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-[60px] opacity-25 animate-pulse" style={{ animationDuration: '4s' }} />

          {/* Frame gambar utama */}
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-200/60 border-4 border-white aspect-square">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
              alt="Semangkuk makanan sehat dan lezat"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay gradient bawah */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Badge Rating - Melayang Kiri Bawah */}
          <div className="absolute -bottom-4 -left-4 z-20 bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-100/80 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl shrink-0">⭐</div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Rating</p>
              <p className="text-lg font-black text-gray-900 leading-none">4.9 / 5.0</p>
            </div>
          </div>

          {/* Badge Order - Melayang Kanan Atas */}
          <div className="absolute -top-4 -right-4 z-20 bg-gradient-to-br from-orange-500 to-red-500 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3" style={{ animation: 'bounce 3.5s ease-in-out infinite' }}>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-base shrink-0">🛵</div>
            <div>
              <p className="text-[10px] text-orange-100 font-bold uppercase tracking-wider">Hari ini</p>
              <p className="text-sm font-black text-white leading-none">+230 Order</p>
            </div>
          </div>

          {/* Badge Menu Populer - Kanan Tengah */}
          <div className="absolute top-1/2 -right-6 z-20 bg-white px-3 py-2.5 rounded-xl shadow-lg border border-gray-100/80 flex flex-col items-center gap-1 -translate-y-1/2">
            <span className="text-xl">🍜</span>
            <p className="text-[10px] font-bold text-gray-700 text-center leading-tight">Menu<br/>Populer</p>
          </div>
        </div>
      </main>

      {/* ================= STATS BAR ================= */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "🍽️", value: "50+", label: "Menu Tersedia" },
            { icon: "⭐", value: "4.9", label: "Rating Rata-rata" },
            { icon: "👨‍🍳", value: "12", label: "Chef Berpengalaman" },
            { icon: "🛵", value: "30 mnt", label: "Estimasi Delivery" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-2xl md:text-3xl font-black text-gray-900">{stat.value}</span>
              <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MENU SECTION ================= */}
      <section id="menu" className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">Menu Spesial</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Pilihan Terbaik Kami</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Disiapkan dengan bahan-bahan segar pilihan dan bumbu rempah autentik Nusantara.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Nasi Goreng Spesial", desc: "Nasi goreng dengan telur, ayam, dan sambal ulek khas kami.", price: "Rp 35.000", tag: "Best Seller", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", tagColor: "bg-orange-500" },
            { name: "Soto Ayam Lamongan", desc: "Kuah bening segar dengan potongan ayam kampung dan perkedel.", price: "Rp 28.000", tag: "Favorit", img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop", tagColor: "bg-green-500" },
            { name: "Rendang Daging Sapi", desc: "Rendang autentik Padang dimasak perlahan selama 4 jam.", price: "Rp 55.000", tag: "Premium", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop", tagColor: "bg-red-500" },
          ].map((item, i) => (
            <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-52 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className={`absolute top-3 left-3 ${item.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>{item.tag}</div>
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-lg text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-orange-500">{item.price}</span>
                  <Link href="/order" className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white text-sm font-bold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95">
                    <span>Pesan</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/menu" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-bold text-base border-2 border-orange-200 hover:border-orange-400 px-8 py-3.5 rounded-2xl transition-all hover:bg-orange-50 active:scale-95">
            Lihat Semua Menu
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* ================= PROMO SECTION ================= */}
      <section id="promo" className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-[2rem] overflow-hidden p-10 md:p-16 text-white text-center shadow-2xl shadow-orange-300/50">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-white/30">🎉 Promo Bulan Ini</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Diskon 20% untuk<br />Order Pertamamu!</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-lg mx-auto">Gunakan kode promo di bawah saat checkout dan nikmati hidangan terbaik kami dengan harga spesial.</p>
            <div className="inline-flex items-center gap-4 bg-white/15 backdrop-blur-sm border-2 border-dashed border-white/50 rounded-2xl px-8 py-4 mb-8">
              <span className="text-3xl font-black tracking-widest">KULINER20</span>
            </div>
            <br />
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-black px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-base"
            >
              Klaim Promo Sekarang 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-10">
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
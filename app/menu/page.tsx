import Link from "next/link";

export default function MenuPage() {
  // Data statis menu sesuai permintaan Anda
  // Ke depannya, data ini bisa Anda ganti menggunakan fetchAPI() dari backend
  const menuItems = [
    {
      id: 1,
      name: "Nasi Goreng Spesial",
      description: "Nasi goreng lezat dengan racikan bumbu rahasia, dilengkapi telur mata sapi, ayam suwir, sosis, dan kerupuk renyah.",
      price: 25000,
      category: "Makanan Utama",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop", 
    },
    {
      id: 2,
      name: "Es Teh Manis",
      description: "Kesegaran teh hitam pilihan yang diseduh dengan takaran gula asli yang pas dan es batu kristal.",
      price: 3000,
      category: "Minuman",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop", 
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50/50 font-sans text-gray-900 pb-20">
      
      {/* Navbar Sederhana (opsional, untuk tombol kembali) */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/home" className="text-gray-500 hover:text-orange-500 font-medium flex items-center gap-2 transition">
            <span>←</span> Kembali ke Beranda
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Menu Kuliner</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 mt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Menu Spesial Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Pilih hidangan favorit Anda dari daftar menu terbaik kami. Dibuat dengan bahan segar dan resep Nusantara yang autentik.
          </p>
        </div>

        {/* Grid Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Gambar Menu */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wide">
                  {item.category}
                </div>
              </div>

              {/* Detail Menu */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-lg font-black text-orange-500 whitespace-nowrap">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                </div>
                
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {item.description}
                </p>

                {/* Tombol Pesan */}
                <button className="w-full bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2">
                  <span>🛒</span> Tambah ke Pesanan
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
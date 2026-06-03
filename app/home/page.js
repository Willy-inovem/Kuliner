import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50/50 font-sans text-gray-900 overflow-x-hidden">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl transition-transform group-hover:rotate-12">🍽️</span>
            <span className="text-xl font-black tracking-tight text-orange-600">
              KulinerApecu
            </span>
          </Link>

          {/* Menu Desktop - Jarak dirapikan dengan gap-10 agar lebih lega & proporsional */}
          <div className="hidden md:flex items-center gap-10 font-semibold text-gray-600 text-sm tracking-wide">
            <Link href="#menu" className="hover:text-orange-500 transition-colors duration-200">
              Menu Spesial
            </Link>
            <Link href="#promo" className="hover:text-orange-500 transition-colors duration-200">
              Promo Bulan Ini
            </Link>
            <Link href="/order" className="hover:text-orange-500 transition-colors duration-200">
              Order
            </Link>
          </div>

          {/* Tombol Aksi - Dipisah antara Masuk (Login) dan Daftar (Register) */}
          <div className="flex items-center gap-3">
            <Link 
              href="/auth/login" 
              className="px-5 py-2.5 text-sm font-bold text-orange-600 hover:text-orange-700 bg-transparent hover:bg-orange-50 border border-orange-200 hover:border-orange-400 rounded-full transition duration-200"
            >
              Masuk
            </Link>
            <Link 
              href="/auth/register" 
              className="px-5 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-full transition shadow-md hover:shadow-lg active:scale-95 duration-200"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <main className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Bagian Teks (Kiri) */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-100 text-orange-700 font-bold text-xs uppercase tracking-widest border border-orange-200">
            🔥 Restoran Terfavorit 2024
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-gray-900 tracking-tight">
            Rasakan Sensasi <br className="hidden md:block"/> 
            <span className="text-orange-500">Rasa Nusantara</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
            Sajikan hidangan istimewa dengan rempah pilihan. Nikmati pengalaman kuliner yang tak terlupakan bersama orang-orang tersayang hari ini.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/menu" 
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition shadow-lg shadow-orange-500/30 active:scale-95 text-lg"
            >
              📖 Lihat Menu Kami
            </Link>
            <Link 
              href="/order" 
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full font-bold transition shadow-sm active:scale-95 text-lg"
            >
              🛵 Pesan Sekarang
            </Link>
          </div>
          
          <div className="mt-10 flex items-center gap-4 text-sm font-medium text-gray-500">
            <div className="flex -space-x-2">
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User 1" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="User 2" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User 3" />
            </div>
            <p>Disukai oleh <strong className="text-gray-900">10,000+</strong> pelanggan.</p>
          </div>
        </div>

        {/* Bagian Gambar (Kanan) */}
        <div className="flex-1 w-full max-w-lg relative mt-10 md:mt-0">
          <div className="absolute inset-0 bg-orange-400 rounded-full blur-[80px] opacity-30 animate-pulse"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" 
            alt="Semangkuk makanan sehat dan lezat" 
            className="relative z-10 w-full h-auto aspect-square object-cover rounded-full shadow-2xl border-[12px] border-white"
          />

          {/* Badge Melayang (Floating Badge) */}
          <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Rating</p>
              <p className="text-lg font-black text-gray-900">4.9 / 5.0</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
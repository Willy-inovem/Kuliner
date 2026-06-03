'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMenus, createOrder } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function OrderPage() {
  const router = useRouter();
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingMenus, setIsLoadingMenus] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }
    
    // Fetch data dengan loading state
    setIsLoadingMenus(true);
    getMenus()
      .then((data) => {
        // Pastikan format datanya array
        const menuList = Array.isArray(data) ? data : (data?.data || []);
        setMenus(menuList);
      })
      .catch((err) => console.error("Gagal memuat menu:", err))
      .finally(() => setIsLoadingMenus(false));
  }, [router]);

  // ================= LOGIKA KERANJANG =================
  const addToCart = (menu) => {
    const existingItem = cart.find(item => item.menuId === menu.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.menuId === menu.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        menuId: menu.id,
        name: menu.name || menu.nama, // Antisipasi penamaan field API
        price: menu.price || menu.harga,
        quantity: 1
      }]);
    }
  };

  const removeFromCart = (menuId) => {
    const existingItem = cart.find(item => item.menuId === menuId);
    if (existingItem.quantity > 1) {
      setCart(cart.map(item => 
        item.menuId === menuId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    } else {
      setCart(cart.filter(item => item.menuId !== menuId));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ================= SUBMIT PESANAN =================
  const submitOrder = async () => {
    if (cart.length === 0) {
      alert('Keranjang masih kosong, bosku! Pilih menu dulu.');
      return;
    }

    setLoading(true);
    const token = getToken();
    
    try {
      const orderData = {
        items: cart.map(item => ({
          menuId: item.menuId,
          quantity: item.quantity
        })),
        totalPrice: totalPrice
      };
      
      await createOrder(orderData, token);
      alert('Mantap! Pesanan berhasil dibuat! 🚀');
      setCart([]);
      router.push('/');
    } catch (error) {
      alert('Yah, gagal membuat pesanan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      
      {/* ================= HEADER ================= */}
      <header className="bg-slate-900 text-white py-8 px-6 md:px-12 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-orange-500">
              🍱 Buat Pesanan Baru
            </h1>
            <p className="text-slate-400 mt-1 text-sm md:text-base">
              Pilih menu andalan pelanggan dan masukkan ke keranjang.
            </p>
          </div>
          <button 
            onClick={() => router.push('/home')}
            className="text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition"
          >
            Kembali ke Home
          </button>
        </div>
      </header>

      {/* ================= KONTEN UTAMA ================= */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 grid lg:grid-cols-3 gap-8">
        
        {/* KIRI: DAFTAR MENU */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Daftar Menu Tersedia</h2>
            <span className="text-sm font-semibold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
              {menus.length} Item
            </span>
          </div>

          {isLoadingMenus ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-500 font-medium">Memuat menu lezat...</p>
            </div>
          ) : menus.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <span className="text-4xl">🍽️</span>
              <p className="text-gray-500 mt-3 font-medium">Belum ada menu yang tersedia.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {menus.map(menu => (
                <div key={menu.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  {/* Visual Placeholder (Opsional, buat mempercantik) */}
                  <div className="h-32 bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {menu.kategori === 'Minuman' || menu.category?.name === 'Minuman' ? '🍹' : '🍜'}
                    </span>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{menu.name || menu.nama}</h3>
                    <p className="text-orange-600 font-extrabold text-lg mt-1 mb-4">
                      Rp {(menu.price || menu.harga || 0).toLocaleString('id-ID')}
                    </p>
                    
                    <button
                      onClick={() => addToCart(menu)}
                      className="mt-auto w-full bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white font-bold py-2.5 rounded-xl transition-colors border border-orange-200 hover:border-orange-500"
                    >
                      + Tambah Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* KANAN: KERANJANG BELANJA (STICKY) */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h2 className="font-bold text-xl text-gray-800 flex items-center">
                🛒 Keranjang Pesanan
              </h2>
              <span className="bg-orange-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-2xl mb-3">🛍️</div>
                <p className="text-gray-400 font-medium">Keranjang masih kosong.</p>
                <p className="text-gray-400 text-sm mt-1">Yuk, tambah menu dulu!</p>
              </div>
            ) : (
              <div className="flex flex-col h-full max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.menuId} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-sm font-bold text-gray-800 truncate">{item.name}</h4>
                      <div className="text-xs font-medium text-gray-500 mt-1">
                        Rp {item.price?.toLocaleString('id-ID')} <span className="text-gray-300 mx-1">x</span> {item.quantity}
                      </div>
                    </div>
                    
                    {/* Tombol Plus Minus */}
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                      <button 
                        onClick={() => removeFromCart(item.menuId)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-gray-700 w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart({ id: item.menuId, name: item.name, price: item.price })}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* RINGKASAN TOTAL */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-bold uppercase text-sm tracking-wider">Total Pembayaran</span>
                <span className="text-2xl font-black text-slate-800">
                  Rp {totalPrice?.toLocaleString('id-ID')}
                </span>
              </div>
              
              <button
                onClick={submitOrder}
                disabled={loading || cart.length === 0}
                className={`w-full py-3.5 rounded-xl font-bold text-lg flex justify-center items-center gap-2 transition-all duration-300 shadow-lg ${
                  loading || cart.length === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                    : 'bg-green-500 hover:bg-green-600 text-white hover:shadow-green-500/30 hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Memproses...
                  </>
                ) : (
                  <>✅ Konfirmasi Pesanan</>
                )}
              </button>
            </div>
            
          </div>
        </div>

      </main>
    </div>
  );
}
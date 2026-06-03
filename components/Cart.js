'use client';

import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { createOrder } from '@/lib/api';

export default function Cart({ cart, setCart }) {
  const router = useRouter();
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleCheckout = async () => {
    const token = getToken();
    if (!token) {
      alert('Silakan login terlebih dahulu');
      router.push('/login');
      return;
    }

    const orderData = {
      items: cart.map(item => ({
        menuId: item.id,
        quantity: item.quantity
      })),
      totalPrice: totalPrice
    };

    try {
      const result = await createOrder(orderData, token);
      alert('Pesanan berhasil dibuat!');
      setCart([]);
      router.push('/order/history');
    } catch (error) {
      alert('Gagal membuat pesanan: ' + error.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mt-4">
        <p className="text-gray-500 text-center">Keranjang kosong</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h2 className="font-bold text-lg mb-3">Keranjang Belanja</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {cart.map(item => (
          <div key={item.id} className="border-b pb-2">
            <div className="flex justify-between">
              <span className="font-medium">{item.name}</span>
              <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm">
                Hapus
              </button>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-600">
                Rp {item.price?.toLocaleString()} x 
              </span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                min="1"
                className="w-16 p-1 border rounded text-center"
              />
              <span className="font-semibold">
                Rp {(item.price * item.quantity)?.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-2 border-t">
        <div className="flex justify-between font-bold mb-3">
          <span>Total:</span>
          <span>Rp {totalPrice?.toLocaleString()}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
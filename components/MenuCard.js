'use client';

import { useState } from 'react';

export default function MenuCard({ menu, onAddToCart }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(menu);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{menu.name}</h3>
      <p className="text-gray-600 mb-2">
        Harga: Rp {menu.price?.toLocaleString()}
      </p>
      {menu.category && (
        <p className="text-sm text-gray-500 mb-3">
          Kategori: {menu.category.name}
        </p>
      )}
      {menu.description && (
        <p className="text-sm text-gray-600 mb-4">{menu.description}</p>
      )}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        {isAdding ? 'Ditambahkan!' : 'Tambah ke Keranjang'}
      </button>
    </div>
  );
}
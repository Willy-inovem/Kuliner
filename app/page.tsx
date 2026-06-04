// app/page.tsx
'use client'; // Kalau pake hooks/state

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Kode kamu di sini
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {/* Konten lainnya */}
    </div>
  );
}
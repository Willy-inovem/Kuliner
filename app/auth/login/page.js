"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { setAuthToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(form);

      if (result.access_token) {
        // Simpan token dan data user
        setAuthToken(result.access_token, result.user);

        // Ambil role dan paksa jadi huruf kecil semua untuk menghindari salah deteksi
        const userRole = result.user?.role?.toLowerCase();

        const userRole = result.user?.role?.toLowerCase();

        if (userRole === "admin") {
          router.push("/dashboard"); // admin ke /dashboard
        } else {
          router.push("/home"); // user biasa ke /home
        }
        // -------------------------------

        router.refresh();
      } else {
        alert("Login gagal: " + (result.message || "Username/password salah"));
      }
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background gradient penuh satu layar
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      {/* Kotak Card Login */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Bagian Judul */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            🍽️ Kuliner Apeci Apecu
          </h1>
          <p className="text-black text-sm">Silakan masuk ke akun Anda</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              placeholder="Masukkan username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              required
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              required
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-md mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </span>
            ) : (
              "Masuk ke Akun"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { setAuthToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(form);

      if (result.access_token) {
        setAuthToken(result.access_token, result.user);

        // ✅ FIX: hanya 1 deklarasi userRole, cek "admin" huruf kecil
        const userRole = result.user?.role?.toLowerCase();

        if (userRole === "admin") {
          router.push("/dashboard"); // admin ke /dashboard
        } else {
          router.push("/home"); // user biasa ke /home
        }

        router.refresh();
      } else {
        setError(result.message || "Username atau password salah");
      }
    } catch (error) {
      setError("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] p-4 relative overflow-hidden">

      {/* Dekorasi Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-200 rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-100 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-orange-100 border border-orange-100 overflow-hidden">

        {/* Header Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 px-8 pt-10 pb-8 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-4xl">🍽️</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1 tracking-tight">
            KulinerApecu
          </h1>
          <p className="text-orange-100 text-sm font-medium">
            Masuk untuk melanjutkan
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8 space-y-5">

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              <span className="text-base">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Input Username */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Masukkan username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
                required
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-2 text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Memproses...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Masuk ke Akun
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400 font-medium">Belum punya akun?</span>
            </div>
          </div>

          {/* Link Register */}
          <a
            href="/auth/register"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 hover:text-orange-600 font-bold text-sm transition-all active:scale-[0.98]"
          >
            Daftar Akun Baru
          </a>

        </div>
      </div>
    </div>
  );
}
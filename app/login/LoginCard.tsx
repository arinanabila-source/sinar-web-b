"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function LoginCard() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      alert("Username dan Password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Username atau Password salah.");
        return;
      }

      localStorage.setItem("isLogin", "true");
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-full max-w-[1100px] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT - LOGIN FORM */}
        <div className="flex items-center justify-center px-6 py-10 md:px-10 md:py-12 lg:px-12">

          <div className="w-full max-w-[390px]">

            {/* Logo */}
            <div className="flex justify-center mb-7">
              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={105}
                height={105}
                priority
                className="object-contain"
              />
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                Welcome Back
              </p>

              <h1 className="mt-3 text-3xl font-bold text-[var(--foreground)]">
                Selamat Datang
              </h1>

              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Login untuk mengakses Dashboard Admin
                Website SINAR.
              </p>
            </div>

            {/* Username */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-[var(--foreground)]">
                Username
              </label>

              <div className="h-12 rounded-xl border border-[var(--border)] bg-[var(--background)] flex items-center px-4 transition-all focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20">
                <Mail
                  size={19}
                  className="shrink-0 text-[var(--muted)]"
                />

                <input
                  autoComplete="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  placeholder="Masukkan Username"
                  className="flex-1 min-w-0 ml-3 outline-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-5">
              <label className="block mb-2 text-sm font-semibold text-[var(--foreground)]">
                Password
              </label>

              <div className="h-12 rounded-xl border border-[var(--border)] bg-[var(--background)] flex items-center px-4 transition-all focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20">
                <Lock
                  size={19}
                  className="shrink-0 text-[var(--muted)]"
                />

                <input
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  placeholder="Masukkan Password"
                  className="flex-1 min-w-0 ml-3 outline-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mt-4">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 mt-6 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                "Memproses..."
              ) : (
                <>
                  Masuk ke Dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 mt-7 text-[var(--muted)]">
              <ShieldCheck size={16} className="text-[var(--success)]" />
              <span className="text-xs">
                Secure Access • SINAR Platform
              </span>
            </div>

          </div>
        </div>

        {/* RIGHT - DESKTOP IMAGE */}
        <div className="relative hidden lg:block min-h-[580px] overflow-hidden">

          <Image
            src="/image/gedung1.jpeg"
            alt="Gedung SINAR"
            fill
            priority
            sizes="(max-width: 1024px) 0px, 55vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1722]/95 via-[#172B3A]/45 to-[#172B3A]/10" />

          <div className="absolute inset-0 flex flex-col justify-end p-10 xl:p-14">

            <div className="mb-6 flex items-center gap-2">
              <span className="rounded-full bg-[#D5B66B] px-4 py-2 text-xs font-bold tracking-wide text-[#172B3A]">
                DIGITAL INFORMATION PLATFORM
              </span>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D5B66B]">
              Welcome to SINAR
            </p>

            <h2 className="mt-4 text-4xl xl:text-5xl font-bold leading-tight text-white">
              Sistem Informasi
              Ngaji & Administrasi
            </h2>

            <div className="mt-6 h-1 w-16 rounded-full bg-[#D5B66B]" />

            <p className="mt-6 max-w-md text-sm leading-8 text-white/85">
              Platform digital untuk mengelola administrasi,
              jadwal kegiatan, inventaris, laporan keuangan,
              pengurus, dan seluruh informasi masjid dalam
              satu sistem yang modern, cepat, dan transparan.
            </p>

            <div className="mt-10 border-t border-white/20 pt-6">
              <p className="text-xs tracking-wide text-white/60">
                SINAR — Sistem Informasi, Ngaji, dan Administrasi
                Rumah Ibadah
              </p>
            </div>
          </div>
        </div>

        {/* MOBILE IMAGE */}
        <div className="relative h-[230px] overflow-hidden lg:hidden">

          <Image
            src="/image/gedung1.jpeg"
            alt="Gedung SINAR"
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#111C29]/90 to-[#111C29]/30" />

          <div className="absolute inset-0 flex flex-col justify-center px-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D5B66B]">
              Welcome to SINAR
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
              Sistem Informasi
              Ngaji & Administrasi
            </h2>

            <p className="mt-3 text-xs leading-6 text-white/80">
              Modern, cepat, dan transparan.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
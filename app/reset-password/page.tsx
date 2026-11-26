"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      setMessage("Link reset password tidak valid.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const result = await response.json();
      setMessage(result.message || "Permintaan selesai diproses.");

      if (response.ok) {
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-8 md:py-12">

      <div className="w-full max-w-[1100px] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT - RESET FORM */}
        <div className="flex items-center justify-center px-6 py-10 md:px-10 lg:px-12">

          <div className="w-full max-w-[390px]">

            {/* Logo */}
            <div className="flex justify-center mb-7">
              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={100}
                height={100}
                priority
                className="object-contain"
              />
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                Account Security
              </p>

              <h1 className="mt-3 text-3xl font-bold text-[var(--foreground)]">
                Reset Password
              </h1>

              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Buat password baru untuk akun admin
                Website SINAR kamu.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Password Baru */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[var(--foreground)]">
                  Password Baru
                </label>

                <div className="h-12 rounded-xl border border-[var(--border)] bg-[var(--background)] flex items-center px-4 transition-all focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20">
                  <Lock size={19} className="shrink-0 text-[var(--muted)]" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password baru"
                    autoComplete="new-password"
                    className="flex-1 min-w-0 ml-3 outline-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="text-[var(--muted)] hover:text-[var(--accent)]"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div className="mt-5">
                <label className="block mb-2 text-sm font-semibold text-[var(--foreground)]">
                  Konfirmasi Password
                </label>

                <div className="h-12 rounded-xl border border-[var(--border)] bg-[var(--background)] flex items-center px-4 transition-all focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20">
                  <Lock size={19} className="shrink-0 text-[var(--muted)]" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password baru"
                    autoComplete="new-password"
                    className="flex-1 min-w-0 ml-3 outline-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] text-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? "Sembunyikan password" : "Tampilkan password"}
                    className="text-[var(--muted)] hover:text-[var(--accent)]"
                  >
                    {showConfirm ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] p-3">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                  <p className="text-xs leading-6 text-[var(--foreground)]">
                    {message}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-6 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Memproses..."
                ) : (
                  <>
                    Simpan Password Baru
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </form>

            {/* Back to Login */}
            <div className="flex justify-center mt-7">
              <Link
                href="/login"
                className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                Kembali ke Login
              </Link>
            </div>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 mt-7 text-[var(--muted)]">
              <ShieldCheck size={16} className="text-[var(--success)]" />
              <span className="text-xs">
                Secure Password Recovery
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

            <span className="inline-flex w-fit rounded-full bg-[#D5B66B] px-4 py-2 text-xs font-bold tracking-wide text-[#172B3A]">
              ACCOUNT RECOVERY
            </span>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#D5B66B]">
              Secure Your Account
            </p>

            <h2 className="mt-4 text-4xl xl:text-5xl font-bold leading-tight text-white">
              Your Account,
              <br />
              Your Security.
            </h2>

            <div className="mt-6 h-1 w-16 rounded-full bg-[#D5B66B]" />

            <p className="mt-6 max-w-md text-sm leading-8 text-white/85">
              Buat password baru yang aman untuk
              melindungi akses akun dan informasi
              pada platform digital SINAR.
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
        <div className="relative h-[210px] overflow-hidden lg:hidden">

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
              Account Recovery
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
              Secure Your Account
            </h2>

            <p className="mt-3 text-xs leading-6 text-white/80">
              Protect your SINAR account.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--background)]" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
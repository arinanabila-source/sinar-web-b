"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowLeft, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.trim()) {
      setMessage("Username wajib diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();
      setMessage(result.message || "Permintaan selesai diproses.");
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-8">

      <section className="w-full max-w-[1050px] overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-2xl">

        <div className="grid lg:grid-cols-[44%_56%]">

          {/* LEFT SIDE */}

          <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">

            <div className="w-full max-w-[370px]">

              {/* LOGO */}

              <div className="mb-7 flex justify-center">
                <Image
                  src="/image/logo2 - Edited2.png"
                  alt="SINAR"
                  width={105}
                  height={105}
                  priority
                  className="object-contain"
                />
              </div>

              {/* HEADING */}

              <div className="text-center">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                  Account Recovery
                </p>

                <h1 className="mt-3 text-3xl font-bold text-[var(--foreground)]">
                  Lupa Password?
                </h1>

                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Jangan khawatir. Masukkan username
                  akun admin kamu untuk menerima link
                  reset password melalui email.
                </p>

              </div>

              {/* FORM */}

              <form onSubmit={handleSubmit} className="mt-9">

                <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                  Username
                </label>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 transition focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20">

                  <Mail size={19} className="text-[var(--muted)]" />

                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan Username"
                    autoComplete="username"
                    className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                  />

                </div>

                {/* MESSAGE */}

                {message && (
                  <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3">
                    <p className="text-center text-xs leading-6 text-[var(--foreground)]">
                      {message}
                    </p>
                  </div>
                )}

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-sm font-bold text-[#172B3A] shadow-md transition hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Mengirim..." : "Kirim Link Reset"}
                </button>

              </form>

              {/* SECURITY INFO */}

              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
                <ShieldCheck size={16} className="text-[var(--success)]" />
                <span>Secure Account Recovery</span>
              </div>

              {/* BACK TO LOGIN */}

              <div className="mt-7 flex justify-center">

                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--accent)]"
                >
                  <ArrowLeft size={16} />
                  Kembali ke Login
                </Link>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="relative hidden min-h-[590px] overflow-hidden lg:block">

            <Image
              src="/image/gedung1.jpeg"
              alt="Gedung SINAR"
              fill
              priority
              sizes="56vw"
              className="object-cover"
            />

            {/* IMAGE OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-br from-[#111C29]/90 via-[#172B3A]/65 to-[#111C29]/40" />

            {/* DECORATION */}

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />

            {/* CONTENT */}

            <div className="absolute bottom-12 left-10 right-10">

              <span className="inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#172B3A]">
                SINAR Digital Platform
              </span>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
                Account Security
              </p>

              <h2 className="mt-4 text-[38px] font-bold leading-tight text-white">
                Your Account,
                <br />
                Your Security.
              </h2>

              <div className="mt-5 h-1 w-16 rounded-full bg-[var(--accent)]" />

              <p className="mt-6 max-w-[390px] text-sm leading-8 text-white/80">
                Lindungi akun dan akses kembali
                platform SINAR dengan proses
                pemulihan password yang aman
                dan mudah.
              </p>

              <div className="mt-12 border-t border-white/20 pt-5">
                <p className="text-xs text-white/60">
                  SINAR — Sistem Informasi, Ngaji,
                  dan Administrasi Rumah Ibadah
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
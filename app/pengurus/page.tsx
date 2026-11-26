"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Users, UserRound, Building2 } from "lucide-react";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";
import { supabase } from "../lib/supabase";

interface PengurusData {
  id: number;
  nama: string;
  jabatan: string;
  foto: string | null;
}

export default function PengurusPage() {
  const [pengurus, setPengurus] = useState<PengurusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPengurus();
  }, []);

  async function getPengurus() {
    setLoading(true);

    const { data, error } = await supabase
      .from("pengurus")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setPengurus(data || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <section className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">

        {/* Page Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent)]">
              <Building2 size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                SINAR Organization
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">
                Organization Structure
              </p>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Informasi Pengurus
          </h1>

          <p className="mt-3 text-sm md:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
            Kenali para pengurus yang berperan dalam menjalankan
            kegiatan dan pengelolaan yayasan.
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-8 shadow-sm">

          <div className="flex items-center gap-4 mb-8 pb-5 border-b border-[var(--border)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--accent)]">
              <Users size={22} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                Our Team
              </p>
              <h2 className="text-xl md:text-2xl font-bold mt-1">
                Daftar Pengurus
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-5"
                >
                  <div className="mx-auto h-36 w-36 rounded-2xl bg-[var(--border)]" />
                  <div className="mt-6 h-5 w-32 rounded bg-[var(--border)] mx-auto" />
                  <div className="mt-4 h-4 w-24 rounded bg-[var(--border)] mx-auto" />
                </div>
              ))}
            </div>
          ) : pengurus.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent)]">
                <UserRound size={38} />
              </div>

              <h2 className="mt-6 text-xl md:text-2xl font-bold">
                Belum Ada Pengurus
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                Data pengurus akan ditampilkan di sini setelah
                ditambahkan oleh administrator.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pengurus.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-xl"
                >
                  {/* Photo */}
                  <div className="px-5 pt-7">
                    <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
                      {item.foto ? (
                        <Image
                          src={item.foto}
                          alt={item.nama}
                          fill
                          sizes="160px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[var(--accent)]">
                          <UserRound size={55} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Information */}
                  <div className="px-5 pt-6 pb-7 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                      Management Team
                    </p>

                    <h3 className="mt-3 text-lg font-bold leading-snug">
                      {item.nama}
                    </h3>

                    <div className="mx-auto my-4 h-1 w-12 rounded-full bg-[var(--accent)]" />

                    <p className="text-sm font-semibold text-[var(--muted)]">
                      {item.jabatan}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
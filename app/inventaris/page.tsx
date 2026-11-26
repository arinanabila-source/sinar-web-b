"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Package, Boxes, Archive } from "lucide-react";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";
import { supabase } from "../lib/supabase";

interface InventarisData {
  id: number;
  nama_alat: string;
  jumlah: number;
  foto: string | null;
}

export default function InventarisPage() {
  const [inventaris, setInventaris] = useState<InventarisData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInventaris();
  }, []);

  async function getInventaris() {
    setLoading(true);

    const { data, error } = await supabase
      .from("inventaris")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setInventaris(data ?? []);
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
              <Package size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                SINAR Organization
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">
                Asset & Equipment Management
              </p>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Inventaris Masjid
          </h1>

          <p className="mt-3 text-sm md:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
            Informasi perlengkapan dan aset masjid yang tersedia
            untuk menunjang berbagai kegiatan operasional.
          </p>
        </div>

        {/* Inventory Content */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-8 shadow-sm">

          <div className="flex items-center gap-4 mb-8 pb-5 border-b border-[var(--border)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--accent)]">
              <Boxes size={22} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                Asset Overview
              </p>
              <h2 className="text-xl md:text-2xl font-bold mt-1">
                Daftar Inventaris
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
                  <div className="h-48 rounded-xl bg-[var(--border)]" />
                  <div className="mt-5 h-5 w-32 rounded bg-[var(--border)]" />
                  <div className="mt-4 h-4 w-20 rounded bg-[var(--border)]" />
                </div>
              ))}
            </div>
          ) : inventaris.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent)]">
                <Archive size={38} />
              </div>

              <h2 className="mt-6 text-xl md:text-2xl font-bold">
                Belum Ada Inventaris
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                Data inventaris akan ditampilkan di sini setelah
                ditambahkan oleh administrator.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {inventaris.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative m-4 mb-0 h-48 overflow-hidden rounded-xl bg-[var(--surface-secondary)]">
                    {item.foto ? (
                      <Image
                        src={item.foto}
                        alt={item.nama_alat}
                        fill
                        sizes="(max-width:768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[var(--accent)]">
                        <Package size={55} />
                      </div>
                    )}

                    {/* Quantity Badge */}
                    <div className="absolute top-3 right-3 rounded-full bg-[var(--primary)] text-[var(--accent)] border border-[var(--accent)]/40 px-4 py-2 text-xs font-bold shadow-lg">
                      {item.jumlah} pcs
                    </div>
                  </div>

                  {/* Information */}
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                      Inventory Item
                    </p>

                    <h3 className="mt-2 text-lg font-bold leading-snug">
                      {item.nama_alat}
                    </h3>

                    <div className="my-4 h-1 w-12 rounded-full bg-[var(--accent)]" />

                    <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                      <span className="text-xs text-[var(--muted)]">
                        Jumlah tersedia
                      </span>
                      <span className="text-sm font-bold">
                        {item.jumlah} unit
                      </span>
                    </div>
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
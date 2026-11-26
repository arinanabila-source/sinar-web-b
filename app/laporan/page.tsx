"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Wallet,
  TrendingUp,
  ReceiptText,
} from "lucide-react";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";
import { supabase } from "../lib/supabase";

interface LaporanData {
  id: number;
  tanggal: string;
  jenis: string;
  kategori: string;
  deskripsi: string;
  jumlah: number;
  status: string;
}

export default function LaporanPage() {
  const [laporan, setLaporan] = useState<LaporanData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLaporan();
  }, []);

  async function getLaporan() {
    setLoading(true);

    const { data, error } = await supabase
      .from("laporan")
      .select("*")
      .order("tanggal", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setLaporan(data ?? []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <Navbar />

      <section className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">

        {/* Page Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent)]">
              <Wallet size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                SINAR Organization
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">
                Financial Information
              </p>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Laporan Keuangan
          </h1>

          <p className="mt-3 text-sm md:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
            Informasi pemasukan dan pengeluaran sebagai bentuk
            transparansi pengelolaan keuangan yayasan.
          </p>
        </div>

        {/* Report Content */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-8 shadow-sm">

          <div className="flex items-center gap-4 mb-8 pb-5 border-b border-[var(--border)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--accent)]">
              <ReceiptText size={22} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                Financial Overview
              </p>
              <h2 className="text-xl md:text-2xl font-bold mt-1">
                Riwayat Laporan
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="h-[400px] rounded-2xl bg-[var(--surface-secondary)] animate-pulse" />
          ) : laporan.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent)]">
                <FileText size={38} />
              </div>

              <h2 className="mt-6 text-xl md:text-2xl font-bold">
                Belum Ada Laporan
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                Data laporan keuangan akan ditampilkan di sini
                setelah ditambahkan oleh administrator.
              </p>
            </div>
          ) : (
            <>
              {/* Report Table */}
              <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                <div className="max-h-[500px] overflow-auto">
                  <table className="w-full min-w-[950px] text-left">
                    <thead className="sticky top-0 z-20 bg-[var(--primary)] text-white">
                      <tr>
                        <th className="px-5 py-4 text-xs font-semibold">Tanggal</th>
                        <th className="px-5 py-4 text-xs font-semibold">Jenis</th>
                        <th className="px-5 py-4 text-xs font-semibold">Kategori</th>
                        <th className="px-5 py-4 text-xs font-semibold">Deskripsi</th>
                        <th className="px-5 py-4 text-right text-xs font-semibold">Jumlah</th>
                        <th className="px-5 py-4 text-center text-xs font-semibold">Status</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[var(--border)]">
                      {laporan.map((item) => (
                        <tr
                          key={item.id}
                          className="transition-colors hover:bg-[var(--surface-secondary)]"
                        >
                          <td className="px-5 py-4 text-sm whitespace-nowrap">
                            {new Date(item.tanggal).toLocaleDateString("id-ID")}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                item.jenis === "Pemasukan"
                                  ? "bg-[var(--surface-secondary)] text-[var(--success)]"
                                  : "bg-[var(--surface-secondary)] text-[var(--danger)]"
                              }`}
                            >
                              {item.jenis}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-sm font-medium">
                            {item.kategori}
                          </td>

                          <td className="px-5 py-4 max-w-[280px] text-sm text-[var(--muted)]">
                            {item.deskripsi}
                          </td>

                          <td className="px-5 py-4 text-right text-sm font-semibold whitespace-nowrap">
                            Rp {Number(item.jumlah).toLocaleString("id-ID")}
                          </td>

                          <td className="px-5 py-4 text-center">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                item.status === "Lunas"
                                  ? "bg-[var(--surface-secondary)] text-[var(--success)]"
                                  : "bg-[var(--surface-secondary)] text-[var(--accent)]"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Report Footer */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-[var(--accent)]">
                    <TrendingUp size={20} />
                  </div>

                  <p className="text-sm text-[var(--muted)]">
                    Total laporan:{" "}
                    <span className="font-bold text-[var(--foreground)]">
                      {laporan.length} data
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                  <p className="text-xs text-[var(--muted)]">
                    Transparansi laporan keuangan
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
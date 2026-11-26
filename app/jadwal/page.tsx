"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  CalendarCheck,
} from "lucide-react";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";
import { supabase } from "../lib/supabase";

interface JadwalData {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
}

export default function JadwalPage() {
  const [jadwal, setJadwal] = useState<JadwalData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJadwal();
  }, []);

  async function getJadwal() {
    setLoading(true);

    const { data, error } = await supabase
      .from("jadwal")
      .select("*")
      .order("tanggal", { ascending: true });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setJadwal(data ?? []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <section className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent)]">
              <CalendarDays size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                SINAR Organization
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">
                Activity & Event Management
              </p>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Jadwal Kegiatan
          </h1>

          <p className="mt-3 text-sm md:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
            Temukan informasi kegiatan yayasan, termasuk tanggal,
            waktu pelaksanaan, dan lokasi kegiatan.
          </p>
        </div>

        {/* Schedule Section */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-8 shadow-sm">

          <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-[var(--border)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)] mb-2">
                Activity Overview
              </p>
              <h2 className="text-xl md:text-2xl font-bold">
                Daftar Kegiatan
              </h2>
              <p className="text-sm text-[var(--muted)] mt-1">
                Informasi kegiatan yang tersedia.
              </p>
            </div>

            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--surface-secondary)] text-[var(--accent)] border border-[var(--border)]">
              <CalendarCheck size={23} />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-[300px] rounded-2xl bg-[var(--surface-secondary)] animate-pulse"
                />
              ))}
            </div>
          ) : jadwal.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--surface-secondary)] text-[var(--accent)] border border-[var(--border)]">
                <CalendarDays size={32} />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Belum Ada Jadwal
              </h2>

              <p className="mt-2 text-sm text-[var(--muted)]">
                Jadwal kegiatan akan ditampilkan di sini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jadwal.map((item) => {
                const tanggal = new Date(item.tanggal);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const status =
                  tanggal >= today ? "Akan Datang" : "Selesai";

                const tanggalFormat = tanggal.toLocaleDateString(
                  "id-ID",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                );

                return (
                  <article
                    key={item.id}
                    className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--accent)]"
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--primary)] text-[var(--accent)]">
                        <CalendarDays size={21} />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          status === "Akan Datang"
                            ? "bg-[var(--surface-secondary)] text-[var(--success)]"
                            : "bg-[var(--surface-secondary)] text-[var(--muted)]"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    {/* Activity Name */}
                    <h3 className="mt-6 text-xl font-bold leading-snug min-h-[56px]">
                      {item.nama_kegiatan}
                    </h3>

                    <div className="w-12 h-1 rounded-full bg-[var(--accent)] mt-4 mb-6" />

                    {/* Date */}
                    <div className="flex items-start gap-3 mb-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-[var(--accent)]">
                        <CalendarDays size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-[var(--muted)] mb-1">
                          Tanggal
                        </p>
                        <p className="text-sm font-semibold">
                          {tanggalFormat}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-3 mb-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-[var(--accent)]">
                        <Clock3 size={19} />
                      </div>

                      <div>
                        <p className="text-xs text-[var(--muted)] mb-1">
                          Waktu
                        </p>
                        <p className="text-sm font-semibold">
                          {item.waktu}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-[var(--accent)]">
                        <MapPin size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-[var(--muted)] mb-1">
                          Lokasi
                        </p>
                        <p className="text-sm font-semibold break-words">
                          {item.lokasi}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
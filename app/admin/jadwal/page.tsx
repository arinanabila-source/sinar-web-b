"use client";

import { useState } from "react";
import { Plus, CalendarDays, ArrowUpRight } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import JadwalTable from "./JadwalTable";
import JadwalPopup from "./JadwalPopup";

export interface JadwalData {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
}

export default function JadwalPage() {
  const [refresh, setRefresh] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedData, setSelectedData] = useState<JadwalData | null>(null);

  function reloadTable() {
    setRefresh((prev) => !prev);
  }

  function handleTambah() {
    setSelectedData(null);
    setOpenPopup(true);
  }

  function handleEdit(data: JadwalData) {
    setSelectedData(data);
    setOpenPopup(true);
  }

  function handleClose() {
    setSelectedData(null);
    setOpenPopup(false);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <section className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-7 py-8 md:py-12">

        {/* Page Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-9">
          <div>
            <div className="flex items-center gap-3 mb-4">
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

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Jadwal Kegiatan
            </h1>

            <p className="mt-3 text-sm md:text-base text-[var(--muted)] max-w-xl leading-relaxed">
              Temukan informasi kegiatan yayasan, mulai dari jadwal,
              waktu pelaksanaan, hingga lokasi kegiatan.
            </p>
          </div>

          <button
            onClick={handleTambah}
            className="flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold px-6 py-3.5 text-sm rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 w-full lg:w-auto"
          >
            <Plus size={19} />
            Tambah Jadwal
          </button>
        </div>

        {/* Schedule Content */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
          <div className="px-5 md:px-8 py-6 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)] mb-2">
                Activity Overview
              </p>

              <h2 className="text-xl md:text-2xl font-bold">
                Daftar Jadwal
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                Informasi kegiatan, tanggal, waktu, dan lokasi.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted)] bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 w-fit">
              <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
              Informasi Kegiatan
              <ArrowUpRight size={14} />
            </div>
          </div>

          <div className="p-4 md:p-8">
            <JadwalTable
              refresh={refresh}
              onSelect={handleEdit}
            />
          </div>
        </div>

        {/* Popup */}
        <JadwalPopup
          open={openPopup}
          selected={selectedData}
          onClose={handleClose}
          refreshTable={() => {
            reloadTable();
            handleClose();
          }}
        />
      </section>

      <Footer />
    </main>
  );
}
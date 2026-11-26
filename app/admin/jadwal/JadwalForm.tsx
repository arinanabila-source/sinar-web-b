"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  NotebookPen,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import type { JadwalData } from "./page";

interface Props {
  selected: JadwalData | null;
  refreshTable: () => void;
  onClose: () => void;
}

export default function JadwalForm({
  selected,
  refreshTable,
  onClose,
}: Props) {
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      setNamaKegiatan(selected.nama_kegiatan);
      setTanggal(selected.tanggal);
      setWaktu(selected.waktu);
      setLokasi(selected.lokasi);
    } else {
      resetForm();
    }
  }, [selected]);

  function resetForm() {
    setNamaKegiatan("");
    setTanggal("");
    setWaktu("");
    setLokasi("");
  }

  function isFormValid() {
    if (!namaKegiatan.trim() || !tanggal || !waktu.trim() || !lokasi.trim()) {
      alert("Lengkapi semua data terlebih dahulu.");
      return false;
    }

    return true;
  }

  async function simpanData() {
    if (!isFormValid()) return;

    setLoading(true);

    const { error } = await supabase
      .from("jadwal")
      .insert({
        nama_kegiatan: namaKegiatan.trim(),
        tanggal,
        waktu: waktu.trim(),
        lokasi: lokasi.trim(),
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    resetForm();
    refreshTable();
    onClose();
  }

  async function updateData() {
    if (!selected || !isFormValid()) return;

    setLoading(true);

    const { error } = await supabase
      .from("jadwal")
      .update({
        nama_kegiatan: namaKegiatan.trim(),
        tanggal,
        waktu: waktu.trim(),
        lokasi: lokasi.trim(),
      })
      .eq("id", selected.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    resetForm();
    refreshTable();
    onClose();
  }

  async function hapusData() {
    if (!selected) return;

    const konfirmasi = confirm(
      "Yakin ingin menghapus jadwal ini?"
    );

    if (!konfirmasi) return;

    setLoading(true);

    const { error } = await supabase
      .from("jadwal")
      .delete()
      .eq("id", selected.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    resetForm();
    refreshTable();
    onClose();
  }

  const inputClass = `
    w-full h-11
    rounded-xl
    border border-[#D6E8D5]
    px-4
    bg-white
    text-sm text-[#173D32]
    placeholder:text-[#9AA89D]
    shadow-sm
    outline-none
    transition-all
    focus:border-[#173D32]
    focus:ring-2
    focus:ring-[#D6E8D5]
  `;

  const labelClass = `
    flex items-center gap-2
    text-sm font-semibold
    text-[#173D32]
    mb-2
  `;

  return (
    <div className="w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Nama Kegiatan */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            <NotebookPen size={17} className="text-[#B18B43]" />
            Nama Kegiatan
          </label>

          <input
            value={namaKegiatan}
            onChange={(e) => setNamaKegiatan(e.target.value)}
            placeholder="Masukkan nama kegiatan"
            className={inputClass}
          />
        </div>

        {/* Tanggal */}
        <div>
          <label className={labelClass}>
            <CalendarDays size={17} className="text-[#B18B43]" />
            Tanggal
          </label>

          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Waktu */}
        <div>
          <label className={labelClass}>
            <Clock3 size={17} className="text-[#B18B43]" />
            Waktu
          </label>

          <input
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
            placeholder="Contoh: 08:00 - 10:00"
            className={inputClass}
          />
        </div>

        {/* Lokasi */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            <MapPin size={17} className="text-[#B18B43]" />
            Lokasi
          </label>

          <input
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            placeholder="Masukkan lokasi kegiatan"
            className={inputClass}
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 border-t border-[#D6E8D5] pt-5 mt-2">

          {!selected ? (
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">

              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="
                  w-full sm:w-auto
                  px-7 h-11
                  rounded-xl
                  border border-[#D6E8D5]
                  bg-white
                  text-[#173D32]
                  font-semibold
                  hover:bg-[#F0F4EC]
                  transition
                  disabled:opacity-50
                "
              >
                Reset
              </button>

              <button
                type="button"
                onClick={simpanData}
                disabled={loading}
                className="
                  w-full sm:w-auto
                  px-8 h-11
                  rounded-xl
                  bg-[#173D32]
                  hover:bg-[#245545]
                  text-[#F7F7F0]
                  font-semibold
                  shadow-sm
                  transition
                  disabled:opacity-50
                "
              >
                {loading ? "Menyimpan..." : "Simpan Jadwal"}
              </button>

            </div>
          ) : (
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">

              <button
                type="button"
                onClick={hapusData}
                disabled={loading}
                className="
                  w-full sm:w-auto
                  px-7 h-11
                  rounded-xl
                  border border-red-200
                  bg-white
                  text-red-600
                  font-semibold
                  hover:bg-red-50
                  transition
                  disabled:opacity-50
                "
              >
                {loading ? "Memproses..." : "Hapus Jadwal"}
              </button>

              <button
                type="button"
                onClick={updateData}
                disabled={loading}
                className="
                  w-full sm:w-auto
                  px-8 h-11
                  rounded-xl
                  bg-[#173D32]
                  hover:bg-[#245545]
                  text-[#F7F7F0]
                  font-semibold
                  shadow-sm
                  transition
                  disabled:opacity-50
                "
              >
                {loading ? "Memperbarui..." : "Update Jadwal"}
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
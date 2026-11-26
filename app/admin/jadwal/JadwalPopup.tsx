"use client";

import { X, CalendarDays } from "lucide-react";

import JadwalForm from "./JadwalForm";
import type { JadwalData } from "./page";

interface Props {
  open: boolean;
  selected: JadwalData | null;
  onClose: () => void;
  refreshTable: () => void;
}

export default function JadwalPopup({
  open,
  selected,
  onClose,
  refreshTable,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-[#10251E]/60
        backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          bg-[#F7F7F0]
          border border-[#D6E8D5]
          rounded-2xl
          shadow-2xl
          w-full
          max-w-xl
          max-h-[85vh]
          overflow-y-auto
          text-sm
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D6E8D5] bg-[#173D32] px-6 py-5 rounded-t-2xl">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6E8D5] text-[#173D32]">
              <CalendarDays size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#F7F7F0]">
                {selected ? "Edit Jadwal" : "Tambah Jadwal"}
              </h2>

              <p className="mt-1 text-xs text-[#D6E8D5]">
                {selected
                  ? "Perbarui informasi kegiatan"
                  : "Masukkan informasi kegiatan baru"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup popup"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              text-[#F7F7F0]
              hover:bg-white/15
              transition-colors
            "
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}
        <div className="p-6 md:p-7">
          <JadwalForm
            selected={selected}
            refreshTable={refreshTable}
            onClose={onClose}
          />
        </div>

      </div>
    </div>
  );
}
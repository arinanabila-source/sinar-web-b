"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Pencil,
  Search,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import type { JadwalData } from "./page";

interface Props {
  refresh: boolean;
  onSelect: (jadwal: JadwalData) => void;
}

export default function JadwalTable({
  refresh,
  onSelect,
}: Props) {
  const [data, setData] = useState<JadwalData[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [refresh]);

  async function fetchData() {
    const { data, error } = await supabase
      .from("jadwal")
      .select("*")
      .order("tanggal", {
        ascending: true,
      });

    if (error) {
      console.error(error);
      return;
    }

    setData(data || []);
  }

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        item.nama_kegiatan
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.lokasi
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [data, search]);

  return (
    <div className="space-y-5">

      {/* Search and Total Data */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="relative w-full md:max-w-sm">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9A8D]"
          />

          <input
            type="text"
            placeholder="Cari kegiatan atau lokasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full h-11
              rounded-xl
              border border-[#D6E8D5]
              bg-[#F7F7F0]
              pl-11 pr-4
              text-sm text-[#173D32]
              placeholder:text-[#9AA89D]
              outline-none
              transition-all
              focus:bg-white
              focus:border-[#173D32]
              focus:ring-2
              focus:ring-[#D6E8D5]
            "
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-[#68796D]">
            Total Data
          </span>

          <div className="bg-[#173D32] text-[#F7F7F0] px-4 py-1.5 rounded-full text-xs font-semibold">
            {filteredData.length}
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="max-h-[400px] overflow-y-auto overflow-x-auto rounded-xl border border-[#D6E8D5] bg-white">

        <table className="w-full min-w-[700px]">

          <thead className="sticky top-0 z-10 bg-[#173D32]">
            <tr className="text-[#F7F7F0]">

              <th className="px-5 py-4 text-left text-xs font-semibold">
                Nama Kegiatan
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold">
                Tanggal
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold">
                Waktu
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold">
                Lokasi
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold">
                Aksi
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-[#EDF1E9]">

            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-14 text-center">

                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#D6E8D5] text-[#173D32]">
                    <CalendarDays size={27} />
                  </div>

                  <h2 className="text-base font-bold text-[#173D32]">
                    Belum Ada Jadwal Kegiatan
                  </h2>

                  <p className="mt-2 text-sm text-[#829087]">
                    {search
                      ? "Tidak ditemukan kegiatan yang sesuai dengan pencarian."
                      : "Klik tombol Tambah Jadwal untuk membuat jadwal baru."}
                  </p>

                </td>
              </tr>
            ) : (
              filteredData.map((item) => {
                const status =
                  new Date(item.tanggal + "T00:00:00") >=
                  new Date(new Date().toDateString())
                    ? "Akan Datang"
                    : "Selesai";

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#F3F7F0] transition-colors duration-200"
                  >

                    {/* Nama Kegiatan */}
                    <td className="px-5 py-4">
                      <h3 className="text-sm font-semibold text-[#173D32]">
                        {item.nama_kegiatan}
                      </h3>
                    </td>

                    {/* Tanggal */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-xs text-[#52665A]">
                        <CalendarDays
                          size={16}
                          className="shrink-0 text-[#B18B43]"
                        />
                        {item.tanggal}
                      </div>
                    </td>

                    {/* Waktu */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-xs text-[#52665A]">
                        <Clock3
                          size={16}
                          className="shrink-0 text-[#B18B43]"
                        />
                        {item.waktu}
                      </div>
                    </td>

                    {/* Lokasi */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-xs text-[#52665A]">
                        <MapPin
                          size={16}
                          className="shrink-0 text-[#B18B43]"
                        />
                        {item.lokasi}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                          status === "Akan Datang"
                            ? "bg-[#D6E8D5] text-[#173D32]"
                            : "bg-[#F0F0EA] text-[#737D75]"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    {/* Edit */}
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => onSelect(item)}
                        aria-label={`Edit ${item.nama_kegiatan}`}
                        className="
                          inline-flex items-center justify-center
                          w-9 h-9
                          rounded-lg
                          bg-[#F4EBD7]
                          text-[#9A7130]
                          hover:bg-[#EAD9B6]
                          transition-colors
                        "
                      >
                        <Pencil size={16} />
                      </button>
                    </td>

                  </tr>
                );
              })
            )}

          </tbody>
        </table>
      </div>

      {/* Footer Information */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        <p className="text-sm text-[#68796D]">
          Menampilkan
          <span className="mx-1 font-bold text-[#173D32]">
            {filteredData.length}
          </span>
          jadwal kegiatan.
        </p>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B18B43]" />

          <p className="text-xs text-[#829087]">
            Klik ikon pensil untuk mengubah data
          </p>
        </div>

      </div>

    </div>
  );
}
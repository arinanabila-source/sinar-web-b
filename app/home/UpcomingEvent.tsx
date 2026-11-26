"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowUpRight,
  CalendarCheck,
} from "lucide-react";

import { supabase } from "../lib/supabase";

type Event = {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
};

export default function UpcomingEvent() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingEvent();
  }, []);

  async function getUpcomingEvent() {
    setLoading(true);

    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("jadwal")
      .select("*")
      .gte("tanggal", today)
      .order("tanggal", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Upcoming event error:", error.message);
      setLoading(false);
      return;
    }

    setEvent(data);
    setLoading(false);
  }

  const sectionHeader = (
    <div className="mb-7">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-[2px] w-7 bg-[#D5B66B]" />

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B18C4A]">
          Organization Activities
        </p>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
        Kegiatan Terdekat
      </h2>

      <p className="mt-2 text-sm text-[var(--muted)]">
        Agenda kegiatan yayasan berikutnya.
      </p>
    </div>
  );

  if (loading) {
    return (
      <section className="w-full">
        {sectionHeader}

        <div className="flex min-h-[230px] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-[3px] border-[#D5B66B]/30 border-t-[#D5B66B]" />

            <p className="text-sm text-[var(--muted)]">
              Memuat kegiatan...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="w-full">
        {sectionHeader}

        <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-secondary)] px-5 py-8 text-center">

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] text-[#D5B66B]">
            <CalendarCheck size={27} />
          </div>

          <h3 className="text-base font-bold text-[var(--foreground)]">
            Belum Ada Kegiatan
          </h3>

          <p className="mt-2 max-w-[240px] text-sm leading-6 text-[var(--muted)]">
            Belum ada jadwal kegiatan yang akan datang.
            Informasi agenda akan ditampilkan di sini.
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#7BA88A]" />

            <span className="text-[10px] font-semibold tracking-wide text-[var(--muted)]">
              EVENT SCHEDULE
            </span>
          </div>

        </div>
      </section>
    );
  }

  const eventDate = new Date(event.tanggal + "T00:00:00");

  const day = eventDate.getDate();

  const month = eventDate.toLocaleDateString("id-ID", {
    month: "short",
  });

  const weekday = eventDate.toLocaleDateString("id-ID", {
    weekday: "long",
  });

  return (
    <section className="w-full">

      {sectionHeader}

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] shadow-sm transition-all duration-300">

        {/* Event date header */}
        <div className="relative overflow-hidden bg-[var(--primary)] px-5 py-6 text-white">

          <div className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -right-2 -top-6 h-28 w-28 rounded-full border border-white/10" />

          <div className="relative flex items-center justify-between gap-4">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C981]">
                Upcoming Event
              </p>

              <p className="mt-2 text-sm font-medium text-white/75">
                {weekday}
              </p>

              <h3 className="mt-1 text-2xl font-bold leading-tight text-white">
                {event.nama_kegiatan}
              </h3>
            </div>

            <div className="flex h-[92px] w-[82px] shrink-0 flex-col items-center justify-center rounded-xl border border-[#D5B66B]/40 bg-white/10 backdrop-blur-sm">

              <span className="text-3xl font-bold leading-none text-[#E5C981]">
                {day}
              </span>

              <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                {month}
              </span>

            </div>

          </div>
        </div>

        {/* Event details */}
        <div className="space-y-4 p-5">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-[#B18C4A]">
              <Clock3 size={19} />
            </div>

            <div className="min-w-0 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                Waktu
              </p>

              <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                {event.waktu}
              </p>
            </div>

          </div>

          <div className="h-px bg-[var(--border)]" />

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-[#B18C4A]">
              <MapPin size={19} />
            </div>

            <div className="min-w-0 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                Lokasi
              </p>

              <p className="mt-1 break-words text-sm font-semibold leading-6 text-[var(--foreground)]">
                {event.lokasi}
              </p>
            </div>

          </div>

          <div className="border-t border-[var(--border)] pt-4">
            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-2">
                <CalendarDays size={15} className="text-[#B18C4A]" />

                <span className="text-[10px] font-semibold text-[var(--muted)]">
                  SINAR EVENT CALENDAR
                </span>
              </div>

              <ArrowUpRight size={17} className="text-[#B18C4A]" />

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
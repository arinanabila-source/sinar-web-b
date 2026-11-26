"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Clock3,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  CloudSun,
  RefreshCw,
  X,
  MapPin,
} from "lucide-react";

type Prayer = {
  name: string;
  time: string;
  icon: React.ReactNode;
};

type ApiLocation = {
  id: string;
  lokasi: string;
};

type ApiSchedule = {
  imsak?: string;
  subuh?: string;
  terbit?: string;
  dzuhur?: string;
  ashar?: string;
  maghrib?: string;
  isya?: string;
  tanggal?: string;
};

const API_BASE = "https://api.myquran.com/v3/sholat";

function getToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function getJakartaNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);

  return new Date(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );
}

function getCountdown(time: string, now: Date) {
  const [hours, minutes] = time.split(":").map(Number);

  const target = new Date(now);
  target.setHours(hours, minutes, 0, 0);

  const difference = target.getTime() - now.getTime();

  if (difference <= 0) return null;

  const seconds = Math.floor(difference / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [h, m, s]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export default function PrayerSchedule() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [clock, setClock] = useState(getJakartaNow());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [dateLabel, setDateLabel] = useState("");

  const lastFetchedDate = useRef(getToday());

  const fetchPrayerSchedule = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // Cari Kabupaten Bekasi
      const cityResponse = await fetch(
        `${API_BASE}/kabkota/cari/bekasi`
      );

      if (!cityResponse.ok) {
        throw new Error("Gagal mencari lokasi Bekasi.");
      }

      const cityResult = await cityResponse.json();

      if (!cityResult.status || !Array.isArray(cityResult.data)) {
        throw new Error("Data lokasi tidak tersedia.");
      }

      const bekasi = (cityResult.data as ApiLocation[]).find(
        (city) => {
          const location = city.lokasi.toUpperCase();

          return (
            location.includes("BEKASI") &&
            (location.startsWith("KAB") ||
              location.includes("KABUPATEN"))
          );
        }
      );

      if (!bekasi) {
        throw new Error("Kabupaten Bekasi tidak ditemukan.");
      }

      // Ambil jadwal salat
      const response = await fetch(
        `${API_BASE}/jadwal/${bekasi.id}/today?tz=Asia%2FJakarta`
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil jadwal salat.");
      }

      const result = await response.json();

      if (!result.status || !result.data?.jadwal) {
        throw new Error("Data jadwal tidak tersedia.");
      }

      const today = getToday();
      const schedule: ApiSchedule = result.data.jadwal[today];

      if (!schedule) {
        throw new Error("Jadwal hari ini tidak ditemukan.");
      }

      const prayerList: Prayer[] = [
        {
          name: "Imsak",
          time: schedule.imsak || "",
          icon: <Moon size={23} />,
        },
        {
          name: "Subuh",
          time: schedule.subuh || "",
          icon: <Moon size={23} />,
        },
        {
          name: "Terbit",
          time: schedule.terbit || "",
          icon: <Sunrise size={23} />,
        },
        {
          name: "Dzuhur",
          time: schedule.dzuhur || "",
          icon: <Sun size={23} />,
        },
        {
          name: "Ashar",
          time: schedule.ashar || "",
          icon: <CloudSun size={23} />,
        },
        {
          name: "Maghrib",
          time: schedule.maghrib || "",
          icon: <Sunset size={23} />,
        },
        {
          name: "Isya",
          time: schedule.isya || "",
          icon: <Moon size={23} />,
        },
      ];

      if (prayerList.some((prayer) => !prayer.time)) {
        throw new Error("Jadwal salat tidak lengkap.");
      }

      setPrayers(prayerList);
      setDateLabel(schedule.tanggal || today);
      lastFetchedDate.current = today;
    } catch (err) {
      console.error("Prayer Schedule Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan mengambil jadwal."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Ambil jadwal pertama kali dan jalankan jam
  useEffect(() => {
    fetchPrayerSchedule();

    const interval = setInterval(() => {
      setClock(getJakartaNow());
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchPrayerSchedule]);

  // Periksa pergantian hari
  useEffect(() => {
    const interval = setInterval(() => {
      if (getToday() !== lastFetchedDate.current) {
        fetchPrayerSchedule();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchPrayerSchedule]);

  // Menentukan salat berikutnya
  // Imsak dan Terbit bukan waktu salat wajib berikutnya
  const nextPrayer = prayers.find((prayer) => {
    if (prayer.name === "Imsak" || prayer.name === "Terbit") {
      return false;
    }

    const [hours, minutes] = prayer.time.split(":").map(Number);
    const target = new Date(clock);

    target.setHours(hours, minutes, 0, 0);

    return target.getTime() > clock.getTime();
  });

  const countdown = nextPrayer
    ? getCountdown(nextPrayer.time, clock)
    : null;

  const currentTime = clock.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const currentDate = clock.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* MAIN PRAYER CARD */}
      <section className="h-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm md:p-7">

        {/* HEADER */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-[2px] w-7 bg-[#B18C4A]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                Prayer & Worship
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">
              Jadwal Sholat
            </h2>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Informasi waktu ibadah harian
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowPopup(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#D5B66B] hover:bg-[#D5B66B]/10"
          >
            <Clock3 size={17} />
            Waktu Ibadah
          </button>
        </div>

        {/* LOADING */}
        {loading && prayers.length === 0 ? (
          <div className="flex min-h-[230px] flex-col items-center justify-center gap-3">
            <RefreshCw
              size={27}
              className="animate-spin text-[#B18C4A]"
            />
            <p className="text-sm text-[var(--muted)]">
              Memuat jadwal sholat...
            </p>
          </div>
        ) : error && prayers.length === 0 ? (
          <div className="flex min-h-[230px] flex-col items-center justify-center text-center">
            <p className="font-semibold text-[var(--foreground)]">
              Jadwal belum tersedia
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {error}
            </p>
            <button
              type="button"
              onClick={fetchPrayerSchedule}
              className="mt-4 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            {error && (
              <p className="mb-3 text-xs text-[var(--danger)]">
                Jadwal gagal diperbarui. Menampilkan data terakhir.
              </p>
            )}

            {/* PRAYER GRID */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {prayers.map((prayer, index) => {
                const isNext = nextPrayer?.name === prayer.name;

                return (
                  <div
                    key={prayer.name}
                    className={`relative flex min-h-[180px] flex-col items-center justify-center rounded-2xl border px-3 py-5 text-center transition duration-300 ${
                      isNext
                        ? "border-[#D5B66B] bg-[#D5B66B]/10 shadow-sm"
                        : "border-transparent bg-[var(--surface-secondary)] hover:border-[var(--border)]"
                    }`}
                  >
                    <span className="absolute right-3 top-3 text-[10px] font-medium text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {isNext && (
                      <span className="absolute -top-2 rounded-full bg-[#D5B66B] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#172B3A]">
                        Berikutnya
                      </span>
                    )}

                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isNext
                          ? "bg-[var(--navbar)] text-[#E5C981]"
                          : "bg-[var(--primary)] text-white"
                      }`}
                    >
                      {prayer.icon}
                    </div>

                    <p className="text-sm font-medium text-[var(--muted)]">
                      {prayer.name}
                    </p>

                    <p
                      className={`mt-1 text-2xl font-bold tabular-nums md:text-3xl ${
                        isNext
                          ? "text-[#B18C4A]"
                          : "text-[var(--foreground)]"
                      }`}
                    >
                      {prayer.time}
                    </p>

                    {isNext && (
                      <p className="mt-2 text-[10px] font-semibold text-[#B18C4A]">
                        Waktu salat berikutnya
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* FOOTER */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <MapPin size={13} />
            Kedungwaringin, Bekasi
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span className="h-2 w-2 rounded-full bg-[#477A63]" />
            Prayer Schedule
          </div>
        </div>
      </section>

      {/* PRAYER DETAIL POPUP */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Waktu ibadah"
            className="max-h-[85vh] w-full max-w-[620px] overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            {/* POPUP HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B18C4A]">
                  Prayer Information
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                  Waktu Ibadah
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowPopup(false)}
                aria-label="Tutup"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--surface-secondary)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* NEXT PRAYER */}
            <div className="mb-7 rounded-2xl border border-[#D5B66B]/30 bg-[#D5B66B]/10 p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <Clock3 size={16} />
                    Waktu Ibadah Berikutnya
                  </div>

                  <h3 className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                    {nextPrayer?.name || "Selesai"}
                  </h3>

                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {nextPrayer
                      ? `Pukul ${nextPrayer.time} WIB`
                      : "Sampai jadwal besok"}
                  </p>

                  <p className="mt-2 text-xs text-[var(--muted)]">
                    {currentDate}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-xs font-semibold text-[var(--muted)]">
                    Menuju waktu salat
                  </p>

                  <p className="mt-2 text-3xl font-bold tabular-nums text-[#B18C4A]">
                    {countdown || "00:00:00"}
                  </p>

                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Waktu sekarang {currentTime} WIB
                  </p>
                </div>
              </div>
            </div>

            {/* PRAYER LIST */}
            <h3 className="mb-3 text-lg font-bold text-[var(--foreground)]">
              Jadwal Salat Hari Ini
            </h3>

            <div className="space-y-2">
              {prayers.map((prayer) => {
                const isNext = nextPrayer?.name === prayer.name;

                return (
                  <div
                    key={prayer.name}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                      isNext
                        ? "border-[#D5B66B] bg-[#D5B66B]/10"
                        : "border-[var(--border)] bg-[var(--surface-secondary)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                          isNext
                            ? "bg-[#D5B66B]/20 text-[#B18C4A]"
                            : "text-[var(--muted)]"
                        }`}
                      >
                        {prayer.icon}
                      </div>

                      <span className="text-sm font-medium text-[var(--foreground)]">
                        {prayer.name}
                      </span>

                      {isNext && (
                        <span className="rounded-full bg-[#D5B66B]/20 px-2 py-1 text-[9px] font-bold text-[#A47C2E]">
                          Berikutnya
                        </span>
                      )}
                    </div>

                    <span className="text-base font-bold tabular-nums text-[var(--foreground)]">
                      {prayer.time}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 text-center text-[10px] text-[var(--muted)]">
              Jadwal otomatis berdasarkan data API myQuran.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
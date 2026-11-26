import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";

import Hero from "./heroo";
import PrayerSchedule from "./PrayerSchedule";
import UpcomingEvent from "./UpcomingEvent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">

      {/* PREMIUM NAVIGATION */}
      <Navbar />

      {/* MAIN CONTENT */}
      <section className="flex-1 w-full">

        <div className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 md:py-10 lg:px-10">

          {/* HERO SECTION */}
          <div className="mb-9">
            <Hero />
          </div>

          {/* DASHBOARD CONTENT */}
          <section className="pb-10">

            {/* Section Heading */}
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B18C4A]">
                  Organization Dashboard
                </p>

                <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
                  Informasi & Aktivitas
                </h2>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  Informasi waktu ibadah dan kegiatan yayasan.
                </p>
              </div>

              <div className="hidden sm:block">
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--muted)]">
                  SINAR Information System
                </span>
              </div>

            </div>

            {/* DASHBOARD GRID */}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,0.9fr)] lg:gap-7">

              {/* Prayer Schedule */}
              <div className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-colors duration-300 sm:p-6">
                <PrayerSchedule />
              </div>

              {/* Upcoming Event */}
              <div className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-colors duration-300 sm:p-6">
                <UpcomingEvent />
              </div>

            </div>

          </section>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}
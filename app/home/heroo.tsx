"use client";

import Image from "next/image";
import { MapPin, ArrowUpRight, Building2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-3">
      <div className="relative isolate overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-xl">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#D5B66B]/10 blur-3xl" />

        <div className="grid min-h-[440px] lg:grid-cols-[1fr_1.05fr]">

          {/* LEFT CONTENT */}
          <div className="relative z-10 flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-12 lg:py-14">

            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-[#D5B66B]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#B18C4A]">
                Welcome to SINAR
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-4xl font-bold leading-[1.12] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[58px]">
              A Better Way to
              <span className="mt-1 block text-[#B18C4A]">
                Connect & Serve.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--muted)] sm:text-base">
              Selamat datang di SINAR, Sistem Informasi, Ngaji dan
              Administrasi Rumah Ibadah. Satu platform untuk
              mendukung informasi dan aktivitas yayasan.
            </p>

            {/* Divider */}
            <div className="my-8 h-px w-full max-w-md bg-[var(--border)]" />

            {/* Organization identity */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)] text-[#D5B66B]">
                <Building2 size={23} />
              </div>

              <div>
                <p className="text-sm font-bold text-[var(--foreground)]">
                  SINAR
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Sistem Informasi Rumah Ibadah
                </p>
              </div>
            </div>

            {/* Clickable Location */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Perumahan+Jl.+Bumi+Waringin+Indah+2+No.1+Blok+B1%2C+Waringinjaya%2C+Kedungwaringin%2C+Bekasi%2C+Jawa+Barat+17540"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka lokasi Yayasan di Google Maps"
              className="group mt-8 flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] p-4 transition-all duration-300 hover:border-[#D5B66B] hover:shadow-md sm:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D5B66B]/15 text-[#B18C4A] transition-colors group-hover:bg-[#D5B66B]/25">
                <MapPin size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                  Lokasi Yayasan
                </p>

                <p className="mt-2 text-xs leading-6 text-[var(--muted)] sm:text-sm">
                  Perumahan Jl. Bumi Waringin Indah 2 No.1 Blok B1,
                  Waringinjaya, Kedungwaringin, Bekasi,
                  Jawa Barat 17540, Indonesia
                </p>

                <p className="mt-2 text-xs font-semibold text-[#B18C4A] opacity-0 transition-opacity group-hover:opacity-100">
                  Buka di Google Maps
                </p>
              </div>

              <ArrowUpRight
                size={17}
                className="mt-1 shrink-0 text-[#B18C4A] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative min-h-[300px] overflow-hidden lg:min-h-full">

            <Image
              src="/image/gedung1.jpeg"
              alt="Gedung Yayasan"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101D2A]/85 via-[#101D2A]/10 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-r from-[#101D2A]/20 to-transparent" />

            {/* Image label */}
            <div className="absolute bottom-7 left-7 right-7 sm:bottom-9 sm:left-9 sm:right-9">

              <div className="mb-3 flex items-center gap-2">
                <span className="h-[2px] w-7 bg-[#D5B66B]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E7CB8B]">
                  Our Foundation
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built on Faith.
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
                Connecting information, activities, and community
                through one integrated platform.
              </p>

            </div>

            {/* Decorative corner */}
            <div className="absolute right-7 top-7 rounded-full border border-white/30 bg-black/20 px-4 py-2 backdrop-blur-md">
              <span className="text-[10px] font-semibold tracking-[0.18em] text-white">
                SINAR PLATFORM
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
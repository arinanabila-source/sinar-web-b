"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";

const navigation = [
  { label: "Home", href: "/home" },
  { label: "Jadwal Kegiatan", href: "/jadwal" },
  { label: "Pengurus", href: "/pengurus" },
  { label: "Laporan Keuangan", href: "/laporan" },
  { label: "Inventaris", href: "/inventaris" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--navbar)] shadow-lg">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-8">

          {/* MOBILE HEADER */}
          <div className="flex h-16 items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              className="text-[var(--navbar-text)] hover:text-[var(--accent)]"
            >
              <Menu size={27} />
            </button>

            <div className="flex items-center gap-2">
              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={42}
                height={42}
                priority
                className="object-contain"
              />
              <Image
                src="/image/logo111.png"
                alt="Logo YPI"
                width={42}
                height={42}
                priority
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[var(--accent)] hover:bg-white/10"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* DESKTOP HEADER */}
          <div className="hidden h-[82px] items-center justify-between lg:flex">

            {/* LOGOS */}
            <Link href="/home" className="flex items-center gap-3">
              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={55}
                height={55}
                priority
                className="object-contain"
              />
              <Image
                src="/image/logo111.png"
                alt="Logo YPI"
                width={55}
                height={55}
                priority
                className="object-contain"
              />
            </Link>

            {/* NAVIGATION */}
            <nav className="flex items-center gap-5 xl:gap-7">
              {navigation.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-3 text-sm font-semibold transition-colors ${
                      active
                        ? "text-[var(--accent)]"
                        : "text-[var(--navbar-text)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {item.label}

                    {active && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[var(--accent)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[var(--accent)] transition hover:bg-white/10"
              >
                {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
              </button>

              <Link
                href="/login"
                className="rounded-full bg-[var(--accent)] px-7 py-2.5 text-sm font-bold text-[#172B3A] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-screen w-[290px] flex-col border-r border-[var(--border)] bg-[var(--navbar)] shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-2">
            <Image
              src="/image/logo2 - Edited2.png"
              alt="SINAR"
              width={43}
              height={43}
            />
            <div>
              <p className="font-bold text-[var(--navbar-text)]">SINAR</p>
              <p className="text-[10px] tracking-wider text-[var(--accent)]">
                DIGITAL PLATFORM
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="text-[var(--navbar-text)] hover:text-[var(--accent)]"
          >
            <X size={25} />
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav className="flex-1 px-4 py-6">
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Main Navigation
          </p>

          <div className="space-y-2">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                    active
                      ? "bg-white/10 text-[var(--accent)] border border-white/10"
                      : "text-[var(--navbar-text)] hover:bg-white/10 hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="space-y-4 border-t border-white/10 p-5">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-[var(--navbar-text)]"
          >
            <span>Appearance</span>
            <span className="flex items-center gap-2 text-[var(--accent)]">
              {theme === "light" ? (
                <>
                  <Moon size={17} /> Dark
                </>
              ) : (
                <>
                  <Sun size={17} /> Light
                </>
              )}
            </span>
          </button>

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block w-full rounded-xl bg-[var(--accent)] py-3 text-center font-bold text-[#172B3A] transition hover:brightness-105"
          >
            Login
          </Link>

          <p className="text-center text-[10px] text-white/40">
            SINAR Digital Information Platform
          </p>
        </div>
      </aside>
    </>
  );
}
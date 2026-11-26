"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useTheme } from "../../components/ThemeProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const login = localStorage.getItem("isLogin") === "true";
    setIsLogin(login);
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    setOpen(false);
    router.push("/home");
  }

  const links = [
    { href: "/home", label: "Home" },
    {
      href: isLogin ? "/admin/profile" : "/profile",
      label: "Profil",
    },
    {
      href: isLogin ? "/admin/jadwal" : "/jadwal",
      label: "Jadwal Kegiatan",
    },
    {
      href: isLogin ? "/admin/pengurus" : "/pengurus",
      label: "Pengurus",
    },
    {
      href: isLogin ? "/admin/laporan" : "/laporan",
      label: "Laporan Keuangan",
    },
    {
      href: isLogin ? "/admin/inventaris" : "/inventaris",
      label: "Inventaris",
    },
  ];

  function isActive(href: string) {
    return pathname === href ||
      (href !== "/home" && pathname.startsWith(href + "/"));
  }

  function ThemeButton({ mobile = false }: { mobile?: boolean }) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Aktifkan dark mode" : "Aktifkan light mode"}
        title={theme === "light" ? "Dark Mode" : "Light Mode"}
        className={`
          flex items-center justify-center gap-2
          rounded-xl border
          border-[var(--border)]
          bg-[var(--surface)]
          text-[var(--foreground)]
          hover:border-[var(--accent)]
          hover:text-[var(--accent)]
          transition-all duration-200
          ${mobile ? "w-full px-4 py-3" : "h-10 w-10"}
        `}
      >
        {theme === "light" ? (
          <Moon size={18} />
        ) : (
          <Sun size={18} />
        )}

        {mobile && (
          <span className="text-sm font-medium">
            {theme === "light" ? "Night Mode" : "Day Mode"}
          </span>
        )}
      </button>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--accent)]/30 bg-[var(--navbar)] text-[var(--navbar-text)] shadow-lg">

        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between gap-4 px-4 md:px-8">

          {/* Brand */}
          <Link
            href="/home"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/image/logo2 - Edited2.png"
              alt="SINAR"
              width={48}
              height={48}
              priority
              className="object-contain"
            />

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-[0.12em] text-white">
                SINAR
              </h1>
              <p className="text-[9px] tracking-[0.12em] text-[#D5B66B]">
                DIGITAL INFORMATION PLATFORM
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative whitespace-nowrap rounded-lg px-3 py-3
                    text-[13px] font-medium
                    transition-all duration-200
                    ${
                      active
                        ? "bg-white/10 text-[#D5B66B]"
                        : "text-[#D3DCE3] hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {link.label}

                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#D5B66B]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 xl:flex">
            <ThemeButton />

            {isLogin ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-[#D5B66B] px-5 py-2.5 text-sm font-semibold text-[#172B3A] transition hover:bg-[#E5C981]"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-[#D5B66B] px-6 py-2.5 text-sm font-semibold text-[#172B3A] transition hover:bg-[#E5C981]"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 xl:hidden">
            <ThemeButton />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu navigasi"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white transition hover:bg-white/10"
            >
              <Menu size={23} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm
          transition-opacity duration-300 xl:hidden
          ${open ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* Mobile Navigation Panel */}
      <aside
        className={`
          fixed right-0 top-0 z-[70]
          flex h-full w-[min(340px,85vw)] flex-col
          border-l border-[var(--border)]
          bg-[var(--background)]
          shadow-2xl
          transition-transform duration-300
          xl:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >

        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--navbar)] px-5 py-5">
          <div>
            <h2 className="font-bold tracking-widest text-white">
              SINAR
            </h2>
            <p className="text-[10px] text-[#D5B66B]">
              NAVIGATION MENU
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Tutup menu navigasi"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>

        {/* Mobile Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
            Main Navigation
          </p>

          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center justify-between rounded-xl px-4 py-3.5
                  text-sm font-medium transition
                  ${
                    active
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--foreground)] hover:bg-[var(--surface-secondary)]"
                  }
                `}
              >
                {link.label}

                {active && (
                  <ChevronRight size={17} className="text-[#D5B66B]" />
                )}
              </Link>
            );
          })}

          <div className="my-5 border-t border-[var(--border)]" />

          <ThemeButton mobile />
        </nav>

        {/* Mobile Login */}
        <div className="border-t border-[var(--border)] p-5">
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D5B66B] py-3.5 font-semibold text-[#172B3A] hover:bg-[#E5C981]"
            >
              <LogOut size={17} />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl bg-[#D5B66B] py-3.5 text-center font-semibold text-[#172B3A] hover:bg-[#E5C981]"
            >
              Login
            </Link>
          )}
        </div>

      </aside>
    </>
  );
}
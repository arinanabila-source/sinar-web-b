"use client";

import { Mail, Phone, ShieldCheck } from "lucide-react";

export default function LoginFooter() {
  return (
    <footer className="w-full bg-[var(--navbar)] text-[var(--navbar-text)]">

      <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">

        <div className="grid grid-cols-1 gap-5 text-xs md:grid-cols-3 md:items-center md:text-sm">

          {/* EMAIL */}
          <a
            href="mailto:yayasan@ypinurulilmi.sch.id"
            className="flex items-center justify-center gap-3 transition-colors hover:text-[var(--accent)] md:justify-start"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--accent)]">
              <Mail size={17} />
            </span>

            <span>yayasan@ypinurulilmi.sch.id</span>
          </a>

          {/* HANIM */}
          <a
            href="https://wa.me/6281316853255"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 transition-colors hover:text-[var(--accent)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--accent)]">
              <Phone size={17} />
            </span>

            <span>Ibu Hanim : 081316853255</span>
          </a>

          {/* IDA */}
          <a
            href="tel:081282307424"
            className="flex items-center justify-center gap-3 transition-colors hover:text-[var(--accent)] md:justify-end"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--accent)]">
              <Phone size={17} />
            </span>

            <span>Ibu Ida : 081282307424</span>
          </a>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-4 sm:flex-row">

          <ShieldCheck size={14} className="text-[var(--accent)]" />

          <p className="text-center text-[10px] tracking-wide text-white/60 md:text-xs">
            Powered by MIS Class 3 - 2025 Group 1
          </p>

        </div>
      </div>

    </footer>
  );
}
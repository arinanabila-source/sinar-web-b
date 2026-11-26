"use client";

import { Mail, Phone } from "lucide-react";

export default function LoginFooter() {
  return (
    <footer className="w-full bg-[#173D32] text-[#F7F7F0] text-xs">

      <div className="max-w-7xl mx-auto px-4 py-5">
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            items-center
            text-xs
            md:text-sm
          "
        >
          {/* Email */}
          <a
            href="mailto:yayasan@ypinurulilmi.sch.id"
            className="flex items-center justify-center md:justify-start gap-2 hover:text-[#C6A75E] transition-colors duration-200"
          >
            <Mail size={16} className="text-[#C6A75E]" />
            <span>yayasan@ypinurulilmi.sch.id</span>
          </a>

          {/* Hanim */}
          <a
            href="https://wa.me/6281316853255"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:text-[#C6A75E] transition-colors duration-200"
          >
            <Phone size={16} className="text-[#C6A75E]" />
            <span>Ibu Hanim : 081316853255</span>
          </a>

          {/* Ida */}
          <a
            href="tel:081282307424"
            className="flex items-center justify-center md:justify-end gap-2 hover:text-[#C6A75E] transition-colors duration-200"
          >
            <Phone size={16} className="text-[#C6A75E]" />
            <span>Ibu Ida : 081282307424</span>
          </a>
        </div>
      </div>

      <div className="border-t border-[#D6E8D5]/20">
        <p className="py-3 text-center text-[10px] md:text-[11px] text-[#D6E8D5]">
          Powered by MIS Class 3 - 2025 Group 1
        </p>
      </div>

    </footer>
  );
}
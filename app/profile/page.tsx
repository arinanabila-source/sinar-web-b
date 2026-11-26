"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Target,
  BookOpen,
  Sparkles,
} from "lucide-react";

import Navbar from "../admin/components/Navbar";
import Footer from "../admin/components/Footer";
import { supabase } from "../lib/supabase";

interface ProfileData {
  id: number;
  title: string;
  description: string;
  image_hero: string;
  image_banner: string;
  visi: string;
  misi: string[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    id: 1,
    title: "",
    description: "",
    image_hero: "",
    image_banner: "",
    visi: "",
    misi: [],
  });

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const { data, error } = await supabase
      .from("Profile")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setProfile(data);
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <Navbar />

      <section className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent)]">
              <Building2 size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                SINAR Organization
              </p>
              <p className="text-xs text-[var(--muted)] mt-1">
                About Our Foundation
              </p>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Profil Yayasan
          </h1>

          <p className="mt-3 text-sm md:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
            Mengenal lebih dekat identitas, tujuan, visi, dan misi
            yayasan dalam membangun lingkungan yang lebih baik.
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5">

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[260px] md:min-h-[360px] overflow-hidden rounded-2xl border border-[var(--border)]"
          >
            <Image
              src={profile.image_hero || "/image/gedung1.jpeg"}
              alt="Gedung yayasan"
              fill
              priority
              sizes="(max-width:768px) 100vw, 60vw"
              className="object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#111C29]/70 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D5B66B]">
                Our Foundation
              </p>
              <p className="mt-2 text-xl md:text-2xl font-bold text-white">
                Building a Better Community
              </p>
            </div>
          </motion.div>

          {/* Hero Information */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -3 }}
            className="flex flex-col justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-9 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={17} className="text-[var(--accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                Who We Are
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
              {profile.title || "Tentang Yayasan"}
            </h2>

            <div className="w-14 h-1 rounded-full bg-[var(--accent)] mt-5 mb-6" />

            <p className="whitespace-pre-line text-sm leading-8 text-[var(--muted)]">
              {profile.description || "Informasi profil yayasan belum tersedia."}
            </p>
          </motion.div>
        </div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-7"
        >
          <div className="relative h-[190px] md:h-[270px] overflow-hidden rounded-2xl border border-[var(--border)]">
            <Image
              src={profile.image_banner || "/image/gedung2.jpeg"}
              alt="Banner yayasan"
              fill
              sizes="100vw"
              className="object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#111C29]/75 via-[#111C29]/30 to-transparent" />

            <div className="absolute bottom-6 left-6 md:bottom-9 md:left-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D5B66B]">
                Our Commitment
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
                Growing Together
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)] mb-2">
              Our Foundation
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              Visi dan Misi
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Landasan dan arah tujuan yayasan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Vision */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--accent)]">
                  <Target size={23} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                    Our Vision
                  </p>
                  <h3 className="text-xl font-bold mt-1">
                    Visi Yayasan
                  </h3>
                </div>
              </div>

              <div className="w-12 h-1 rounded-full bg-[var(--accent)] mb-6" />

              <p className="whitespace-pre-line text-sm leading-8 text-[var(--muted)]">
                {profile.visi || "Informasi visi yayasan belum tersedia."}
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--accent)]">
                  <BookOpen size={23} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                    Our Mission
                  </p>
                  <h3 className="text-xl font-bold mt-1">
                    Misi Yayasan
                  </h3>
                </div>
              </div>

              <div className="w-12 h-1 rounded-full bg-[var(--accent)] mb-6" />

              {profile.misi.length > 0 ? (
                <ul className="space-y-4">
                  {profile.misi.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-secondary)] text-xs font-bold text-[var(--accent)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-sm leading-7 text-[var(--muted)]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--muted)]">
                  Belum ada data misi.
                </p>
              )}
            </div>
          </div>
        </motion.section>
      </section>

      <Footer />
    </main>
  );
}
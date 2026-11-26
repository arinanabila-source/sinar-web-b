"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import InventarisTable from "./InventarisTable";
import InventarisPopup from "./InventarisPopup";

import { supabase } from "../../lib/supabase";
import { InventarisData } from "./types";

export default function InventarisPage() {
  const emptyForm: InventarisData = {
    id: 0,
    nama_alat: "",
    jumlah: 0,
    foto: "",
  };

  const [form, setForm] = useState<InventarisData>(emptyForm);
  const [data, setData] = useState<InventarisData[]>([]);
  const [selectedData, setSelectedData] = useState<InventarisData | null>(null);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data, error } = await supabase
      .from("inventaris")
      .select("*")
      .order("id");

    if (error) {
      alert(error.message);
      return;
    }

    setData(data ?? []);

    const nextId = data && data.length > 0 ? data[data.length - 1].id + 1 : 1;

    resetForm(nextId);
  }

  function resetForm(id: number) {
    setForm({
      id,
      nama_alat: "",
      jumlah: 0,
      foto: "",
    });
  }

  function handleTambah() {
    setSelectedData(null);

    const nextId = data.length > 0 ? data[data.length - 1].id + 1 : 1;

    resetForm(nextId);
    setOpenPopup(true);
  }

  function handleEdit(item: InventarisData) {
    setSelectedData(item);
    setForm(item);
    setOpenPopup(true);
  }

  function handleClose() {
    setSelectedData(null);

    const nextId = data.length > 0 ? data[data.length - 1].id + 1 : 1;

    resetForm(nextId);
    setOpenPopup(false);
  }

  async function uploadFotoJikaBlob(fotoUrl: string): Promise<string> {
    if (!fotoUrl.startsWith("blob:")) {
      return fotoUrl;
    }

    let blob: Blob;
    try {
      const response = await fetch(fotoUrl);
      blob = await response.blob();
    } catch {
      throw new Error(
        "Foto lama tidak valid. Silakan pilih ulang file gambar sebelum menyimpan.",
      );
    }

    const mimeSubtype = blob.type.split("/")[1] || "png";
    const fileExt = mimeSubtype.replace(/[^a-zA-Z0-9]/g, "") || "png";
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("inventaris")
      .upload(fileName, blob, {
        contentType: blob.type || "image/png",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from("inventaris")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }

  async function simpanData() {
    if (!form.nama_alat || form.jumlah <= 0 || !form.foto) {
      alert("Lengkapi semua data.");
      return;
    }

    try {
      const fotoPublicUrl = await uploadFotoJikaBlob(form.foto);

      const { error } = await supabase.from("inventaris").insert([
        {
          nama_alat: form.nama_alat,
          jumlah: form.jumlah,
          foto: fotoPublicUrl,
        },
      ]);

      if (error) {
        alert(error.message);
        return;
      }

      await getData();
      handleClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal mengunggah foto.");
    }
  }

  async function updateData() {
    if (!selectedData) {
      alert("Pilih data yang akan diupdate.");
      return;
    }

    if (!form.nama_alat || form.jumlah <= 0 || !form.foto) {
      alert("Lengkapi semua data.");
      return;
    }

    try {
      const fotoPublicUrl = await uploadFotoJikaBlob(form.foto);

      const { error } = await supabase
        .from("inventaris")
        .update({
          nama_alat: form.nama_alat,
          jumlah: form.jumlah,
          foto: fotoPublicUrl,
        })
        .eq("id", selectedData.id);

      if (error) {
        alert(error.message);
        return;
      }

      await getData();
      handleClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal mengunggah foto.");
    }
  }

  async function hapusData() {
    if (!selectedData) {
      alert("Pilih data yang akan dihapus.");
      return;
    }

    const konfirmasi = confirm("Yakin ingin menghapus data ini?");
    if (!konfirmasi) return;

    const { error } = await supabase
      .from("inventaris")
      .delete()
      .eq("id", selectedData.id);

    if (error) {
      alert(error.message);
      return;
    }

    await getData();
    handleClose();
  }

  return (
    <main className="min-h-screen bg-[#16240D] text-white flex flex-col">
      <Navbar />

      <section
        className="
          flex-1
          w-full
          max-w-6xl
          mx-auto
          px-3
          md:px-7
          py-4
          pb-18
        "
      >
        <div className="flex flex-col lg:flex-row lg:items-center text-[12px] lg:justify-between gap-6 mb-6">
          <div>
            <h1 className="text-[38px] font-bold text-white">Inventaris</h1>
          </div>

          <button
            onClick={handleTambah}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-[#4D7B38]
              hover:bg-[#3F662E]
              text-white
              font-semibold
              px-3
              py-3
              text-[14px]
              rounded-2xl
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              w-full
              lg:w-auto
            "
          >
            <Plus size={20} />
            Tambah Inventaris
          </button>
        </div>

        <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-5 md:p-6">
          <div className="mb-4">
            <h2 className="text-[30px] font-bold text-gray-800">
              Daftar Inventaris
            </h2>
          </div>

          <InventarisTable data={data} onSelect={handleEdit} />
        </div>

        <InventarisPopup
          open={openPopup}
          selected={selectedData}
          form={form}
          setForm={setForm}
          onClose={handleClose}
          onSave={simpanData}
          onEdit={() => {}}
          onUpdate={updateData}
          onDelete={hapusData}
        />
      </section>

      <Footer />
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      setName(session.user.name);
    }
  }, [status, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    const res = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      Swal.fire("Berhasil", "Profil berhasil diperbarui", "success");
      await update(); // Refresh session data
    } else {
      Swal.fire("Gagal", "Terjadi kesalahan", "error");
    }
  };

  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-xl mt-10">
      <h1 className="text-2xl font-bold text-purple-400 mb-6">
        Edit Profil
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {session?.user?.image && (
          <img
            src={session.user.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
          />
        )}
        <div>
          <label className="block mb-2">Foto Profil</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full p-2 bg-gray-800 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

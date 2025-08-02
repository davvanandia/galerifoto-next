"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function EditProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (image) formData.append("image", image);

    const res = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      Swal.fire({
        title: "Berhasil!",
        text: "Profil diperbarui",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/profile");
      });
    } else {
      Swal.fire("Gagal", "Tidak bisa memperbarui profil", "error");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 pt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-purple-700 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-purple-300 mb-6 text-center">
          Edit Profil
        </h1>

        <input
          type="text"
          placeholder="Nama"
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-gray-100 border border-gray-700"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

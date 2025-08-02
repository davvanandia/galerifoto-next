"use client";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Pilih file gambar!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    const res = await fetch("/api/photos", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Foto berhasil diupload!");
      router.push("/");
    } else {
      const err = await res.json();
      alert(err.error || "Gagal upload foto");
    }
  };

  if (status === "loading") return <p className="p-6">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md border border-purple-700/20"
      >
        <h1 className="text-2xl font-bold text-purple-400 mb-6">Upload Foto</h1>
        <input
          type="text"
          placeholder="Judul Foto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-gray-100 border border-gray-700"
        />
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg border border-gray-700"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

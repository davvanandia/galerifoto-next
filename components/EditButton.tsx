"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditButton({
  photoId,
  currentTitle,
}: {
  photoId: string;
  currentTitle: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);

  const handleUpdate = async () => {
    const res = await fetch(`/api/photos/${photoId}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      setOpen(false);
      router.refresh();
    } else {
      alert("Gagal update foto");
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold text-purple-400 mb-4">
              Edit Judul Foto
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

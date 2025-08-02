"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function DeleteButton({ photoId }: { photoId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Hapus Foto?",
      text: "Foto ini akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea", // ungu
      cancelButtonColor: "#6b7280", // abu
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`/api/photos/${photoId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        Swal.fire("Terhapus!", "Foto berhasil dihapus.", "success");
        router.refresh();
      } else {
        Swal.fire("Gagal!", "Tidak bisa menghapus foto.", "error");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
    >
      Hapus
    </button>
  );
}

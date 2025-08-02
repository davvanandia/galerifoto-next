"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      Swal.fire("Cek Email", "Link reset password sudah dikirim!", "success");
    } else {
      Swal.fire("Gagal", "Email tidak ditemukan", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-purple-700 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-purple-300 mb-6 text-center">
          Lupa Password
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Kirim Link Reset
        </button>
      </form>
    </div>
  );
}

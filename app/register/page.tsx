"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      Swal.fire({
        title: "Sukses!",
        text: "Pendaftaran berhasil. Silakan login.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        router.push("/login");
      });
    } else {
      const err = await res.json();
      Swal.fire("Gagal!", err.error || "Registrasi gagal", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-purple-700 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-purple-300 mb-6 text-center">
          Register
        </h1>
        <input
          type="text"
          placeholder="Nama Lengkap"
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
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Daftar
        </button>
        <p className="text-gray-400 mt-4 text-center">
          Sudah punya akun?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

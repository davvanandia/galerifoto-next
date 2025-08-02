"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      Swal.fire({
        title: "Login gagal",
        text: "Email atau password salah.",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Coba Lagi",
        cancelButtonText: "Lupa Password?",
        confirmButtonColor: "#9333ea",
        cancelButtonColor: "#6b21a8",
      }).then((result) => {
        if (!result.isConfirmed) {
          // Jika klik "Lupa Password?"
          router.push("/forgot-password");
        }
      });
    } else {
      Swal.fire({
        title: "Sukses!",
        text: "Login berhasil",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/");
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-purple-700 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-purple-300 mb-6 text-center">
          Login
        </h1>
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
          Masuk
        </button>
        <p className="text-gray-400 mt-4 text-center">
          Belum punya akun?{" "}
          <a href="/register" className="text-purple-400 hover:underline">
            Daftar
          </a>
        </p>
      </form>
    </div>
  );
}

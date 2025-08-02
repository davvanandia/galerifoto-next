"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700">
          Halo, <strong>{session.user.name || session.user.email}</strong>
        </p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-end mb-6">
      <Link
        href="/login"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Register
      </Link>
    </div>
  );
}

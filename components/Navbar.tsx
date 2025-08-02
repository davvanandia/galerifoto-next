"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900/90 to-black/80 backdrop-blur-md border-b border-purple-700 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-purple-300 tracking-wide hover:text-white transition"
        >
          GaleriFoto
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-200 hover:text-purple-300 font-medium transition"
          >
            Home
          </Link>

          <Link
            href="/upload"
            className="text-gray-200 hover:text-purple-300 font-medium transition"
          >
            Upload
          </Link>

          {session && (
            <Link
              href="/profile"
              className="text-gray-200 hover:text-purple-300 font-medium transition"
            >
              Profile
            </Link>
          )}

          {!session && (
            <>
              <Link
                href="/login"
                className="px-4 py-1 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-medium transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-medium transition"
              >
                Register
              </Link>
            </>
          )}

          {session && (
            <button
              onClick={() => signOut()}
              className="px-4 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

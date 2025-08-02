import "./globals.css";
import type { Metadata } from "next";
import Providers from "./Providers";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Galerifoto",
  description: "App Galeri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 font-sans">
        <Providers>
          <Navbar />
          <main className="px-6 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

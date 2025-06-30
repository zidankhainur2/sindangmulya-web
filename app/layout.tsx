// /app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Contoh menggunakan Google Font
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Website Desa Sindangmulya",
  description: "Website resmi profil Desa Sindangmulya, Karawang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Children di sini akan diisi oleh nested layout atau page */}
        {children}
      </body>
    </html>
  );
}

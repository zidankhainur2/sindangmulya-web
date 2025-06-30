// /components/shared/Navbar.tsx

import Link from "next/link";
import { Leaf } from "lucide-react"; // Contoh ikon dari lucide-react

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-green-700"
        >
          <Leaf size={24} />
          <span>Desa Sindangmulya</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-green-600 transition-colors">
            Beranda
          </Link>
          <Link
            href="/berita"
            className="hover:text-green-600 transition-colors"
          >
            Berita
          </Link>
          <Link href="/umkm" className="hover:text-green-600 transition-colors">
            UMKM
          </Link>
          <Link
            href="/profil/sejarah"
            className="hover:text-green-600 transition-colors"
          >
            Profil Desa
          </Link>
        </div>
      </nav>
    </header>
  );
}

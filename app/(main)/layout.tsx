// /app/(main)/layout.tsx

import Navbar from "@/components/shared/Navbar";

// Komponen Footer sederhana
function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto py-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Pemerintah Desa Sindangmulya. All
          rights reserved.
        </p>
        <p className="mt-2">Dikembangkan oleh Mahasiswa KKN.</p>
      </div>
    </footer>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

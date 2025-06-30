// /app/(main)/page.tsx

import { sanityClient, urlForImage } from "@/lib/sanity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// Definisikan tipe data untuk Berita agar TypeScript tidak error
interface Berita {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  publishedAt: string;
}

// Fungsi untuk mengambil data berita dari Sanity
async function getLatestBerita() {
  // Ini adalah GROQ, bahasa query dari Sanity.
  // Artinya: "Ambil semua dokumen dengan tipe 'berita',
  // urutkan berdasarkan tanggal publikasi terbaru, lalu ambil 3 pertama."
  const query = `*[_type == "berita"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt
  }`;

  const data = await sanityClient.fetch(query);
  return data as Berita[]; // Kembalikan data sebagai array Berita
}

// Homepage sekarang adalah sebuah Async Server Component
export default async function HomePage() {
  const beritaTerbaru = await getLatestBerita();

  return (
    <div className="container mx-auto py-12">
      {/* Hero Section Sederhana */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Selamat Datang di Desa Sindangmulya
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Menuju Desa Digital yang Informatif, Kreatif, dan Sejahtera.
        </p>
      </section>

      {/* Bagian Berita Terbaru */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Berita & Agenda Terkini
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beritaTerbaru.map((berita) => (
            <Link key={berita._id} href={`/berita/${berita.slug.current}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <Image
                      src={urlForImage(berita.mainImage)
                        .width(500)
                        .height(300)
                        .url()}
                      alt={berita.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="line-clamp-2">{berita.title}</CardTitle>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(berita.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

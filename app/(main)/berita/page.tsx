// /app/(main)/berita/page.tsx

import { sanityClient, urlForImage } from "@/lib/sanity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// Definisikan tipe data untuk Berita
interface Berita {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: any;
  publishedAt: string;
}

// Fungsi untuk mengambil SEMUA data berita dari Sanity
async function getAllBerita() {
  // Query ini tidak memiliki batasan [0...3] seperti di homepage
  const query = `*[_type == "berita"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt
  }`;

  const data = await sanityClient.fetch(query);
  return data as Berita[];
}

// Export ini agar Next.js tidak mencoba melakukan revalidasi setiap detik
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BeritaPage() {
  const allBerita = await getAllBerita();

  return (
    <div className="container mx-auto py-12 px-4">
      <section>
        <h1 className="text-3xl font-bold text-center mb-8">
          Berita & Agenda Desa
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBerita.map((berita) => (
            <Link key={berita._id} href={`/berita/${berita.slug.current}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
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
                <CardContent className="p-6 flex-grow">
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

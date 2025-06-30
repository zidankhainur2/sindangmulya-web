// /app/(main)/berita/[slug]/page.tsx

import { sanityClient, urlForImage } from "@/lib/sanity";
import { PortableText } from "@portabletext/react"; // Impor komponen PortableText
import Image from "next/image";

// Definisikan tipe data untuk Detail Berita
interface BeritaDetail {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: any;
  publishedAt: string;
  body: any[]; // Tipe untuk Portable Text
}

// Fungsi untuk mengambil detail SATU berita berdasarkan slug-nya
async function getBeritaDetail(slug: string) {
  // Query ini menggunakan parameter $slug untuk mencari dokumen yang cocok
  const query = `*[_type == "berita" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    body
  }`;

  const data = await sanityClient.fetch(query, { slug });
  return data as BeritaDetail;
}

// (PENTING) Fungsi ini memberi tahu Next.js halaman mana saja yang harus di-generate saat build
export async function generateStaticParams() {
  const query = `*[_type == "berita" && defined(slug.current)][].slug.current`;
  const slugs: string[] = await sanityClient.fetch(query);
  return slugs.map((slug) => ({ slug }));
}

export const revalidate = 60; // Revalidate every 60 seconds

// Komponen halaman menerima 'params' yang berisi slug dari URL
export default async function BeritaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const berita = await getBeritaDetail(params.slug);

  // Definisikan komponen kustom untuk merender elemen di dalam Portable Text (jika perlu)
  const portableTextComponents = {
    types: {
      image: ({ value }: { value: any }) => (
        <div className="relative my-6 aspect-video">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || "Gambar artikel"}
            fill
            className="object-cover rounded-md"
          />
        </div>
      ),
    },
  };

  return (
    <article className="container mx-auto py-12 px-4 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{berita.title}</h1>
      <p className="text-gray-500 mb-8">
        Dipublikasikan pada{" "}
        {new Date(berita.publishedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="relative w-full aspect-video mb-8">
        <Image
          src={urlForImage(berita.mainImage).url()}
          alt={berita.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="prose prose-lg prose-headings:font-bold prose-a:text-green-600 max-w-none">
        <PortableText value={berita.body} components={portableTextComponents} />
      </div>
    </article>
  );
}

// /studio/schemas/umkm.ts

import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export default defineType({
  name: "umkm",
  title: "UMKM",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nama UMKM",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "ownerName",
      title: "Nama Pemilik",
      type: "string",
    }),
    defineField({
      name: "contact",
      title: "Kontak (HP/WA)",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Logo atau Foto Utama UMKM",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Deskripsi UMKM",
      type: "blockContent",
    }),
    defineField({
      name: "productGallery",
      title: "Galeri Foto Produk",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "location",
      title: "Lokasi di Peta",
      type: "geopoint", // Tipe data khusus untuk koordinat geografis
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "mainImage",
    },
  },
});

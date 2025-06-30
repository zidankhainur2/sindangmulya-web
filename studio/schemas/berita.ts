// /studio/schemas/berita.ts

import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons"; // Icon opsional untuk UI Studio

export default defineType({
  name: "berita",
  title: "Berita & Agenda",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (Rule) => Rule.required().error("Judul tidak boleh kosong."),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL Unik)",
      type: "slug",
      options: {
        source: "title", // Otomatis generate dari field 'title'
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Gambar Utama",
      type: "image",
      options: {
        hotspot: true, // Memudahkan cropping gambar
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal Publikasi",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Isi Berita",
      type: "blockContent", // Menggunakan skema yang kita buat tadi
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});

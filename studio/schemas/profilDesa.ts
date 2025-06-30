// /studio/schemas/profilDesa.ts

import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "profilDesa",
  title: "Profil Desa",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Judul Halaman",
      type: "string",
      readOnly: true, // Agar tidak bisa diubah oleh pengguna
    }),
    defineField({
      name: "body",
      title: "Isi Halaman",
      type: "blockContent",
    }),
  ],
});

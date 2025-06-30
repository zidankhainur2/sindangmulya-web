// /studio/sanity.config.ts

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// Impor semua skema yang sudah kita buat
import blockContent from './schemas/blockContent'
import berita from './schemas/berita'
import umkm from './schemas/umkm'
import profilDesa from './schemas/profilDesa'

// Daftar dokumen yang ingin kita perlakukan sebagai Singleton (hanya ada satu)
const singletonTypes = new Set(['profilDesa'])

export default defineConfig({
  name: 'default',
  title: 'Website Desa Sindangmulya',

  projectId: 'aihqs0p3', // <-- Ganti dengan Project ID Sanity Anda
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Konten Website')
          .items([
            // Item untuk halaman profil (singleton)
            S.listItem()
              .title('Sejarah Desa')
              .id('sejarah')
              .child(
                S.document()
                  .schemaType('profilDesa')
                  .documentId('sejarah')
                  .title('Edit Halaman Sejarah'),
              )
              .icon(() => '📜'), // Emoji sebagai ikon
            S.listItem()
              .title('Visi & Misi')
              .id('visiMisi')
              .child(
                S.document()
                  .schemaType('profilDesa')
                  .documentId('visiMisi')
                  .title('Edit Halaman Visi & Misi'),
              )
              .icon(() => '🎯'),
            S.listItem()
              .title('Struktur Pemerintahan')
              .id('strukturPemerintahan')
              .child(
                S.document()
                  .schemaType('profilDesa')
                  .documentId('strukturPemerintahan')
                  .title('Edit Halaman Struktur Pemerintahan'),
              )
              .icon(() => '👥'),
            S.divider(),

            // Item lain yang berupa list (Berita, UMKM, dll.)
            // Kita filter agar skema singleton tidak muncul di sini
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId()!),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    // Tambahkan semua skema kita di sini
    types: [berita, umkm, profilDesa, blockContent],
  },
})

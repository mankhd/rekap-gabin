# Dashboard Gabin — single-table sync

## Isi versi ini
- Backup penjualan yang diunggah pengguna sampai 14 Oktober 2026 disertakan sebagai data awal.
- Stok awal yang diminta: Coklat 16, Durian 23, Mangga 21, Matcha 2, Oreo 9, Stroberi 0, Vanila 0, Milo 0, Blueberry 0.
- Stok berkurang otomatis saat penjualan reguler atau online disimpan.
- Stok dikembalikan saat seluruh pesanan online dihapus atau item tertentu di dalam pesanan dihapus.
- Sinkronisasi tidak lagi menimpa form setiap 30 detik saat sedang diketik. Polling akan dilewati jika form memiliki perubahan belum disimpan.
- Semua data produk dan riwayat disimpan dalam satu tabel Supabase: `gabin_dashboard_state`.

## Setup Supabase satu tabel
1. Buka Supabase project > SQL Editor > New query.
2. Buka file `supabase-single-table.sql`, salin semua isinya ke SQL Editor, lalu tekan Run.
3. Deploy file `index.html`, `style.css`, dan `app.js` ke root repository GitHub Pages. Sertakan file SQL/README untuk dokumentasi.
4. Buka website, tunggu status cloud menunjukkan `Cloud terhubung • satu tabel`.
5. Periksa stok dan beberapa riwayat penjualan, lalu download backup JSON dari menu dashboard sebagai cadangan.

## Migrasi dari tabel lama
Saat `gabin_dashboard_state` belum berisi baris `id = main`, aplikasi mencoba membaca `gabin_daily_sales` dan `gabin_inventory`, menggabungkannya dengan backup lokal yang dibundel, lalu menyimpan gabungan itu ke tabel baru. Stok awal mengikuti angka yang diminta pengguna; harga/modal dari inventory lama tetap dipertahankan bila ada.
**Jangan hapus tabel lama sebelum dashboard berhasil terhubung dan semua data terverifikasi.** Setelah status cloud tersinkron, muat ulang website dan pastikan riwayat/produk tetap muncul. Unduh backup JSON. Baru setelah itu tabel `gabin_daily_sales` dan `gabin_inventory` boleh dihapus manual dari Supabase Table Editor.

## Catatan keamanan
Karena dashboard statis menggunakan publishable/anon key di browser, policy SQL di atas mengizinkan akses baca/tulis publik ke satu baris state. Siapa pun yang mengetahui URL website dapat berpotensi mengubah data. Jangan pernah menaruh `service_role` key di website. Untuk dashboard produksi/pribadi yang sensitif, gunakan autentikasi Supabase dan policy yang membatasi akses ke pengguna yang login.

## Struktur file
- `index.html` — antarmuka
- `style.css` — gaya dan responsif
- `app.js` — dashboard, stok otomatis, online sales, cloud sync
- `supabase-single-table.sql` — SQL untuk membuat tabel tunggal


## Fitur terbaru
- Catatan pengeluaran harian (tanggal, kategori, untuk apa, jumlah, keterangan) disimpan bersama di `gabin_dashboard_state`.
- Varian baru: Taro Chocochips, Stroberi Matcha, Vanilla Gojiberry, Jagung Keju, Vanilla Keju, Vanila Regal Keju, Lotus Biscoff. Stok awal varian baru 0; harga/modal awal sementara Rp10.000/Rp7.000 dan bisa diubah di menu Produk & Stok.
- Backup data terbaru disertakan sebagai `backup-gabin-dashboard-latest.json`.

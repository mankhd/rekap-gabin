# Gabin Dashboard — Cloud Sync + Stok + WhatsApp Message

## Fitur tambahan
- Varian Durian dan Blueberry.
- Manajemen stok per varian. Stok awal: Oreo 20, Matcha 11, Stroberi 11, Mangga 25, Milo 9, Coklat 30. Vanila, Durian, Blueberry dimulai dari 0 karena stok awalnya belum diberikan.
- Data penjualan dari backup sampai 11 Oktober 2026 dipertahankan. Saat cloud dimuat, riwayat lokal digabung dengan cloud; data lokal yang belum ada di cloud akan diunggah.
- Pesan update stok disusun otomatis dan bisa disalin.

## SQL Supabase
Di Supabase SQL Editor jalankan ini sekali. Tabel `gabin_daily_sales` tetap diperlukan seperti setup sebelumnya.

```sql
create table if not exists public.gabin_inventory (
  id text primary key,
  name text not null,
  stock integer not null default 0 check (stock >= 0),
  price integer not null default 10000,
  cost integer not null default 7000,
  updated_at timestamptz not null default now()
);
alter table public.gabin_inventory enable row level security;
create policy "public read gabin inventory" on public.gabin_inventory for select to anon using (true);
create policy "public insert gabin inventory" on public.gabin_inventory for insert to anon with check (true);
create policy "public update gabin inventory" on public.gabin_inventory for update to anon using (true) with check (true);
create policy "public delete gabin inventory" on public.gabin_inventory for delete to anon using (true);
```

Pastikan tabel `gabin_daily_sales` dan policy SELECT/INSERT/UPDATE/DELETE dari setup sebelumnya juga sudah ada. Upload `index.html`, `style.css`, `app.js` ke GitHub lalu refresh website.

## WhatsApp Channel
Website tidak bisa memposting langsung ke WhatsApp Channel karena WhatsApp tidak menyediakan API publik untuk menerbitkan posting channel dari website. Setelah stok disimpan, bagian Produk & Stok memperbarui teks pesan secara otomatis. Klik **Salin Pesan**, buka channel, lalu posting manual.

## Catatan sinkronisasi
Website menggunakan Supabase untuk menyimpan transaksi dan stok. Key yang ada di `app.js` adalah public/publishable key; jangan pernah masukkan service-role key ke website publik. RLS harus dikonfigurasi dengan benar.


## Penjualan khusus online
Menu Penjualan Online mencatat platform GoFood, GrabFood, atau ShopeeFood, jumlah setiap rasa menggunakan tombol +/−, uang diterima (nominal), dan catatan opsional. Order disimpan pada kolom JSONB `sales` dalam tabel `gabin_daily_sales` di bawah properti `__onlineOrders`, sehingga memakai sinkronisasi Supabase yang sama. Pastikan kolom `sales` bertipe `jsonb`.

## Memasukkan riwayat penjualan terbaru
File `backup-gabin-dashboard-2026-10-13.json` berisi backup yang dikirim untuk riwayat sampai 13 Oktober 2026 beserta produk dan stoknya. Setelah upload versi website ini, buka **Pengaturan → Import Data**, pilih file JSON tersebut. Import akan menyimpan data di browser dan mengirim catatan serta produk ke Supabase jika cloud sudah dikonfigurasi. Lakukan satu kali saja, dan pastikan project Supabase yang digunakan adalah project yang sama dengan website.

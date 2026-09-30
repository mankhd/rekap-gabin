# Gabin Sales Dashboard — GitHub Pages + Cloud Sync

Dashboard penjualan gabin dengan input `− / jumlah / +`, grafik, riwayat, dan sinkronisasi antar-perangkat.

## Supabase
GitHub Pages adalah hosting statis, jadi untuk sinkronisasi antar-perangkat diperlukan database cloud. Versi ini sudah disiapkan untuk Supabase.

Di Supabase → SQL Editor jalankan:

```sql
create table if not exists public.gabin_daily_sales (
  date date primary key,
  sales jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.gabin_daily_sales enable row level security;
create policy "public read gabin sales" on public.gabin_daily_sales for select to anon using (true);
create policy "public insert gabin sales" on public.gabin_daily_sales for insert to anon with check (true);
create policy "public update gabin sales" on public.gabin_daily_sales for update to anon using (true) with check (true);
create policy "public delete gabin sales" on public.gabin_daily_sales for delete to anon using (true);
```

Lalu buka Project Settings → API dan masukkan Project URL + anon/publishable key ke `app.js`:

```js
const SUPABASE_URL = "URL_PROJECT_KAMU";
const SUPABASE_ANON_KEY = "ANON_KEY_KAMU";
```

Jangan masukkan `service_role` key ke website.

Setelah aktif, input dari HP/laptop akan memakai database yang sama. Tombol produk menggunakan `− 0 +`.

Catatan keamanan: policy anonim di atas cocok untuk dashboard pribadi sederhana. Untuk penggunaan publik/serius, gunakan Supabase Auth dan RLS berbasis user.


## Konfigurasi
Project URL dan publishable key Supabase sudah dimasukkan ke `app.js`. Jangan masukkan `service_role` key ke website.

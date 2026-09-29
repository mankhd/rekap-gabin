# Gabin Sales Dashboard

Dashboard web statis untuk laporan penjualan gabin, dibuat mengikuti struktur file Excel:

- Produk: Coklat, Stroberi, Vanila, Matcha, Oreo, Mangga, Milo
- Input penjualan berdasarkan tanggal
- Total terjual
- Penghasilan / omzet
- Total modal
- Keuntungan
- Grafik keuntungan
- Ringkasan harian
- Riwayat dan edit data
- Pengaturan harga jual & modal per produk
- Backup / import JSON
- Dark/light mode
- Responsive untuk HP dan desktop
- Tidak membutuhkan database atau server

## Upload ke GitHub Pages

1. Buat repository baru di GitHub.
2. Upload `index.html`, `style.css`, dan `app.js`.
3. Masuk ke **Settings → Pages**.
4. Pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/root`.
6. Simpan. Website akan tersedia melalui GitHub Pages.

## Catatan

Data penjualan disimpan di `localStorage` browser. Artinya data pada perangkat/browser yang berbeda tidak otomatis tersinkronisasi. Gunakan menu Backup Data secara berkala.

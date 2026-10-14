# Perbaikan Gabin Dashboard

- Input kembali ke 0 karena polling Supabase setiap 30 detik menjalankan renderAll dan membangun ulang form. Polling sekarang tidak merender ulang form input.
- Penjualan Online memiliki tombol hapus per order dan Hapus Semua Riwayat Online. Penjualan reguler tidak ikut terhapus.
- Backup terbaru disertakan sebagai backup-gabin-dashboard-latest.json; tidak otomatis diimpor agar data cloud tidak tertimpa tanpa sengaja.

Upload index.html, style.css, dan app.js ke GitHub Pages, pertahankan konfigurasi Supabase, lalu hard refresh (Ctrl+F5).

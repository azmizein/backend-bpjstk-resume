# BPJS Backend

Ini adalah backend untuk aplikasi BPJS, dibangun menggunakan Node.js, Express, dan MySQL (atau MariaDB).

## Prasyarat
- Node.js terinstal di sistem Anda
- MySQL atau MariaDB terinstal dan berjalan

## Cara Menjalankan Project

1. **Buka terminal dan masuk ke direktori backend:**
   ```bash
   cd backend
   ```

2. **Instal dependensi yang dibutuhkan:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable:**
   - Salin file `.env.example` dan ubah namanya menjadi `.env`:
     ```bash
     cp .env.example .env
     ```
   - Buka file `.env` dan sesuaikan konfigurasi database Anda (Host, User, Password, dan Nama Database).

4. **Jalankan Setup Database (Opsional):**
   Jika ada setup khusus untuk membuat tabel, jalankan file setup (jika belum pernah dijalankan):
   ```bash
   node setup.js
   ```

5. **Jalankan server aplikasi:**
   ```bash
   node index.js
   ```
   Server secara default akan berjalan di `http://localhost:8080`.

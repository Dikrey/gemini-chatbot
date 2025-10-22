```md
# 🤖 AI Productivity & AI API Integration for Developers  
### *Powered by Google Gemini • Built by Raihan_official0307 × Visualcodepo*

> **"AI bukan pengganti developer — tapi partner terbaikmu."**  
> Tingkatkan produktivitas, percepat prototyping, dan bangun aplikasi cerdas dengan API AI yang **ramah, modern, dan siap produksi**!

---

## 🌟 Tentang Proyek

**AI Productivity and AI API Integration for Developers – Visualcodepo** adalah solusi RESTful API berbasis **Google Gemini** yang dirancang khusus untuk developer Indonesia.

Dibangun dengan **Node.js, Express, dan Google Generative AI**, proyek ini menyediakan:
- ✅ **Dua endpoint AI**: `/generate-text` (prompt tunggal) & `/api/chat` (percakapan multi-turn)
- ✅ **Frontend UI siap pakai** di folder `public/` — langsung buka di browser!
- ✅ Respons dalam **Bahasa Indonesia** dengan gaya **sopan, gaul, kekinian, dan informatif**
- ✅ Pengetahuan terkini hingga **2025**
- ✅ Validasi input super ketat — aman dari error!

---

## 🎨 Sudah Ada UI Frontend! (Responsive & Fresh)

🔥 **Tidak hanya API — tapi juga punya tampilan web chatbot yang keren!**

- 📱 **100% responsive** — tampil sempurna di HP, tablet, dan desktop  
- 🎨 **Desain fresh, minimalis, dan kekinian** dengan animasi halus  
- 💬 Mendukung **percakapan multi-turn** secara real-time  
- 🚀 Langsung jalan saat buka `http://localhost:3000`  
- 📁 Semua file (`index.html`, `style.css`, `script.js`) tersedia di folder `public/`  
- ⚡ Terhubung otomatis ke endpoint `/api/chat` via JavaScript

> Cukup jalankan server → buka browser → **langsung ngobrol dengan AI Raihan!**

---

## 🚀 Fitur Utama

### 🔹 **Endpoint `/generate-text`**
- Kirim satu prompt → dapatkan jawaban instan
- Validasi: string, panjang ≤1000 karakter, sanitasi otomatis
- Gaya respons: santai, informatif, pakai emoji 😊

### 🔹 **Endpoint `/api/chat` (Multi-Turn Chat)**
Mendukung riwayat percakapan lengkap dengan validasi ketat:
- ✅ `conversation` harus berupa **Array**
- ✅ Setiap pesan harus berupa **object** dengan:
  - `role`: hanya `"user"` atau `"model"`
  - `text`: string **non-kosong**
- ❌ Ditolak jika:
  - Ada `null`, tipe data salah, atau properti tidak sesuai
  - Pesan kosong (`""`)
  - Struktur tidak tepat

> 💡 Validasi ini memastikan kompatibilitas sempurna dengan Google Gemini API!

### 🔹 **Gaya Bahasa AI yang Unik**
Contoh respons:
> "Wih, pertanyaan keren nih! 😄 REST API itu kayak pelayan digital — lo minta, dia kasih. Gampang banget dipahami, kan?"

### 🔹 **Logging Interaktif di Terminal**
```log
===================================
📥 Prompt diterima: "Apa itu CORS?"
🧠 Mengirim ke model Raihan...
✅ Respons diterima dari AI
💬 Jawaban: "CORS itu aturan browser biar..."
```

### 🔹 **Siap Deploy & Integrasi**
- RESTful API (JSON-only)
- CORS-enabled → bisa dipakai dari frontend manapun
- Mendukung deployment di **Render, Railway, Vercel, dll**
- Tidak menyimpan data → privasi terjaga

---

## 🛠 Teknologi yang Digunakan

- **Node.js** – Runtime JavaScript modern  
- **Express.js** – Web framework ringan & cepat  
- **Google Generative AI** – Model `gemini-2.5-flash`  
- **ES Modules** – Syntax JavaScript terkini  
- **dotenv** – Manajemen environment variables  
- **cors** – Dukungan cross-origin  
- **express.static** – Serve file frontend dari `public/`  
- **Multer** – Siap untuk ekspansi upload file (future-ready)

---

## 📦 Instalasi & Penggunaan

### 1. Clone repositori
```bash
git clone https://github.com/Dikrey/gemini-chatbot.git
cd gemini-chatbot
```

### 2. Install dependensi
```bash
npm install
```

### 3. Buat file `.env`
```env
GEMINI_API_KEY=your_google_ai_studio_api_key_here
PORT=3000
```
> 🔑 Dapatkan API Key gratis di: [Google AI Studio](https://aistudio.google.com/app/apikey)

### 4. Jalankan server
```bash
npm start
# atau
node index.js
```

### 5. Buka di browser!
Buka: `http://localhost:3000` → **langsung pakai chatbot UI!**

### 6. Atau coba via terminal:
```bash
# Prompt tunggal
curl -X POST http://localhost:3000/generate-text \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Jelaskan Git ala anak gaul!"}'

# Percakapan multi-turn
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "conversation": [
      {"role": "user", "text": "Halo!"},
      {"role": "model", "text": "Hai! Ada yang bisa aku bantu? 😊"},
      {"role": "user", "text": "Apa itu AI?"}
    ]
  }'
```

---

## 🤝 Untuk Mitra & Developer H8

Proyek ini adalah bagian dari **kolaborasi eksklusif Visualcodepo × H8**, bertujuan untuk:
- Mempercepat adopsi AI di ekosistem developer Indonesia  
- Menyediakan **template API AI siap pakai** untuk bootcamp, startup, dan tim internal  
- Mendorong inovasi berbasis AI yang **lokal, relevan, dan humanis**

**Ingin berkolaborasi atau gunakan dalam program edukasi?**  
Hubungi: **partnerships@visualcodepo.id**

---

## 📜 Lisensi

Proyek ini bersifat **open for educational & non-commercial partnership use**.  
Untuk penggunaan komersial atau integrasi produk, **izin tertulis dari tim Visualcodepo diperlukan**.

---

## 💬 Penutup

> **"Biarkan AI urus riset & penjelasan — kamu fokus bikin hal besar!"**
> **"AI bukan pengganti developer — tapi partner terbaikmu."**  
> Gunakan kekuatan AI untuk coding lebih cepat, belajar lebih dalam, dan bangun solusi yang berdampak!

Dengan proyek ini, kamu bisa:
- Bangun chatbot internal dalam hitungan menit  
- Tambahkan fitur "AI Assistant" di aplikasimu  
- Otomatiskan dokumentasi teknis  
- Dan masih banyak lagi!

---


### 📎 Catatan Penting
- Model: `gemini-2.5-flash` (pastikan tersedia di akun Anda; jika tidak, ganti ke `gemini-1.5-flash`)
- Pengetahuan AI: **terbatas hingga akhir 2025** (tidak ada akses internet real-time)
- Semua respons dalam **Bahasa Indonesia** dengan gaya komunikasi **modern, santai, dan informatif**
- Folder `public/` wajib ada untuk UI — jangan dihapus!
```

---


✨ **Dibuat dengan ❤️ oleh Tim Developer – Raihan_official0307 × Visualcodepo**  
🚀 *Mendorong Inovasi • Menginspirasi Kolaborasi • Memberdayakan Developer Indonesia*

---

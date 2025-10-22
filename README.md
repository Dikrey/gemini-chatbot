<div align="center">
  
# 🚀 AI Productivity Hub: Gemini API for Developers
  
### **Node.js • Express • Google Gemini 2.5 Flash**
  
[![Repo Owner](https://img.shields.io/badge/Developed%20By-Raihan__official0307%20%C3%97%20Visualcodepo-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dikrey) 
[![License](https://img.shields.io/badge/License-Educational%20Use%20Only-yellowgreen?style=for-the-badge)](LICENSE.md) 
[![Tech Stack](https://img.shields.io/badge/Tech-Node.js%20%7C%20Express-black?style=for-the-badge&logo=nodedotjs&logoColor=white)]()
[![AI Model](https://img.shields.io/badge/Powered%20By-Google%20Gemini%202.5%20Flash-informational?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemini-api)

<br>
  
> **"AI bukan pengganti developer — tapi partner terbaikmu."**
> 
> Tingkatkan produktivitas, percepat *prototyping*, dan bangun aplikasi cerdas dengan API AI yang **ramah, modern, dan siap produksi**!
  
</div>

---

## 🌟 Tentang Proyek: Solusi API AI Generatif Lokal

**AI Productivity and AI API Integration for Developers – Visualcodepo** adalah solusi *RESTful API* berbasis **Google Gemini** yang dirancang khusus untuk memenuhi kebutuhan *developer* dan *startup* di Indonesia.

Dibangun dengan **Node.js, Express, dan Google Generative AI SDK**, proyek ini berfungsi sebagai **template dasar API AI** yang sangat *powerful* dan mudah diintegrasikan ke dalam proyek apapun.

### Fitur *Killer* Utama:

| Fitur | Deskripsi | Status |
| :--- | :--- | :--- |
| **Dua Endpoint Esensial** | `/generate-text` (Prompt Tunggal) & `/api/chat` (Multi-Turn Chat) | ✅ **Siap Pakai** |
| **Validasi Percakapan** | Validasi *schema* dan *role* pesan **super ketat** untuk integrasi Gemini yang sempurna. | 🔒 **Aman & *Robust*** |
| **Frontend UI Bawaan** | Tampilan *chatbot* **Responsive & Fresh** di folder `public/` — *plug-and-play!* | 🎨 **Keren & Cepat** |
| **Gaya Bahasa Indonesia** | Respons AI yang **sopan, gaul, kekinian, dan sangat informatif**. | 🇮🇩 **Lokal & Humanis** |
| ***Logging* Interaktif** | *Output* konsol yang informatif, memudahkan *debugging* dan monitoring. | ⚙️ **Developer-Friendly** |

---

## 🎨 Frontend UI: Langsung Coba Tanpa *Coding*!

<div align="center">

**🔥 Tampilan Web Chatbot yang Keren dan Mendukung *Real-Time Multi-Turn Conversation*!**

[![UI Responsif Demo](https://img.shields.io/badge/Responsive_Design-100%25-brightgreen?style=for-the-badge&logo=device&logoColor=white)](https://github.com/Dikrey/gemini-chatbot) 

</div>

Semua aset (`index.html`, `style.css`, `script.js`) sudah tersedia di folder `public/`. Cukup jalankan server, dan kamu bisa langsung berinteraksi dengan **AI Raihan** melalui antarmuka web yang **minimalis dan *modern***.

**Cara Akses:** Buka `http://localhost:3000` di browser-mu.

---

### 🔹 **Logging Interaktif di Terminal**
```log
===================================
📥 Prompt diterima: "Apa itu CORS?"
🧠 Mengirim ke model Raihan...
✅ Respons diterima dari AI
💬 Jawaban: "CORS itu aturan browser biar..."
```

---


## 💻 Detail Endpoint API

Proyek ini menyediakan dua pintu masuk utama menuju kekuatan Gemini API:

### 1. **Endpoint: `/generate-text`** 💬
Untuk permintaan AI yang bersifat **sekali jalan** (seperti membuat ringkasan, kode singkat, atau pertanyaan instan).

| Metode | URL | Payload (*Body*) | Deskripsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/generate-text` | `{"prompt": "Tanya apa saja..."}` | Jawaban cepat & instan. |

> 🔒 **Validasi:** Menerima *string* **non-kosong**, panjang $\leq 1000$ karakter, dilengkapi *sanitasi* otomatis.

### 2. **Endpoint: `/api/chat`** 🗣️
Untuk membangun **percakapan yang berkesinambungan** (*multi-turn*). Riwayat percakapan dikirimkan sepenuhnya di setiap permintaan.

| Metode | URL | Payload (*Body*) | Deskripsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/chat` | `{"conversation": [ ... ]}` | Meneruskan riwayat obrolan dan menambahkan pesan terbaru. |

#### **Skema Objek `conversation` (Wajib):**

| Properti | Tipe | Contoh Nilai | Wajib | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| `role` | String | `"user"` atau `"model"` | Ya | Harus salah satu dari dua nilai tersebut. |
| `text` | String | `"Apa kabar AI?"` | Ya | Konten pesan, tidak boleh kosong. |

> 🚨 **Validasi Ketat:** API akan menolak keras jika: *Array* kosong, tipe data salah, `role` tidak sesuai, atau ada pesan kosong. Ini untuk menjamin stabilitas integrasi dengan Google Generative AI SDK!

---

## ✨ Gaya Bahasa & Kepribadian AI (Unique Selling Point!)

AI ini dipersonalisasi untuk berinteraksi dalam **Bahasa Indonesia** dengan gaya yang unik:

> **Gaya:** Santai, *fun*, informatif, persuasif, sering menggunakan *emoji*.
> 
> **Contoh Respons:**
> 
> *"Wih, pertanyaan keren nih! 😄 REST API itu kayak pelayan digital — lo minta, dia kasih. Gampang banget dipahami, kan? Fokus, ya!"*

---

## 🛠 Teknologi & *Stack*

<div align="center">
  
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini API](https://img.shields.io/badge/API-Google%20Generative%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemini-api)
[![ESM](https://img.shields.io/badge/Syntax-ES%20Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
[![dotenv](https://img.shields.io/badge/Config-dotenv-DEA584?style=for-the-badge&logo=dotenv&logoColor=white)](https://www.npmjs.com/package/dotenv)
[![CORS](https://img.shields.io/badge/Access-CORS%20Enabled-794BC4?style=for-the-badge)](https://www.npmjs.com/package/cors)
[![JSON Only](https://img.shields.io/badge/Data%20Format-JSON--only-563D7C?style=for-the-badge)](https://www.json.org/json-en.html)
  
</div>

---

## 📦 Instalasi Super Cepat

Ikuti langkah-langkah mudah ini untuk menjalankan API dalam hitungan menit!

### 1. Clone Repositori
```bash
git clone [https://github.com/Dikrey/gemini-chatbot.git](https://github.com/Dikrey/gemini-chatbot.git)
cd gemini-chatbot
````

### 2\. Install Dependensi

```bash
npm install
```

### 3\. Jalankan Server

```bash
npm start
# atau
node index.js

```

### 3\. Konfigurasi Kunci API (`.env`)

Buat file baru bernama **`.env`** di *root directory* dan isi dengan API Key Anda:

```env
# 🔑 Dapatkan API Key GRATIS di: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=your_google_ai_studio_api_key_here
PORT=3000
```

### 4\. Jalankan Server\!

```bash
npm start
# atau
node index.js
```

\<div align="center"\>

✨ Server berjalan\! Kunjungi **`http://localhost:3000`** untuk mencoba UI-nya\! ✨

\</div\>

### 5\. Contoh Uji Coba via Terminal (*cURL*)

**A. Prompt Tunggal (`/generate-text`):**

```bash
curl -X POST http://localhost:3000/generate-text \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Jelaskan Git ala anak gaul!"}'
```

**B. Percakapan Multi-Turn (`/api/chat`):**

```bash
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

-----

## 🤝 Kolaborasi & Lisensi

Proyek ini adalah bagian dari **kolaborasi eksklusif Raihan\_official0307 × Visualcodepo**, yang didedikasikan untuk edukasi dan pemberdayaan *developer* Indonesia.

**Lisensi:** Proyek ini **open for educational & non-commercial partnership use**.

> **⚠️ Catatan Komersial:** Untuk penggunaan komersial atau integrasi produk, **izin tertulis dari tim Visualcodepo diperlukan**.

### Tertarik untuk Kolaborasi?

Hubungi kami: **partnerships@visualcodepo.id**

-----

\<div align="center"\>

# 💬 Penutup: *Level Up* Proyekmu dengan AI\!

> **"Biarkan AI urus riset & penjelasan — kamu fokus bikin hal besar\!"**

Dengan *template* API ini, kamu dapat:

  - 🛠️ Bangun *chatbot* internal dalam hitungan menit.
  - 💡 Tambahkan fitur "AI Assistant" di aplikasimu.
  - 📄 Otomatiskan dokumentasi teknis.
  - 🚀 Percepat *development* dan *prototyping*.

<br>

✨ **Dibuat dengan ❤️ oleh Tim Developer – Raihan\_official0307 × Visualcodepo** ✨

*Mendorong Inovasi • Menginspirasi Kolaborasi • Memberdayakan Developer Indonesia*

\</div\>

```
```
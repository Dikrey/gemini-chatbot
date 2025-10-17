// Sengaja Dipenuhi Command
// Code: Muhammad Raihan
// import dependencies
//
import "dotenv/config"; // muat variabel lingkungan dari .env
import express from "express";
import cors from "cors";
import multer from "multer"; // tetap diimpor meski tidak dipakai di route ini (mungkin untuk fitur lain)
import { GoogleGenAI } from "@google/genai";
// session 5 import path/url package
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inisialisasi aplikasi
const app = express();
const upload = multer(); // akan digunakan di dalam recording (jika ada upload file nanti)

// Validasi API key
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY tidak ditemukan di file .env");
  process.exit(1);
}

// Inisialisasi Google GenAI dengan API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// Deklarasi variable di JavaScript
// [const|let][namaVariable] = [value]
// [var] --> nggak boleh dipake lagi (fungsinya sudah digantikan oleh const/let di ES2015)
// [var] --> global declaration (var namaOrang)
//
// [const] --> 1x declare, nggak bisa diubah-ubah lagi
// [let]   --> 1x declare, tapi bisa diubah-ubah (re-assignment)
//
// tipe data: number, string, boolean (true/false), undefined
// special: null (tipe-nya object, tapi nilainya falsy)
const GEMINI_MODEL = "gemini-2.5-flash"; // ✅ gunakan model yang tersedia

// Inisialisasi middleware
// contoh: app.use(namaMiddleware());
app.use(cors()); // inisialisasi CORS (Cross-Origin Resource Sharing) sebagai middleware
app.use(express.json()); // parse body JSON (penting untuk menerima req.body)

// session 5 inisialisasi static directory

app.use(
  // express.static(rootDirectory, options) 
  express.static(
    path.join(__dirname, "public"),
  ),
); // rootDirectory




const PORT = process.env.PORT || 3000;

// Inisialisasi routing
// contoh: app.get(), app.post(), app.put(), dll
// -- get/post/put itu bagian dari standar HTTP
// HTTP Methods:
// GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
//
// Functions (* --> yang digunakan di sesi kali ini)
//
// secara penulisannya
// function biasa --> function namaFunction(){}
// [*] arrow function --> const namaFunction = () => {}
//
// secara alurnya
// synchronous --> () => {}
// [*] asynchronous --> async () => {}

// Helper: sanitasi prompt (opsional, untuk keamanan dasar)
const sanitizePrompt = (str) => {
  return str.trim().replace(/\s+/g, " "); // hapus spasi berlebih
};

app.post("/generate-text", async (req, res) => {
  // Terima jeroannya, lalu cek di sini
  const { prompt } = req.body; // object destructuring

  console.log(`===================================`);
  console.log(`📥 Prompt diterima: "${prompt}"`);

  // Guard clause (kasarnya, satpam)
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      success: false,
      message: "Prompt harus berupa string!",
      data: null,
    });
  }

  // Validasi tambahan: panjang dan konten bersih
  const cleanPrompt = sanitizePrompt(prompt);
  if (cleanPrompt.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Prompt tidak boleh kosong setelah dibersihkan.",
      data: null,
    });
  }
  if (cleanPrompt.length > 1000) {
    return res.status(400).json({
      success: false,
      message: "Prompt terlalu panjang (maksimal 1000 karakter).",
      data: null,
    });
  }

  // jeroannya
  try {
    console.log("🧠 Mengirim ke model Raihan...");

    const aiResponse = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ text: cleanPrompt }],
      // ini untuk config AI-nya lebih jauh lagi
      config: {
        systemInstruction: `Kamu adalah asisten AI Raihan yang sangat membantu, ramah, dan modern. 
Selalu jawab dalam **Bahasa Indonesia** dengan gaya bicara yang **sopan, gaul, kekinian, dan mudah dimengerti** (seperti teman ngobrol yang asik). 
Jika memungkinkan, sertakan informasi berdasarkan pengetahuan terkini (hingga tahun 2025) dan sebutkan sumber atau konteks real-time jika relevan. 
Hindari jawaban kaku, robotik, atau terlalu formal. Gunakan emoji secukupnya untuk membuat respons lebih hidup! 😊`,
      },
    });

    // Ambil teks dari respons — coba beberapa struktur umum
    const text =
      aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text ||
      aiResponse?.result?.output ||
      aiResponse?.txt ||
      "Tidak ada teks yang dihasilkan.";

    console.log("✅ Respons diterima dari AI");
    console.log(
      `💬 Jawaban: "${text.substring(0, 100)}${text.length > 100 ? "..." : ""}"`
    );

    res.status(200).json({
      success: true,
      message: "Berhasil dijawab sama AI nih!",
      data: text,
    });
  } catch (error) {
    console.error("❌ Error saat memanggil Asisten:", error);
    res.status(500).json({
      success: false,
      message: "Gagal gan, server-nya kayaknya lagi bermasalah!",
      data: null,
    });
  }
});



app.post("/api/chat", async (req, res) => {
  const { conversation } = req.body;
  console.log(conversation);

  try{
    // satpam #1 cek conversation apakah berupa array atau tidak dengan array Array.isArray()
    if(!Array.isArray(conversation)){
      throw new Error("Conversation harus berupa array!");
    }


    // satpam #2 cek setiap pesan dalam conversation,apakah valid atau tidak
    let messageIsValid = true;

    if (conversation.length === 0){
      throw new Error("Conversation tidak boleh kosong!");
    
    }

    // for (let i = 0; i < message.length; i++){
    //   const message = conversation[i];
    // }


    conversation.forEach(message => {
      // bisa tambah satu kondisi lagi untuk cek variable messageIsValid
      // di sini

       if (!messageIsValid) {
        return; // skip, karena sudah ada error sebelumnya
        }

      // kondiisi message harus berupa object dan bukan null
      if (!message || typeof message !== "object"){
        messageIsValid = false;
        return;
      }


      const { text, role } = message;
      if (!text || typeof text !== "string"){
        messageIsValid = false;
        return;
      }

      const keys = Object.keys(message);
      const objectHasValidKeys = keys.every(key => ["text", "role"].includes(key));

      // looping kondisi dalam array
      //  .every()--> &&-nya si if --> 1 false,semuanya false
      //  .some() --> ||-nya si if --> true, semuanya menjadi true

      // kondisi 2 message punya struktur valid
      if(keys.length !== 2 || !objectHasValidKeys){
       messageIsValid = false;
      return;
      }

      // kondiis 3A role harus valid
      if(!["model", "user"].includes(role)){
        messageIsValid = false;
        return;
      }

      // kondisi 3b -- text harus valid
      if(!text || typeof text !== "string"){
        messageIsValid = false;
        return;
      }
        });

      // if (!role || (role !== "user" && role !== "model")){
      //   messageIsValid = false;
      //   return;
      // }

      if(!messageIsValid){
        throw new Error("Message tidak valid!");
      }
      
  

    

      // proses dagingnya
      const contents = conversation.map(({role, text}) => ({
        role,
        parts: [{text}],
      }));

      const aiResponse = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: {
          systemInstruction: `Kamu adalah asisten AI Raihan yang sangat membantu, ramah, dan modern. 
Selalu jawab dalam **Bahasa Indonesia** dengan gaya bicara yang **sopan, gaul, kekinian, dan mudah dimengerti** (seperti teman ngobrol yang asik). 
Jika memungkinkan, sertakan informasi berdasarkan pengetahuan terkini (hingga tahun 2025) dan sebutkan sumber atau konteks real-time jika relevan. 
Hindari jawaban kaku, robotik, atau terlalu formal. Gunakan emoji secukupnya untuk membuat respons lebih hidup! 😊`,
        },
      });
      
      res.status(200).json({
        success: true,
        message: "Berhasil dijawab sama AI nih!",
        data: aiResponse.text,
      });


  }catch(e){
    res.status(400).json({
      success: false,
      message: e.message,
      data: null,
    });
  }
});


// server-nya harus di-serve dulu!
app.listen(
  PORT, // port yang akan diakses

  () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`💬 Endpoint: POST /generate-text`);
    console.log(`💬 Endpoint: POST /api/chat`);
    console.log(`📝 Contoh input: { "prompt": "Halo" }`);
  }
);

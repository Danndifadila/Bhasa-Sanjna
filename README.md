# Bhasa-Sanjna

**Bhasa Sanjna** adalah sebuah aplikasi berbasis web yang bertujuan untuk menjembatani komunikasi antara masyarakat umum dengan penyandang Tuli atau pengguna bahasa isyarat. Aplikasi ini memungkinkan pengguna untuk menerjemahkan teks menjadi bahasa isyarat dan sebaliknya, serta menyimpan riwayat interaksi.

## Fitur Utama

- **Penerjemah Teks ke Bahasa Isyarat**
- **Riwayat Aktivitas** berdasarkan pengguna


## Teknologi yang Digunakan

### Front-End:
- React.js
- Tailwind CSS

### Back-End:
- Hapi.js
- JWT untuk autentikasi
- MySQL (via `mysql2`)

### Machine Learning
- Sickit-Learn
- OpenCV
- MediaPipe
- Flask
- FastAPI

## Instalasi

1. **Clone Repository:**
   bash
   git clone https://github.com/username/bhasa-sanjna.git
   cd bhasa-sanjna
   

2. **Install Dependencies:**
   bash
   npm install
   

3. **Setup Database:**
   - Import file SQL yang tersedia di `/db`
   - Konfigurasi koneksi MySQL di file `database.js`

4. **Jalankan Server:**
   
   npm run start
   

5. **Jalankan Front-End (jika terpisah):**
  
   npm run start-dev
   

## Struktur Folder

Bhasa-Sanjna/
├── node_modules/
├── picture/
├── public/
├── src/
│   ├── components/
│   └── pages/
│       ├── api.js
│       ├── App.jsx
│       ├── handlers.js
│       ├── index.css
│       ├── index.js
│       ├── routes.js
│       ├── server.js
│       └── translations.js
├── videos/
├── .babelrc
├── .env
├── .gitignore
├── database.js
├── dictionary.html
├── index.js
├── LICENSE
├── main.js
├── package-lock.json
├── package.json
├── README.md
└── webpack.config.cjs

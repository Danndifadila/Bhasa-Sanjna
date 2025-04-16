const API_URL = 'http://localhost:5000';

// Fungsi bantu untuk mengonversi base64 ke Blob
function base64ToBlob(base64, type = 'video/webm') {
  // Validasi input
  if (!base64 || typeof base64 !== 'string') {
    throw new Error('Input base64 harus berupa string');
  }

  // Pisahkan header dan dat
  const parts = base64.split(',');
  if (parts.length < 2) {
    throw new Error('Format base64 tidak valid, harus diawali dengan "data:[mime-type];base64,"');
  }

  const byteCharacters = atob(parts[1]);
  const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type });
}

const api = {
  getAllTranslations: async () => {
    try {
      const response = await fetch(`${API_URL}/translations`);
      if (!response.ok) throw new Error('Gagal mengambil data');
      const data = await response.json();
      return data.data.translations;
    } catch (error) {
      console.error('Error ambil translations (memori):', error);
      throw error;
    }
  },

  getTranslationById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/translations/${id}`);
      if (!response.ok) throw new Error('Gagal mengambil data berdasarkan ID');
      const data = await response.json();
      return data.data.translation;
    } catch (error) {
      console.error('Error ambil translation berdasarkan ID:', error);
      throw error;
    }
  },

  getAllTranslationsHistory: async () => {
    try {
      const response = await fetch(`${API_URL}/translations/history`);
      const data = await response.json(); 
      return data; 
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil riwayat terjemahan:', error);
      throw error;
    }
  },

  // POST - Tambah hasil translation ke database dan juga ke localStorage
  addTranslations: async (videoBlob, text) => {
    try {
      // Validasi input
      if (!videoBlob || !(videoBlob instanceof Blob)) {
        throw new Error('Video blob harus berupa instance Blob');
      }
      if (videoBlob.size <= 0) {
        throw new Error('Video blob tidak boleh kosong');
      }

      // Generate nama file unik dengan format webm dan timestamp
      const generateUniqueFilename = () => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const randomString = Math.random().toString(36).substring(2, 8);
        return `recording-${timestamp}-${randomString}.webm`;
      };
      
      const uniqueFilename = generateUniqueFilename();
      
      const formData = new FormData();
      formData.append('video', videoBlob, uniqueFilename); // Gunakan nama unik
      formData.append('text', text || '');

      const response = await fetch(`${API_URL}/translations`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || typeof data !== 'object') {
        throw new Error('Respon server tidak valid');
      }

      // Handle localStorage
      let history = [];
      try {
        const stored = localStorage.getItem('translations');
        history = stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.warn('Error parsing localStorage, resetting history');
      }

      // Tambahkan entry baru dengan referensi file unik
      const newEntry = {
        id: data.data?.id || Date.now(),
        video: uniqueFilename, // Selalu gunakan nama file unik yang baru dibuat
        text: data.data?.text || text || '',
        timestamp: new Date().toISOString()
      };

      history.push(newEntry);

      // Batasi ukuran history
      if (history.length > 50) { // Simpan maksimal 50 rekaman terakhir
        history = history.slice(-50);
      }

      try {
        localStorage.setItem('translations', JSON.stringify(history));
      } catch (e) {
        console.error('Gagal menyimpan ke localStorage:', e);
        // Jika penuh, hapus yang terlama
        if (e.name === 'QuotaExceededError') {
          history.shift();
          localStorage.setItem('translations', JSON.stringify(history));
        }
      }

      return {
        ...data,
        filename: uniqueFilename // Return nama file unik
      };
    } catch (error) {
      console.error('Error in addTranslations:', error);
      throw error;
    }
  },
};

export default api;

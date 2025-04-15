const API_URL = 'http://localhost:5000';

const api = {
  // GET - Ambil semua data translation dari memori (translations.js)
 getAllTranslations : async () => {
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
  

  //GET - mengambil data terjemahan berdasarkan id
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

  getAllTranslationsHistory : async () => {
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
      const formData = new FormData();
      formData.append('video', videoBlob, 'recorded_video.webm');
      formData.append('text', text);
  
      const response = await fetch(`${API_URL}/translations`, {
        method: 'POST',
        body: formData, 
      });
  
      if (!response.ok) throw new Error('Terjadi kesalahan saat menambahkan');
  
      const data = await response.json();
  
      const history = JSON.parse(localStorage.getItem('translations')) || [];
      history.push({
        id: data.data.id,
        video: data.data.video,
        text: data.data.text,
      });
      localStorage.setItem('translations', JSON.stringify(history));
  
      return data;
    } catch (error) {
      console.error('Error saat menambahkan ke database dan localStorage:', error);
      throw error;
    }
  },
  
 

 
};

export default api;

const API_URL = 'http://localhost:5000';

const api = {
  // GET - Ambil semua data translation dari memori (translations.js)
  getAllTranslations: async () => {
    try {
      const response = await fetch(`${API_URL}/translations`);
      if (!response.ok) throw new Error('Gagal mengambil data dari memori');
      const data = await response.json();
      return data.data.translations;
    } catch (error) {
      console.error('Error ambil translations (memori):', error);
      throw error;
    }
  },

  // GET - Ambil semua data dari database (translations_dictionary)
  getAllTranslationsDictionary: async () => {
    try {
      const response = await fetch(`${API_URL}/translations/dictionary`);
      if (!response.ok) throw new Error('Gagal mengambil data dari database');
      const data = await response.json();
      return data.data.translations;
    } catch (error) {
      console.error('Error ambil translations dictionary:', error);
      throw error;
    }
  },

  // POST - Tambah hasil translation ke database dan juga ke localStorage
  addTranslations: async (video, text) => {
    try {
      const response = await fetch(`${API_URL}/translations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video, text }),
      });
  
      if (!response.ok) throw new Error('Terjadi kesalahan saat menambahkan');
  
      const data = await response.json();
  
    
      const history = JSON.parse(localStorage.getItem('translations')) || [];
      history.push({
        id: data.data.translationId,  
        video: data.data.video,
        text: data.data.text,
        addedAt: new Date().toISOString(),
      });
      localStorage.setItem('translations', JSON.stringify(history));
  
      return data;
    } catch (error) {
      console.error('Error saat menambahkan ke database dan localStorage:', error);
      throw error;
    }
  },

  // POST - Tambah translation ke database dictionary
  addTranslationsDictionary: async (image, text) => {
    try {
      const response = await fetch(`${API_URL}/translations/dictionary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, text }),
      });

      if (!response.ok) throw new Error('Gagal menambahkan ke database');
      return await response.json();
    } catch (error) {
      console.error('Error saat menambahkan ke dictionary:', error);
      throw error;
    }
  },

  registerUser : async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal registrasi');
      return data;
    } catch (error) {
      console.error('Error saat registrasi:', error);
      throw error;
    }
  },
  
  loginUser : async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal login');
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
  
      return data;
    } catch (error) {
      console.error('Error saat login:', error);
      throw error;
    }
  },
};

export default api;

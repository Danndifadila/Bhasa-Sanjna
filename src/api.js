const API_URL = 'http://localhost:5000';

const api = {
  // GET - Fetch all translations from memory (translations.js)
  getAllTranslations: async () => {
    try {
      const response = await fetch(`${API_URL}/translations`);
      if (!response.ok) throw new Error('Failed to fetch data from memory');
      const { data } = await response.json();
      return data.translations;
    } catch (error) {
      console.error('Error fetching translations (memory):', error);
      throw error;
    }
  },

  // GET - Fetch all translations from the database (translations_dictionary)
  getAllTranslationsDictionary: async () => {
    try {
      const response = await fetch(`${API_URL}/translations/dictionary`);
      if (!response.ok) throw new Error('Failed to fetch data from database');
      const { data } = await response.json();
      return data.translations;
    } catch (error) {
      console.error('Error fetching translations dictionary:', error);
      throw error;
    }
  },

  // POST - Add a translation to the database and localStorage
  addTranslations: async (video, text) => {
    try {
      const response = await fetch(`${API_URL}/translations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video, text }),
      });

      if (!response.ok) throw new Error('Error adding translation');

      const { data } = await response.json();

      // Update localStorage with the new translation
      const history = JSON.parse(localStorage.getItem('translations')) || [];
      history.push({
        id: data.translationId,
        video: data.video,
        text: data.text,
        addedAt: new Date().toISOString(),
      });
      localStorage.setItem('translations', JSON.stringify(history));

      return data;
    } catch (error) {
      console.error('Error adding to database and localStorage:', error);
      throw error;
    }
  },

  // POST - Add a translation to the dictionary database
  addTranslationsDictionary: async (image, text) => {
    try {
      const response = await fetch(`${API_URL}/translations/dictionary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, text }),
      });

      if (!response.ok) throw new Error('Error adding to dictionary database');
      return await response.json();
    } catch (error) {
      console.error('Error adding to dictionary:', error);
      throw error;
    }
  },

  // POST - Register a new user
  registerUser: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  // POST - Log in a user
  loginUser: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      // Store token and username in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);

      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },
};

export default api;

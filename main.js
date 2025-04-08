const BASE_URL = 'http://localhost:5000';

const api = {
    getAllTranslations: async () => {
        try {
            const response = await fetch(`${BASE_URL}/translations`);
            if (!response.ok) throw new Error('Gagal mengambil daftar terjemahan');
            const responseJson = await response.json();
            return responseJson.data.translations || [];
        } catch (error) {
            console.error('Error fetching translations:', error);
            return [];
        }
    },

    addTranslation: async (translation) => {
        try {
            const response = await fetch(`${BASE_URL}/translations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(translation),
            });
            if (!response.ok) throw new Error('Gagal menambahkan terjemahan');
            return await response.json();
        } catch (error) {
            console.error('Error adding translation:', error);
            return { status: 'error', message: error.message };
        }
    }
};

export default api;

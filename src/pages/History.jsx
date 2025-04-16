import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ActivityCard from '../components/ActivityCard';
import api from '../api'; 

const History = () => {
  const [historyEntries, setHistoryEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await api.getAllTranslationsHistory();
        
        // Pastikan data memiliki URL video yang lengkap
        const entries = Array.isArray(response?.data?.translations) 
          ? response.data.translations.map(entry => ({
              ...entry,
              // Jika backend hanya mengembalikan nama file, buat URL lengkap
              videoUrl: entry.videoUrl || `http://localhost:5000/uploads/videos/${entry.video}`
            }))
          : [];
          
        setHistoryEntries(entries);
        
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Gagal memuat riwayat terjemahan.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchHistory();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <Navbar />

        <main className="py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            This is your recent activities
          </h1>

          <div className="max-w-2xl mx-auto">
            {loading && (
              <div className="text-center py-8">
                <p>Memuat riwayat...</p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {!loading && !error && historyEntries.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Belum ada riwayat terjemahan.</p>
              </div>
            )}

            {historyEntries.map((entry) => (
              <ActivityCard
                key={entry.id}
                id={entry.id}
                timestamp={new Date(entry.added_at).toLocaleString()} 
                previewText={entry.text?.slice(0, 100) || 'Tidak ada teks'} 
                videoUrl={entry.videoUrl} // Mengirim URL lengkap
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ActivityCard from '../components/ActivityCard';
import api from '../api'; // pastikan ini benar sesuai struktur project

/**
 * History page component
 * Shows a list of past translation activities from API
 */
const History = () => {
  const [historyEntries, setHistoryEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.getAllTranslationsHistory();
        console.log('API response:', response); 
        if (Array.isArray(response?.data?.translations)) {
          setHistoryEntries(response.data.translations);
        } else {
          setHistoryEntries([]);
        }
        
      } catch (err) {
        console.error(err);
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
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && historyEntries.length === 0 && (
              <p className="text-center text-gray-500">Belum ada riwayat terjemahan.</p>
            )}

            {historyEntries.map((entry) => (
              <ActivityCard
                key={entry.id}
                id={entry.id}
                timestamp={new Date(entry.added_at).toLocaleString()} 
                previewText={entry.text.slice(0, 100)} 
                thumbnails={[1, 2, 3]} 
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';
import api from '../api';

const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const response = await api.getTranslationById(id);
        setHistoryData(response);
        
        // Generate URL video dari folder videos
        if (response.video) {
          // Membersihkan nama file dari spasi jika ada
          const cleanVideoName = response.video.replace(/\s+/g, '%20');
          const videoPath = `../../videos/${cleanVideoName}`;
          setVideoUrl(videoPath);
        }
      } catch (err) {
        setError('Gagal mengambil data terjemahan.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslation();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!historyData) return <p className="p-4">Data tidak ditemukan.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <Navbar />
        
        <main className="py-4">
          <button 
            onClick={() => navigate('/history')}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to History</span>
          </button>
          
          <h1 className="text-3xl font-bold mb-2">Translation History</h1>
          <p className="text-gray-600 mb-6">{new Date(historyData.added_at).toLocaleString()}</p>
          
          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Text</h2>
              <p className="whitespace-pre-line">{historyData.text}</p>
            </div>

            {videoUrl && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Recorded Video</h2>
                <video controls className="w-full rounded" key={videoUrl}>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoryDetail;
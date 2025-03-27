import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';

/**
 * History Detail page component
 * Shows detailed view of a past translation activity
 */
const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Dummy data - in a real app, you would fetch this based on the ID
  const historyData = {
    id: id,
    timestamp: "March 21, 2025 - 2:30 PM",
    fullText: "Hello, how are you? I am learning sign language. This is a practice session to improve my skills. I want to be able to communicate effectively with the deaf community. Sign language is a beautiful and expressive form of communication."
  };

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
          <p className="text-gray-600 mb-6">{historyData.timestamp}</p>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="whitespace-pre-line">{historyData.fullText}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoryDetail;
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';

/**
 * History Detail page component
 * Displays detailed information about a specific translation history
 */
const HistoryDetail = () => {
  const { id } = useParams(); // Extract the history ID from the URL
  const navigate = useNavigate(); // Navigation hook for programmatic routing

  // Dummy data for demonstration purposes
  const historyData = {
    id,
    timestamp: "March 21, 2025 - 2:30 PM",
    fullText: `Hello, how are you? I am learning sign language. 
This is a practice session to improve my skills. 
I want to be able to communicate effectively with the deaf community. 
Sign language is a beautiful and expressive form of communication.`,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Navbar component */}
        <Navbar />

        <main className="py-4">
          {/* Back button to navigate to the history page */}
          <button
            onClick={() => navigate('/history')}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to History</span>
          </button>

          {/* Page title */}
          <h1 className="text-3xl font-bold mb-2">Translation History</h1>
          {/* Display the timestamp */}
          <p className="text-gray-600 mb-6">{historyData.timestamp}</p>

          {/* Display the full text of the translation */}
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="whitespace-pre-line">{historyData.fullText}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoryDetail;
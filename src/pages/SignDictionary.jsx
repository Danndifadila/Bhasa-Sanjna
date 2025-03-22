import React from 'react';
import Navbar from '../components/Navbar';

/**
 * Sign Language Dictionary page component
 * Displays a table of sign language gestures and their translations
 */
const SignDictionary = () => {
  // Dummy data for dictionary entries
  const dictionaryEntries = [
    { id: 1, gesture: "https://example.com/gesture1.mp4", translation: "Hello" },
    { id: 2, gesture: "https://example.com/gesture2.mp4", translation: "Thank you" },
    { id: 3, gesture: "https://example.com/gesture3.mp4", translation: "Yes" },
    { id: 4, gesture: "https://example.com/gesture4.mp4", translation: "No" },
    { id: 5, gesture: "https://example.com/gesture5.mp4", translation: "Help" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <Navbar />
        
        <main className="py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Sign Language Dictionary</h1>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left">Gesture</th>
                  <th className="py-3 px-6 text-left">Translation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dictionaryEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="py-4 px-6">
                      <div className="bg-gray-200 w-32 h-24 rounded flex items-center justify-center">
                        {/* In a real app, this would be a video player */}
                        <span className="text-gray-500">Video</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{entry.translation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignDictionary;
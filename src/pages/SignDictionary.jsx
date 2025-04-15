import React from 'react';
import Navbar from '../components/Navbar';

/**
 * Sign Language Dictionary page component
 * Displays a table of sign language gestures and their translations
 */
const SignDictionary = () => {
  // Dummy data for dictionary entries
  const dictionaryEntries = [
    { id: 1, gesture: "/picture/L.jpg", translation: "L" },
    { id: 2, gesture: "/picture/Terimakasih.png", translation: "Terima Kasih" },
    { id: 3, gesture: "/picture/D.jpg", translation: "D" },
    { id: 4, gesture: "/picture/M.jpg", translation: "M" },
    { id: 5, gesture: "/picture/J.jpg", translation: "J" },
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
                      <div className="bg-gray-200 w-32 h-24 rounded flex items-center justify-center overflow-hidden">
                        <img src={entry.gesture} alt={entry.translation} className="w-full h-full object-contain" />
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
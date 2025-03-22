import React from 'react';
import Navbar from '../components/Navbar';
import ActivityCard from '../components/ActivityCard';

/**
 * History page component
 * Shows a list of past translation activities
 */
const History = () => {
  // Dummy data for history entries
  const historyEntries = [
    { 
      id: 1, 
      timestamp: "Yesterday", 
      previewText: "Hello, how are you? I am learning sign language.",
      thumbnails: [1, 2, 3] 
    },
    { 
      id: 2, 
      timestamp: "1 Week Ago", 
      previewText: "Thank you for helping me. I appreciate your support.",
      thumbnails: [1, 2, 3] 
    },
    { 
      id: 3, 
      timestamp: "1 Month Ago", 
      previewText: "Can you please tell me where the bathroom is?",
      thumbnails: [1, 2, 3] 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <Navbar />
        
        <main className="py-8">
          <h1 className="text-3xl font-bold text-center mb-8">This is your recent activities</h1>
          
          <div className="max-w-2xl mx-auto">
            {historyEntries.map((entry) => (
              <ActivityCard 
                key={entry.id}
                id={entry.id}
                timestamp={entry.timestamp}
                previewText={entry.previewText}
                thumbnails={entry.thumbnails}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
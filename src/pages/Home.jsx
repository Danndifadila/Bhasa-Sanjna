import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MediaUploader from '../components/MediaUploader';
import { Camera, Book } from 'lucide-react';

/**
 * Home page component
 * Displays welcome message, navigation buttons, and media upload option
 */
const Home = () => {
  const navigate = useNavigate();
  const [mediaFile, setMediaFile] = useState(null);

  const handleUpload = (file) => {
    setMediaFile(file);
    // In a real app, you might process the file here
    // For now, we'll just navigate to translate page
    navigate('/translate');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <Navbar />
        
        <main className="py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Welcome to Bhasa Sajna</h1>
            <p className="text-gray-600">Unlock communication with other people</p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={() => navigate('/translate')}
              className="bg-gray-200 rounded-lg p-6 flex items-center"
            >
              <Camera className="h-8 w-8 mr-3" />
              <div className="text-left">
                <span className="block text-xl font-medium">Start</span>
                <span className="block text-xl font-medium">Translate</span>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/dictionary')}
              className="bg-gray-200 rounded-lg p-6 flex items-center"
            >
              <Book className="h-8 w-8 mr-3" />
              <div className="text-left">
                <span className="block text-xl font-medium">Sign</span>
                <span className="block text-xl font-medium">Language</span>
                <span className="block text-xl font-medium">Dictionary</span>
              </div>
            </button>
          </div>
          
          <div className="max-w-xl mx-auto">
            <MediaUploader onUpload={handleUpload} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
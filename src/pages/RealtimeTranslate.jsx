import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TranslationBox from '../components/TranslationBox';
import { ArrowLeft } from 'lucide-react';

/**
 * Realtime Translation page component
 * Shows camera feed and translated text in real-time
 */
const RealtimeTranslate = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate translation with dummy data
  useEffect(() => {
    const phrases = [
      "Hello, how are you?",
      "I am fine, thank you",
      "Nice to meet you",
      "What is your name?",
      "My name is..."
    ];
    
    // Mock translation process
    const intervalId = setInterval(() => {
      setIsLoading(true);
      setTimeout(() => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setTranslatedText(randomPhrase);
        setIsLoading(false);
      }, 1500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Request camera access when component mounts
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    // Clean up when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <Navbar />
        
        <main className="py-4">
          <button 
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </button>
          
          <h1 className="text-3xl font-bold text-center mb-4">Translating from your gesture</h1>
          <p className="text-center text-gray-600 mb-6">Make sure your camera is on and isn't covered</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                className="w-full h-64 object-cover"
              ></video>
            </div>
            <TranslationBox text={translatedText} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RealtimeTranslate;
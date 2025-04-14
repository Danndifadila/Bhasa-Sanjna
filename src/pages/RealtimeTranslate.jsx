import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TranslationBox from '../components/TranslationBox';
import { ArrowLeft } from 'lucide-react';

// Navigation listener component to handle route changes
const NavigationListener = () => {
  useEffect(() => {
    // Dispatch event to stop the camera when navigating away
    const handleRouteChange = () => {
      window.dispatchEvent(new Event('stop-camera'));
    };

    return () => {
      window.dispatchEvent(new Event('stop-camera'));
    };
  }, []);

  return null;
};

const RealtimeTranslate = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null); // Reference to the video element
  const streamRef = useRef(null); // Reference to the camera stream
  const [translatedText, setTranslatedText] = useState(''); // State for translated text
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const [cameraStatus, setCameraStatus] = useState({
    active: false,
    error: null,
    tracks: 0,
  }); // State for camera status

  // Function to stop the camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
      if (videoRef.current) videoRef.current.srcObject = null; // Clear video source
      streamRef.current = null;
      setCameraStatus({ active: false, error: null, tracks: 0 });
    }
  };

  // Function to start the camera
  const startCamera = async () => {
    try {
      stopCamera(); // Ensure previous stream is stopped
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream; // Save the stream reference
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((err) => console.error('Error playing video:', err));
        };
      }
      setCameraStatus({ active: true, error: null, tracks: stream.getTracks().length });
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraStatus({ active: false, error: err.message || 'Failed to access camera', tracks: 0 });
    }
  };

  // Start the camera when the component mounts
  useEffect(() => {
    startCamera();
    return () => stopCamera(); // Cleanup on unmount
  }, []);

  // Stop the camera when the page is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) stopCamera();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Listen for custom 'stop-camera' events
  useEffect(() => {
    const stopCameraHandler = () => stopCamera();
    window.addEventListener('stop-camera', stopCameraHandler);
    return () => window.removeEventListener('stop-camera', stopCameraHandler);
  }, []);

  // Mock translation effect to simulate real-time translation
  useEffect(() => {
    const phrases = [
      'Hello, how are you?',
      'I am fine, thank you',
      'Nice to meet you',
      'What is your name?',
      'My name is...',
    ];
    const intervalId = setInterval(() => {
      setIsLoading(true);
      setTimeout(() => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setTranslatedText(randomPhrase);
        setIsLoading(false);
      }, 1500);
    }, 5000);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Handle back button click
  const handleGoBack = () => {
    stopCamera();
    navigate('/');
  };

  return (
    <>
      <NavigationListener />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4">
          <Navbar />
          <main className="py-4">
            {/* Back button */}
            <button
              onClick={handleGoBack}
              className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Kembali</span>
            </button>

            {/* Page title and instructions */}
            <h1 className="text-3xl font-bold text-center mb-4">Menerjemahkan Gerakan Anda</h1>
            <p className="text-center text-gray-600 mb-6">
              Pastikan kamera Anda aktif dan tidak terhalang
            </p>

            {/* Camera and translation box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-200 rounded-lg overflow-hidden">
                {cameraStatus.active ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-64 object-cover"
                  ></video>
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-gray-500">
                    {cameraStatus.error ? `Error: ${cameraStatus.error}` : 'Kamera tidak aktif'}
                  </div>
                )}
              </div>
              <TranslationBox text={translatedText} isLoading={isLoading} />
            </div>

            {/* Debug information */}
            <div className="mt-4 text-center text-sm text-gray-600">
              Camera Status: {cameraStatus.active ? 'Active' : 'Inactive'}
              <br />
              Active Tracks: {cameraStatus.tracks}
              {cameraStatus.error && (
                <>
                  <br />
                  Error: {cameraStatus.error}
                </>
              )}
            </div>

            {/* Retry button for camera */}
            {!cameraStatus.active && (
              <div className="text-center mt-4">
                <button
                  onClick={startCamera}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Coba Aktifkan Kamera
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default RealtimeTranslate;

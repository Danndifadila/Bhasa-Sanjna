import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TranslationBox from '../components/TranslationBox';
import { ArrowLeft } from 'lucide-react';

// Komponen listener navigasi
const NavigationListener = () => {
  useEffect(() => {
    const handleRouteChange = () => {
      // Kirim event khusus untuk mematikan kamera
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
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState({
    active: false,
    error: null,
    tracks: 0
  });

  // Fungsi untuk menghentikan stream kamera secara total
  const stopCamera = () => {
    console.log('Stopping camera...');
    
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      
      console.log(`Number of tracks: ${tracks.length}`);
      
      tracks.forEach(track => {
        console.log(`Stopping track: ${track.kind}`);
        track.stop();
      });
      
      // Hapus source object dari video
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      streamRef.current = null;
      setCameraStatus({ 
        active: false, 
        error: null,
        tracks: 0
      });

      console.log('Camera stopped successfully');
    } else {
      console.log('No active camera stream to stop');
    }
  };

  // Memulai kamera
  const startCamera = async () => {
    try {
      // Pastikan stream sebelumnya dihentikan
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });

      console.log('Camera stream obtained');
      console.log('Stream active:', stream.active);
      
      // Simpan stream
      streamRef.current = stream;

      // Set video source
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Tambahkan event listener untuk memastikan video berjalan
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
            .then(() => console.log('Video playing'))
            .catch(err => console.error('Error playing video:', err));
        };
      }

      // Update status kamera
      setCameraStatus({ 
        active: true, 
        error: null,
        tracks: stream.getTracks().length
      });

    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraStatus({ 
        active: false, 
        error: err.message || "Gagal mengakses kamera",
        tracks: 0
      });
    }
  };

  // Efek untuk memulai kamera saat komponen dimuat
  useEffect(() => {
    startCamera();

    // Cleanup saat komponen unmount
    return () => {
      stopCamera();
    };
  }, []);

  // Listener untuk menghentikan kamera saat halaman tidak terlihat
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCamera();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Listener khusus untuk event stop-camera
  useEffect(() => {
    const stopCameraHandler = () => {
      stopCamera();
    };

    window.addEventListener('stop-camera', stopCameraHandler);

    return () => {
      window.removeEventListener('stop-camera', stopCameraHandler);
      stopCamera();
    };
  }, []);

  // Mock translation effect
  useEffect(() => {
    const phrases = [
      "Hello, how are you?",
      "I am fine, thank you",
      "Nice to meet you",
      "What is your name?",
      "My name is..."
    ];
    
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

  // Handler untuk kembali
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
            <button 
              onClick={handleGoBack}
              className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Kembali</span>
            </button>
            
            <h1 className="text-3xl font-bold text-center mb-4">Menerjemahkan Gerakan Anda</h1>
            <p className="text-center text-gray-600 mb-6">Pastikan kamera Anda aktif dan tidak terhalang</p>
            
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
                    {cameraStatus.error ? 
                      `Error: ${cameraStatus.error}` : 
                      'Kamera tidak aktif'
                    }
                  </div>
                )}
              </div>
              <TranslationBox text={translatedText} isLoading={isLoading} />
            </div>

            {/* Debug Info */}
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

            {/* Tombol untuk memulai ulang kamera jika gagal */}
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
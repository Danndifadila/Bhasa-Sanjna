import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MediaUploader from "../components/MediaUploader";
import { Video, BookOpenText } from "lucide-react";

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
    navigate("/translate");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <Navbar />

        <main className="py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Welcome to Bhasa Sajna</h1>
            <p className="text-gray-600">
              Unlock communication with other people
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => navigate("/translate")}
              className="bg-gray-200 rounded-3xl p-6 min-w-60">
              <Video className="h-8 w-8 items-center justify-center flex m-auto" />
              <div className="text-left">
                <span className="block text-xl font-medium text-center">
                  Start Translate
                </span>
              </div>
            </button>

            <button
              onClick={() => navigate("/dictionary")}
              className="bg-gray-200 rounded-3xl p-6 min-w-60 ">
              <BookOpenText className="h-8 w-8 flex justify-center m-auto" />
              <div className="text-left">
                <span className="block text-xl font-medium text-center">
                  Dictionary
                </span>
              </div>
            </button>
          </div>

          {/* <div className="max-w-xl mx-auto">
            <MediaUploader onUpload={handleUpload} />
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default Home;

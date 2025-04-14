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

  /**
   * Handles media file upload
   * @param {File} file - The uploaded media file
   */
  const handleUpload = (file) => {
    setMediaFile(file);
    navigate("/translate"); // Navigate to the translate page after upload
  };

  /**
   * Renders a navigation button
   * @param {string} label - Button label
   * @param {React.Component} Icon - Icon component
   * @param {string} route - Navigation route
   */
  const renderNavButton = (label, Icon, route) => (
    <button
      onClick={() => navigate(route)}
      className="bg-gray-200 rounded-3xl p-6 min-w-60"
    >
      <Icon className="h-8 w-8 flex justify-center m-auto" />
      <div className="text-left">
        <span className="block text-xl font-medium text-center">{label}</span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Navbar */}
        <Navbar />

        <main className="py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Welcome to Bhasa Sajna</h1>
            <p className="text-gray-600">
              Unlock communication with other people
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            {renderNavButton("Start Translate", Video, "/translate")}
            {renderNavButton("Dictionary", BookOpenText, "/dictionary")}
          </div>

          {/* Media Uploader */}
          <div className="max-w-xl mx-auto">
            <MediaUploader onUpload={handleUpload} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

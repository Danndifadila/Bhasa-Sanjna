import React from "react";
import { Upload } from "lucide-react";

/**
 * MediaUploader Component
 * A reusable component for uploading media files.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onUpload - Callback function triggered when a valid media file is uploaded
 */
const MediaUploader = ({ onUpload }) => {
  /**
   * Handles file input change event
   * Validates the file type and triggers the onUpload callback
   *
   * @param {Event} e - Input change event
   */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]; // Safely access the first file
    if (file?.type === "video/mp4") {
      onUpload(file); // Trigger callback with the selected file
    }
  };

  return (
    <div className="w-full py-2 flex justify-center">
      {/* Label acts as a styled button for file input */}
      <label className="flex items-center justify-center bg-gray-200 rounded-3xl py-2 px-4 cursor-pointer text-sm h-20 w-60">
        <span className="text-xl font-medium">Upload Media</span>
        <Upload className="h-8 w-8 ml-3" />
        {/* Hidden file input for selecting video files */}
        <input
          type="file"
          accept="video/mp4"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default MediaUploader;

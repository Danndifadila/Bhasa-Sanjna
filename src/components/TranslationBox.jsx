import React from 'react';

/**
 * TranslationBox Component
 * Displays translation results or a loading indicator.
 * 
 * @param {Object} props
 * @param {string} props.text - The translated text to display
 * @param {boolean} props.isLoading - Whether the translation is in progress
 */
const TranslationBox = ({ text = "Translation will appear here", isLoading = false }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg h-full w-full">
      {isLoading ? (
        // Show loading indicator when translation is in progress
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600">Translating...</p>
        </div>
      ) : (
        // Show translated text or default message
        <p className="text-gray-800">{text}</p>
      )}
    </div>
  );
};

export default TranslationBox;
import React from 'react';

/**
 * Component that displays translation results
 * 
 * @param {Object} props
 * @param {string} props.text - The translated text to display
 * @param {boolean} props.isLoading - Whether the translation is in progress
 */
const TranslationBox = ({ text, isLoading = false }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg h-full w-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600">Translating...</p>
        </div>
      ) : (
        <p className="text-gray-800">{text || "Translation will appear here"}</p>
      )}
    </div>
  );
};

export default TranslationBox;
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * Activity card component used in the history page
 * Displays a history item with timestamp and preview of translation
 * 
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the activity
 * @param {string} props.timestamp - Time descriptor (e.g., "Yesterday", "1 Week Ago")
 * @param {string} props.previewText - Preview of the translated text
 * @param {Array} props.thumbnails - Array of thumbnail images
 */
const ActivityCard = ({ id, timestamp, previewText, thumbnails = [] }) => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 mb-6 relative">
      <h3 className="font-medium mb-2">{timestamp}</h3>
      <div className="flex space-x-2 mb-2">
        {thumbnails.map((_, index) => (
          <div key={index} className="w-16 h-16 bg-gray-300 rounded-lg"></div>
        ))}
      </div>
      <p className="text-sm text-gray-700 line-clamp-2">{previewText}</p>
      <Link 
        to={`/history/${id}`} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
      >
        <ArrowUpRight className="h-5 w-5" />
      </Link>
    </div>
  );
};

export default ActivityCard;
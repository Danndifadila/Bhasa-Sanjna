import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Activity card component used in the history page
 * Displays a history item with timestamp and preview of translation
 * 
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the activity
 * @param {string} props.timestamp - Time descriptor (e.g., "Yesterday", "1 Week Ago")
 * @param {string} props.previewText - Preview of the translated text
 * @param {string} props.videoPreview - Video filename for preview
 */
const ActivityCard = ({ id, timestamp, previewText, videoPreview }) => {
  const [videoError, setVideoError] = React.useState(false);
  const videoUrl = videoPreview 
    ? `http://localhost:5000/uploads/videos/${videoPreview}`
    : null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 hover:shadow-md transition-shadow relative">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-800">{timestamp}</h3>
        <Link 
          to={`/history/${id}`} 
          className="text-black-500 hover:text-blue-700 transition-colors"
          aria-label="View details"
        >
          <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
      
     
      
      <p className="text-sm text-gray-600 line-clamp-2">
        {previewText || 'No translation text available'}
      </p>
    </div>
  );
};

ActivityCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  timestamp: PropTypes.string.isRequired,
  previewText: PropTypes.string,
  videoPreview: PropTypes.string,
};

ActivityCard.defaultProps = {
  previewText: '',
  videoPreview: null,
};

export default ActivityCard;
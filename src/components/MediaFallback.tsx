import React from 'react';

interface MediaFallbackProps {
  type: 'image' | 'video';
  className?: string;
}

export const MediaFallback: React.FC<MediaFallbackProps> = ({ type, className = '' }) => {
  return (
    <div className={`flex items-center justify-center p-4 bg-gray-100 rounded-lg ${className}`}>
      <div className="text-center">
        <div className="text-gray-400 mb-2">
          {type === 'image' ? '🖼️' : '🎥'}
        </div>
        <p className="text-sm text-gray-500">
          {type === 'image' ? 'Image failed to load' : 'Video failed to load'}
        </p>
      </div>
    </div>
  );
}; 
import React from 'react';

interface MediaFallbackProps {
  type: 'image' | 'video';
  className?: string;
}

export const MediaFallback: React.FC<MediaFallbackProps> = ({ type, className = '' }) => {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }} aria-hidden="true">
          {type === 'image' ? '🖼️' : '🎥'}
        </div>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          {type === 'image' ? 'Image failed to load' : 'Video failed to load'}
        </p>
      </div>
    </div>
  );
}; 
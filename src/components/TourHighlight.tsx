import React from 'react';
import { clsx } from 'clsx';

interface TourHighlightProps {
  targetRect: DOMRect;
  scrollLeft: number;
  scrollTop: number;
  highlightConfig: {
    className?: string;
    style?: React.CSSProperties;
  };
}

export const TourHighlight: React.FC<TourHighlightProps> = ({
  targetRect,
  scrollLeft,
  scrollTop,
  highlightConfig,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: targetRect.top + scrollTop - 4,
        left: targetRect.left + scrollLeft - 4,
        width: targetRect.width + 8,
        height: targetRect.height + 8,
        isolation: 'isolate',
        ...highlightConfig.style,
      }}
      className={clsx(
        'fixed z-50 transition-all duration-200',
        highlightConfig.className
      )}
      role="presentation"
      aria-hidden="true"
    />
  );
}; 
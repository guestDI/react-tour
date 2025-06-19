import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import type { HighlightConfig } from '../types';

interface TourHighlightProps {
  targetRect: DOMRect;
  scrollLeft: number;
  scrollTop: number;
  highlightConfig: HighlightConfig;
  animation?: 'slide' | 'bounce' | 'fade';
}

export const TourHighlight: React.FC<TourHighlightProps> = ({
  targetRect,
  scrollLeft,
  scrollTop,
  highlightConfig,
  animation = 'slide',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure the initial position is set
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [targetRect]);

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
        highlightConfig.className,
        { visible: isVisible }
      )}
      data-animation={animation}
      role="presentation"
      aria-hidden="true"
    />
  );
}; 
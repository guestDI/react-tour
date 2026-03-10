import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import type { HighlightConfig } from '../types';

const HIGHLIGHT_PADDING = 8;

interface TourHighlightProps {
  targetRect: DOMRect;
  highlightConfig: HighlightConfig;
  animation?: 'slide' | 'bounce' | 'fade';
}

export const TourHighlight: React.FC<TourHighlightProps> = ({
  targetRect,
  highlightConfig,
  animation = 'slide',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
        position: 'fixed',
        top: targetRect.top - HIGHLIGHT_PADDING,
        left: targetRect.left - HIGHLIGHT_PADDING,
        width: targetRect.width + HIGHLIGHT_PADDING * 2,
        height: targetRect.height + HIGHLIGHT_PADDING * 2,
        ...highlightConfig.style,
      }}
      className={clsx(
        'tour-highlight z-50',
        highlightConfig.className,
        { visible: isVisible }
      )}
      data-animation={animation}
      role="presentation"
      aria-hidden="true"
    />
  );
}; 
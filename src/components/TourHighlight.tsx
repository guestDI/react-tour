import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import type { HighlightConfig } from '../types';

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
  const padding = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--tour--highlight--padding') || '8'
  );

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
        top: targetRect.top - padding,
        left: targetRect.left - padding,
        width: targetRect.width + padding * 2,
        height: targetRect.height + padding * 2,
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
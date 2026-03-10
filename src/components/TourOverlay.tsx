import React from 'react';
import { clsx } from 'clsx';

interface TourOverlayProps {
  overlayClassName?: string;
  isPartialBlur?: boolean;
  /** When true a highlight element provides the spotlight via box-shadow — skip the solid overlay */
  hasHighlight?: boolean;
}

export const TourOverlay: React.FC<TourOverlayProps> = ({
  overlayClassName,
  isPartialBlur,
  hasHighlight,
}) => {
  return (
    <>
      {/* Blur overlay */}
      {isPartialBlur && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40"
          style={{
            mixBlendMode: 'multiply',
          }}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Plain full-screen overlay — only shown when there is no highlight element.
          When a highlight is present its box-shadow creates the dark surround instead,
          which naturally follows border-radius for a rounded spotlight. */}
      {!hasHighlight && (
        <div
          className={clsx('tour-overlay fixed inset-0 z-40', overlayClassName)}
          role="presentation"
          aria-hidden="true"
        />
      )}
    </>
  );
}; 
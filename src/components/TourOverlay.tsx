import React from 'react';
import { clsx } from 'clsx';

interface TourOverlayProps {
  targetRect: DOMRect;
  overlayClassName?: string;
  isPartialBlur?: boolean;
}

export const TourOverlay: React.FC<TourOverlayProps> = ({
  targetRect,
  overlayClassName,
  isPartialBlur,
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

      {/* Spotlight cutout */}
      <div
        className={clsx('tour-overlay fixed inset-0 z-40', overlayClassName)}
        style={{
          clipPath: `path('M0 0H100%V100%H0V0z M${targetRect.left} ${targetRect.top}H${targetRect.right}V${targetRect.bottom}H${targetRect.left}V${targetRect.top}z')`,
        }}
        role="presentation"
        aria-hidden="true"
      />
    </>
  );
}; 
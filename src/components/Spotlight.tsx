import React, { useEffect, useRef } from 'react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';
import type { SpotlightProps } from '../types';
import { clsx } from 'clsx';
import '../styles/theme.css';

export const Spotlight: React.FC<SpotlightProps> = ({
  targetElement,
  placement,
  content,
  onNext,
  onBack,
  onSkip,
  onComplete,
  isFirstStep,
  isLastStep,
  className,
  overlayClassName,
  tooltipClassName,
  buttonClassName,
  buttonContainerClassName,
  highlightTarget = false,
}) => {
  const { refs, floatingStyles, update } = useFloating({
    placement,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (targetElement) {
      refs.setReference(targetElement);
      update();
    }
  }, [targetElement, refs, update]);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'Enter':
          onNext();
          break;
        case 'ArrowLeft':
          onBack();
          break;
        case 'Escape':
          onSkip();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onBack, onSkip]);

  if (!targetElement) return null;

  const rect = targetElement.getBoundingClientRect();
  const highlightConfig = typeof highlightTarget === 'boolean' 
    ? { className: 'tour-highlight' } 
    : highlightTarget;

  // Get the target element's accessible name or role
  const targetLabel = targetElement.getAttribute('aria-label') || 
                     targetElement.getAttribute('aria-labelledby') ||
                     targetElement.getAttribute('title') ||
                     targetElement.getAttribute('role') ||
                     'element';

  return (
    <>
      {/* Status announcements for screen readers */}
      <div 
        role="status" 
        aria-live="polite" 
        className="sr-only"
        aria-atomic="true"
      >
        {`Tour step: ${targetLabel}. ${content}`}
      </div>

      <div
        ref={overlayRef}
        className={clsx('tour-overlay fixed inset-0 z-50', overlayClassName)}
        style={{
          clipPath: `path('M0 0H100%V100%H0V0z M${rect.left} ${rect.top}H${rect.right}V${rect.bottom}H${rect.left}V${rect.top}z')`,
        }}
        role="presentation"
        aria-hidden="true"
      />
      {highlightTarget && (
        <div
          className={clsx(
            'fixed z-40 transition-all duration-200',
            highlightConfig.className
          )}
          style={{
            ...highlightConfig.style,
            top: rect.top - 4,
            left: rect.left - 4,
            width: rect.width + 8,
            height: rect.height + 8,
          }}
          role="presentation"
          aria-hidden="true"
        />
      )}
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={clsx('tour-tooltip z-50', tooltipClassName)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-step-title"
        aria-describedby="tour-step-content"
        data-placement={placement}
      >
        <div id="tour-step-title" className="sr-only">
          {`Tour Step: ${targetLabel}`}
        </div>
        <div id="tour-step-content" className="mb-4">
          {content}
        </div>
        <div 
          className={clsx('flex justify-between items-center gap-2', buttonContainerClassName)}
          role="toolbar"
          aria-label="Tour navigation"
        >
          <div className="flex gap-2">
            {!isFirstStep && (
              <button
                onClick={onBack}
                className={clsx('tour-button tour-button-secondary', buttonClassName)}
                aria-label="Go to previous step"
              >
                Back
              </button>
            )}
            <button
              onClick={onSkip}
              className={clsx('tour-button tour-button-secondary', buttonClassName)}
              aria-label="Skip tour"
            >
              Skip
            </button>
          </div>
          <button
            onClick={isLastStep ? onComplete : onNext}
            className={clsx('tour-button tour-button-primary', buttonClassName)}
            aria-label={isLastStep ? "Complete tour" : "Go to next step"}
          >
            {isLastStep ? 'Done' : 'Next'}
          </button>
        </div>
      </div>

      {/* Navigation instructions for screen readers */}
      <div 
        role="complementary" 
        aria-label="Tour navigation instructions" 
        className="sr-only"
      >
        Use arrow keys to navigate between steps. Press Enter to proceed, Escape to skip the tour.
      </div>
    </>
  );
}; 
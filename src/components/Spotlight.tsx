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

  return (
    <>
      <div
        ref={overlayRef}
        className={clsx('tour-overlay fixed inset-0 z-50', overlayClassName)}
        style={{
          clipPath: `path('M0 0H100%V100%H0V0z M${rect.left} ${rect.top}H${rect.right}V${rect.bottom}H${rect.left}V${rect.top}z')`,
        }}
        role="presentation"
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
        />
      )}
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={clsx('tour-tooltip z-50', tooltipClassName)}
        role="dialog"
        aria-label="Tour step"
        data-placement={placement}
      >
        <div className="mb-4">{content}</div>
        <div className={clsx('flex justify-between items-center gap-2', buttonContainerClassName)}>
          <div className="flex gap-2">
            {!isFirstStep && (
              <button
                onClick={onBack}
                className={clsx('tour-button tour-button-secondary', buttonClassName)}
              >
                Back
              </button>
            )}
            <button
              onClick={onSkip}
              className={clsx('tour-button tour-button-secondary', buttonClassName)}
            >
              Skip
            </button>
          </div>
          <button
            onClick={isLastStep ? onComplete : onNext}
            className={clsx('tour-button tour-button-primary', buttonClassName)}
          >
            {isLastStep ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </>
  );
}; 
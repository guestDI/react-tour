import React, { useEffect, useRef } from 'react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';
import type { SpotlightProps, ContentType } from '../types';
import { clsx } from 'clsx';
import '../styles/theme.css';

const renderContent = (content: SpotlightProps['content']) => {
  if (!content) return null;
  
  if (typeof content === 'string' || React.isValidElement(content)) {
    return content;
  }

  const contentObj = content as unknown;
  if (
    typeof contentObj === 'object' && 
    contentObj !== null && 
    'type' in contentObj && 
    'value' in contentObj
  ) {
    const typedContent = contentObj as ContentType;
    switch (typedContent.type) {
      case 'image':
        return (
          <img
            src={typedContent.value as string}
            alt="Tour content"
            className="w-full h-auto rounded-lg"
            {...typedContent.props}
          />
        );
      case 'video':
        return (
          <video
            src={typedContent.value as string}
            controls
            className="w-full h-auto rounded-lg"
            role="presentation"
            aria-label="Tour video content"
            {...typedContent.props}
          />
        );
      case 'custom':
        return typedContent.value;
      case 'text':
      default:
        return typedContent.value;
    }
  }

  return content;
};

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
  skip = true,
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

  const isPartialBlur = overlayClassName?.includes('tour-overlay-partial-blur');

  // Create a unique ID for the target element if it doesn't have one
  useEffect(() => {
    if (isPartialBlur && !targetElement.id) {
      const uniqueId = `tour-target-${Math.random().toString(36).substr(2, 9)}`;
      targetElement.id = uniqueId;
      return () => {
        targetElement.removeAttribute('id');
      };
    }
  }, [targetElement, isPartialBlur]);

  // Create SVG mask for partial blur
  const createSpotlightMask = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    mask.setAttribute('id', 'spotlight');
    
    // Create a white background (this will be blurred)
    const backgroundRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    backgroundRect.setAttribute('width', '100%');
    backgroundRect.setAttribute('height', '100%');
    backgroundRect.setAttribute('fill', 'white');
    
    // Create a black hole for the spotlight (this will be clear)
    const spotlightRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    spotlightRect.setAttribute('x', rect.left.toString());
    spotlightRect.setAttribute('y', rect.top.toString());
    spotlightRect.setAttribute('width', rect.width.toString());
    spotlightRect.setAttribute('height', rect.height.toString());
    spotlightRect.setAttribute('fill', 'black');
    
    mask.appendChild(backgroundRect);
    mask.appendChild(spotlightRect);
    defs.appendChild(mask);
    svg.appendChild(defs);
    
    // Create the actual overlay with the mask
    const overlayRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    overlayRect.setAttribute('width', '100%');
    overlayRect.setAttribute('height', '100%');
    overlayRect.setAttribute('fill', 'white');
    overlayRect.setAttribute('mask', 'url(#spotlight)');
    svg.appendChild(overlayRect);
    
    return `data:image/svg+xml,${encodeURIComponent(svg.outerHTML)}`;
  };

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
        ref={overlayRef}
        className={clsx('tour-overlay fixed inset-0 z-40', overlayClassName)}
        style={{
          clipPath: `path('M0 0H100%V100%H0V0z M${rect.left} ${rect.top}H${rect.right}V${rect.bottom}H${rect.left}V${rect.top}z')`,
        }}
        role="presentation"
        aria-hidden="true"
      />

      {highlightTarget && (
        <div
          className={clsx(
            'fixed z-50 transition-all duration-200',
            highlightConfig.className
          )}
          style={{
            ...highlightConfig.style,
            top: rect.top - 4,
            left: rect.left - 4,
            width: rect.width + 8,
            height: rect.height + 8,
            isolation: 'isolate',
          }}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Add isolation to the target element */}
      {isPartialBlur && (
        <style>
          {`
            #${targetElement.id} {
              isolation: isolate;
              position: relative;
              z-index: 50;
              transform: translateZ(0);
              will-change: transform;
            }
          `}
        </style>
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
          {renderContent(content)}
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
            {
              skip && <button
                onClick={onSkip}
                className={clsx('tour-button tour-button-secondary', buttonClassName)}
                aria-label="Skip tour"
              >
                Skip
              </button>
            }
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
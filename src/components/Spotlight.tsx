import React, { useEffect, memo } from 'react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';
import type { SpotlightProps, ButtonConfig, ButtonLayoutConfig } from '../types';
import { TourTooltip } from './TourTooltip';
import { TourOverlay } from './TourOverlay';
import { TourHighlight } from './TourHighlight';
import { useTourAccessibility } from '../hooks/useTourAccessibility';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/theme.css';

/**
 * Props for the Spotlight component
 */
interface SpotlightComponentProps extends SpotlightProps {
  /** Whether this is the first step */
  isFirstStep: boolean;
  /** Whether this is the last step */
  isLastStep: boolean;
  /** Whether to show skip button */
  skip: boolean;
  /** Callback for next step */
  onNext: () => void;
  /** Callback for previous step */
  onBack: () => void;
  /** Callback for skipping tour */
  onSkip: () => void;
  /** Callback for completing tour */
  onComplete: () => void;
  /** Whether to show progress indicator */
  showProgress?: boolean;
  /** Current step number */
  currentStep?: number;
  /** Total number of steps */
  totalSteps?: number;
  /** Accessibility configuration */
  accessibility?: {
    /** Whether to enable screen reader announcements */
    enableScreenReader?: boolean;
    /** Custom screen reader announcements */
    announcements?: {
      /** Announcement when tour starts */
      start?: string;
      /** Announcement when tour ends */
      end?: string;
      /** Announcement for each step */
      step?: string;
    };
    /** Focus management strategy */
    focusManagement?: 'auto' | 'manual';
    /** Whether to trap focus within the tour */
    focusTrap?: boolean;
  };
  animation?: 'slide' | 'bounce' | 'fade';
  /** Button configuration */
  buttonConfig?: {
    primary?: ButtonConfig;
    secondary?: ButtonConfig;
    container?: ButtonLayoutConfig;
  };
}

/**
 * Spotlight component that highlights a target element and displays a tooltip
 * @param props - SpotlightComponentProps
 * @returns React component
 */
export const Spotlight: React.FC<SpotlightComponentProps> = memo(({
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
  highlightTarget = true,
  currentStep,
  totalSteps,
  showProgress = false,
  accessibility = {},
  animation = 'slide',
  buttonConfig,
}) => {
  const { refs: tooltipRefs, floatingStyles, update } = useFloating({
    placement,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { LiveRegion, targetLabel } = useTourAccessibility({
    currentStep: currentStep ?? 0,
    totalSteps: totalSteps ?? 0,
    targetLabel: targetElement?.getAttribute('aria-label') || 'target element',
    content,
    isActive: true,
    enableScreenReader: accessibility.enableScreenReader,
    announcements: accessibility.announcements,
    focusManagement: accessibility.focusManagement,
    focusTrap: accessibility.focusTrap,
  });

  const highlightConfig = typeof highlightTarget === 'object' ? highlightTarget : { className: 'tour-highlight' };
  const isPartialBlur = overlayClassName?.includes('tour-overlay-partial-blur');

  const rect = targetElement?.getBoundingClientRect();
  const scrollLeft = window.scrollX;
  const scrollTop = window.scrollY;

  // Debounce the update function
  const debouncedUpdate = useDebounce(update, 100);

  useEffect(() => {
    if (targetElement) {
      tooltipRefs.setReference(targetElement);
    }
  }, [targetElement, tooltipRefs]);

  // Add debounced scroll and resize handlers
  useEffect(() => {
    const handleScroll = () => debouncedUpdate();
    const handleResize = () => debouncedUpdate();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [debouncedUpdate]);

  if (!targetElement || !rect) return null;

  return (
    <>
      {accessibility.enableScreenReader !== false && <LiveRegion />}

      <TourOverlay
        targetRect={rect}
        overlayClassName={overlayClassName}
        isPartialBlur={isPartialBlur}
        hasHighlight={!!highlightTarget}
      />

      {highlightTarget && (
        <TourHighlight
          targetRect={rect}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          highlightConfig={highlightConfig}
          animation={animation}
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

      <TourTooltip
        content={content}
        placement={placement}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        skip={skip}
        onNext={onNext}
        onBack={onBack}
        onSkip={onSkip}
        onComplete={onComplete}
        tooltipClassName={tooltipClassName}
        buttonClassName={buttonClassName}
        buttonContainerClassName={buttonContainerClassName}
        targetLabel={targetLabel}
        floatingStyles={floatingStyles}
        setFloating={tooltipRefs.setFloating}
        showProgress={showProgress}
        currentStep={currentStep}
        totalSteps={totalSteps}
        animation={animation}
        buttonConfig={buttonConfig}
      />

      {/* Navigation instructions for screen readers */}
      {accessibility.enableScreenReader !== false && (
        <div 
          role="complementary" 
          aria-label="Tour navigation instructions" 
          className="sr-only"
        >
          Use arrow keys to navigate between steps. Press Enter to proceed, Escape to skip the tour.
        </div>
      )}
    </>
  );
}); 
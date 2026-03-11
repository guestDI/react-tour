import React, { useEffect, useState, memo, useRef, useMemo } from 'react';
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
  /** Distance in pixels between the tooltip and its target element */
  tooltipOffset?: number;
  /** Button configuration */
  buttonConfig?: {
    primary?: ButtonConfig;
    secondary?: ButtonConfig;
    container?: ButtonLayoutConfig;
  };
  /** Close the tour when the overlay is clicked */
  dismissOnOverlayClick?: boolean;
  /** Optional step title shown as a visible heading in the tooltip */
  title?: string;
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
  tooltipOffset = 10,
  buttonConfig,
  dismissOnOverlayClick = true,
  title,
}) => {
  const middleware = useMemo(
    () => [offset(tooltipOffset), flip(), shift()],
    [tooltipOffset]
  );

  const { refs: tooltipRefs, floatingStyles, update } = useFloating({
    placement,
    middleware,
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

  // Reactive rect — kept in sync with scroll and resize
  const [rect, setRect] = useState<DOMRect | null>(null);

  // Debounce the update function; store in ref so listeners don't need it as a dep
  const debouncedUpdate = useDebounce(update, 100);
  const debouncedUpdateRef = useRef(debouncedUpdate);
  useEffect(() => { debouncedUpdateRef.current = debouncedUpdate; });

  // When step changes: scroll into view, register Floating UI reference, snapshot rect
  useEffect(() => {
    if (!targetElement) return;
    tooltipRefs.setReference(targetElement);
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    setRect(targetElement.getBoundingClientRect());
  }, [targetElement, tooltipRefs]);

  // Keep rect in sync while the page scrolls (incl. during smooth-scroll animation)
  useEffect(() => {
    if (!targetElement) return;
    const updateRect = () => {
      setRect(targetElement.getBoundingClientRect());
      debouncedUpdateRef.current();
    };
    window.addEventListener('scroll', updateRect, { passive: true });
    window.addEventListener('resize', updateRect, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
    };
  }, [targetElement]); // debouncedUpdate excluded — accessed via ref

  if (!targetElement || !rect) return null;

  return (
    <>
      {accessibility.enableScreenReader !== false && <LiveRegion />}

      <TourOverlay
        overlayClassName={overlayClassName}
        isPartialBlur={isPartialBlur}
        hasHighlight={!!highlightTarget}
        onDismiss={dismissOnOverlayClick ? onSkip : undefined}
      />

      {highlightTarget && (
        <TourHighlight
          targetRect={rect}
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
        title={title}
      />

    </>
  );
}); 
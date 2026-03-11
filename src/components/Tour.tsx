import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTour } from '../context/TourContext';
import { Spotlight } from './Spotlight';
import type { TourProps } from '../types';

export const Tour: React.FC<TourProps> = ({
  overlayClassName,
  tooltipClassName,
  buttonClassName,
  buttonContainerClassName,
  highlightTarget,
  skip = true,
  showProgress = false,
  accessibility = {},
  animation = 'slide',
  tooltipOffset,
  buttonConfig,
  dismissOnOverlayClick = true,
}) => {
  const { steps, currentStep, isActive, next, back, skip: skipTour } = useTour();
  const [targetElement, setTargetElement] = useState<Element | null>(null);

  // Extract stable primitive deps to avoid object reference churn
  const enableScreenReader = accessibility.enableScreenReader;
  const startAnnouncement = accessibility.announcements?.start ?? 'Tour started. Use arrow keys to navigate between steps.';
  const endAnnouncement = accessibility.announcements?.end ?? 'Tour ended.';

  // Keyboard navigation: Escape closes, Arrow keys move between steps
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { skipTour(); return; }

      // Don't intercept arrow keys when focus is inside an editable element
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); back(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, skipTour, next, back]);

  useEffect(() => {
    if (!isActive || enableScreenReader === false) return;

    // Announce tour start to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = startAnnouncement;
    document.body.appendChild(announcement);

    // Clear announcement after a delay; store ID so we can cancel on unmount
    const startTimerId = setTimeout(() => {
      if (announcement.isConnected) document.body.removeChild(announcement);
    }, 3000);

    return () => {
      clearTimeout(startTimerId);
      if (announcement.isConnected) document.body.removeChild(announcement);

      // Announce tour end to screen readers
      const endEl = document.createElement('div');
      endEl.setAttribute('role', 'status');
      endEl.setAttribute('aria-live', 'polite');
      endEl.setAttribute('aria-atomic', 'true');
      endEl.className = 'sr-only';
      endEl.textContent = endAnnouncement;
      document.body.appendChild(endEl);

      setTimeout(() => {
        if (endEl.isConnected) document.body.removeChild(endEl);
      }, 3000);
    };
  }, [isActive, enableScreenReader, startAnnouncement, endAnnouncement]);

  useEffect(() => {
    if (!isActive) return;

    let mounted = true;

    const currentStepData = steps[currentStep];
    if (!currentStepData) return;

    // Reset target when step changes so the fallback isn't shown briefly
    setTargetElement(null);

    let element: Element | null = null;
    try {
      element = document.querySelector(currentStepData.selector);
    } catch {
      return;
    }

    if (element) {
      setTargetElement(element);
    } else if (currentStepData.waitFor) {
      currentStepData.waitFor().then(() => {
        if (!mounted) return;
        try {
          const el = document.querySelector(currentStepData.selector);
          setTargetElement(el);
        } catch {
          // invalid selector — leave targetElement null
        }
      }).catch(() => {
        // waitFor rejected — leave targetElement null for this step
      });
    }

    return () => { mounted = false; };
  }, [isActive, currentStep, steps]);

  const currentStepData = steps[currentStep];
  if (!isActive || !currentStepData) return null;

  // Fallback when target element is not found — render a centered dialog
  // instead of silently freezing the tour
  if (!targetElement) {
    const isLastStep = currentStep === steps.length - 1;
    return createPortal(
      <>
        <div
          className="tour-overlay fixed inset-0 z-40"
          onClick={dismissOnOverlayClick ? skipTour : undefined}
          role="presentation"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className="tour-tooltip pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Tour step unavailable"
          >
            <p className="mb-4 text-sm" style={{ opacity: 0.7 }}>
              This step is currently unavailable.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={skipTour} className="tour-button tour-button-secondary" aria-label="Skip tour">
                Skip
              </button>
              {!isLastStep && (
                <button onClick={next} className="tour-button tour-button-primary" aria-label="Go to next step">
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  }

  return createPortal(
    <Spotlight
      targetElement={targetElement}
      placement={currentStepData.placement || 'bottom'}
      title={currentStepData.title}
      content={currentStepData.content}
      onNext={next}
      onBack={back}
      onSkip={skipTour}
      onComplete={next}
      isFirstStep={currentStep === 0}
      isLastStep={currentStep === steps.length - 1}
      overlayClassName={overlayClassName}
      tooltipClassName={tooltipClassName}
      buttonClassName={buttonClassName}
      buttonContainerClassName={buttonContainerClassName}
      highlightTarget={highlightTarget}
      skip={skip}
      showProgress={showProgress}
      currentStep={currentStep}
      totalSteps={steps.length}
      accessibility={accessibility}
      animation={animation}
      tooltipOffset={tooltipOffset}
      buttonConfig={buttonConfig}
      dismissOnOverlayClick={dismissOnOverlayClick}
    />,
    document.body
  );
};

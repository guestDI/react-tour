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
  isRTL = false,
  accessibility = {},
}) => {
  const { steps, currentStep, isActive, next, back, skip: skipTour } = useTour();
  const [targetElement, setTargetElement] = useState<Element | null>(null);

  // Default announcements
  const defaultAnnouncements = {
    start: 'Tour started. Use arrow keys to navigate between steps.',
    end: 'Tour ended.',
    step: 'Step {step} of {total}: {content}',
  };

  // Merge default and custom announcements
  const announcements = {
    ...defaultAnnouncements,
    ...accessibility.announcements,
  };

  useEffect(() => {
    if (isActive && accessibility.enableScreenReader !== false) {
      // Announce tour start to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = announcements.start;
      document.body.appendChild(announcement);
      
      // Clean up announcement after a delay
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 3000);

      return () => {
        // Announce tour end to screen readers
        const endAnnouncement = document.createElement('div');
        endAnnouncement.setAttribute('role', 'status');
        endAnnouncement.setAttribute('aria-live', 'polite');
        endAnnouncement.setAttribute('aria-atomic', 'true');
        endAnnouncement.className = 'sr-only';
        endAnnouncement.textContent = announcements.end;
        document.body.appendChild(endAnnouncement);
        
        setTimeout(() => {
          document.body.removeChild(endAnnouncement);
        }, 3000);
      };
    }
  }, [isActive, accessibility.enableScreenReader, announcements]);

  useEffect(() => {
    if (!isActive) return;

    const currentStepData = steps[currentStep];
    const element = document.querySelector(currentStepData.selector);

    if (element) {
      setTargetElement(element);
    } else if (currentStepData.waitFor) {
      currentStepData.waitFor().then(() => {
        const element = document.querySelector(currentStepData.selector);
        setTargetElement(element);
      });
    }
  }, [isActive, currentStep, steps]);

  if (!isActive || !targetElement) return null;

  const currentStepData = steps[currentStep];

  return createPortal(
    <Spotlight
      targetElement={targetElement}
      placement={currentStepData.placement || 'bottom'}
      content={currentStepData.content}
      onNext={next}
      onBack={back}
      onSkip={skipTour}
      onComplete={skipTour}
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
      isRTL={isRTL}
      accessibility={accessibility}
    />,
    document.body
  );
}; 
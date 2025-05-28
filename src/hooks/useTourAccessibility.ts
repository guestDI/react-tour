import React, { useEffect, useRef } from 'react';
import type { UseTourAccessibilityOptions, UseTourAccessibilityReturn } from '../types';

export const useTourAccessibility = ({
  currentStep,
  totalSteps,
  targetLabel,
  content,
  isActive,
}: UseTourAccessibilityOptions): UseTourAccessibilityReturn => {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Update live region when step changes
  useEffect(() => {
    if (liveRegionRef.current && isActive) {
      const stepNumber = currentStep + 1;
      const message = `Tour step ${stepNumber} of ${totalSteps}: ${targetLabel}. ${content}`;
      liveRegionRef.current.textContent = message;
    }
  }, [currentStep, totalSteps, targetLabel, content, isActive]);

  // Create live region element
  const LiveRegion = () => {
    return React.createElement('div', {
      ref: liveRegionRef,
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': 'true',
      className: 'sr-only'
    });
  };

  // Create focus trap
  const createFocusTrap = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    return () => element.removeEventListener('keydown', handleTabKey);
  };

  return {
    LiveRegion,
    createFocusTrap,
  };
}; 
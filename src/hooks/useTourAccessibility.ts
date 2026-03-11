import React, { useEffect, useRef } from 'react';
import { ContentType } from '../types';

interface UseTourAccessibilityOptions {
  currentStep: number;
  totalSteps: number;
  targetLabel: string;
  content: React.ReactNode | ContentType;
  isActive: boolean;
  enableScreenReader?: boolean;
  announcements?: {
    start?: string;
    end?: string;
    step?: string;
  };
  focusManagement?: 'auto' | 'manual';
  focusTrap?: boolean;
}

interface LiveRegionProps {
  currentStep: number;
  totalSteps: number;
  targetLabel: string;
  content: React.ReactNode;
  isActive: boolean;
  announcements?: UseTourAccessibilityOptions['announcements'];
}

const LiveRegion: React.FC<LiveRegionProps> = ({
  currentStep,
  totalSteps,
  targetLabel,
  content,
  isActive,
  announcements,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const contentText = typeof content === 'string' ? content : '';
    const defaultStepAnnouncement = `Step ${currentStep + 1} of ${totalSteps}: ${targetLabel}.${contentText ? ` ${contentText}` : ''}`;
    const stepAnnouncement = announcements?.step
      ? announcements.step
          .replace('{step}', String(currentStep + 1))
          .replace('{total}', String(totalSteps))
          .replace('{content}', contentText)
      : defaultStepAnnouncement;

    ref.current.textContent = stepAnnouncement;
  }, [currentStep, totalSteps, targetLabel, content, isActive, announcements]);

  return React.createElement('div', {
    ref,
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    className: 'sr-only'
  });
};

export const useTourAccessibility = ({
  currentStep,
  totalSteps,
  targetLabel,
  content,
  isActive,
  enableScreenReader = false,
  announcements,
  focusManagement = 'auto',
  focusTrap = true,
}: UseTourAccessibilityOptions) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || focusManagement === 'manual') return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Auto-focus the first focusable element in the tour dialog
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }

    return () => {
      // Restore focus when tour ends — validate element is still in the DOM
      if (previousFocusRef.current && document.contains(previousFocusRef.current)) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive, focusManagement]);

  // Create focus trap — active whenever focusTrap is true, independent of screen reader mode
  useEffect(() => {
    if (!isActive || !focusTrap) return;

    const handleTabKey = (e: KeyboardEvent) => {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstFocusableElement = focusableElements[0] as HTMLElement;
      const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isActive, focusTrap]);

  return {
    LiveRegion: () => React.createElement(LiveRegion, {
      currentStep,
      totalSteps,
      targetLabel,
      content: content as React.ReactNode,
      isActive,
      announcements
    }),
    targetLabel,
  };
}; 
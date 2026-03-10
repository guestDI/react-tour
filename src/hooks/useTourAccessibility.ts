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

    const defaultStepAnnouncement = `Step ${currentStep + 1} of ${totalSteps}: ${targetLabel}. ${content}`;
    const stepAnnouncement = announcements?.step
      ? announcements.step
          .replace('{step}', String(currentStep + 1))
          .replace('{total}', String(totalSteps))
          .replace('{content}', String(content))
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
    if (!isActive || !enableScreenReader) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the first focusable element in the tour
    if (focusManagement === 'auto') {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }

    return () => {
      // Restore focus when tour ends
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive, enableScreenReader, focusManagement]);

  // Create focus trap
  useEffect(() => {
    if (!isActive || !focusTrap || !enableScreenReader) return;

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
  }, [isActive, focusTrap, enableScreenReader]);

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
import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { TourStep, TourContextValue } from '../types';

/**
 * Context for managing tour state and navigation
 */
const TourContext = createContext<TourContextValue | null>(null);

/**
 * Hook to access tour context
 * @returns TourContextValue - The tour context value
 * @throws Error if used outside of TourProvider
 */
export const useTour = (): TourContextValue => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

/**
 * Props for the TourProvider component
 */
interface TourProviderProps {
  /** Array of tour steps to display */
  steps: TourStep[];
  /** Child components */
  children: ReactNode;
  /** Whether the tour should start automatically */
  defaultActive?: boolean;
  /** Callback when tour is completed */
  onComplete?: () => void;
  /** Callback when tour is skipped */
  onSkip?: () => void;
  /** Whether to show the progress indicator */
  showProgress?: boolean;
  /** Custom class for the overlay */
  overlayClassName?: string;
  /** Custom class for the tooltip */
  tooltipClassName?: string;
  /** Custom class for the buttons */
  buttonClassName?: string;
  /** Custom class for the button container */
  buttonContainerClassName?: string;
}

/**
 * Provider component for managing tour state and navigation
 * @param props - TourProviderProps
 * @returns React component
 */
export const TourProvider: React.FC<TourProviderProps> = ({
  steps,
  children,
  defaultActive = false,
  onComplete,
  onSkip,
  showProgress = false,
  overlayClassName,
  tooltipClassName,
  buttonClassName,
  buttonContainerClassName,
}) => {
  // ... rest of the component implementation ...
} 
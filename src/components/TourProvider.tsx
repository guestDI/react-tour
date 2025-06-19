import React, { createContext, useContext, type ReactNode } from 'react';
import type { TourStep, TourContextValue, TourProviderProps } from '../types';

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
  onStepChange,
  onStepEnter,
  onStepExit,
  showProgress = false,
  isRTL = false,
  accessibility,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isActive, setIsActive] = React.useState(defaultActive);

  const start = React.useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
    onStepEnter?.(0, steps[0]);
  }, [steps, onStepEnter]);

  const stop = React.useCallback(() => {
    if (isActive) {
      onStepExit?.(currentStep, steps[currentStep]);
    }
    setIsActive(false);
  }, [isActive, currentStep, steps, onStepExit]);

  const next = React.useCallback(async () => {
    const currentStepData = steps[currentStep];
    
    if (currentStepData?.waitFor) {
      await currentStepData.waitFor();
    }

    if (currentStep < steps.length - 1) {
      onStepExit?.(currentStep, currentStepData);
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      onStepChange?.(nextStepIndex, steps[nextStepIndex]);
      onStepEnter?.(nextStepIndex, steps[nextStepIndex]);
    } else {
      stop();
      onComplete?.();
    }
  }, [currentStep, steps, stop, onComplete, onStepExit, onStepChange, onStepEnter]);

  const back = React.useCallback(() => {
    if (currentStep > 0) {
      const currentStepData = steps[currentStep];
      onStepExit?.(currentStep, currentStepData);
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      onStepChange?.(prevStepIndex, steps[prevStepIndex]);
      onStepEnter?.(prevStepIndex, steps[prevStepIndex]);
    }
  }, [currentStep, steps, onStepExit, onStepChange, onStepEnter]);

  const skip = React.useCallback(() => {
    stop();
    onSkip?.();
  }, [stop, onSkip]);

  const value: TourContextValue = {
    steps,
    currentStep,
    isActive,
    start,
    stop,
    next,
    back,
    skip,
  };

  return (
    <TourContext.Provider value={value}>
      {children}
    </TourContext.Provider>
  );
}; 
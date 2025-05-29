import React, { createContext, useContext, useState, useCallback } from 'react';
import type { TourContextValue, TourProviderProps } from '../types';

const TourContext = createContext<TourContextValue | null>(null);

export const TourProvider: React.FC<TourProviderProps> = ({
  steps,
  children,
  defaultActive = false,
  onComplete,
  onSkip,
  onStepChange,
  onStepEnter,
  onStepExit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(defaultActive);

  const start = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
    onStepEnter?.(0, steps[0]);
  }, [steps, onStepEnter]);

  const stop = useCallback(() => {
    if (isActive) {
      onStepExit?.(currentStep, steps[currentStep]);
    }
    setIsActive(false);
  }, [isActive, currentStep, steps, onStepExit]);

  const next = useCallback(async () => {
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

  const back = useCallback(() => {
    if (currentStep > 0) {
      const currentStepData = steps[currentStep];
      onStepExit?.(currentStep, currentStepData);
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      onStepChange?.(prevStepIndex, steps[prevStepIndex]);
      onStepEnter?.(prevStepIndex, steps[prevStepIndex]);
    }
  }, [currentStep, steps, onStepExit, onStepChange, onStepEnter]);

  const skip = useCallback(() => {
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

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}; 
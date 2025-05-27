import React, { createContext, useContext, useState, useCallback } from 'react';
import type { TourContextValue, TourProviderProps } from '../types';

const TourContext = createContext<TourContextValue | null>(null);

export const TourProvider: React.FC<TourProviderProps> = ({
  steps,
  children,
  defaultActive = false,
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(defaultActive);

  const start = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  const next = useCallback(async () => {
    const currentStepData = steps[currentStep];
    
    if (currentStepData?.waitFor) {
      await currentStepData.waitFor();
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      stop();
      onComplete?.();
    }
  }, [currentStep, steps, stop, onComplete]);

  const back = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

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
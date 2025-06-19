import { useContext, useEffect, useState } from 'react';
import { TourContext } from '../context/TourContext';
import { tourManager } from '../manager/TourManager';
import type { TourContextValue } from '../types';

export const useTour = (): TourContextValue => {
  const context = useContext(TourContext);
  const [globalState, setGlobalState] = useState(tourManager.getState());

  useEffect(() => {
    // Subscribe to global state changes
    return tourManager.subscribe(setGlobalState);
  }, []);

  // If we're inside a TourProvider, use the context
  if (context) {
    return context;
  }

  // Otherwise, use the global manager
  return {
    steps: globalState.steps,
    currentStep: globalState.currentStep,
    isActive: globalState.isActive,
    start: tourManager.start.bind(tourManager),
    stop: tourManager.stop.bind(tourManager),
    next: tourManager.next.bind(tourManager),
    back: tourManager.back.bind(tourManager),
    skip: tourManager.skip.bind(tourManager),
  };
}; 
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTour } from '../context/TourContext';
import { Spotlight } from './Spotlight';

export interface TourProps {
  className?: string;
  overlayClassName?: string;
  tooltipClassName?: string;
  buttonClassName?: string;
  buttonContainerClassName?: string;
  highlightTarget?: boolean | {
    className?: string;
    style?: React.CSSProperties;
  };
}

export const Tour: React.FC<TourProps> = ({
  className,
  overlayClassName,
  tooltipClassName,
  buttonClassName,
  buttonContainerClassName,
  highlightTarget,
}) => {
  const { steps, currentStep, isActive, next, back, skip } = useTour();
  const [targetElement, setTargetElement] = useState<Element | null>(null);

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
      onSkip={skip}
      onComplete={skip}
      isFirstStep={currentStep === 0}
      isLastStep={currentStep === steps.length - 1}
      className={className}
      overlayClassName={overlayClassName}
      tooltipClassName={tooltipClassName}
      buttonClassName={buttonClassName}
      buttonContainerClassName={buttonContainerClassName}
      highlightTarget={highlightTarget}
    />,
    document.body
  );
}; 
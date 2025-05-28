import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className = '',
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`w-full h-1 bg-gray-200 rounded-full ${className}`}>
      <div
        className="h-full bg-rose-500 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}; 
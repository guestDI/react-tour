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
    <div className={`w-full h-1 rounded-full ${className}`} style={{ background: 'var(--tour--progress--background)' }}>
      <div
        className="h-full rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%`, background: 'var(--tour--progress--fill)' }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}; 
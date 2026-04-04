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
    <div className={className} style={{ width: '100%', height: '0.25rem', borderRadius: '9999px', background: 'var(--tour--progress--background)' }}>
      <div
        style={{ width: `${progress}%`, height: '100%', borderRadius: '9999px', background: 'var(--tour--progress--fill)', transition: 'width 300ms ease-in-out' }}
        role="progressbar"
        aria-label="Tour progress"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}; 
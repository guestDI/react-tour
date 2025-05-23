import { render, screen, fireEvent } from '@testing-library/react';
import { TourProvider, useTour } from '../TourContext';
import { vi, describe, it, expect } from 'vitest';

function TestComponent() {
  const { start, stop, next, back, skip, currentStep, isActive } = useTour();

  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={next}>Next</button>
      <button onClick={back}>Back</button>
      <button onClick={skip}>Skip</button>
      <div data-testid="step">{currentStep}</div>
      <div data-testid="active">{isActive.toString()}</div>
    </div>
  );
}

describe('TourContext', () => {
  const steps = [
    { selector: '#step1', content: 'Step 1' },
    { selector: '#step2', content: 'Step 2' },
  ];

  it('manages tour state correctly', () => {
    render(
      <TourProvider steps={steps}>
        <TestComponent />
      </TourProvider>
    );

    // Initial state
    expect(screen.getByTestId('step')).toHaveTextContent('0');
    expect(screen.getByTestId('active')).toHaveTextContent('false');

    // Start tour
    fireEvent.click(screen.getByText('Start'));
    expect(screen.getByTestId('active')).toHaveTextContent('true');

    // Next step
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByTestId('step')).toHaveTextContent('1');

    // Back step
    fireEvent.click(screen.getByText('Back'));
    expect(screen.getByTestId('step')).toHaveTextContent('0');

    // Skip tour
    fireEvent.click(screen.getByText('Skip'));
    expect(screen.getByTestId('active')).toHaveTextContent('false');
  });

  it('calls onComplete when tour is finished', () => {
    const onComplete = vi.fn();
    render(
      <TourProvider steps={steps} onComplete={onComplete}>
        <TestComponent />
      </TourProvider>
    );

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));

    expect(onComplete).toHaveBeenCalled();
  });

  it('calls onSkip when tour is skipped', () => {
    const onSkip = vi.fn();
    render(
      <TourProvider steps={steps} onSkip={onSkip}>
        <TestComponent />
      </TourProvider>
    );

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Skip'));

    expect(onSkip).toHaveBeenCalled();
  });
}); 
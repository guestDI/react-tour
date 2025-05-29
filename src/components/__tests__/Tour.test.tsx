import { render, screen, fireEvent } from '@testing-library/react';
import { TourProvider, useTour } from '../../context/TourContext';
import { Tour } from '../Tour';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import '../../styles/theme.css';

const steps = [
  {
    selector: '#test-element',
    content: 'Test content',
    placement: 'bottom' as const,
  },
  {
    selector: '#test-element-2',
    content: 'Second step content',
    placement: 'top' as const,
  },
];

function TestApp() {
  const { start } = useTour();

  return (
    <div>
      <div id="test-element">Test Element</div>
      <div id="test-element-2">Test Element 2</div>
      <button onClick={start}>Start Tour</button>
      <Tour />
    </div>
  );
}

describe('Tour', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders tour content when active', () => {
    render(
      <TourProvider steps={steps}>
        <TestApp />
      </TourProvider>
    );

    // Start the tour
    fireEvent.click(screen.getByText('Start Tour'));

    // Check if tour content is rendered
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('handles navigation buttons', () => {
    render(
      <TourProvider steps={steps}>
        <TestApp />
      </TourProvider>
    );

    // Start the tour
    fireEvent.click(screen.getByText('Start Tour'));

    // Check if navigation buttons are present
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('navigates through steps using keyboard', async () => {
      const user = userEvent.setup();
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      await user.click(screen.getByText('Start Tour'));

      // Check initial step
      expect(screen.getByText('Test content')).toBeInTheDocument();

      // Navigate to next step using Enter key
      await user.tab(); // Focus Next button
      await user.keyboard('{Enter}');

      // Check second step
      expect(screen.getByText('Second step content')).toBeInTheDocument();

      // Navigate back using Enter key
      await user.tab(); // Focus Back button
      await user.keyboard('{Enter}');

      // Check first step again
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('closes tour using Escape key', async () => {
      const user = userEvent.setup();
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      await user.click(screen.getByText('Start Tour'));
      expect(screen.getByText('Test content')).toBeInTheDocument();

      // Press Escape key
      await user.keyboard('{Escape}');

      // Check if tour is closed
      expect(screen.queryByText('Test content')).not.toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      fireEvent.click(screen.getByText('Start Tour'));

      // Check ARIA attributes
      const tooltip = screen.getByRole('dialog');
      expect(tooltip).toHaveAttribute('aria-modal', 'true');
      expect(tooltip).toHaveAttribute('aria-labelledby', 'tour-step-title');
      expect(tooltip).toHaveAttribute('aria-describedby', 'tour-step-content');

      // Check navigation buttons
      expect(screen.getByText('Next')).toHaveAttribute('aria-label', 'Go to next step');
      expect(screen.getByText('Back')).toHaveAttribute('aria-label', 'Go to previous step');
      expect(screen.getByText('Skip')).toHaveAttribute('aria-label', 'Skip tour');
    });

    it('maintains focus within tour when active', async () => {
      const user = userEvent.setup();
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      await user.click(screen.getByText('Start Tour'));

      // Try to tab outside the tour
      await user.tab();
      await user.tab();
      await user.tab();

      // Focus should remain within tour elements
      expect(document.activeElement).toBeInTheDocument();
      expect(document.activeElement?.closest('[role="dialog"]')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom tooltip class', () => {
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      fireEvent.click(screen.getByText('Start Tour'));

      // Check if custom class is applied
      const tooltip = screen.getByRole('dialog');
      expect(tooltip).toHaveClass('tour-tooltip');
    });

    it('applies custom button classes', () => {
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      fireEvent.click(screen.getByText('Start Tour'));

      // Check if button classes are applied
      const nextButton = screen.getByText('Next');
      expect(nextButton).toHaveClass('tour-button');
      expect(nextButton).toHaveClass('tour-button-primary');

      const backButton = screen.getByText('Back');
      expect(backButton).toHaveClass('tour-button');
      expect(backButton).toHaveClass('tour-button-secondary');

      const skipButton = screen.getByText('Skip');
      expect(skipButton).toHaveClass('tour-button');
      expect(skipButton).toHaveClass('tour-button-secondary');
    });

    it('applies custom overlay class', () => {
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      fireEvent.click(screen.getByText('Start Tour'));

      // Check if overlay class is applied
      const overlay = document.querySelector('.tour-overlay');
      expect(overlay).toHaveClass('tour-overlay');
    });

    it('applies highlight styles to target element', () => {
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      fireEvent.click(screen.getByText('Start Tour'));

      // Check if highlight class is applied to target element
      const targetElement = document.querySelector('#test-element');
      expect(targetElement).toHaveClass('tour-highlight');
    });

    it('applies custom theme classes', () => {
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      fireEvent.click(screen.getByText('Start Tour'));

      // Check if theme classes are applied
      const tooltip = screen.getByRole('dialog');
      expect(tooltip).toHaveClass('tour-tooltip');

      // Simulate dark mode
      document.documentElement.classList.add('dark');
      fireEvent.click(screen.getByText('Start Tour'));
      expect(tooltip).toHaveClass('tour-tooltip');
    });
  });

  describe('Step Callbacks', () => {
    it('calls onStepChange when navigating between steps', async () => {
      const onStepChange = vi.fn();
      const user = userEvent.setup();

      render(
        <TourProvider steps={steps} onStepChange={onStepChange}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      await user.click(screen.getByText('Start Tour'));

      // Navigate to next step
      await user.click(screen.getByText('Next'));

      // Check if onStepChange was called with correct arguments
      expect(onStepChange).toHaveBeenCalledWith(1, steps[1]);
    });

    it('calls onStepEnter when entering a step', async () => {
      const onStepEnter = vi.fn();
      const user = userEvent.setup();

      render(
        <TourProvider steps={steps} onStepEnter={onStepEnter}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      await user.click(screen.getByText('Start Tour'));

      // Check if onStepEnter was called with correct arguments
      expect(onStepEnter).toHaveBeenCalledWith(0, steps[0]);

      // Navigate to next step
      await user.click(screen.getByText('Next'));

      // Check if onStepEnter was called again with new step
      expect(onStepEnter).toHaveBeenCalledWith(1, steps[1]);
    });

    it('calls onStepExit when leaving a step', async () => {
      const onStepExit = vi.fn();
      const user = userEvent.setup();

      render(
        <TourProvider steps={steps} onStepExit={onStepExit}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      await user.click(screen.getByText('Start Tour'));

      // Navigate to next step
      await user.click(screen.getByText('Next'));

      // Check if onStepExit was called with correct arguments
      expect(onStepExit).toHaveBeenCalledWith(0, steps[0]);

      // Navigate back
      await user.click(screen.getByText('Back'));

      // Check if onStepExit was called again with new step
      expect(onStepExit).toHaveBeenCalledWith(1, steps[1]);
    });

    it('calls all step callbacks in correct order', async () => {
      const callOrder: string[] = [];
      const onStepChange = vi.fn(() => callOrder.push('change'));
      const onStepEnter = vi.fn(() => callOrder.push('enter'));
      const onStepExit = vi.fn(() => callOrder.push('exit'));
      const user = userEvent.setup();

      render(
        <TourProvider 
          steps={steps} 
          onStepChange={onStepChange}
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
        >
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      await user.click(screen.getByText('Start Tour'));

      // Navigate to next step
      await user.click(screen.getByText('Next'));

      // Check callback order
      expect(callOrder).toEqual(['exit', 'change', 'enter']);
    });
  });
}); 
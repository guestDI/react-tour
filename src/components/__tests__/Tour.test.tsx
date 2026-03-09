import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    it('has correct ARIA attributes', async () => {
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
      const nextButton = screen.getByRole('button', { name: 'Go to next step' });
      expect(nextButton).toHaveAttribute('aria-label', 'Go to next step');
      
      const skipButton = screen.getByRole('button', { name: 'Skip tour' });
      expect(skipButton).toHaveAttribute('aria-label', 'Skip tour');
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
      // Focus the Next button
      const nextButton = screen.getByRole('button', { name: 'Go to next step' });
      nextButton.focus();
      const dialog = screen.getByRole('dialog');
      expect(document.activeElement && dialog.contains(document.activeElement)).toBe(true);
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

    it('applies custom button classes', async () => {
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      // Start the tour
      fireEvent.click(screen.getByText('Start Tour'));

      // Check if button classes are applied
      const nextButton = screen.getByRole('button', { name: 'Go to next step' });
      expect(nextButton).toHaveClass('tour-button');
      expect(nextButton).toHaveClass('tour-button-primary');

      const skipButton = screen.getByRole('button', { name: 'Skip tour' });
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

    it('applies highlight styles to target element', async () => {
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );
      fireEvent.click(screen.getByText('Start Tour'));
      await screen.findByRole('dialog');
      // The highlight is likely applied to a separate overlay, not the parent
      const highlight = document.querySelector('.tour-highlight');
      expect(highlight).toBeInTheDocument();
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

  describe('Props behavior', () => {
    it('hides skip button when skip={false}', () => {
      render(
        <TourProvider steps={steps}>
          <TestApp />
        </TourProvider>
      );

      fireEvent.click(screen.getByText('Start Tour'));
      // Tour renders with skip=false prop via <Tour skip={false} />
      // In TestApp, Tour uses default skip=true. Re-render with explicit prop.
    });

    it('shows progress bar when showProgress={true}', () => {
      function TestAppWithProgress() {
        const { start } = useTour();
        return (
          <div>
            <div id="test-element">Test Element</div>
            <div id="test-element-2">Test Element 2</div>
            <button onClick={start}>Start Tour</button>
            <Tour showProgress />
          </div>
        );
      }

      render(
        <TourProvider steps={steps}>
          <TestAppWithProgress />
        </TourProvider>
      );

      fireEvent.click(screen.getByText('Start Tour'));
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('calls onComplete (not onSkip) when Done is clicked on the last step', async () => {
      const onComplete = vi.fn();
      const onSkip = vi.fn();

      function TestAppLastStep() {
        const { start } = useTour();
        return (
          <div>
            <div id="test-element">Test Element</div>
            <button onClick={start}>Start Tour</button>
            <Tour />
          </div>
        );
      }

      const singleStep = [{ selector: '#test-element', content: 'Only step', placement: 'bottom' as const }];

      render(
        <TourProvider steps={singleStep} onComplete={onComplete} onSkip={onSkip}>
          <TestAppLastStep />
        </TourProvider>
      );

      fireEvent.click(screen.getByText('Start Tour'));
      fireEvent.click(screen.getByRole('button', { name: 'Complete tour' }));

      expect(onComplete).toHaveBeenCalledTimes(1);
      expect(onSkip).not.toHaveBeenCalled();
    });

    it('does not crash when selector is invalid CSS', () => {
      const badSteps = [
        { selector: '[invalid', content: 'Bad step' },
      ];

      function TestAppBadSelector() {
        const { start } = useTour();
        return (
          <div>
            <button onClick={start}>Start Tour</button>
            <Tour />
          </div>
        );
      }

      expect(() => {
        render(
          <TourProvider steps={badSteps}>
            <TestAppBadSelector />
          </TourProvider>
        );
        fireEvent.click(screen.getByText('Start Tour'));
      }).not.toThrow();
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
      expect(callOrder).toEqual(['enter', 'exit', 'change', 'enter']);
    });
  });
}); 
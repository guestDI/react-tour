import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TourTooltip } from '../TourTooltip';
import { vi } from 'vitest';
import type { ContentType } from '../../types';

const defaultProps = {
  content: 'Step content',
  placement: 'bottom',
  isFirstStep: false,
  isLastStep: false,
  skip: true,
  onNext: vi.fn(),
  onBack: vi.fn(),
  onSkip: vi.fn(),
  onComplete: vi.fn(),
  targetLabel: 'Test target',
  floatingStyles: {},
  setFloating: vi.fn(),
};

describe('TourTooltip', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content rendering', () => {
    it('renders text string content', () => {
      render(<TourTooltip {...defaultProps} content="Hello world" />);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('renders ReactNode content', () => {
      render(<TourTooltip {...defaultProps} content={<span data-testid="node">Custom node</span>} />);
      expect(screen.getByTestId('node')).toBeInTheDocument();
    });

    it('renders ContentType image', () => {
      const content: ContentType = {
        type: 'image',
        value: { type: 'remote', src: 'https://example.com/img.png' },
      };
      render(<TourTooltip {...defaultProps} content={content} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/img.png');
    });

    it('shows image MediaFallback on load error', () => {
      const content: ContentType = {
        type: 'image',
        value: { type: 'remote', src: 'broken.jpg' },
      };
      render(<TourTooltip {...defaultProps} content={content} />);
      fireEvent.error(screen.getByRole('img'));
      expect(screen.getByText('Image failed to load')).toBeInTheDocument();
    });

    it('renders ContentType video', () => {
      const content: ContentType = {
        type: 'video',
        value: { type: 'remote', src: 'https://example.com/vid.mp4' },
      };
      render(<TourTooltip {...defaultProps} content={content} />);
      expect(screen.getByRole('presentation')).toHaveAttribute('src', 'https://example.com/vid.mp4');
    });

    it('shows video MediaFallback on load error', () => {
      const content: ContentType = {
        type: 'video',
        value: { type: 'remote', src: 'broken.mp4' },
      };
      render(<TourTooltip {...defaultProps} content={content} />);
      fireEvent.error(screen.getByRole('presentation'));
      expect(screen.getByText('Video failed to load')).toBeInTheDocument();
    });

    it('renders ContentType custom component', () => {
      const content: ContentType = {
        type: 'custom',
        value: <div data-testid="custom-content">Custom!</div>,
      };
      render(<TourTooltip {...defaultProps} content={content} />);
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('renders ContentType text', () => {
      const content: ContentType = { type: 'text', value: 'Text type content' };
      render(<TourTooltip {...defaultProps} content={content} />);
      expect(screen.getByText('Text type content')).toBeInTheDocument();
    });
  });

  describe('Progress bar', () => {
    it('shows progress bar when showProgress is true', () => {
      render(<TourTooltip {...defaultProps} showProgress currentStep={1} totalSteps={4} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('hides progress bar when showProgress is false', () => {
      render(<TourTooltip {...defaultProps} showProgress={false} currentStep={1} totalSteps={4} />);
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('Button callbacks', () => {
    it('calls onBack when Back button is clicked', () => {
      const onBack = vi.fn();
      render(<TourTooltip {...defaultProps} onBack={onBack} />);
      fireEvent.click(screen.getByRole('button', { name: 'Go to previous step' }));
      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it('calls onNext when Next button is clicked', () => {
      const onNext = vi.fn();
      render(<TourTooltip {...defaultProps} onNext={onNext} />);
      fireEvent.click(screen.getByRole('button', { name: 'Go to next step' }));
      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it('calls onComplete when Done button is clicked on last step', () => {
      const onComplete = vi.fn();
      render(<TourTooltip {...defaultProps} isLastStep onComplete={onComplete} />);
      fireEvent.click(screen.getByRole('button', { name: 'Complete tour' }));
      expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('calls onSkip when Skip button is clicked', () => {
      const onSkip = vi.fn();
      render(<TourTooltip {...defaultProps} onSkip={onSkip} />);
      fireEvent.click(screen.getByRole('button', { name: 'Skip tour' }));
      expect(onSkip).toHaveBeenCalledTimes(1);
    });

    it('hides Back button on first step', () => {
      render(<TourTooltip {...defaultProps} isFirstStep />);
      expect(screen.queryByRole('button', { name: 'Go to previous step' })).not.toBeInTheDocument();
    });

    it('shows Done instead of Next on last step', () => {
      render(<TourTooltip {...defaultProps} isLastStep />);
      expect(screen.getByRole('button', { name: 'Complete tour' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Go to next step' })).not.toBeInTheDocument();
    });
  });

  describe('Custom button config', () => {
    it('renders custom primary button label', () => {
      render(
        <TourTooltip
          {...defaultProps}
          buttonConfig={{ primary: { content: 'Continue →' } }}
        />
      );
      expect(screen.getByText('Continue →')).toBeInTheDocument();
    });

    it('renders custom primary button via render prop', () => {
      render(
        <TourTooltip
          {...defaultProps}
          buttonConfig={{
            primary: {
              render: () => <button data-testid="custom-btn">Custom Button</button>,
            },
          }}
        />
      );
      expect(screen.getByTestId('custom-btn')).toBeInTheDocument();
    });
  });

  describe('ARIA attributes', () => {
    it('has correct dialog ARIA attributes', () => {
      render(<TourTooltip {...defaultProps} />);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'tour-step-title');
      expect(dialog).toHaveAttribute('aria-describedby', 'tour-step-content');
    });

    it('includes target label in sr-only title', () => {
      render(<TourTooltip {...defaultProps} targetLabel="Sign up button" />);
      expect(screen.getByText('Tour Step: Sign up button')).toBeInTheDocument();
    });
  });
});

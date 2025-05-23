import { render, screen } from '@testing-library/react';
import { Spotlight } from '../Spotlight';

describe('Spotlight', () => {
  const mockElement = document.createElement('div');
  mockElement.getBoundingClientRect = () => ({
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    toJSON: () => {},
  });

  const defaultProps = {
    targetElement: mockElement,
    placement: 'bottom' as const,
    content: 'Test content',
    onNext: vi.fn(),
    onBack: vi.fn(),
    onSkip: vi.fn(),
    onComplete: vi.fn(),
    isFirstStep: false,
    isLastStep: false,
  };

  it('renders content and navigation buttons', () => {
    render(<Spotlight {...defaultProps} />);

    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  it('hides back button on first step', () => {
    render(<Spotlight {...defaultProps} isFirstStep={true} />);

    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('shows done button on last step', () => {
    render(<Spotlight {...defaultProps} isLastStep={true} />);

    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });
}); 
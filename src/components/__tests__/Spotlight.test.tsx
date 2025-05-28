import { render, screen } from '@testing-library/react';
import { Spotlight } from '../Spotlight';
import { vi } from 'vitest';
import type { ContentType } from '../../types';

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

  describe('Content Types', () => {
    it('renders text content', () => {
      render(<Spotlight {...defaultProps} content="Simple text content" />);
      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('renders image content', () => {
      const imageContent: ContentType = {
        type: 'image',
        value: {
          type: 'remote',
          src: 'https://example.com/image.jpg'
        },
        props: {
          alt: 'Test image',
          className: 'test-image',
        },
      };

      render(<Spotlight {...defaultProps} content={imageContent} />);
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
      expect(image).toHaveAttribute('alt', 'Test image');
      expect(image).toHaveClass('test-image');
    });

    it('renders video content', () => {
      const videoContent: ContentType = {
        type: 'video',
        value: {
          type: 'remote',
          src: 'https://example.com/video.mp4'
        },
        props: {
          poster: 'https://example.com/poster.jpg',
          controls: true,
        },
      };

      render(<Spotlight {...defaultProps} content={videoContent} />);
      const video = screen.getByRole('presentation');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', 'https://example.com/video.mp4');
      expect(video).toHaveAttribute('poster', 'https://example.com/poster.jpg');
      expect(video).toHaveAttribute('controls');
    });

    it('renders custom component content', () => {
      const CustomComponent = () => <div data-testid="custom-component">Custom Content</div>;
      const customContent: ContentType = {
        type: 'custom',
        value: <CustomComponent />,
      };

      render(<Spotlight {...defaultProps} content={customContent} />);
      expect(screen.getByTestId('custom-component')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  describe('Skip Button', () => {
    it('shows skip button by default', () => {
      render(<Spotlight {...defaultProps} />);
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });

    it('hides skip button when skip prop is false', () => {
      render(<Spotlight {...defaultProps} skip={false} />);
      expect(screen.queryByText('Skip')).not.toBeInTheDocument();
    });
  });
}); 
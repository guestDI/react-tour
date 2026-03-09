/**
 * DOM snapshot tests — catch unintended structural/class changes across component variants.
 * Run: npm test
 * Update baselines: npm test -- --update-snapshots
 */
import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { TourTooltip } from '../TourTooltip';
import { TourOverlay } from '../TourOverlay';
import { ProgressBar } from '../ProgressBar';
import { Spotlight } from '../Spotlight';
import type { ContentType } from '../../types';

// Shared mock rect for overlay/spotlight tests
const mockRect: DOMRect = {
  top: 100,
  left: 200,
  right: 400,
  bottom: 300,
  width: 200,
  height: 200,
  x: 200,
  y: 100,
  toJSON: () => ({}),
};

const mockElement = Object.assign(document.createElement('div'), {
  getBoundingClientRect: () => mockRect,
});

const noop = vi.fn();

const baseTooltipProps = {
  placement: 'bottom',
  isFirstStep: false,
  isLastStep: false,
  skip: true,
  onNext: noop,
  onBack: noop,
  onSkip: noop,
  onComplete: noop,
  targetLabel: 'Feature button',
  floatingStyles: { position: 'absolute' as const, top: 100, left: 200 },
  setFloating: noop,
};

// ─── TourTooltip snapshots ────────────────────────────────────────────────────

describe('TourTooltip snapshots', () => {
  it('text content — mid-tour', () => {
    const { container } = render(
      <TourTooltip {...baseTooltipProps} content="Welcome to the feature!" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('first step — no Back button', () => {
    const { container } = render(
      <TourTooltip {...baseTooltipProps} isFirstStep content="Step one" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('last step — Done button', () => {
    const { container } = render(
      <TourTooltip {...baseTooltipProps} isLastStep content="Final step" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('with progress bar', () => {
    const { container } = render(
      <TourTooltip
        {...baseTooltipProps}
        content="Step 2"
        showProgress
        currentStep={1}
        totalSteps={4}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('skip hidden', () => {
    const { container } = render(
      <TourTooltip {...baseTooltipProps} content="No skip" skip={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('image content type', () => {
    const content: ContentType = {
      type: 'image',
      value: { type: 'remote', src: 'https://example.com/hero.png' },
    };
    const { container } = render(
      <TourTooltip {...baseTooltipProps} content={content} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('custom content type', () => {
    const content: ContentType = {
      type: 'custom',
      value: <div className="custom-widget">Custom UI</div>,
    };
    const { container } = render(
      <TourTooltip {...baseTooltipProps} content={content} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('with custom tooltip class', () => {
    const { container } = render(
      <TourTooltip
        {...baseTooltipProps}
        content="Styled"
        tooltipClassName="bg-rose-900 text-white rounded-2xl"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('with custom primary button content', () => {
    const { container } = render(
      <TourTooltip
        {...baseTooltipProps}
        content="Custom button"
        buttonConfig={{ primary: { content: 'Continue →' } }}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('with bounce animation data attribute', () => {
    const { container } = render(
      <TourTooltip {...baseTooltipProps} content="Bounce" animation="bounce" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('with fade animation data attribute', () => {
    const { container } = render(
      <TourTooltip {...baseTooltipProps} content="Fade" animation="fade" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

// ─── TourOverlay snapshots ────────────────────────────────────────────────────

describe('TourOverlay snapshots', () => {
  it('standard overlay', () => {
    const { container } = render(<TourOverlay targetRect={mockRect} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('with custom overlay class', () => {
    const { container } = render(
      <TourOverlay targetRect={mockRect} overlayClassName="bg-indigo-900/60" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('partial blur overlay', () => {
    const { container } = render(
      <TourOverlay targetRect={mockRect} isPartialBlur />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

// ─── ProgressBar snapshots ────────────────────────────────────────────────────

describe('ProgressBar snapshots', () => {
  it('step 1 of 4 (25%)', () => {
    const { container } = render(<ProgressBar currentStep={0} totalSteps={4} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('step 2 of 4 (50%)', () => {
    const { container } = render(<ProgressBar currentStep={1} totalSteps={4} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('last step (100%)', () => {
    const { container } = render(<ProgressBar currentStep={3} totalSteps={4} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('with custom class', () => {
    const { container } = render(
      <ProgressBar currentStep={1} totalSteps={3} className="h-2" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

// ─── Spotlight snapshots ──────────────────────────────────────────────────────

const baseSpotlightProps = {
  targetElement: mockElement,
  placement: 'bottom' as const,
  content: 'Spotlight content',
  onNext: noop,
  onBack: noop,
  onSkip: noop,
  onComplete: noop,
  isFirstStep: false,
  isLastStep: false,
  skip: true,
  targetLabel: 'Target element',
  showProgress: false,
  currentStep: 1,
  totalSteps: 3,
  overlayClassName: '',
  tooltipClassName: '',
  buttonClassName: '',
  buttonContainerClassName: '',
};

describe('Spotlight snapshots', () => {
  it('mid-tour default', () => {
    const { container } = render(<Spotlight {...baseSpotlightProps} />);
    expect(container).toMatchSnapshot();
  });

  it('first step', () => {
    const { container } = render(
      <Spotlight {...baseSpotlightProps} isFirstStep />
    );
    expect(container).toMatchSnapshot();
  });

  it('last step', () => {
    const { container } = render(
      <Spotlight {...baseSpotlightProps} isLastStep />
    );
    expect(container).toMatchSnapshot();
  });

  it('with progress bar', () => {
    const { container } = render(
      <Spotlight {...baseSpotlightProps} showProgress currentStep={1} totalSteps={4} />
    );
    expect(container).toMatchSnapshot();
  });

  it('skip hidden', () => {
    const { container } = render(
      <Spotlight {...baseSpotlightProps} skip={false} />
    );
    expect(container).toMatchSnapshot();
  });

  it('with custom classes', () => {
    const { container } = render(
      <Spotlight
        {...baseSpotlightProps}
        overlayClassName="bg-violet-900/70"
        tooltipClassName="bg-violet-800 text-white"
        buttonClassName="rounded-full"
      />
    );
    expect(container).toMatchSnapshot();
  });
});

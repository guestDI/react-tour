import type { ReactNode } from 'react';

export type Placement = 'top' | 'bottom' | 'left' | 'right';

export type MediaSource = {
  type: 'remote' | 'local';
  src: string;
};

export interface ContentType {
  type: 'text' | 'image' | 'video' | 'custom';
  value: ReactNode | MediaSource;
  props?: Record<string, unknown>;
}

export interface TourStep {
  selector: string;
  content: ReactNode | ContentType;
  placement?: Placement;
  waitFor?: () => Promise<void>;
}

export interface TourContextValue {
  steps: TourStep[];
  currentStep: number;
  isActive: boolean;
  start: () => void;
  stop: () => void;
  next: () => void;
  back: () => void;
  skip: () => void;
}

export interface TourProviderProps {
  steps: TourStep[];
  children: ReactNode;
  defaultActive?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
  /** Callback when step changes */
  onStepChange?: (stepIndex: number, step: TourStep) => void;
  /** Callback when entering a step */
  onStepEnter?: (stepIndex: number, step: TourStep) => void;
  /** Callback when exiting a step */
  onStepExit?: (stepIndex: number, step: TourStep) => void;
  /** Whether to show the progress indicator */
  showProgress?: boolean;
  /** Custom class for the overlay */
  overlayClassName?: string;
  /** Custom class for the tooltip */
  tooltipClassName?: string;
  /** Custom class for the buttons */
  buttonClassName?: string;
  /** Custom class for the button container */
  buttonContainerClassName?: string;
}

export interface HighlightConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface SpotlightProps {
  targetElement: Element | null;
  placement: Placement;
  content: ReactNode | ContentType;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onComplete: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  skip?: boolean;
  overlayClassName?: string;
  tooltipClassName?: string;
  buttonClassName?: string;
  buttonContainerClassName?: string;
  highlightTarget?: boolean | HighlightConfig;
  currentStep?: number;
  totalSteps?: number;
  showProgress?: boolean;
}

export interface UseTourAccessibilityOptions {
  currentStep: number;
  totalSteps: number;
  targetLabel: string;
  content: ReactNode | ContentType;
  isActive: boolean;
}

export interface UseTourAccessibilityReturn {
  LiveRegion: () => React.ReactElement;
  createFocusTrap: (element: HTMLElement) => () => void;
  targetLabel: string;
}

export interface TourProps {
  /** Custom class for the overlay */
  overlayClassName?: string;
  /** Custom class for the tooltip */
  tooltipClassName?: string;
  /** Custom class for the buttons */
  buttonClassName?: string;
  /** Custom class for the button container */
  buttonContainerClassName?: string;
  /** Whether to highlight the target element */
  highlightTarget?: boolean | HighlightConfig;
  /** Whether to show skip button */
  skip?: boolean;
  /** Whether to show progress indicator */
  showProgress?: boolean;
  /** Whether the tour is in RTL mode */
  isRTL?: boolean;
  /** Accessibility configuration */
  accessibility?: {
    /** Whether to enable screen reader announcements */
    enableScreenReader?: boolean;
    /** Custom screen reader announcements */
    announcements?: {
      /** Announcement when tour starts */
      start?: string;
      /** Announcement when tour ends */
      end?: string;
      /** Announcement for each step (use {step} and {total} as placeholders) */
      step?: string;
    };
    /** Focus management strategy */
    focusManagement?: 'auto' | 'manual';
    /** Whether to trap focus within the tour */
    focusTrap?: boolean;
  };
}
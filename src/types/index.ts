import type { ReactNode, CSSProperties } from 'react';

export type Placement = 'top' | 'bottom' | 'left' | 'right';

export type MediaSource = {
  type: 'remote' | 'local';
  src: string;
};

export interface ContentType {
  type: 'text' | 'image' | 'video' | 'custom';
  value: ReactNode | MediaSource;
  alt?: string;
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

export interface AccessibilityConfig {
  enableScreenReader?: boolean;
  announcements?: {
    start?: string;
    end?: string;
    step?: string;
  };
  focusManagement?: 'auto' | 'manual';
  focusTrap?: boolean;
}

export interface ComponentStyleProps {
  className?: string;
  style?: CSSProperties;
}

export interface TourStyleProps {
  tooltip?: ComponentStyleProps;
  overlay?: ComponentStyleProps;
  button?: {
    primary?: ComponentStyleProps;
    secondary?: ComponentStyleProps;
    container?: ComponentStyleProps;
  };
  highlight?: ComponentStyleProps;
}

export interface TourProviderProps {
  steps: TourStep[];
  children: ReactNode;
  defaultActive?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
  onStepChange?: (stepIndex: number, step: TourStep) => void;
  onStepEnter?: (stepIndex: number, step: TourStep) => void;
  onStepExit?: (stepIndex: number, step: TourStep) => void;
  showProgress?: boolean;
  isRTL?: boolean;
  accessibility?: AccessibilityConfig;
}

export interface HighlightConfig {
  className?: string;
  style?: CSSProperties;
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
  styles?: TourStyleProps;
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
  targetLabel: string;
}

export interface ButtonRenderProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onComplete: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export interface ButtonConfig {
  /** Custom content for the button */
  content?: ReactNode;
  /** Custom class for the button */
  className?: string;
  /** Custom style for the button */
  style?: CSSProperties;
  /** Custom render function for the button */
  render?: (props: ButtonRenderProps) => ReactNode;
}

export interface ButtonLayoutConfig {
  /** Custom class for the button container */
  className?: string;
  /** Custom style for the button container */
  style?: CSSProperties;
  /** Whether to show buttons in a row (default) or column */
  direction?: 'row' | 'column';
  /** Alignment of buttons */
  align?: 'start' | 'center' | 'end' | 'space-between';
  /** Gap between buttons */
  gap?: string;
  /** Custom render function for the entire button container */
  render?: (props: ButtonRenderProps) => ReactNode;
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
  /** Animation type for the tooltip and highlight */
  animation?: 'slide' | 'bounce' | 'fade';
  /** Custom button configuration */
  buttonConfig?: {
    primary?: ButtonConfig;
    secondary?: ButtonConfig;
    container?: ButtonLayoutConfig;
  };
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
  styles?: TourStyleProps;
}
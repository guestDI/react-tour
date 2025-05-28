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
  overlayClassName?: string;
  tooltipClassName?: string;
  buttonClassName?: string;
  buttonContainerClassName?: string;
  highlightTarget?: boolean | HighlightConfig;
  showProgress?: boolean;
  skip?: boolean;
}
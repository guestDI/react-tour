export type Placement = 'top' | 'bottom' | 'left' | 'right';

export interface TourStep {
  selector: string;
  content: React.ReactNode;
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
  children: React.ReactNode;
  defaultActive?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
}

export interface SpotlightProps {
  targetElement: Element | null;
  placement: Placement;
  content: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onComplete: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  className?: string;
  overlayClassName?: string;
  tooltipClassName?: string;
  buttonClassName?: string;
  buttonContainerClassName?: string;
  highlightTarget?: boolean | {
    className?: string;
    style?: React.CSSProperties;
  };
} 
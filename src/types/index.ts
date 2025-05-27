export type Placement = 'top' | 'bottom' | 'left' | 'right';

export interface ContentType {
  type: 'text' | 'image' | 'video' | 'custom';
  value: string | React.ReactNode;
  props?: Record<string, any>;
}

export interface TourStep {
  selector: string;
  content: React.ReactNode | ContentType;
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
  targetElement: Element;
  placement: Placement;
  content: React.ReactNode | ContentType;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onComplete: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  skip?: boolean;
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
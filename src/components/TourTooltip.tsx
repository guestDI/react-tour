import React, { type ReactNode, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import type { ContentType, MediaSource, ButtonConfig, ButtonLayoutConfig, ButtonRenderProps } from '../types';
import { ProgressBar } from './ProgressBar';
import { MediaFallback } from './MediaFallback';
import { ErrorBoundary } from './ErrorBoundary';

/**
 * Props for the TourTooltip component
 */
interface TourTooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode | ContentType;
  /** Placement of the tooltip relative to the target */
  placement: string;
  /** Animation type for the tooltip */
  animation?: 'slide' | 'bounce' | 'fade';
  /** Whether this is the first step */
  isFirstStep: boolean;
  /** Whether this is the last step */
  isLastStep: boolean;
  /** Whether to show skip button */
  skip: boolean;
  /** Callback for next step */
  onNext: () => void;
  /** Callback for previous step */
  onBack: () => void;
  /** Callback for skipping tour */
  onSkip: () => void;
  /** Callback for completing tour */
  onComplete: () => void;
  /** Custom class for the tooltip */
  tooltipClassName?: string;
  /** Custom class for the buttons */
  buttonClassName?: string;
  /** Custom class for the button container */
  buttonContainerClassName?: string;
  /** Label for the target element */
  targetLabel: string;
  /** Styles for floating positioning */
  floatingStyles: React.CSSProperties;
  /** Function to set the floating element reference */
  setFloating: (node: HTMLElement | null) => void;
  /** Whether to show progress indicator */
  showProgress?: boolean;
  /** Current step number */
  currentStep?: number;
  /** Total number of steps */
  totalSteps?: number;
  /** Button configuration */
  buttonConfig?: {
    primary?: ButtonConfig;
    secondary?: ButtonConfig;
    container?: ButtonLayoutConfig;
  };
}

/**
 * Gets the media source URL from a value
 * @param value - The media source value
 * @returns The media source URL
 */
const getMediaSource = (value: ReactNode | MediaSource): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && 'type' in value && 'src' in value) {
    const mediaSource = value as MediaSource;
    return mediaSource.src;
  }
  return String(value);
};

/**
 * Renders the content based on its type
 * @param content - The content to render
 * @returns The rendered content
 */
const renderContent = (content: TourTooltipProps['content']): React.ReactNode => {
  if (!content) return null;
  
  if (typeof content === 'string' || React.isValidElement(content)) {
    return content;
  }

  const contentObj = content as unknown;
  if (
    typeof contentObj === 'object' && 
    contentObj !== null && 
    'type' in contentObj && 
    'value' in contentObj
  ) {
    const typedContent = contentObj as ContentType;
    switch (typedContent.type) {
      case 'image': {
        const [hasError, setHasError] = useState(false);
        if (hasError) {
          return <MediaFallback type="image" className="w-full h-auto" />;
        }
        return (
          <img
            src={getMediaSource(typedContent.value)}
            alt="Tour content"
            className="w-full h-auto rounded-lg"
            onError={() => setHasError(true)}
            {...typedContent.props}
          />
        );
      }
      case 'video': {
        const [hasError, setHasError] = useState(false);
        if (hasError) {
          return <MediaFallback type="video" className="w-full h-auto" />;
        }
        return (
          <video
            src={getMediaSource(typedContent.value)}
            controls
            className="w-full h-auto rounded-lg"
            role="presentation"
            aria-label="Tour video content"
            onError={() => setHasError(true)}
            {...typedContent.props}
          />
        );
      }
      case 'custom':
        return typedContent.value as React.ReactNode;
      case 'text':
      default:
        return typedContent.value as React.ReactNode;
    }
  }

  return content as React.ReactNode;
};

/**
 * Renders the buttons based on the provided configuration
 * @param props - ButtonRenderProps
 * @param config - Button configuration
 * @returns The rendered buttons
 */
const renderButtons = (
  props: ButtonRenderProps & { skip?: boolean },
  config?: {
    primary?: ButtonConfig;
    secondary?: ButtonConfig;
    container?: ButtonLayoutConfig;
  }
): React.ReactNode => {
  const {
    onNext,
    onBack,
    onSkip,
    onComplete,
    isFirstStep,
    isLastStep,
    currentStep,
    totalSteps,
    skip,
  } = props;

  // If container has a custom render function, use it
  if (config?.container?.render) {
    return config.container.render(props);
  }

  // Default button container
  return (
    <div
      className={clsx(
        'flex justify-between items-center gap-2',
        config?.container?.className
      )}
      style={{
        flexDirection: config?.container?.direction || 'row',
        alignItems: config?.container?.align || 'center',
        gap: config?.container?.gap || '0.5rem',
        ...config?.container?.style,
      }}
      role="toolbar"
      aria-label="Tour navigation"
    >
      <div className="flex gap-2">
        {!isFirstStep && (
          config?.secondary?.render ? (
            config.secondary.render(props)
          ) : (
            <button
              onClick={onBack}
              className={clsx('tour-button tour-button-secondary', config?.secondary?.className)}
              style={config?.secondary?.style}
              aria-label="Go to previous step"
            >
              {config?.secondary?.content || 'Back'}
            </button>
          )
        )}
        {skip && (
          config?.secondary?.render ? (
            config.secondary.render(props)
          ) : (
            <button
              onClick={onSkip}
              className={clsx('tour-button tour-button-secondary', config?.secondary?.className)}
              style={config?.secondary?.style}
              aria-label="Skip tour"
            >
              {config?.secondary?.content || 'Skip'}
            </button>
          )
        )}
      </div>
      {config?.primary?.render ? (
        config.primary.render(props)
      ) : (
        <button
          onClick={isLastStep ? onComplete : onNext}
          className={clsx('tour-button tour-button-primary', config?.primary?.className)}
          style={config?.primary?.style}
          aria-label={isLastStep ? "Complete tour" : "Go to next step"}
        >
          {config?.primary?.content || (isLastStep ? 'Done' : 'Next')}
        </button>
      )}
    </div>
  );
};

/**
 * Tooltip component that displays tour content and navigation controls
 * @param props - TourTooltipProps
 * @returns React component
 */
export const TourTooltip: React.FC<TourTooltipProps> = ({
  content,
  placement,
  animation = 'slide',
  isFirstStep,
  isLastStep,
  skip,
  onNext,
  onBack,
  onSkip,
  onComplete,
  tooltipClassName,
  buttonClassName,
  buttonContainerClassName,
  targetLabel,
  floatingStyles,
  setFloating,
  showProgress = false,
  currentStep,
  totalSteps,
  buttonConfig,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure the initial position is set
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [placement]);

  return (
    <div
      ref={setFloating}
      style={floatingStyles}
      className={clsx('tour-tooltip z-50', tooltipClassName, { visible: isVisible })}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-step-title"
      aria-describedby="tour-step-content"
      data-placement={placement}
      data-animation={animation}
    >
      <div id="tour-step-title" className="sr-only">
        {`Tour Step: ${targetLabel}`}
      </div>
      {showProgress && currentStep !== undefined && totalSteps !== undefined && (
        <div className="mb-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      )}
      <div id="tour-step-content" className="mb-4">
        <ErrorBoundary
          fallback={
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-gray-600 mb-2">Content Error</div>
              <div className="text-sm text-gray-500">
                Failed to render tour content
              </div>
            </div>
          }
        >
          {renderContent(content)}
        </ErrorBoundary>
      </div>
      {renderButtons(
        {
          onNext,
          onBack,
          onSkip,
          onComplete,
          isFirstStep,
          isLastStep,
          currentStep,
          totalSteps,
          skip,
        },
        buttonConfig || {
          primary: { className: buttonClassName },
          secondary: { className: buttonClassName },
          container: { className: buttonContainerClassName },
        }
      )}
    </div>
  );
}; 
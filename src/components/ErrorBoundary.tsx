import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Props for the ErrorBoundary component
 */
interface Props {
  /** Child components to render */
  children: ReactNode;
  /** Custom fallback UI to show when an error occurs */
  fallback?: ReactNode;
  /** Callback function when an error occurs */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State for the ErrorBoundary component
 */
interface State {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error that occurred */
  error: Error | null;
}

/**
 * Error boundary component that catches JavaScript errors in its child component tree
 * and displays a fallback UI instead of crashing the whole app
 * @param props - Props for the ErrorBoundary component
 * @returns React component
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  /**
   * Updates state when an error occurs
   * @param error - The error that occurred
   * @returns New state
   */
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Called when an error occurs
   * @param error - The error that occurred
   * @param errorInfo - Additional error information
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-600 mb-2">Something went wrong</div>
          <div className="text-sm text-red-500">
            {this.state.error?.message || 'An unexpected error occurred'}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 
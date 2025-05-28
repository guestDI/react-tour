import { useEffect, useCallback, useRef } from 'react';

interface UseTourPerformanceOptions {
  onScroll?: () => void;
  onResize?: () => void;
  debounceMs?: number;
}

export const useTourPerformance = ({
  onScroll,
  onResize,
  debounceMs = 100,
}: UseTourPerformanceOptions = {}) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debounce = useCallback((callback: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(callback, debounceMs);
  }, [debounceMs]);

  useEffect(() => {
    const handleScroll = () => {
      if (onScroll) {
        debounce(onScroll);
      }
    };

    const handleResize = () => {
      if (onResize) {
        debounce(onResize);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onScroll, onResize, debounce]);

  return {
    debounce,
  };
}; 
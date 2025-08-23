import { useCallback } from 'react';

interface ErrorHandlerOptions {
  onError?: (error: Error, context?: string) => void;
  showToast?: boolean;
  logToConsole?: boolean;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const { onError, showToast = true, logToConsole = true } = options;

  const handleError = useCallback(
    (error: Error, context?: string) => {
      // Log to console if enabled
      if (logToConsole) {
        console.error(`Error${context ? ` in ${context}` : ''}:`, error);
      }

      // Show toast notification if enabled
      if (showToast) {
        // You can integrate with your toast system here
        // For now, we'll use a simple alert in development
        if (process.env.NODE_ENV === 'development') {
          alert(`Error: ${error.message}`);
        }
      }

      // Call custom error handler
      if (onError) {
        onError(error, context);
      }

      // In production, you might want to send to error reporting service
      if (process.env.NODE_ENV === 'production') {
        // Example: Sentry.captureException(error);
        // Example: LogRocket.captureException(error);
      }
    },
    [onError, showToast, logToConsole]
  );

  const handleImageError = useCallback(
    (error: Event, imageSrc?: string) => {
      const imageError = new Error(
        `Failed to load image: ${imageSrc || 'unknown'}`
      );
      handleError(imageError, 'Image Loading');
    },
    [handleError]
  );

  const handleNetworkError = useCallback(
    (error: Error) => {
      handleError(error, 'Network Request');
    },
    [handleError]
  );

  const handleValidationError = useCallback(
    (error: Error) => {
      handleError(error, 'Validation');
    },
    [handleError]
  );

  return {
    handleError,
    handleImageError,
    handleNetworkError,
    handleValidationError,
  };
};

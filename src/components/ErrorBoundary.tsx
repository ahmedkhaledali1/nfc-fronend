import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      // If custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo } = this.state;
      const isImageError =
        error?.message?.includes('img') ||
        error?.message?.includes('image') ||
        error?.message?.includes('404') ||
        error?.message?.includes('Failed to load');

      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl mx-auto shadow-2xl border-destructive/20">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-bold text-destructive">
                {isImageError ? 'Image Loading Error' : 'Something Went Wrong'}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {isImageError
                  ? 'We encountered an issue loading an image on this page.'
                  : 'An unexpected error occurred. Please try again or contact support if the problem persists.'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error Details */}
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="font-mono text-sm">
                  {error?.message || 'Unknown error occurred'}
                </AlertDescription>
              </Alert>

              {/* Stack Trace (only in development) */}
              {process.env.NODE_ENV === 'development' &&
                errorInfo?.componentStack && (
                  <details className="bg-muted/50 rounded-lg p-4">
                    <summary className="cursor-pointer font-medium text-sm text-muted-foreground mb-2">
                      Component Stack Trace (Development Only)
                    </summary>
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap overflow-auto max-h-40">
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleRetry}
                  className="flex items-center gap-2"
                  variant="default"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>

                <Button
                  onClick={this.handleGoBack}
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </div>

              {/* Additional Help */}
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  If this problem continues, please contact our support team
                  with the error details above.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

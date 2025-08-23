import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
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
  sectionName: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class SectionErrorBoundary extends Component<Props, State> {
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

    console.error(
      `SectionErrorBoundary caught an error in ${this.props.sectionName}:`,
      error,
      errorInfo
    );

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

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo } = this.state;
      const { sectionName } = this.props;

      return (
        <div className="w-full p-4">
          <Card className="w-full border-destructive/20">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle className="text-lg font-semibold text-destructive">
                Error in {sectionName}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                This section encountered an error and couldn't load properly.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="font-mono text-sm">
                  {error?.message || 'Unknown error occurred'}
                </AlertDescription>
              </Alert>

              {process.env.NODE_ENV === 'development' &&
                errorInfo?.componentStack && (
                  <details className="bg-muted/50 rounded-lg p-3">
                    <summary className="cursor-pointer font-medium text-sm text-muted-foreground mb-2">
                      Component Stack Trace (Development Only)
                    </summary>
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap overflow-auto max-h-32">
                      {errorInfo.componentStack}
                    </pre>
                  </details>
                )}

              <div className="flex justify-center">
                <Button
                  onClick={this.handleRetry}
                  className="flex items-center gap-2"
                  size="sm"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry {sectionName}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;

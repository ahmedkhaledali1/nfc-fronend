import React, { useState, useEffect } from 'react';
import { ImageOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ImageErrorBoundaryProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: (error: Event) => void;
  children?: React.ReactNode;
}

const ImageErrorBoundary: React.FC<ImageErrorBoundaryProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder.svg',
  onError,
  children,
}) => {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setIsLoading(false);

    if (!hasError && currentSrc !== fallbackSrc) {
      // Try fallback image
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else {
      // Both original and fallback failed
      setHasError(true);
      if (onError) {
        onError(event.nativeEvent);
      }
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleRetry = () => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);
  };

  if (hasError && currentSrc === fallbackSrc) {
    return (
      <div className={`relative ${className}`}>
        <Card className="w-full h-full min-h-[200px] flex items-center justify-center bg-muted/50 border-dashed border-muted-foreground/30">
          <CardContent className="text-center p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <ImageOff className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Image Failed to Load
                </h3>
                <p className="text-xs text-muted-foreground/70">
                  {alt || 'Image'}
                </p>
              </div>
              <Button
                onClick={handleRetry}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted/50 rounded-2xl flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        crossOrigin="anonymous"
      />
      {children}
    </div>
  );
};

export default ImageErrorBoundary;

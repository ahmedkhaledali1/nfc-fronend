# Error Boundary Components

This project includes comprehensive error handling with multiple ErrorBoundary components to provide graceful error recovery and user-friendly error messages.

## Components Overview

### 1. ErrorBoundary (Main Application Error Boundary)

- **Location**: `src/components/ErrorBoundary.tsx`
- **Purpose**: Catches JavaScript errors anywhere in the component tree and displays a fallback UI
- **Usage**: Wraps the entire application in `App.tsx`

### 2. ImageErrorBoundary (Image-Specific Error Handling)

- **Location**: `src/components/ImageErrorBoundary.tsx`
- **Purpose**: Handles image loading errors with fallback images and retry functionality
- **Usage**: Wraps individual images that might fail to load

### 3. SectionErrorBoundary (Section-Specific Error Handling)

- **Location**: `src/components/SectionErrorBoundary.tsx`
- **Purpose**: Catches errors in specific sections of the application
- **Usage**: Wraps individual sections or components

### 4. useErrorHandler Hook

- **Location**: `src/hooks/useErrorHandler.ts`
- **Purpose**: Centralized error handling with customizable options
- **Usage**: Provides error handling functions for components

## Usage Examples

### 1. Application-Level Error Boundary

```tsx
// In App.tsx
import ErrorBoundary from '@/components/ErrorBoundary';

const App = () => (
  <ErrorBoundary
    onError={(error, errorInfo) => {
      // Log to external service in production
      if (process.env.NODE_ENV === 'production') {
        console.error('Application Error:', error, errorInfo);
      }
    }}
  >
    {/* Your app content */}
  </ErrorBoundary>
);
```

### 2. Image Error Handling

```tsx
import ImageErrorBoundary from '@/components/ImageErrorBoundary';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const MyComponent = () => {
  const { handleImageError } = useErrorHandler();

  return (
    <ImageErrorBoundary
      src="https://example.com/image.jpg"
      alt="Description"
      className="w-full h-auto rounded-lg"
      fallbackSrc="/placeholder.svg"
      onError={(error) => {
        handleImageError(error, 'https://example.com/image.jpg');
      }}
    >
      {/* Optional overlay content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </ImageErrorBoundary>
  );
};
```

### 3. Section Error Handling

```tsx
import SectionErrorBoundary from '@/components/SectionErrorBoundary';

const MyPage = () => (
  <div>
    <SectionErrorBoundary
      sectionName="Hero Section"
      onError={(error, errorInfo) => {
        console.error('Hero Section Error:', error, errorInfo);
      }}
    >
      <HeroSection />
    </SectionErrorBoundary>

    <SectionErrorBoundary
      sectionName="Features Section"
      fallback={<div>Features temporarily unavailable</div>}
    >
      <FeaturesSection />
    </SectionErrorBoundary>
  </div>
);
```

### 4. Custom Error Handler Hook

```tsx
import { useErrorHandler } from '@/hooks/useErrorHandler';

const MyComponent = () => {
  const {
    handleError,
    handleImageError,
    handleNetworkError,
    handleValidationError,
  } = useErrorHandler({
    showToast: true,
    logToConsole: true,
    onError: (error, context) => {
      // Custom error handling logic
    },
  });

  const handleClick = () => {
    try {
      // Some risky operation
    } catch (error) {
      handleError(error as Error, 'Button Click');
    }
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

## Error Boundary Features

### 1. Main ErrorBoundary

- ✅ Full-screen error display
- ✅ Error details with stack trace (development only)
- ✅ Retry functionality
- ✅ Navigation options (Go Back, Go Home)
- ✅ Custom error handlers
- ✅ Production/development environment detection

### 2. ImageErrorBoundary

- ✅ Automatic fallback image loading
- ✅ Loading states with spinner
- ✅ Retry functionality
- ✅ Custom error callbacks
- ✅ Graceful degradation

### 3. SectionErrorBoundary

- ✅ Section-specific error isolation
- ✅ Compact error display
- ✅ Retry functionality
- ✅ Custom fallback components
- ✅ Development stack traces

### 4. useErrorHandler Hook

- ✅ Centralized error handling
- ✅ Toast notifications
- ✅ Console logging
- ✅ Custom error handlers
- ✅ Context-aware error messages

## Error Types Handled

1. **Image Loading Errors**

   - Invalid URLs
   - Network failures
   - CORS issues
   - 404 errors

2. **JavaScript Runtime Errors**

   - Component rendering errors
   - State management errors
   - Event handler errors

3. **Network Errors**

   - API call failures
   - Timeout errors
   - Connection issues

4. **Validation Errors**
   - Form validation failures
   - Data type mismatches
   - Required field errors

## Best Practices

1. **Always wrap critical sections** with appropriate error boundaries
2. **Use ImageErrorBoundary** for all external images
3. **Implement custom error handlers** for production logging
4. **Provide meaningful fallback content** for better UX
5. **Test error scenarios** during development
6. **Monitor error rates** in production

## Production Considerations

1. **Error Reporting**: Integrate with services like Sentry or LogRocket
2. **Analytics**: Track error occurrences and user impact
3. **Fallback Content**: Ensure critical functionality remains available
4. **Performance**: Error boundaries have minimal performance impact
5. **User Experience**: Provide clear, actionable error messages

## Troubleshooting

### Common Issues

1. **Error boundary not catching errors**

   - Ensure the error boundary wraps the component that might error
   - Check that errors are thrown in the component tree, not in event handlers

2. **Image errors not being caught**

   - Use ImageErrorBoundary instead of regular img tags
   - Ensure proper error event handling

3. **Error boundaries not resetting**
   - Check that the retry functionality is properly implemented
   - Verify state management in error boundary components

### Debug Mode

In development mode, error boundaries will show:

- Detailed error messages
- Component stack traces
- Error context information

In production mode, error boundaries will show:

- User-friendly error messages
- Basic error details
- Action buttons for recovery

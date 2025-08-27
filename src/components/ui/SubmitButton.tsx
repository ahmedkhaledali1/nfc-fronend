import React from 'react';

function SubmitButton({
  children,
  disabled,
  className,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={`bg-primary px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-md text-xs sm:text-sm font-medium h-8 sm:h-9 md:h-10 min-w-[80px] sm:min-w-[100px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3 sm:[&_svg]:size-4 [&_svg]:shrink-0 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default SubmitButton;

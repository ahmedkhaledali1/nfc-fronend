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
      className={`bg-primary px-3 text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default SubmitButton;

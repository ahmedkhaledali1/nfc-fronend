import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:p-4 group-[.toaster]:min-w-[350px] group-[.toaster]:max-w-[450px]',
          description:
            'group-[.toast]:text-muted-foreground group-[.toast]:text-sm group-[.toast]:mt-1',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:hover:bg-primary/90 group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:hover:bg-muted/80 group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors',
          error:
            'group-[.toast]:bg-red-50 group-[.toast]:border-red-200 group-[.toast]:text-red-800 group-[.toast]:shadow-red-100',
          success:
            'group-[.toast]:bg-green-50 group-[.toast]:border-green-200 group-[.toast]:text-green-800 group-[.toast]:shadow-green-100',
          warning:
            'group-[.toast]:bg-yellow-50 group-[.toast]:border-yellow-200 group-[.toast]:text-yellow-800 group-[.toast]:shadow-yellow-100',
          info: 'group-[.toast]:bg-blue-50 group-[.toast]:border-blue-200 group-[.toast]:text-blue-800 group-[.toast]:shadow-blue-100',
          loading:
            'group-[.toast]:bg-slate-50 group-[.toast]:border-slate-200 group-[.toast]:text-slate-800 group-[.toast]:shadow-slate-100',
        },
        duration: 4000,
        closeButton: true,
      }}
      {...props}
    />
  );
};

// Enhanced toast functions with proper styling
const enhancedToast = {
  success: (message: string, options?: any) => {
    return toast.success(message, {
      style: {
        background: 'var(--green-50)',
        border: '1px solid var(--green-200)',
        color: 'var(--green-800)',
      },
      ...options,
    });
  },
  error: (message: string, options?: any) => {
    return toast.error(message, {
      style: {
        background: 'var(--red-50)',
        border: '1px solid var(--red-200)',
        color: 'var(--red-800)',
      },
      duration: 6000, // Longer duration for errors
      ...options,
    });
  },
  warning: (message: string, options?: any) => {
    return toast.warning(message, {
      style: {
        background: 'var(--yellow-50)',
        border: '1px solid var(--yellow-200)',
        color: 'var(--yellow-800)',
      },
      ...options,
    });
  },
  info: (message: string, options?: any) => {
    return toast.info(message, {
      style: {
        background: 'var(--blue-50)',
        border: '1px solid var(--blue-200)',
        color: 'var(--blue-800)',
      },
      ...options,
    });
  },
  loading: (message: string, options?: any) => {
    return toast.loading(message, {
      style: {
        background: 'var(--slate-50)',
        border: '1px solid var(--slate-200)',
        color: 'var(--slate-800)',
      },
      ...options,
    });
  },
  dismiss: toast.dismiss,
  promise: toast.promise,
};

export { Toaster, enhancedToast as toast };

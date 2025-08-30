import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import Index from './pages/Index';
import Product from './pages/Product';
import BulkOrders from './pages/BulkOrders';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import DeliveryPolicy from './pages/DeliveryPolicy';
import CancellationPolicy from './pages/CancellationPolicy';
import RefundPolicy from './pages/RefundPolicy';

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary
    onError={(error, errorInfo) => {
      // Log error to external service in production
      if (process.env.NODE_ENV === 'production') {
        console.error('Application Error:', error, errorInfo);
        // You can add error reporting service here (e.g., Sentry, LogRocket)
      }
    }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product" element={<Product />} />
            <Route path="/bulk-orders" element={<BulkOrders />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/delivery-policy" element={<DeliveryPolicy />} />
            <Route
              path="/cancellation-policy"
              element={<CancellationPolicy />}
            />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/admin-panel/*" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Product from './pages/Product';
import BulkOrders from './pages/BulkOrders';
import ContactUs from './pages/ContactUs';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import DashboardPage from './pages/admin/DashboardPage';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import ProductPage from './pages/admin/ProductPage';
import OrdersPage from './pages/admin/OrdersPage';
import MessagesPage from './pages/admin/MessagesPage';
import SettingsPage from './pages/admin/SettingsPage';

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/admin-panel/*" element={<AdminPanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

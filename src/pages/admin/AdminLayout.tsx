import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  MessageCircle,
  Settings,
  LogOut,
  LayoutDashboard,
  Bell,
  Star,
  Share2,
  Globe,
  MapPin,
  Users,
  Plus,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import useAuthStore from '@/stores/useAuthStore';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, logout, refreshUser } = useAuthStore();

  // useEffect(() => {
  //   refreshUser();
  // }, [refreshUser]);

  // console.log('isAuthenticated.', isAuthenticated);
  // console.log('user.', user);
  // // Protect admin routes
  if (!isAuthenticated) {
    return <Navigate to="/admin-panel/login" replace />;
  }

  // Ensure user is admin
  // if (user?.role !== 'admin') {
  //   return <Navigate to="/" replace />;
  // }

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      navigate('/admin-panel/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to logout. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const menuItems = [
    {
      path: '/admin-panel/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
    },
    { path: '/admin-panel/product', icon: Package, label: 'Product' },
    { path: '/admin-panel/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin-panel/bulk-orders', icon: Package, label: 'Bulk Orders' },
    { path: '/admin-panel/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/admin-panel/testimonials', icon: Star, label: 'Testimonials' },
    { path: '/admin-panel/social-media', icon: Share2, label: 'Social Media' },
    { path: '/admin-panel/subscribers', icon: Users, label: 'Subscribers' },
    { path: '/admin-panel/countries', icon: Globe, label: 'Countries' },
    { path: '/admin-panel/cities', icon: MapPin, label: 'Cities' },
    { path: '/admin-panel/addons', icon: Plus, label: 'Addons' },
    // { path: '/admin-panel/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <SidebarProvider>
      <div
        style={{
          width: '-webkit-fill-available',
        }}
        className="flex min-h-screen bg-background"
      >
        <Sidebar className="border-r border-border bg-card shadow-[var(--shadow-card)]">
          <SidebarHeader className="border-b border-border bg-gradient-to-r from-primary to-accent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
                  <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold text-primary-foreground">
                    NFC Cards
                  </h1>
                  <p className="text-xs text-primary-foreground/80">
                    Admin Panel
                  </p>
                </div>
              </div>
              <SidebarTrigger className="text-primary-foreground hover:bg-primary-foreground/20" />
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <div className="mb-6">
              <div className="mb-2 px-2">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Navigation
                </h2>
              </div>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => navigate(item.path)}
                        tooltip={item.label}
                        className={`group relative transition-[var(--transition-smooth)] ${
                          isActive
                            ? 'bg-primary/10 text-primary border-r-2 border-primary'
                            : 'text-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 mr-3 transition-colors ${
                            isActive
                              ? 'text-primary'
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}
                        />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[var(--shadow-glow)]" />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </div>

            {/* User Section */}
            <div className="mt-auto">
              <div className="mb-2 px-2">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Account
                </h2>
              </div>
              <div className="space-y-2">
                {/* User Info */}
                <div className="px-2 py-3 rounded-lg bg-muted/50 border border-border card-premium">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)]">
                      <span className="text-xs font-semibold text-primary-foreground">
                        {user?.name?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user?.name || 'Admin User'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email || 'admin@example.com'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    tooltip="Logout"
                    variant="outline"
                    className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-[var(--transition-smooth)]"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span className="font-medium">Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="bg-background">
          <div className="min-h-screen w-full">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

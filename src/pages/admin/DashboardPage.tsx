import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Package,
  ShoppingCart,
  MessageCircle,
  TrendingUp,
  Share2,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  getStatistics,
  getSocialMedia,
  getSubscribers,
} from '@/lib/service/endpoints';
import PageHeader from './_components/pageHeader';

const DashboardPage = () => {
  const {
    data: statisticsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getStatistics'],
    queryFn: () => getStatistics(),
  });

  const { data: socialMediaData } = useQuery({
    queryKey: ['getSocialMedia'],
    queryFn: () => getSocialMedia(),
  });

  const { data: subscribersData } = useQuery({
    queryKey: ['getSubscribers'],
    queryFn: () => getSubscribers(),
  });

  const socialMediaCount = socialMediaData?.data?.data?.length || 0;
  const subscribersCount = subscribersData?.data?.data?.length || 0;

  const stats = [
    {
      title: 'Total Orders',
      value: statisticsData?.data?.data?.orders?.total?.toString() || '0',
      description: 'Total orders received',
      icon: ShoppingCart,
      color: 'text-blue-600',
    },
    {
      title: 'Products',
      value: statisticsData?.data?.data?.products?.total?.toString() || '0',
      description: 'Active products',
      icon: Package,
      color: 'text-green-600',
    },
    {
      title: 'Messages',
      value: statisticsData?.data?.data?.messages?.new?.toString() || '0',
      description: 'New messages',
      icon: MessageCircle,
      color: 'text-orange-600',
    },
    // {
    //   title: 'Social Media',
    //   value: socialMediaCount.toString(),
    //   description: 'Active platforms',
    //   icon: Share2,
    //   color: 'text-purple-600',
    // },
    // {
    //   title: 'Subscribers',
    //   value: subscribersCount.toString(),
    //   description: 'Newsletter subscribers',
    //   icon: Users,
    //   color: 'text-indigo-600',
    // },
  ];

  return (
    <div className="p-6 !w-full">
      <PageHeader
        title="Dashboard"
        description="Welcome to your NFC card business dashboard"
      />

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">
            Failed to load dashboard statistics. Please try again.
          </p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="card-premium">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1   gap-6">
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link
                to="/admin-panel/orders"
                className="block p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <h4 className="font-medium">View Orders</h4>
                <p className="text-sm text-muted-foreground">
                  Check recent customer orders
                </p>
              </Link>
              <Link
                to="/admin-panel/product"
                className="block p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <h4 className="font-medium">Manage Product</h4>
                <p className="text-sm text-muted-foreground">
                  Update product information
                </p>
              </Link>
              <Link
                to="/admin-panel/messages"
                className="block p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <h4 className="font-medium">Check Messages</h4>
                <p className="text-sm text-muted-foreground">
                  Respond to customer inquiries
                </p>
              </Link>
              <Link
                to="/admin-panel/social-media"
                className="block p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <h4 className="font-medium">Manage Social Media</h4>
                <p className="text-sm text-muted-foreground">
                  Update social media links
                </p>
              </Link>
              <Link
                to="/admin-panel/subscribers"
                className="block p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <h4 className="font-medium">Manage Subscribers</h4>
                <p className="text-sm text-muted-foreground">
                  View and manage newsletter subscribers
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

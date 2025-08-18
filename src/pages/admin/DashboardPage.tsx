import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Package, ShoppingCart, MessageCircle, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PageHeader from './_components/pageHeader';

const DashboardPage = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      description: '+12% from last month',
      icon: ShoppingCart,
      color: 'text-blue-600',
    },
    {
      title: 'Products',
      value: '2',
      description: 'Active products',
      icon: Package,
      color: 'text-green-600',
    },
    {
      title: 'Messages',
      value: '23',
      description: 'Unread messages',
      icon: MessageCircle,
      color: 'text-orange-600',
    },
    {
      title: 'Revenue',
      value: '5,460 JOD',
      description: '+8% from last month',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="p-6 !w-full">
      <PageHeader
        title="Dashboard"
        description="Welcome to your NFC card business dashboard"
      />

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest orders and messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-muted-foreground">
                    Order #157 from John Doe
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Message received</p>
                  <p className="text-xs text-muted-foreground">
                    From Sarah Al-Zahra
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  15 min ago
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Order completed</p>
                  <p className="text-xs text-muted-foreground">
                    Order #155 shipped
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  1 hour ago
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h4 className="font-medium">View Orders</h4>
                <p className="text-sm text-muted-foreground">
                  Check recent customer orders
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h4 className="font-medium">Manage Product</h4>
                <p className="text-sm text-muted-foreground">
                  Update product information
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h4 className="font-medium">Check Messages</h4>
                <p className="text-sm text-muted-foreground">
                  Respond to customer inquiries
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

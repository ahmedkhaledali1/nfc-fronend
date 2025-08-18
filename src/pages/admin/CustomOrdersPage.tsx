import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PageHeader from './_components/pageHeader';
import DataTable from '@/components/ui/DataTable';
import {
  getBulkOrders,
  deleteBulkOrder,
  updateBulkOrder,
} from '@/lib/service/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Building,
  Users,
  Calendar,
  MessageSquare,
  Edit,
  Trash2,
} from 'lucide-react';
import EditBulkOrderDialog from './components/EditBulkOrderDialog';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

const CustomOrdersPage = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<any>(null);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['getBulkOrders', currentPage, itemsPerPage],
    queryFn: () => getBulkOrders(currentPage, itemsPerPage),
  });

  const { mutate: deleteBulkOrderMutation } = useMutation({
    mutationFn: (id: string) => deleteBulkOrder(id),
    onSuccess: () => {
      toast({
        title: 'Order Deleted',
        description: 'The bulk order has been deleted successfully.',
      });
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to delete the bulk order.',
        variant: 'destructive',
      });
    },
  });

  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (order: any) => {
    setOrderToDelete(order);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (orderToDelete) {
      deleteBulkOrderMutation(orderToDelete._id);
    }
  };

  const paginatedData = data?.data?.data?.pagination || {};
  const bulkOrders = data?.data?.data?.data || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (order: any) => (
        <span className="font-mono text-sm">#{order._id.slice(-8)}</span>
      ),
    },
    {
      key: 'company',
      label: 'Company',
      render: (order: any) => (
        <div>
          <div className="font-medium">{order.companyInfo.companyName}</div>
          <div className="text-sm text-muted-foreground">
            {order.companyInfo.contactPerson}
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (order: any) => (
        <div className="text-sm">
          <div>{order.companyInfo.email}</div>
          <div className="text-muted-foreground">{order.companyInfo.phone}</div>
        </div>
      ),
    },
    {
      key: 'employees',
      label: 'Employees',
      render: (order: any) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">
            {order.orderDetails.employeeCount}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (order: any) => (
        <Badge
          variant={
            order.status === 'approved'
              ? 'default'
              : order.status === 'pending'
              ? 'secondary'
              : 'outline'
          }
          color={
            order.status === 'approved'
              ? 'green'
              : order.status === 'pending'
              ? 'yellow'
              : 'red'
          }
          className="capitalize"
        >
          {order.status}
        </Badge>
      ),
    },

    {
      key: 'created',
      label: 'Created',
      render: (order: any) => (
        <div className="text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (order: any) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(order)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(order)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const exportData = {
    filename: 'bulk-orders.csv',
    headers: [
      'Order ID',
      'Company Name',
      'Contact Person',
      'Email',
      'Phone',
      'Employee Count',
      'Message',
      'Status',
      'Pricing Type',
      'Customer Response',
      'Created Date',
      'Estimated Delivery',
    ],
    getRowData: (order: any) => [
      order._id,
      order.companyInfo.companyName,
      order.companyInfo.contactPerson,
      order.companyInfo.email,
      order.companyInfo.phone,
      order.orderDetails.employeeCount.toString(),
      order.orderDetails.message || '',
      order.status,
      order.customPricing.isCustom ? 'Custom' : 'Standard',
      order.customerResponse.approved ? 'Approved' : 'Pending',
      new Date(order.createdAt).toLocaleDateString(),
      new Date(order.estimatedDelivery).toLocaleDateString(),
    ],
  };

  const emptyState = {
    icon: <Building className="mx-auto h-12 w-12 text-muted-foreground/50" />,
    title: 'No bulk orders found',
    description:
      'Bulk order requests will appear here once companies submit them.',
  };

  return (
    <div className="p-6 !w-full">
      <PageHeader
        title="Bulk Orders Management"
        description="View and manage corporate bulk order requests"
      />

      <DataTable
        title="Bulk Order Requests"
        description="Corporate bulk order requests"
        data={bulkOrders}
        columns={columns}
        exportData={exportData}
        loading={isLoading}
        emptyState={emptyState}
        refetch={refetch}
        pagination={{
          currentPage: paginatedData.currentPage,
          totalPages: paginatedData.totalPages,
          totalItems: paginatedData.totalItems,
          itemsPerPage: paginatedData.itemsPerPage,
          onPageChange: handlePageChange,
          onItemsPerPageChange: handleItemsPerPageChange,
        }}
      />

      {selectedOrder && (
        <EditBulkOrderDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
          onUpdate={refetch}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setOrderToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Bulk Order"
        description={`Are you sure you want to delete the bulk order for ${
          orderToDelete?.companyInfo?.companyName || 'this company'
        }? This action cannot be undone.`}
        confirmText="Delete Order"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default CustomOrdersPage;

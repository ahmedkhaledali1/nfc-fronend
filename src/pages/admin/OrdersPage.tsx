import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PageHeader from './_components/pageHeader';
import DataTable from '@/components/ui/DataTable';
import { deleteOrder, getOrders, updateOrder } from '@/lib/service/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import EditOrderDialog from './components/EditOrderDialog';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

const OrdersPage = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['getOrders', currentPage, itemsPerPage],
    queryFn: () => getOrders(currentPage, itemsPerPage),
  });

  const { mutate: updateOrderMutation, isPending: isUpdatingOrder } =
    useMutation({
      mutationFn: (data: any) => updateOrder(data._id, data),
      onSuccess: () => {
        toast({
          title: 'Order Updated',
          description: 'The order has been updated successfully.',
        });
      },
    });

  const paginatedData = data?.data?.data?.pagination || {};

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const { mutate: deleteOrderMutation } = useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: () => {
      toast({
        title: 'Order Deleted',
        description: 'The order has been deleted successfully.',
      });
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to delete the order.',
        variant: 'destructive',
      });
    },
  });

  const orders = data?.data?.data?.data || [];

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<any>(null);

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
      deleteOrderMutation(orderToDelete._id);
    }
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
      key: 'customer',
      label: 'Customer',
      render: (order: any) => (
        <div>
          <div className="font-medium">{order.customerFullName}</div>
          <div className="text-sm text-muted-foreground">
            {order.fullAddress}
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (order: any) => (
        <div className="text-sm">
          <div>{order.personalInfo.email}</div>
          <div className="text-muted-foreground">
            {order.personalInfo.phoneNumbers[0] || 'No phone'}
          </div>
        </div>
      ),
    },
    {
      key: 'product',
      label: 'Product',
      render: (order: any) => (
        <div className="text-sm">
          <div className="font-medium">{order.product.title}</div>
          <div className="text-muted-foreground">{order.product.price} JOD</div>
        </div>
      ),
    },
    {
      key: 'cardDesign',
      label: 'Card Design',
      render: (order: any) => (
        <div className="space-y-1">
          <Badge variant="outline" className="capitalize">
            {order.cardDesign.color}
          </Badge>
          {order.cardDesign.includePrintedLogo && (
            <div className="text-xs text-muted-foreground">With Logo</div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (order: any) => (
        <Badge
          variant={
            order.status === 'completed'
              ? 'default'
              : order.status === 'pending'
              ? 'secondary'
              : 'outline'
          }
          className="capitalize"
        >
          {order.status}
        </Badge>
      ),
    },
    {
      key: 'payment',
      label: 'Payment',
      render: (order: any) => (
        <Badge variant="outline" className="capitalize">
          {order.paymentMethod}
        </Badge>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      render: (order: any) => (
        <span className="font-semibold">{order.total} JOD</span>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (order: any) => (
        <div className="text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (order: any) => {
        // console.log('order', order);
        return (
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
        );
      },
    },
  ];

  const exportData = {
    filename: 'nfc-orders.csv',
    headers: [
      'Order ID',
      'Customer Name',
      'Email',
      'Phone',
      'Product',
      'Card Color',
      'Address',
      'Status',
      'Payment Method',
      'Total',
      'Date',
    ],
    getRowData: (order: any) => [
      order._id,
      order.customerFullName,
      order.personalInfo.email,
      order.personalInfo.phoneNumbers[0] || '',
      order.product.title,
      order.cardDesign.color,
      order.fullAddress,
      order.status,
      order.paymentMethod,
      order.total,
      new Date(order.createdAt).toLocaleDateString(),
    ],
  };

  const emptyState = {
    title: 'No orders found',
    description: 'Orders will appear here once customers start placing them.',
  };

  return (
    <div className="p-6 !w-full">
      <PageHeader
        title="Orders Management"
        description="View and manage customer orders"
      />

      <DataTable
        title="Recent Orders"
        description="Customer orders"
        data={orders}
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
        <EditOrderDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setOrderToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Order"
        description={`Are you sure you want to delete the order for ${
          orderToDelete?.customerFullName || 'this customer'
        }? This action cannot be undone.`}
        confirmText="Delete Order"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default OrdersPage;

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import PageHeader from './_components/pageHeader';
import DataTable from '@/components/ui/DataTable';
import {
  getSubscribers,
  deleteSubscriber,
  updateSubscriber,
} from '@/lib/service/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Users, Eye, Edit, Trash2, Mail } from 'lucide-react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SubscribersPage = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['getSubscribers'],
    queryFn: () => getSubscribers(),
  });

  const allSubscribers = data?.data?.data?.data || [];

  // Client-side pagination
  const paginatedSubscribers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allSubscribers.slice(startIndex, endIndex);
  }, [allSubscribers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(allSubscribers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Delete functionality
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<any>(null);

  const { mutate: deleteSubscriberMutation } = useMutation({
    mutationFn: (id: string) => deleteSubscriber(id),
    onSuccess: () => {
      toast({
        title: 'Subscriber Deleted',
        description: 'The subscriber has been deleted successfully.',
      });
      refetch();
      setIsDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to delete the subscriber.',
        variant: 'destructive',
      });
    },
  });

  const handleDelete = (subscriber: any) => {
    setSubscriberToDelete(subscriber);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (subscriberToDelete) {
      deleteSubscriberMutation(subscriberToDelete.id);
    }
  };

  // Edit functionality
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [subscriberToEdit, setSubscriberToEdit] = useState<any>(null);
  const [editEmail, setEditEmail] = useState('');

  const { mutate: updateSubscriberMutation } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { email: string } }) =>
      updateSubscriber(id, data),
    onSuccess: () => {
      toast({
        title: 'Subscriber Updated',
        description: 'The subscriber has been updated successfully.',
      });
      refetch();
      setIsEditDialogOpen(false);
      setEditEmail('');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to update the subscriber.',
        variant: 'destructive',
      });
    },
  });

  const handleEdit = (subscriber: any) => {
    setSubscriberToEdit(subscriber);
    setEditEmail(subscriber.email);
    setIsEditDialogOpen(true);
  };

  const confirmEdit = () => {
    if (subscriberToEdit && editEmail.trim()) {
      updateSubscriberMutation({
        id: subscriberToEdit.id,
        data: { email: editEmail.trim() },
      });
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (subscriber: any) => (
        <span className="font-mono text-sm">#{subscriber.id}</span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (subscriber: any) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{subscriber.email}</span>
        </div>
      ),
    },

    {
      key: 'actions',
      label: 'Actions',
      render: (subscriber: any) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(subscriber)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(subscriber)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const exportData = {
    filename: 'subscribers.csv',
    headers: ['ID', 'Email', 'Subscribed Date', 'Last Updated'],
    getRowData: (subscriber: any) => [
      subscriber.id,
      subscriber.email,
      new Date(subscriber.createdAt).toLocaleDateString(),
      new Date(subscriber.updatedAt).toLocaleDateString(),
    ],
  };

  const emptyState = {
    icon: <Users className="h-12 w-12 text-muted-foreground" />,
    title: 'No subscribers found',
    description: 'There are no subscribers in the system yet.',
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <PageHeader
          title="Subscribers"
          description="Manage newsletter subscribers and their information."
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Failed to load subscribers. Please try again.
            </p>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Subscribers"
        description="Manage newsletter subscribers and their information."
      />

      <DataTable
        title="Subscribers"
        description={`${allSubscribers.length} total subscribers`}
        data={paginatedSubscribers}
        columns={columns}
        exportData={exportData}
        loading={isLoading}
        emptyState={emptyState}
        refetch={refetch}
        pagination={{
          currentPage,
          totalPages,
          totalItems: allSubscribers.length,
          itemsPerPage,
          onPageChange: handlePageChange,
          onItemsPerPageChange: handleItemsPerPageChange,
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Subscriber"
        description={`Are you sure you want to delete the subscriber "${subscriberToDelete?.email}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subscriber</DialogTitle>
            <DialogDescription>
              Update the subscriber's email address.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="col-span-3"
                placeholder="Enter email address"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmEdit} disabled={!editEmail.trim()}>
              Update Subscriber
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscribersPage;

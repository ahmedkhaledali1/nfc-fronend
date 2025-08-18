import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import PageHeader from './_components/pageHeader';
import DataTable from '@/components/ui/DataTable';
import { getMessages, deleteMessage } from '@/lib/service/endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MessageSquare, Eye, Phone, Trash2 } from 'lucide-react';
import ViewMessageDialog from './components/ViewMessageDialog';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

const MessagesPage = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['getMessages'],
    queryFn: () => getMessages(),
  });

  const allMessages = data?.data?.data?.data || [];

  // Client-side pagination
  const paginatedMessages = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allMessages.slice(startIndex, endIndex);
  }, [allMessages, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(allMessages.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<any>(null);

  const { mutate: deleteMessageMutation } = useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: () => {
      toast({
        title: 'Message Deleted',
        description: 'The message has been deleted successfully.',
      });
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to delete the message.',
        variant: 'destructive',
      });
    },
  });

  const handleView = (message: any) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (message: any) => {
    setMessageToDelete(message);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      deleteMessageMutation(messageToDelete.id);
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (message: any) => (
        <span className="font-mono text-sm">#{message.id}</span>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (message: any) => (
        <div>
          <div className="font-medium">{message.fullName}</div>
          <div className="text-sm text-muted-foreground">{message.email}</div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (message: any) => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{message.phone || 'N/A'}</span>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (message: any) => (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{message.subject}</div>
        </div>
      ),
    },
    {
      key: 'message',
      label: 'Message',
      render: (message: any) => (
        <div className="max-w-[300px]">
          <p className="text-sm text-muted-foreground truncate">
            {message.message}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (message: any) => (
        <Badge
          variant={
            message.status === 'New'
              ? 'destructive'
              : message.status === 'Read'
              ? 'secondary'
              : 'outline'
          }
        >
          {message.status}
        </Badge>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (message: any) => (
        <div className="text-sm text-muted-foreground">
          <div>{message.date}</div>
          <div>{message.time}</div>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (message: any) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(message)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(message)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const exportData = {
    filename: 'contact-messages.csv',
    headers: [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Subject',
      'Message',
      'Status',
      'Date',
      'Time',
    ],
    getRowData: (message: any) => [
      message.id,
      message.fullName,
      message.email,
      message.phone || 'N/A',
      message.subject,
      message.message,
      message.status,
      message.date,
      message.time,
    ],
  };

  const emptyState = {
    icon: (
      <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
    ),
    title: 'No messages found',
    description:
      'Contact messages will appear here once customers send inquiries.',
  };

  return (
    <div className="p-6 !w-full">
      <PageHeader
        title="Messages"
        description="View and respond to customer inquiries"
      />

      <DataTable
        title="Contact Messages"
        description="Customer inquiries and messages"
        data={paginatedMessages}
        columns={columns}
        exportData={exportData}
        loading={isLoading}
        emptyState={emptyState}
        refetch={refetch}
        pagination={{
          currentPage,
          totalPages,
          totalItems: allMessages.length,
          itemsPerPage,
          onPageChange: handlePageChange,
          onItemsPerPageChange: handleItemsPerPageChange,
        }}
      />

      {selectedMessage && (
        <ViewMessageDialog
          isOpen={isViewDialogOpen}
          onClose={() => {
            setIsViewDialogOpen(false);
            setSelectedMessage(null);
          }}
          message={selectedMessage}
          onUpdate={refetch}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setMessageToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Message"
        description={`Are you sure you want to delete the message from ${
          messageToDelete?.fullName || 'this contact'
        }? This action cannot be undone.`}
        confirmText="Delete Message"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default MessagesPage;

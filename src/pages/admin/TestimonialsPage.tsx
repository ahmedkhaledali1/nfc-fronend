import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import PageHeader from './_components/pageHeader';
import DataTable from '@/components/ui/DataTable';
import { getTestimonials, deleteTestimonial } from '@/lib/service/endpoints';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Star, Eye, Edit, Trash2, Plus } from 'lucide-react';
import ViewTestimonialDialog from './components/ViewTestimonialDialog';
import EditTestimonialDialog from './components/EditTestimonialDialog';
import CreateTestimonialDialog from './components/CreateTestimonialDialog';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

const TestimonialsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['getTestimonials'],
    queryFn: () => getTestimonials(),
  });

  const allTestimonials = data?.data?.data?.data || [];

  console.log('allTestimonials', allTestimonials);
  // Client-side pagination
  const paginations = data?.data?.data?.pagination || {};

  const totalPages = Math.ceil(allTestimonials.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Dialog states
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<any>(null);

  // Delete mutation
  const { mutate: deleteTestimonialMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: (id: string) => deleteTestimonial(id),
      onSuccess: () => {
        toast({
          title: 'Testimonial Deleted',
          description: 'The testimonial has been deleted successfully.',
        });
        queryClient.invalidateQueries({ queryKey: ['getTestimonials'] });
      },
      onError: (error: any) => {
        toast({
          title: 'Delete Failed',
          description:
            error?.response?.data?.message || 'Failed to delete testimonial.',
          variant: 'destructive',
        });
      },
    });

  const handleView = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (testimonial: any) => {
    setTestimonialToDelete(testimonial);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (testimonialToDelete) {
      deleteTestimonialMutation(testimonialToDelete._id);
    }
  };

  const handleCreate = () => {
    setIsCreateDialogOpen(true);
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (testimonial: any) => (
        <span className="font-mono text-sm">#{testimonial._id.slice(-8)}</span>
      ),
    },
    {
      key: 'name',
      label: 'name',
      render: (testimonial: any) => {
        console.log('testimonial', testimonial);
        return (
          <div>
            <div className="font-medium">{testimonial.name}</div>
          </div>
        );
      },
    },
    {
      key: 'title',
      label: 'title',
      render: (testimonial: any) => {
        // console.log('testimonial', testimonial);
        return (
          <div>
            <div className="font-medium">{testimonial.title}</div>
          </div>
        );
      },
    },

    {
      key: 'quote',
      label: 'Quote',
      render: (testimonial: any) => (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{testimonial.quote}</div>
        </div>
      ),
    },

    {
      key: 'rating',
      label: 'Rating',
      render: (testimonial: any) => (
        <div className="flex items-center gap-2">
          {/* <div>{testimonial.rating}</div> */}
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} fill="yellow" className="w-4 h-4" />
          ))}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (testimonial: any) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(testimonial)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(testimonial)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(testimonial)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const exportData = {
    filename: 'testimonials.csv',
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
    getRowData: (testimonial: any) => [
      testimonial._id,
      testimonial.fullName,
      testimonial.email,
      testimonial.phone || 'N/A',
      testimonial.subject,
      testimonial.message,
      testimonial.status,
      testimonial.formattedDate,
      testimonial.formattedTime,
    ],
  };

  const emptyState = {
    icon: <Star className="mx-auto h-12 w-12 text-muted-foreground/50" />,
    title: 'No testimonials found',
    description: 'Testimonials will appear here once customers submit them.',
  };

  return (
    <div className="p-6 !w-full">
      <PageHeader
        title="Testimonials"
        description="View and manage customer testimonials"
      />

      <div className="mb-4">
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <DataTable
        title="Customer Testimonials"
        description="Customer feedback and testimonials"
        data={allTestimonials}
        columns={columns}
        exportData={exportData}
        loading={isLoading}
        emptyState={emptyState}
        refetch={refetch}
        pagination={{
          currentPage: paginations.currentPage,
          totalPages: paginations.totalPages,
          totalItems: paginations.totalItems,
          itemsPerPage: paginations.itemsPerPage,
          onPageChange: handlePageChange,
          onItemsPerPageChange: handleItemsPerPageChange,
        }}
      />

      {/* View Dialog */}
      {selectedTestimonial && (
        <ViewTestimonialDialog
          isOpen={isViewDialogOpen}
          onClose={() => {
            setIsViewDialogOpen(false);
            setSelectedTestimonial(null);
          }}
          testimonial={selectedTestimonial}
        />
      )}

      {/* Edit Dialog */}
      {selectedTestimonial && (
        <EditTestimonialDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedTestimonial(null);
          }}
          testimonial={selectedTestimonial}
          onUpdate={refetch}
        />
      )}

      {/* Create Dialog */}
      <CreateTestimonialDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={refetch}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setTestimonialToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Testimonial"
        description={`Are you sure you want to delete "${
          testimonialToDelete?.name || 'this testimonial'
        }"? This action cannot be undone.`}
        confirmText="Delete Testimonial"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default TestimonialsPage;

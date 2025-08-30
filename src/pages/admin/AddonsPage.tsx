import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Package, DollarSign, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Form } from '@/components/ui/form';
import CustomInput from '@/components/form/CustomInput';
import CustomSelect from '@/components/form/CustomSelect';
import CustomOptionsInput from '@/components/form/CustomOptionsInput';
import {
  getAddonsPaginated,
  createAddon,
  updateAddon,
  deleteAddon,
} from '@/lib/service/endpoints';
import { addonSchema, type AddonFormData } from '@/lib/schemas/addonSchema';
import PageHeader from './_components/pageHeader';
import SubmitButton from '@/components/ui/SubmitButton';
import DataTable from '@/components/ui/DataTable';
import CreateAddonDialog from './components/CreateAddonDialog';
import EditAddonDialog from './components/EditAddonDialog';
import DeleteAddonDialog from './components/DeleteAddonDialog';
import ViewAddonDialog from './components/ViewAddonDialog';

interface Addon {
  _id: string;
  title: string;
  price: number;
  options?: string[];
  inputType: 'text' | 'number' | 'radio' | 'select' | 'image';
  createdAt: string;
  updatedAt: string;
}

const AddonsPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Addon | null>(null);
  const [deletingItem, setDeletingItem] = useState<Addon | null>(null);
  const [viewingItem, setViewingItem] = useState<Addon | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: addonsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getAddons', currentPage, itemsPerPage],
    queryFn: () => getAddonsPaginated(currentPage, itemsPerPage),
  });

  const handleEdit = (item: Addon) => {
    setEditingItem(item);
  };

  const handleDelete = (item: Addon) => {
    setDeletingItem(item);
  };

  const handleView = (item: Addon) => {
    setViewingItem(item);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const addons = addonsData?.data?.data?.data || [];
  const paginatedData = addonsData?.data?.data?.pagination || {};

  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (addon: Addon) => (
        <span className="font-mono text-sm">#{addon._id}</span>
      ),
    },
    {
      key: 'title',
      label: 'Addon Title',
      render: (addon: Addon) => (
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{addon.title}</span>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (addon: Addon) => (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="font-medium">${addon.price.toFixed(2)}</span>
        </div>
      ),
    },
    {
      key: 'inputType',
      label: 'Input Type',
      render: (addon: Addon) => {
        const getInputTypeColor = (type: string) => {
          switch (type) {
            case 'text':
              return 'bg-blue-500';
            case 'number':
              return 'bg-green-500';
            case 'radio':
              return 'bg-purple-500';
            case 'select':
              return 'bg-orange-500';
            case 'image':
              return 'bg-pink-500';
            default:
              return 'bg-gray-500';
          }
        };

        return (
          <Badge className={`${getInputTypeColor(addon.inputType)} text-white`}>
            {addon.inputType.charAt(0).toUpperCase() + addon.inputType.slice(1)}
          </Badge>
        );
      },
    },
    {
      key: 'options',
      label: 'Options',
      render: (addon: Addon) => (
        <div>
          {addon.options && addon.options.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {addon.options.slice(0, 2).map((option, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {option}
                </Badge>
              ))}
              {addon.options.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{addon.options.length - 2} more
                </Badge>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground text-sm">No options</span>
          )}
        </div>
      ),
    },

    {
      key: 'actions',
      label: 'Actions',
      render: (addon: Addon) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(addon)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(addon)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(addon)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const exportData = {
    filename: 'addons.csv',
    headers: ['ID', 'Title', 'Price', 'Input Type', 'Options Count'],
    getRowData: (addon: Addon) => [
      addon._id,
      addon.title,
      addon.price.toFixed(2),
      addon.inputType,
      addon.options ? addon.options.length.toString() : '0',
      new Date(addon.createdAt).toLocaleDateString(),
    ],
  };

  const emptyState = {
    icon: <Package className="h-12 w-12 text-muted-foreground" />,
    title: 'No addons found',
    description: 'Get started by adding your first addon.',
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <PageHeader
          title="Addons Management"
          description="Manage addons and their settings"
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Failed to load addons. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title="Addons Management"
        description="Manage addons and their settings"
      />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Addons</h2>
          <p className="text-muted-foreground">
            Manage addons and their pricing options
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Addon
        </Button>
      </div>

      <DataTable
        title="Addons"
        description={`${addons.length} total addons`}
        data={addons}
        columns={columns}
        exportData={exportData}
        loading={isLoading}
        emptyState={emptyState}
        refetch={() => window.location.reload()}
        pagination={{
          currentPage: paginatedData.currentPage,
          totalPages: paginatedData.totalPages,
          totalItems: paginatedData.totalItems,
          itemsPerPage: paginatedData.itemsPerPage,
          onPageChange: handlePageChange,
          onItemsPerPageChange: handleItemsPerPageChange,
        }}
      />

      {/* Dialog Components */}
      <CreateAddonDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
      <EditAddonDialog
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        addon={editingItem}
      />
      <DeleteAddonDialog
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        addon={deletingItem}
      />
      <ViewAddonDialog
        isOpen={!!viewingItem}
        onClose={() => setViewingItem(null)}
        addon={viewingItem}
      />
    </div>
  );
};

export default AddonsPage;

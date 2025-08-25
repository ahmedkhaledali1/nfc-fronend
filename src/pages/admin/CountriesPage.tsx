import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Globe, MapPin } from 'lucide-react';
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
import CustomSwitch from '@/components/form/CustomSwitch';
import {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from '@/lib/service/endpoints';
import {
  countrySchema,
  type CountryFormData,
} from '@/lib/schemas/countrySchema';
import PageHeader from './_components/pageHeader';
import SubmitButton from '@/components/ui/SubmitButton';
import DataTable from '@/components/ui/DataTable';

interface Country {
  _id: string;
  name: string;
  code: string;
  isActive: boolean;
  displayOrder: number;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  citiesCount?: number;
}

const CountriesPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Country | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const queryClient = useQueryClient();

  const form = useForm<CountryFormData>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      name: '',
      code: '',
      isActive: true,
      displayOrder: 0,
    },
  });

  const {
    data: countriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getCountries', currentPage, itemsPerPage],
    queryFn: () => getCountries(currentPage, itemsPerPage),
  });

  const createMutation = useMutation({
    mutationFn: createCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCountries'] });
      toast.success('Country created successfully');
      setIsCreateDialogOpen(false);
      form.reset({
        name: '',
        code: '',
        isActive: true,
        displayOrder: 0,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CountryFormData }) =>
      updateCountry(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCountries'] });
      toast.success('Country updated successfully');
      setEditingItem(null);
      form.reset({
        name: '',
        code: '',
        isActive: true,
        displayOrder: 0,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCountries'] });
      toast.success('Country deleted successfully');
    },
  });

  const onSubmit = (data: CountryFormData) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem._id, data });
    } else {
      createMutation.mutate(data as any);
    }
  };

  const handleEdit = (item: Country) => {
    setEditingItem(item);
    form.reset({
      name: item.name || '',
      code: item.code || '',
      isActive: item.isActive ?? true,
      displayOrder: item.displayOrder,
    });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setEditingItem(null);
    form.reset({
      name: '',
      code: '',
      isActive: true,
      displayOrder: 0,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const countries = countriesData?.data?.data?.data || [];
  const paginatedData = countriesData?.data?.data?.pagination || {};

  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (country: Country) => (
        <span className="font-mono text-sm">#{country._id}</span>
      ),
    },
    {
      key: 'name',
      label: 'Country Name',
      render: (country: Country) => (
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{country.name}</span>
        </div>
      ),
    },
    {
      key: 'code',
      label: 'Country Code',
      render: (country: Country) => (
        <Badge variant="outline" className="text-xs">
          {country.code}
        </Badge>
      ),
    },
    {
      key: 'displayOrder',
      label: 'Display Order',
      render: (country: Country) => (
        <Badge variant="outline" className="text-xs">
          {country.displayOrder}
        </Badge>
      ),
    },

    {
      key: 'status',
      label: 'Status',
      render: (country: Country) => (
        <Badge
          variant={country.isActive ? 'default' : 'secondary'}
          className={country.isActive ? 'bg-green-500' : ''}
        >
          {country.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created Date',
      render: (country: Country) => (
        <div>
          <div className="font-medium">
            {new Date(country.createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date(country.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (country: Country) => (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(country)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Country</DialogTitle>
                <DialogDescription>
                  Update the country information.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <CustomInput
                    name="name"
                    label="Country Name"
                    placeholder="Jordan"
                    required={true}
                    type="text"
                  />
                  <CustomInput
                    name="code"
                    label="Country Code"
                    placeholder="JO"
                    required={true}
                    type="text"
                  />
                  <CustomInput
                    name="displayOrder"
                    label="Display Order"
                    placeholder="0"
                    required={false}
                    type="number"
                  />
                  <CustomSwitch
                    name="isActive"
                    label="Active"
                    required={false}
                  />
                  <DialogFooter className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditingItem(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={updateMutation.isPending}>
                      {updateMutation.isPending ? 'Updating...' : 'Update'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  country "{country.name}" and all its associated cities.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(country._id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  const exportData = {
    filename: 'countries.csv',
    headers: [
      'ID',
      'Country Name',
      'Country Code',
      'Display Order',
      'Cities Count',
      'Status',
      'Created Date',
    ],
    getRowData: (country: Country) => [
      country._id,
      country.name,
      country.code,
      country.displayOrder.toString(),
      country.citiesCount !== undefined
        ? country.citiesCount.toString()
        : 'N/A',
      country.isActive ? 'Active' : 'Inactive',
      new Date(country.createdAt).toLocaleDateString(),
    ],
  };

  const emptyState = {
    icon: <Globe className="h-12 w-12 text-muted-foreground" />,
    title: 'No countries found',
    description: 'Get started by adding your first country.',
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <PageHeader
          title="Countries Management"
          description="Manage countries and their settings"
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Failed to load countries. Please try again.
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
        title="Countries Management"
        description="Manage countries and their settings"
      />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Countries</h2>
          <p className="text-muted-foreground">
            Manage countries and their display settings
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                form.reset({
                  name: '',
                  code: '',
                  isActive: true,
                  displayOrder: 0,
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Country
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Country</DialogTitle>
              <DialogDescription>
                Add a new country to your system.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <CustomInput
                  name="name"
                  label="Country Name"
                  placeholder="Jordan"
                  required={true}
                  type="text"
                />
                <CustomInput
                  name="code"
                  label="Country Code"
                  placeholder="JO"
                  required={true}
                  type="text"
                />
                <CustomInput
                  name="displayOrder"
                  label="Display Order"
                  placeholder="0"
                  required={false}
                  type="number"
                />
                <CustomSwitch name="isActive" label="Active" required={false} />
                <DialogFooter className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                  >
                    Cancel
                  </Button>
                  <SubmitButton disabled={createMutation.isPending}>
                    {createMutation.isPending ? 'Creating...' : 'Create'}
                  </SubmitButton>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        title="Countries"
        description={`${countries.length} total countries`}
        data={countries}
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
    </div>
  );
};

export default CountriesPage;

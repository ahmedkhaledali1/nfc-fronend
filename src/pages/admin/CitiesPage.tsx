import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, MapPin, DollarSign } from 'lucide-react';
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
import CustomSwitch from '@/components/form/CustomSwitch';
import {
  getCities,
  getCountries,
  createCity,
  updateCity,
  deleteCity,
} from '@/lib/service/endpoints';
import { citySchema, type CityFormData } from '@/lib/schemas/citySchema';
import PageHeader from './_components/pageHeader';
import SubmitButton from '@/components/ui/SubmitButton';
import DataTable from '@/components/ui/DataTable';

interface City {
  _id: string;
  name: string;
  country: {
    _id: string;
    name: string;
    code: string;
  };
  deliveryFee: number;
  isActive: boolean;
  displayOrder: number;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const CitiesPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<City | null>(null);

  const queryClient = useQueryClient();

  const form = useForm<CityFormData>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      name: '',
      country: '',
      deliveryFee: 0,
      isActive: true,
      displayOrder: 0,
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const {
    data: citiesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['getCities', currentPage, itemsPerPage],
    queryFn: () => getCities(currentPage, itemsPerPage),
  });

  const paginatedData = citiesData?.data?.data?.pagination || {};
  const { data: countriesData } = useQuery({
    queryKey: ['getCountries'],
    queryFn: () => getCountries(1, 1000),
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  const createMutation = useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCities'] });
      toast.success('City created successfully');
      setIsCreateDialogOpen(false);
      form.reset({
        name: '',
        country: '',
        deliveryFee: 0,
        isActive: true,
        displayOrder: 0,
      } as CityFormData);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CityFormData }) =>
      updateCity(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCities'] });
      toast.success('City updated successfully');
      setEditingItem(null);
      form.reset({
        name: '',
        country: '',
        deliveryFee: 0,
        isActive: true,
        displayOrder: 0,
      } as CityFormData);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCities'] });
      toast.success('City deleted successfully');
    },
  });

  const onSubmit = (data: CityFormData) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem._id, data });
    } else {
      createMutation.mutate(data as any);
    }
  };

  const handleEdit = (item: City) => {
    setEditingItem(item);
    form.reset({
      name: item.name || '',
      country: item.country._id || '',
      deliveryFee: item.deliveryFee,
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
      country: '',
      deliveryFee: 0,
      isActive: true,
      displayOrder: 0,
    } as CityFormData);
  };

  const cities = citiesData?.data?.data?.data || [];
  const countries = countriesData?.data?.data?.data || [];

  const countryOptions = countries.map((country: any) => ({
    value: country._id || country.id,
    label: `${country.name} (${country.code})`,
  }));

  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (city: City) => (
        <span className="font-mono text-sm">#{city._id}</span>
      ),
    },
    {
      key: 'name',
      label: 'City Name',
      render: (city: City) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{city.name}</span>
        </div>
      ),
    },
    {
      key: 'country',
      label: 'Country',
      render: (city: City) => (
        <Badge variant="outline" className="text-xs">
          {city.country.name} ({city.country.code})
        </Badge>
      ),
    },
    {
      key: 'deliveryFee',
      label: 'Delivery Fee',
      render: (city: City) => (
        <div className="flex items-center gap-1">
          <span className="font-medium">JOD {city.deliveryFee}</span>
        </div>
      ),
    },
    {
      key: 'displayOrder',
      label: 'Display Order',
      render: (city: City) => (
        <Badge variant="outline" className="text-xs">
          {city.displayOrder}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (city: City) => (
        <Badge
          variant={city.isActive ? 'default' : 'secondary'}
          className={city.isActive ? 'bg-green-500' : ''}
        >
          {city.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created Date',
      render: (city: City) => (
        <div>
          <div className="font-medium">
            {new Date(city.createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date(city.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (city: City) => (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(city)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit City</DialogTitle>
                <DialogDescription>
                  Update the city information.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <CustomInput
                    name="name"
                    label="City Name"
                    placeholder="Amman"
                    required={true}
                    type="text"
                  />
                  <CustomSelect
                    name="country"
                    label="Country"
                    required={true}
                    options={countryOptions}
                    placeholder="Select country"
                  />
                  <CustomInput
                    name="deliveryFee"
                    label="Delivery Fee"
                    placeholder="5.00"
                    required={true}
                    type="number"
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
                  city "{city.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(city._id)}
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
    filename: 'cities.csv',
    headers: [
      'ID',
      'City Name',
      'Country',
      'Delivery Fee',
      'Display Order',
      'Status',
      'Created Date',
    ],
    getRowData: (city: City) => [
      city._id,
      city.name,
      `${city.country.name} (${city.country.code})`,
      `$${city.deliveryFee}`,
      city.displayOrder.toString(),
      city.isActive ? 'Active' : 'Inactive',
      new Date(city.createdAt).toLocaleDateString(),
    ],
  };

  const emptyState = {
    icon: <MapPin className="h-12 w-12 text-muted-foreground" />,
    title: 'No cities found',
    description: 'Get started by adding your first city.',
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <PageHeader
          title="Cities Management"
          description="Manage cities and their delivery fees"
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Failed to load cities. Please try again.
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
        title="Cities Management"
        description="Manage cities and their delivery fees"
      />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Cities</h2>
          <p className="text-muted-foreground">
            Manage cities and their delivery settings
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                form.reset({
                  name: '',
                  country: '',
                  deliveryFee: 0,
                  isActive: true,
                  displayOrder: 0,
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add City
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add City</DialogTitle>
              <DialogDescription>
                Add a new city to your system.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <CustomInput
                  name="name"
                  label="City Name"
                  placeholder="Amman"
                  required={true}
                  type="text"
                />
                <CustomSelect
                  name="country"
                  label="Country"
                  required={true}
                  options={countryOptions}
                  placeholder="Select country"
                />
                <CustomInput
                  name="deliveryFee"
                  label="Delivery Fee"
                  placeholder="5.00"
                  required={true}
                  type="number"
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
        title="Cities"
        description={`${cities.length} total cities`}
        data={cities}
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
    </div>
  );
};

export default CitiesPage;

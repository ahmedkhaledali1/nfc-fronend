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

  const {
    data: citiesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getCities'],
    queryFn: () => getCities(),
  });

  const { data: countriesData } = useQuery({
    queryKey: ['getCountries'],
    queryFn: () => getCountries(),
  });

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
    onError: (error) => {
      toast.error('Failed to create city');
      console.error('Create error:', error);
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
    onError: (error) => {
      toast.error('Failed to update city');
      console.error('Update error:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCities'] });
      toast.success('City deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete city');
      console.error('Delete error:', error);
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

  return (
    <div className="p-6 !w-full">
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

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">
              Failed to load cities. Please try again.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && cities.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No cities found
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first city.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add City
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && cities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((item: City) => (
            <Card key={item._id} className="card-premium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </div>
                  <Badge
                    variant={item.isActive ? 'default' : 'secondary'}
                    className={item.isActive ? 'bg-green-500' : ''}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {item.country.name} ({item.country.code})
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Order: {item.displayOrder}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs bg-green-100 text-green-800"
                      >
                        <DollarSign className="w-3 h-3 mr-1" />$
                        {item.deliveryFee}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
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
                              <Button
                                type="submit"
                                disabled={updateMutation.isPending}
                              >
                                {updateMutation.isPending
                                  ? 'Updating...'
                                  : 'Update'}
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the city.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitiesPage;

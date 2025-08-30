import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, ExternalLink, Globe } from 'lucide-react';
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
import CustomSelect from '@/components/form/CustomSelect';
import CustomInput from '@/components/form/CustomInput';
import CustomSwitch from '@/components/form/CustomSwitch';
import {
  getSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} from '@/lib/service/endpoints';
import {
  socialMediaSchema,
  type SocialMediaFormData,
} from '@/lib/schemas/socialMediaSchema';
import PageHeader from './_components/pageHeader';
import SubmitButton from '@/components/ui/SubmitButton';

interface SocialMedia {
  _id: string;
  platform: string;
  url: string;
  isActive: boolean;
  displayOrder: number;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  platformDisplayName: string;
  platformIcon: string;
  platformData: {
    [key: string]: {
      verified: boolean;
    };
  };
  id: string;
}

const SocialMediaPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialMedia | null>(null);

  const queryClient = useQueryClient();

  const form = useForm<SocialMediaFormData>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      platform: '',
      url: '',
      isActive: true,
      displayOrder: 0,
    },
  });

  console.log('form.formState.errors...', form.formState.errors);
  const {
    data: socialMediaData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getSocialMedia'],
    queryFn: () => getSocialMedia(),
  });

  // console.log('socialMediaData/..', socialMediaData);

  const createMutation = useMutation({
    mutationFn: createSocialMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getSocialMedia'] });
      toast.success('Social media link created successfully');
      setIsCreateDialogOpen(false);
      form.reset({
        platform: '',
        url: '',
        isActive: true,
        displayOrder: 0,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SocialMediaFormData }) =>
      updateSocialMedia(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getSocialMedia'] });
      toast.success('Social media link updated successfully');
      setEditingItem(null);
      form.reset({
        platform: '',
        url: '',
        isActive: true,
        displayOrder: 0,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSocialMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getSocialMedia'] });
      toast.success('Social media link deleted successfully');
    },
  });

  const onSubmit = (data: SocialMediaFormData) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem._id, data });
    } else {
      createMutation.mutate(data as any);
    }
  };

  const handleEdit = (item: SocialMedia) => {
    setEditingItem(item);
    form.reset({
      platform: item.platform || '',
      url: item.url || '',
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
      platform: '',
      url: '',
      isActive: true,
      displayOrder: 0,
    });
  };

  const getPlatformIcon = (platformIcon: string) => {
    const platformLower = platformIcon.toLowerCase();
    switch (platformLower) {
      case 'facebook':
        return '📘';
      case 'instagram':
        return '📷';
      case 'whatsapp':
        return '💬';
      case 'linkedin':
        return '💼';
      case 'twitter':
        return '🐦';
      case 'youtube':
        return '📺';
      case 'tiktok':
        return '🎵';
      case 'snapchat':
        return '👻';
      default:
        return '🌐';
    }
  };

  const getPlatformColor = (platformIcon: string) => {
    const platformLower = platformIcon.toLowerCase();
    switch (platformLower) {
      case 'facebook':
        return 'bg-blue-500';
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'whatsapp':
        return 'bg-green-500';
      case 'linkedin':
        return 'bg-blue-600';
      case 'twitter':
        return 'bg-blue-400';
      case 'youtube':
        return 'bg-red-500';
      case 'tiktok':
        return 'bg-black';
      case 'snapchat':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-500';
    }
  };

  const platformOptions = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'linkedin', label: 'LinkedIn' },
  ];

  const socialMediaItems = socialMediaData?.data?.data?.data || [];

  return (
    <div className="p-6 !w-full">
      <PageHeader
        title="Social Media Management"
        description="Manage your social media links and platforms"
      />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Social Media Links</h2>
          <p className="text-muted-foreground">
            Manage your social media presence across different platforms
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                form.reset({
                  platform: '',
                  url: '',
                  isActive: true,
                  displayOrder: 0,
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Social Media
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Social Media Link</DialogTitle>
              <DialogDescription>
                Add a new social media platform link to your profile.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <CustomSelect
                  name="platform"
                  label="Platform"
                  required={true}
                  options={platformOptions}
                  placeholder="Select platform"
                />
                <CustomInput
                  name="url"
                  label="URL"
                  placeholder="https://example.com"
                  required={true}
                  type="url"
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
              Failed to load social media links. Please try again.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && socialMediaItems.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <Globe className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No social media links
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first social media platform link.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Social Media
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && socialMediaItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialMediaItems.map((item: SocialMedia) => (
            <Card key={item._id} className="card-premium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {getPlatformIcon(item.platformIcon)}
                    </span>
                    <CardTitle className="text-lg">
                      {item.platformDisplayName}
                    </CardTitle>
                  </div>
                  <Badge
                    variant={item.isActive ? 'default' : 'secondary'}
                    className={
                      item.isActive ? getPlatformColor(item.platformIcon) : ''
                    }
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">URL</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 break-all flex items-center"
                    >
                      {item.url}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Order: {item.displayOrder}
                      </Badge>
                      {item.platformData[item.platform]?.verified && (
                        <Badge
                          variant="default"
                          className="bg-green-500 text-xs"
                        >
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Dialog
                      open={!!editingItem}
                      onOpenChange={() =>
                        editingItem ? setEditingItem(null) : null
                      }
                    >
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
                          <DialogTitle>Edit Social Media Link</DialogTitle>
                          <DialogDescription>
                            Update the social media platform link.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                          >
                            <CustomSelect
                              name="platform"
                              label="Platform"
                              required={true}
                              options={platformOptions}
                              placeholder="Select platform"
                            />
                            <CustomInput
                              name="url"
                              label="URL"
                              placeholder="https://example.com"
                              required={true}
                              type="url"
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
                              <SubmitButton disabled={updateMutation.isPending}>
                                {updateMutation.isPending
                                  ? 'Updating...'
                                  : 'Update'}
                              </SubmitButton>
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
                            delete the social media link.
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

export default SocialMediaPage;

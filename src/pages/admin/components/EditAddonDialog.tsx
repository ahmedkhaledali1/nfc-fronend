import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomInput from '@/components/form/CustomInput';
import CustomSelect from '@/components/form/CustomSelect';
import CustomOptionsInput from '@/components/form/CustomOptionsInput';
import { updateAddon } from '@/lib/service/endpoints';
import { addonSchema, type AddonFormData } from '@/lib/schemas/addonSchema';
import SubmitButton from '@/components/ui/SubmitButton';

interface Addon {
  _id: string;
  title: string;
  price: number;
  options?: string[];
  inputType: 'text' | 'number' | 'radio' | 'select' | 'image';
  createdAt: string;
  updatedAt: string;
}

interface EditAddonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  addon: Addon | null;
}

const EditAddonDialog = ({ isOpen, onClose, addon }: EditAddonDialogProps) => {
  const queryClient = useQueryClient();

  const form = useForm<AddonFormData>({
    resolver: zodResolver(addonSchema),
    defaultValues: {
      title: '',
      price: 0,
      options: [],
      inputType: 'text',
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddonFormData }) =>
      updateAddon(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAddons'] });
      toast.success('Addon updated successfully');
      onClose();
      form.reset({
        title: '',
        price: 0,
        options: [],
        inputType: 'text',
      });
    },
  });

  const onSubmit = (data: AddonFormData) => {
    if (addon) {
      updateMutation.mutate({ id: addon._id, data });
    }
  };

  const handleClose = () => {
    onClose();
    form.reset({
      title: '',
      price: 0,
      options: [],
      inputType: 'text',
    });
  };

  // Reset form when addon changes
  useEffect(() => {
    if (addon) {
      form.reset({
        title: addon.title || '',
        price: addon.price || 0,
        options: addon.options || [],
        inputType: addon.inputType || 'text',
      });
    }
  }, [addon, form]);

  const inputTypeOptions = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number Input' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'select', label: 'Dropdown Select' },
    { value: 'image', label: 'Image Upload' },
  ];

  if (!addon) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Addon</DialogTitle>
          <DialogDescription>Update the addon information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomInput
              name="title"
              label="Addon Title"
              placeholder="Extra Toppings"
              required={true}
              type="text"
            />
            <CustomInput
              name="price"
              label="Price"
              placeholder="5.99"
              required={true}
              type="number"
            />
            <CustomSelect
              name="inputType"
              label="Input Type"
              required={true}
              options={inputTypeOptions}
              placeholder="Select input type"
            />
            <CustomOptionsInput
              name="options"
              label="Options"
              required={false}
              placeholder="Enter option value"
            />
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <SubmitButton disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Updating...' : 'Update'}
              </SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddonDialog;

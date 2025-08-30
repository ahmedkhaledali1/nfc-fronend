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
import { createAddon } from '@/lib/service/endpoints';
import { addonSchema, type AddonFormData } from '@/lib/schemas/addonSchema';
import SubmitButton from '@/components/ui/SubmitButton';

interface CreateAddonDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAddonDialog = ({ isOpen, onClose }: CreateAddonDialogProps) => {
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

  const createMutation = useMutation({
    mutationFn: createAddon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAddons'] });
      toast.success('Addon created successfully');
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
    createMutation.mutate(data as any);
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

  const inputTypeOptions = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number Input' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'select', label: 'Dropdown Select' },
    { value: 'image', label: 'Image Upload' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Addon</DialogTitle>
          <DialogDescription>Add a new addon to your system.</DialogDescription>
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
            {form.watch('inputType') === 'select' ||
              (form.watch('inputType') === 'radio' && (
                <CustomOptionsInput
                  name="options"
                  label="Options"
                  required={false}
                  placeholder="Enter option value"
                />
              ))}
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={handleClose}>
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
  );
};

export default CreateAddonDialog;

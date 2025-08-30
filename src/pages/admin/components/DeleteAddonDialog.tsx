import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteAddon } from '@/lib/service/endpoints';

interface Addon {
  _id: string;
  title: string;
  price: number;
  options?: string[];
  inputType: 'text' | 'number' | 'radio' | 'select' | 'image';
  createdAt: string;
  updatedAt: string;
}

interface DeleteAddonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  addon: Addon | null;
}

const DeleteAddonDialog = ({
  isOpen,
  onClose,
  addon,
}: DeleteAddonDialogProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteAddon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAddons'] });
      toast.success('Addon deleted successfully');
      onClose();
    },
  });

  const handleDelete = () => {
    if (addon) {
      deleteMutation.mutate(addon._id);
    }
  };

  if (!addon) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the addon
            "{addon.title}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAddonDialog;

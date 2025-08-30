import { Package, DollarSign, Calendar, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Addon {
  _id: string;
  title: string;
  price: number;
  options?: string[];
  inputType: 'text' | 'number' | 'radio' | 'select' | 'image';
  createdAt: string;
  updatedAt: string;
}

interface ViewAddonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  addon: Addon | null;
}

const ViewAddonDialog = ({ isOpen, onClose, addon }: ViewAddonDialogProps) => {
  if (!addon) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Addon Details</DialogTitle>
          <DialogDescription>
            View detailed information about the addon.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Title
                  </label>
                  <p className="text-lg font-semibold">{addon.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Price
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <p className="text-lg font-semibold">
                      ${addon.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Input Type
                </label>
                <div className="mt-1">
                  <Badge
                    className={`${getInputTypeColor(
                      addon.inputType
                    )} text-white`}
                  >
                    {addon.inputType.charAt(0).toUpperCase() +
                      addon.inputType.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent>
              {addon.options && addon.options.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {addon.options.map((option, index) => (
                    <Badge key={index} variant="outline">
                      {option}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No options configured</p>
              )}
            </CardContent>
          </Card>

          {/* ID Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Addon ID
                </label>
                <p className="font-mono text-sm bg-muted p-2 rounded mt-1">
                  {addon._id}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAddonDialog;

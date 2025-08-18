import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBulkOrder } from '@/lib/service/endpoints';
import { Building, Users, Calendar, MessageSquare } from 'lucide-react';
import SubmitButton from '@/components/ui/SubmitButton';

interface EditBulkOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onUpdate?: () => void;
}

const EditBulkOrderDialog = ({
  isOpen,
  onClose,
  order,
  onUpdate,
}: EditBulkOrderDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    status: '',
    companyInfo: {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
    },
    orderDetails: {
      employeeCount: 0,
      message: '',
    },
    customPricing: {
      isCustom: false,
      price: 0,
    },
    customerResponse: {
      approved: false,
    },
    estimatedDelivery: '',
  });

  useEffect(() => {
    if (order) {
      setFormData({
        status: order.status || '',
        companyInfo: {
          companyName: order.companyInfo.companyName || '',
          contactPerson: order.companyInfo.contactPerson || '',
          email: order.companyInfo.email || '',
          phone: order.companyInfo.phone || '',
        },
        orderDetails: {
          employeeCount: order.orderDetails.employeeCount || 0,
          message: order.orderDetails.message || '',
        },
        customPricing: {
          isCustom: order.customPricing?.isCustom || false,
          price: order.customPricing?.price || 0,
        },
        customerResponse: {
          approved: order.customerResponse?.approved || false,
        },
        estimatedDelivery: order.estimatedDelivery || '',
      });
    }
  }, [order]);

  const { mutate: updateBulkOrderMutation, isPending: isUpdating } =
    useMutation({
      mutationFn: (data: any) => updateBulkOrder(order._id, data),
      onSuccess: () => {
        toast({
          title: 'Order Updated',
          description: 'The bulk order has been updated successfully.',
        });
        queryClient.invalidateQueries({ queryKey: ['getBulkOrders'] });
        onUpdate?.();
        onClose();
      },
      onError: (error: any) => {
        console.error('Update error:', error);
        toast({
          title: 'Update Failed',
          description:
            error?.response?.data?.message || 'Failed to update bulk order.',
          variant: 'destructive',
        });
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBulkOrderMutation(formData);
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
    section?: string
  ) => {
    setFormData((prev) => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...(prev[section as keyof typeof prev] as any),
            [field]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Edit Bulk Order
          </DialogTitle>
          <DialogDescription>Update bulk order information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Section */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">
                  <Badge variant="secondary">Pending</Badge>
                </SelectItem>
                <SelectItem value="quoted">
                  <Badge variant="destructive">Quoted</Badge>
                </SelectItem>
                <SelectItem value="reviewing">
                  <Badge variant="outline">Reviewing</Badge>
                </SelectItem>
                <SelectItem value="approved">
                  <Badge variant="default">Approved</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyInfo.companyName}
                  onChange={(e) =>
                    handleInputChange(
                      'companyName',
                      e.target.value,
                      'companyInfo'
                    )
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={formData.companyInfo.contactPerson}
                  onChange={(e) =>
                    handleInputChange(
                      'contactPerson',
                      e.target.value,
                      'companyInfo'
                    )
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.companyInfo.email}
                  onChange={(e) =>
                    handleInputChange('email', e.target.value, 'companyInfo')
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.companyInfo.phone}
                  onChange={(e) =>
                    handleInputChange('phone', e.target.value, 'companyInfo')
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" />
              Order Details
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Number of Employees</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  value={formData.orderDetails.employeeCount}
                  onChange={(e) =>
                    handleInputChange(
                      'employeeCount',
                      parseInt(e.target.value),
                      'orderDetails'
                    )
                  }
                  required
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.orderDetails.message}
                  onChange={(e) =>
                    handleInputChange('message', e.target.value, 'orderDetails')
                  }
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Custom Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Custom Pricing</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isCustom"
                  checked={formData.customPricing.isCustom}
                  onChange={(e) =>
                    handleInputChange(
                      'isCustom',
                      e.target.checked,
                      'customPricing'
                    )
                  }
                  className="h-4 w-4"
                />
                <Label htmlFor="isCustom">Custom Pricing</Label>
              </div>
              {formData.customPricing.isCustom && (
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Card (JOD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.customPricing.price}
                    onChange={(e) =>
                      handleInputChange(
                        'price',
                        parseFloat(e.target.value),
                        'customPricing'
                      )
                    }
                    step="0.01"
                    min={0}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="space-y-2">
            <Label htmlFor="estimatedDelivery">Estimated Delivery Date</Label>
            <Input
              id="estimatedDelivery"
              type="date"
              value={formData.estimatedDelivery.split('T')[0]}
              onChange={(e) =>
                handleInputChange('estimatedDelivery', e.target.value)
              }
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <SubmitButton disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Order'}
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBulkOrderDialog;

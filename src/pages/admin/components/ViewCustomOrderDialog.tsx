import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Building,
  Users,
  Calendar,
  MessageSquare,
  Mail,
  Phone,
  Check,
  X,
  DollarSign,
} from 'lucide-react';

interface ViewCustomOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: any; // The bulk order to view
}

const ViewCustomOrderDialog = ({
  isOpen,
  onClose,
  order,
}: ViewCustomOrderDialogProps) => {
  if (!order) return null;

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      quoted: 'destructive',
      reviewing: 'outline',
      approved: 'default',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Building className="h-6 w-6" />
            View Bulk Order
            <span className="text-muted-foreground font-mono text-lg">
              #{order._id.slice(-8)}
            </span>
          </DialogTitle>
          <DialogDescription>
            Bulk order details and information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Information Header */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Status:
                </span>
                <div className="mt-1">{getStatusBadge(order.status)}</div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Created:
                </span>
                <div className="mt-1 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Updated:
                </span>
                <div className="mt-1 text-sm">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Company Name
                  </label>
                  <p className="text-lg font-semibold">
                    {order.companyInfo?.companyName || 'N/A'}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Contact Person
                  </label>
                  <p className="text-base">
                    {order.companyInfo?.contactPerson || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-base">
                      {order.companyInfo?.email ? (
                        <a
                          href={`mailto:${order.companyInfo.email}`}
                          className="text-primary hover:underline"
                        >
                          {order.companyInfo.email}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-base">
                      {order.companyInfo?.phone ? (
                        <a
                          href={`tel:${order.companyInfo.phone}`}
                          className="text-primary hover:underline"
                        >
                          {order.companyInfo.phone}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Order Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Number of Employees
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="w-5 h-5 text-primary" />
                  <p className="text-2xl font-bold text-primary">
                    {order.orderDetails?.employeeCount || 0}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Estimated Delivery
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <p className="text-base">
                    {order.estimatedDelivery
                      ? new Date(order.estimatedDelivery).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {order.orderDetails?.message && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Message
                </label>
                <div className="flex items-start gap-2 mt-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground mt-1" />
                  <div className="bg-muted/50 rounded-lg p-3 flex-1">
                    <p className="text-sm whitespace-pre-wrap">
                      {order.orderDetails.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Custom Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Pricing Type
                </label>
                <div className="flex items-center gap-2 mt-1">
                  {order.customPricing?.isCustom ? (
                    <>
                      <Badge
                        variant="default"
                        className="flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Custom Pricing
                      </Badge>
                    </>
                  ) : (
                    <Badge variant="secondary">Standard Pricing</Badge>
                  )}
                </div>
              </div>

              {order.customPricing?.isCustom && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Custom Price per Card
                  </label>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {order.customPricing.price} JOD
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Customer Response */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Response</h3>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Approval Status
              </label>
              <div className="flex items-center gap-2 mt-1">
                {order.customerResponse?.approved ? (
                  <>
                    <Badge
                      variant="default"
                      className="flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Approved
                    </Badge>
                  </>
                ) : (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Pending Approval
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Cards:</span>
                <span className="ml-2 font-semibold">
                  {order.orderDetails?.employeeCount || 0}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Pricing:</span>
                <span className="ml-2 font-semibold">
                  {order.customPricing?.isCustom ? 'Custom' : 'Standard'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2 font-semibold capitalize">
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} className="btn-hero">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCustomOrderDialog;

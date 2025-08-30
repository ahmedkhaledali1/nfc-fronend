import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowRight,
  ArrowLeft,
  User,
  Palette,
  MapPin,
  CreditCard as Payment,
  ClipboardList,
  Check,
  Mail,
  Phone,
  Building,
  Globe,
  Package,
  DollarSign,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ViewOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: any; // The order to view
}

const ViewOrderDialog = ({ isOpen, onClose, order }: ViewOrderDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const steps = [
    {
      number: 1,
      title: 'Personal Details',
      description: 'Contact information',
      icon: User,
    },
    {
      number: 2,
      title: 'Card Design',
      description: 'Card customization',
      icon: Palette,
    },
    {
      number: 3,
      title: 'Delivery Info',
      description: 'Shipping details',
      icon: MapPin,
    },
    {
      number: 4,
      title: 'Add-ons',
      description: 'Additional features',
      icon: Package,
    },
    {
      number: 5,
      title: 'Payment Method',
      description: 'Payment details',
      icon: Payment,
    },
    {
      number: 6,
      title: 'Order Summary',
      description: 'Review details',
      icon: ClipboardList,
    },
  ];

  const renderPersonalDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Full Name
            </label>
            <p className="text-lg font-semibold">
              {order.customerFullName || 'N/A'}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Position
            </label>
            <p className="text-base">{order.personalInfo?.position || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Organization
            </label>
            <p className="text-base">
              {order.personalInfo?.organization || 'N/A'}
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
              <p className="text-base">{order.personalInfo?.email || 'N/A'}</p>
            </div>
          </div>
          {order.personalInfo?.businessEmail && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Business Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p className="text-base">
                  {order.personalInfo?.businessEmail || 'N/A'}
                </p>
              </div>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Phone Numbers
            </label>
            <div className="space-y-1">
              {order.personalInfo?.phoneNumbers?.map(
                (phone: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-base">{phone || 'N/A'}</p>
                  </div>
                )
              ) || <p className="text-base">N/A</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              LinkedIn URL
            </label>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <p className="text-base">
                {order.personalInfo?.linkedinUrl ? (
                  <a
                    href={order.personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {order.personalInfo.linkedinUrl}
                  </a>
                ) : (
                  'N/A'
                )}
              </p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Instagram URL
            </label>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <p className="text-base">
                {order.personalInfo?.instagramUrl ? (
                  <a
                    href={order.personalInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {order.personalInfo.instagramUrl}
                  </a>
                ) : (
                  'N/A'
                )}
              </p>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCardDesign = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Name on Card
            </label>
            <p className="text-lg font-semibold">
              {order.cardDesign?.nameOnCard || 'N/A'}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Card Color
            </label>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {order.cardDesign?.color || 'N/A'}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Include Printed Logo
            </label>
            <div className="flex items-center gap-2">
              {order.cardDesign?.includePrintedLogo ? (
                <Badge variant="default" className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Yes
                </Badge>
              ) : (
                <Badge variant="secondary">No</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {order.cardDesign?.companyLogo && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Company Logo
              </label>
              <div className="mt-2">
                <img
                  src={`${import.meta.env.VITE_BACKEND_DOMAIN}${
                    order.cardDesign.companyLogo
                  }`}
                  crossOrigin="anonymous"
                  alt="Company Logo"
                  className="max-w-32 max-h-32 object-contain border rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDeliveryInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Country
            </label>
            <p className="text-base">{order.deliveryInfo?.country || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              City
            </label>
            <p className="text-base">{order.deliveryInfo?.city || 'N/A'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Address Line 1
            </label>
            <p className="text-base">
              {order.deliveryInfo?.addressLine1 || 'N/A'}
            </p>
          </div>

          {order.deliveryInfo?.addressLine2 && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Address Line 2
              </label>
              <p className="text-base">{order.deliveryInfo.addressLine2}</p>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Postcode
            </label>
            <p className="text-base">{order.deliveryInfo?.postcode || 'N/A'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Use Same Contact
            </label>
            <div className="flex items-center gap-2">
              {order.deliveryInfo?.useSameContact ? (
                <Badge variant="default" className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Yes
                </Badge>
              ) : (
                <Badge variant="secondary">No</Badge>
              )}
            </div>
          </div>

          {!order.deliveryInfo?.useSameContact && (
            <>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Delivery Phone
                </label>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <p className="text-base">
                    {order.deliveryInfo?.deliveryPhone || 'N/A'}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Delivery Email
                </label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <p className="text-base">
                    {order.deliveryInfo?.deliveryEmail || 'N/A'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderPaymentMethod = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Payment Method
            </label>
            <Badge variant="outline" className="capitalize text-base">
              {order.paymentMethod || 'N/A'}
            </Badge>
          </div>

          {order.paymentMethod === 'online' && (
            <>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Deposite Transaction Image
                </label>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={`${import.meta.env.VITE_BACKEND_DOMAIN}${
                    order.despositeTransactionImg
                  }`}
                  crossOrigin="anonymous"
                  alt="Deposite Transaction Image"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            </>
          )}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Order Status
            </label>
            <Badge
              variant={
                order.status === 'completed'
                  ? 'default'
                  : order.status === 'pending'
                  ? 'secondary'
                  : 'outline'
              }
              className="capitalize"
            >
              {order.status || 'N/A'}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Product
            </label>
            <div className="space-y-1">
              <p className="text-base font-semibold">
                {order.product?.title || 'N/A'}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.product?.price} JOD
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Total Amount
            </label>
            <p className="text-2xl font-bold text-primary">{order.total} JOD</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddons = () => (
    <div className="space-y-6">
      {/* Selected Add-ons */}
      {order.addons && order.addons.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Selected Add-ons</h3>
          <div className="grid gap-4">
            {order.addons.map((addonItem: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-lg">
                          {addonItem.addon?.title || 'Unknown Addon'}
                        </h4>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="capitalize">
                          {addonItem.addon?.inputType || 'N/A'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-green-600">
                            {addonItem.addon?.price || 0} JOD
                          </span>
                        </div>
                      </div>

                      {addonItem.addonValue && (
                        <div className="mt-3">
                          <label className="text-sm font-medium text-muted-foreground">
                            Selected Value:
                          </label>
                          {addonItem.addon?.inputType === 'image' ? (
                            <div className="mt-2">
                              <img
                                src={`${import.meta.env.VITE_BACKEND_DOMAIN}${
                                  addonItem.addonValue
                                }`}
                                alt="Addon Image"
                                className="max-w-48 max-h-48 object-contain border rounded-lg"
                                crossOrigin="anonymous"
                              />
                            </div>
                          ) : (
                            <p className="text-base font-medium">
                              {addonItem.addonValue}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">
            No Add-ons Selected
          </h3>
          <p className="text-sm text-muted-foreground">
            This order doesn't include any additional add-ons or customizations.
          </p>
        </div>
      )}

      {/* Additional Images */}
      {order.addonImages && order.addonImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Additional Images</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {order.addonImages.map((image: string, index: number) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_DOMAIN}${image}`}
                    alt={`Additional Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                    crossOrigin="anonymous"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons Summary */}
      {order.addons && order.addons.length > 0 && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Add-ons Summary</h4>
                <p className="text-sm text-muted-foreground">
                  {order.addons.length} addon
                  {order.addons.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Total Add-ons Cost
                </p>
                <p className="text-xl font-bold text-primary">
                  {order.addons.reduce(
                    (total: number, addon: any) =>
                      total + (addon.addon?.price || 0),
                    0
                  )}{' '}
                  JOD
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderOrderSummary = () => (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-semibold mb-4">Order Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Order ID:</span>
            <span className="ml-2 font-mono">#{order._id.slice(-8)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Created:</span>
            <span className="ml-2">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Updated:</span>
            <span className="ml-2">
              {new Date(order.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-semibold">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Full Name
            </label>
            <p className="text-base">{order.customerFullName || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <p className="text-base">{order.personalInfo?.email || 'N/A'}</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-semibold">Product Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Product
            </label>
            <p className="text-base">{order.product?.title || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Card Color
            </label>
            <Badge variant="outline" className="capitalize">
              {order.cardDesign?.color || 'N/A'}
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-semibold">Delivery Address</h3>
        <p className="text-base">{order.fullAddress || 'N/A'}</p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-semibold">Payment & Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Payment Method
            </label>
            <Badge variant="outline" className="capitalize">
              {order.paymentMethod || 'N/A'}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Status
            </label>
            <Badge
              variant={
                order.status === 'completed'
                  ? 'default'
                  : order.status === 'pending'
                  ? 'secondary'
                  : 'outline'
              }
              className="capitalize"
            >
              {order.status || 'N/A'}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Total
            </label>
            <p className="text-xl font-bold text-primary">{order.total} JOD</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            View Order{' '}
            <span className="text-muted-foreground font-mono">
              #{order._id.slice(-8)}
            </span>
          </DialogTitle>
        </DialogHeader>

        <Card className="card-premium">
          <CardHeader>
            {/* Step Indicator */}
            <div className="flex justify-between mb-6">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium">{step.title}</div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <CardTitle>
              Step {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && renderPersonalDetails()}

            {/* Step 2: Card Design */}
            {currentStep === 2 && renderCardDesign()}

            {/* Step 3: Delivery & Contact Info */}
            {currentStep === 3 && renderDeliveryInfo()}

            {/* Step 4: Add-ons */}
            {currentStep === 4 && renderAddons()}

            {/* Step 5: Payment Method */}
            {currentStep === 5 && renderPaymentMethod()}

            {/* Step 6: Order Summary */}
            {currentStep === 6 && renderOrderSummary()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 6 ? (
                <Button
                  onClick={nextStep}
                  className="btn-hero flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={onClose}
                  className="btn-hero flex items-center"
                >
                  Close
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrderDialog;

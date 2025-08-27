import { useState, useEffect } from 'react';
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
  Check,
  User,
  Palette,
  MapPin,
  CreditCard as Payment,
  ClipboardList,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Step1PersosnalDet from '@/pages/order/_components/Step1PersosnalDet';
import Step4Payment from '@/pages/order/_components/Step4Payment';
import Step2CardDesign from '@/pages/order/_components/Step2CardDesign';
import Step3Delivery from '@/pages/order/_components/Step3Delivery';
import { orderFormSchema } from '@/lib/schemas/orderSchema';
import Step5Summary from '@/pages/order/_components/Step5Summary';
import { useMutation } from '@tanstack/react-query';
import SubmitButton from '@/components/ui/SubmitButton';
import { getTopLevelFields, getStepValues, validationStep } from '@/lib/utils';
import { updateOrder } from '@/lib/service/endpoints';

type OrderFormData = z.infer<typeof orderFormSchema>;

interface EditOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: any; // The order to edit
}

const EditOrderDialog = ({ isOpen, onClose, order }: EditOrderDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const { mutate: updateOrderMutation, isPending: isUpdatingOrder } =
    useMutation({
      mutationFn: (data: any) => updateOrder(data._id, data.formData),
      onSuccess: () => {
        toast({
          title: 'Order Updated',
          description: 'The order has been updated successfully.',
        });
        setCurrentStep(1);
        onClose();
      },
      onError: (error: any) => {
        console.error('Update error:', error);
        toast({
          title: 'Update Failed',
          description:
            error?.response?.data?.message ||
            'Failed to update order. Please try again.',
          variant: 'destructive',
        });
      },
    });
  // Transform order data to form structure
  const getDefaultValues = (order: any): OrderFormData => ({
    personalInfo: {
      firstName: order.customerFullName?.split(' ')[0] || '',
      lastName: order.customerFullName?.split(' ').slice(1).join(' ') || '',
      position: order.personalInfo?.position || '',
      organization: order.personalInfo?.organization || '',
      phoneNumbers: order.personalInfo?.phoneNumbers || [''],
      email: order.personalInfo?.email || '',
      linkedinUrl: order.personalInfo?.linkedinUrl || '',
    },
    cardDesign: {
      nameOnCard: order.cardDesign?.nameOnCard || '',
      companyLogo: order.cardDesign?.companyLogo || null,
      includePrintedLogo: order.cardDesign?.includePrintedLogo || false,
      color: order.cardDesign?.color || 'black',
    },
    deliveryInfo: {
      country: order.deliveryInfo?.country || '',
      city: order.deliveryInfo?.city || '',
      addressLine1: order.deliveryInfo?.addressLine1 || '',
      addressLine2: order.deliveryInfo?.addressLine2 || '',
      useSameContact: order.deliveryInfo?.useSameContact || true,
      deliveryPhone: order.deliveryInfo?.deliveryPhone || '',
      deliveryEmail: order.deliveryInfo?.deliveryEmail || '',
    },
    paymentMethod: order.paymentMethod || 'cash',
  });

  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: getDefaultValues(order),
    mode: 'onTouched',
  });

  // Update form when order changes
  useEffect(() => {
    methods.reset(getDefaultValues(order));
  }, [order, methods]);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const validateStep = (step: number): boolean => {
    const stepFields = {
      1: [
        'personalInfo.firstName',
        'personalInfo.lastName',
        'personalInfo.position',
        'personalInfo.organization',
        'personalInfo.phoneNumbers',
        'personalInfo.email',
        'personalInfo.linkedinUrl',
      ],
      2: [
        'cardDesign.nameOnCard',
        'cardDesign.color',
        'cardDesign.includePrintedLogo',
        'cardDesign.companyLogo',
      ],
      3: [
        'deliveryInfo.country',
        'deliveryInfo.city',
        'deliveryInfo.addressLine1',
        'deliveryInfo.addressLine2',
        'deliveryInfo.useSameContact',
        'deliveryInfo.deliveryPhone',
        'deliveryInfo.deliveryEmail',
      ],
      4: ['paymentMethod'],
      5: [], // Summary step doesn't need validation
    };

    const fieldNames = stepFields[step as keyof typeof stepFields] || [];
    if (fieldNames.length === 0) return true;

    const topLevelFields = getTopLevelFields(fieldNames);
    const stepSchema = orderFormSchema.pick(
      Object.fromEntries(topLevelFields.map((name) => [name, true])) as any
    );

    const allValues = methods.watch();
    const stepValues = getStepValues(fieldNames, allValues);

    const result = validationStep(stepSchema, stepValues) as {
      success: boolean;
      error?: { errors: Array<{ path: string[]; message: string }> };
    };

    if (!result.success && result.error) {
      result.error.errors.forEach((err) => {
        methods.setError(
          err.path.join('.') as keyof OrderFormData,
          { type: 'manual', message: err.message },
          { shouldFocus: true }
        );
      });
      return false;
    }

    return true;
  };

  const nextStep = async () => {
    const isValid = validateStep(currentStep);
    if (isValid) {
      if (currentStep === 1 && watch('deliveryInfo.useSameContact')) {
        setValue(
          'deliveryInfo.deliveryPhone',
          watch('personalInfo.phoneNumbers')[0] || ''
        );
        setValue('deliveryInfo.deliveryEmail', watch('personalInfo.email'));
      }
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    } else {
      toast({
        title: 'Validation Error',
        description:
          'Please check all required fields and fix any errors before continuing.',
        variant: 'destructive',
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: OrderFormData) => {
    try {
      const formData = new FormData();

      // Required: Product ID
      formData.append('product', order.product._id);

      // Step 1: Personal Information
      if (data.personalInfo) {
        formData.append(
          'personalInfo[firstName]',
          data.personalInfo.firstName || ''
        );
        formData.append(
          'personalInfo[lastName]',
          data.personalInfo.lastName || ''
        );
        formData.append(
          'personalInfo[position]',
          data.personalInfo.position || ''
        );
        formData.append(
          'personalInfo[organization]',
          data.personalInfo.organization || ''
        );

        // Handle phone numbers array
        if (data.personalInfo.phoneNumbers) {
          data.personalInfo.phoneNumbers.forEach((phone, index) => {
            formData.append(`personalInfo[phoneNumbers][${index}]`, phone);
          });
        }

        formData.append('personalInfo[email]', data.personalInfo.email || '');
        if (data.personalInfo.linkedinUrl) {
          formData.append(
            'personalInfo[linkedinUrl]',
            data.personalInfo.linkedinUrl
          );
        }
      }

      // Step 2: Card Design
      if (data.cardDesign) {
        formData.append(
          'cardDesign[nameOnCard]',
          data.cardDesign.nameOnCard || ''
        );
        formData.append('cardDesign[color]', data.cardDesign.color || 'black');
        formData.append(
          'cardDesign[includePrintedLogo]',
          (data.cardDesign.includePrintedLogo || false).toString()
        );
        if (data.cardDesign.companyLogo instanceof File) {
          formData.append('companyLogo', data.cardDesign.companyLogo);
        }
        if (typeof data.cardDesign.companyLogo === 'string') {
          formData.append(
            'cardDesign[companyLogo]',
            data.cardDesign.companyLogo
          );
        }
      }

      // Step 3: Delivery Information
      if (data.deliveryInfo) {
        formData.append(
          'deliveryInfo[country]',
          data.deliveryInfo.country || ''
        );
        formData.append('deliveryInfo[city]', data.deliveryInfo.city || '');
        formData.append(
          'deliveryInfo[addressLine1]',
          data.deliveryInfo.addressLine1 || ''
        );
        if (data.deliveryInfo.addressLine2) {
          formData.append(
            'deliveryInfo[addressLine2]',
            data.deliveryInfo.addressLine2
          );
        }
        formData.append(
          'deliveryInfo[useSameContact]',
          (data.deliveryInfo.useSameContact || false).toString()
        );
        formData.append(
          'deliveryInfo[deliveryPhone]',
          data.deliveryInfo.deliveryPhone || ''
        );
        formData.append(
          'deliveryInfo[deliveryEmail]',
          data.deliveryInfo.deliveryEmail || ''
        );
      }

      // Step 4: Payment Method
      formData.append('paymentMethod', data.paymentMethod || 'cash');

      // Log FormData entries for debugging
      console.log('FormData entries:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await updateOrderMutation({
        _id: order._id,
        formData,
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'There was an error updating the order. Please try again.',
        variant: 'destructive',
      });
    }
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
      title: 'Payment Method',
      description: 'Payment details',
      icon: Payment,
    },
    {
      number: 5,
      title: 'Order Summary',
      description: 'Review changes',
      icon: ClipboardList,
    },
  ];

  console.log('order', order);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Edit Order{' '}
            <span className="text-muted-foreground font-mono">
              #{order._id.slice(-8)}
            </span>
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Card className="card-premium">
              <CardHeader>
                {/* Step Indicator */}
                <div className="flex justify-between mb-6">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className="flex flex-col items-center"
                    >
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
                {currentStep === 1 && <Step1PersosnalDet />}

                {/* Step 2: Card Design */}
                {currentStep === 2 && (
                  <Step2CardDesign product={order.product} />
                )}

                {/* Step 3: Delivery & Contact Info */}
                {currentStep === 3 && <Step3Delivery />}

                {/* Step 4: Payment Method */}
                {currentStep === 4 && <Step4Payment />}

                {/* Step 5: Order Summary */}
                {currentStep === 5 && <Step5Summary product={order.product} />}

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

                  {currentStep < 5 ? (
                    <Button
                      onClick={() => nextStep()}
                      className="btn-hero flex items-center"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <SubmitButton disabled={isUpdatingOrder}>
                      {isUpdatingOrder ? 'Updating...' : 'Update Order'}
                      <Check className="w-4 h-4 ml-2" />
                    </SubmitButton>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderDialog;

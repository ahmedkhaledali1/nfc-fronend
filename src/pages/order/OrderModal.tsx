import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  ShoppingCart,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Step1PersosnalDet from './_components/Step1PersosnalDet';
import Step4Payment from './_components/Step4Payment';
import Step2CardDesign from './_components/Step2CardDesign';
import Step3Delivery from './_components/Step3Delivery';
import { orderFormSchema } from '@/lib/schemas/orderSchema';
import Step5Summary from './_components/Step5Summary';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/service/axios';
import SubmitButton from '@/components/ui/SubmitButton';
import { getTopLevelFields, getStepValues, validationStep } from '@/lib/utils';
import { PosOrder } from '@/lib/service/endpoints';
import Step4Addons from './_components/Step4Addons';

type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: string;
  product: any;
}

const OrderModal = ({
  isOpen,
  onClose,
  selectedColor,
  product,
}: OrderModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const defaultValues = {
    personalInfo: {
      firstName: '',
      lastName: '',
      position: '',
      organization: '',
      phoneNumbers: [''],
      email: '',
      linkedinUrl: '',
      personalPicture: null,
    },
    cardDesign: {
      nameOnCard: '',
      companyLogo: null,
      includePrintedLogo: false,
      color: 'black',
    },
    addons: [],
    addonImages: [],
    deliveryInfo: {
      country: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      useSameContact: true,
      deliveryPhone: '',
      deliveryEmail: '',
    },
    paymentMethod: 'cash',
  };
  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: defaultValues,
    mode: 'onTouched',
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return PosOrder(formData);
    },
    onSuccess: () => {
      toast({
        title: 'Order Placed Successfully!',
        description:
          'Thank you! Your order has been placed. You will receive a confirmation by SMS or email.',
        duration: 5000,
      });
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = methods;
  const { toast } = useToast();

  const validateStep = (step: number): boolean => {
    // 1. Get the field names for the current step
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
      3: ['addons', 'addons.addonImages'],
      4: [
        'deliveryInfo.country',
        'deliveryInfo.city',
        'deliveryInfo.addressLine1',
        'deliveryInfo.addressLine2',
        'deliveryInfo.useSameContact',
        'deliveryInfo.deliveryPhone',
        'deliveryInfo.deliveryEmail',
      ],
      5: ['paymentMethod', 'despositeTransactionImg'],
      6: [], // Summary step doesn't need validation
    };

    const fieldNames = stepFields[step as keyof typeof stepFields] || [];
    if (fieldNames.length === 0) return true; // Step 5 or invalid step

    // 2. Get top level fields and create schema
    const topLevelFields = getTopLevelFields(fieldNames);
    const stepSchema = orderFormSchema.pick(
      Object.fromEntries(topLevelFields.map((name) => [name, true])) as any
    );

    // 3. Get all form values and build step values
    const allValues = methods.watch();
    const stepValues = getStepValues(fieldNames, allValues);

    // 4. Validate the step values
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
    // console.log('isValid...', isValid);
    if (isValid) {
      if (currentStep === 1 && watch('deliveryInfo.useSameContact')) {
        setValue(
          'deliveryInfo.deliveryPhone',
          watch('personalInfo.phoneNumbers')[0] || ''
        );
        setValue('deliveryInfo.deliveryEmail', watch('personalInfo.email'));
      }
      if (
        currentStep === 5 &&
        watch('paymentMethod') === 'online' &&
        !watch('despositeTransactionImg')
      ) {
        setError('despositeTransactionImg', {
          message: 'Deposite transaction image is required',
          type: 'manual',
        });
        return;
      }
      setCurrentStep((prev) => Math.min(prev + 1, 6));
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

  const onSubmit = async (data: any) => {
    console.log('form data:', data);
    try {
      const formData = new FormData();

      // Required: Product ID
      formData.append('product', product._id);

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

        if (data.personalInfo?.businessEmail) {
          formData.append(
            'personalInfo[businessEmail]',
            data.personalInfo.businessEmail
          );
        }

        if (data.personalInfo.linkedinUrl) {
          formData.append(
            'personalInfo[linkedinUrl]',
            data.personalInfo.linkedinUrl
          );
        }
        if (data.personalInfo?.instagramUrl) {
          formData.append(
            'personalInfo[instagramUrl]',
            data.personalInfo.instagramUrl
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
        if (data.cardDesign.companyLogo) {
          formData.append('companyLogo', data.cardDesign.companyLogo);
        }
      }
      // console.log('data.cardDesign.companyLogo', data.cardDesign.companyLogo);

      // Step 3: Addons
      if (data.addons) {
        data.addons.forEach((addon, index) => {
          formData.append(`addons[${index}][addon]`, addon.addon);
          if (addon.addonValue instanceof File) {
            formData.append(
              `addons[${index}][addonValue]`,
              addon.addonValue?.name
            );
            formData.append(`addons[${index}][inputType]`, addon.inputType);
          } else {
            formData.append(`addons[${index}][addonValue]`, addon.addonValue);
            formData.append(`addons[${index}][inputType]`, addon.inputType);
          }
        });

        if (data.addonImages) {
          data.addonImages.forEach((image) => {
            formData.append('addonImages', image);
          });
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
        if (data.deliveryInfo?.postcode) {
          formData.append('deliveryInfo[postcode]', data.deliveryInfo.postcode);
        }
      }

      // Step 4: Payment Method
      formData.append('paymentMethod', data.paymentMethod || 'cash');
      if (data.despositeTransactionImg) {
        formData.append(
          'despositeTransactionImg',
          data.despositeTransactionImg
        );
      }

      console.log('formData', formData);
      await mutate(formData);

      // Reset form
      // methods.reset(defaultValues);
      // setCurrentStep(1);
      // onClose();
    } catch (error) {
      toast({
        title: 'Order Failed',
        description: 'There was an error placing your order. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Personal Details',
      description: 'Your contact information',
      icon: User,
    },
    {
      number: 2,
      title: 'Card Design',
      description: 'Customize your card',
      icon: Palette,
    },
    {
      number: 3,
      title: 'Addons',
      description: 'Choose your addons',
      icon: ShoppingCart,
    },
    {
      number: 4,
      title: 'Delivery Info',
      description: 'Where to send your card',
      icon: MapPin,
    },

    {
      number: 5,
      title: 'Payment Method',
      description: "How you'll pay",
      icon: Payment,
    },

    {
      number: 6,
      title: 'Order Summary',
      description: 'Review your order',
      icon: ClipboardList,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Order Your <span className="gradient-text">NFC Card</span>
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
                {currentStep === 2 && <Step2CardDesign product={product} />}

                {/* Step 3: Delivery & Contact Info */}
                {currentStep === 3 && <Step4Addons product={product} />}

                {/* Step 4: Payment Method */}
                {currentStep === 4 && <Step3Delivery />}

                {/* Step 5: Payment Method */}
                {currentStep === 5 && <Step4Payment />}

                {/* Step 5: Order Summary */}
                {currentStep === 6 && <Step5Summary product={product} />}

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
                      onClick={() => nextStep()}
                      className="btn-hero flex items-center"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <SubmitButton disabled={isPending}>
                      {isPending ? 'Placing Order...' : '🔘 Place My Order'}
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

export default OrderModal;

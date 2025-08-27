import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomInput from '@/components/form/CustomInput';
import CustomSelect from '@/components/form/CustomSelect';
import { BulkOrder } from '@/lib/service/endpoints';
import { useMutation } from '@tanstack/react-query';
import SubmitButton from '@/components/ui/SubmitButton';

// Define the schema for bulk order form
const bulkOrderSchema = z.object({
  companyInfo: z.object({
    companyName: z
      .string()
      .min(2, 'Company name must be at least 2 characters'),
    contactPerson: z
      .string()
      .min(2, 'Contact person name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z
      .string()
      .min(8, 'Phone number must be at least 8 characters')
      .optional(),
  }),
  orderDetails: z.object({
    employeeCount: z.number().min(1, 'Please specify the number of employees'),
    message: z.string().optional(),
  }),
});

type BulkOrderFormData = z.infer<typeof bulkOrderSchema>;

const BulkOrders = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const defaultValues = {
    companyInfo: {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
    },
    orderDetails: {
      employeeCount: 10,
      message: '',
    },
  };

  const methods = useForm<BulkOrderFormData>({
    resolver: zodResolver(bulkOrderSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return BulkOrder(data);
    },
    onSuccess: () => {
      toast({
        title: 'Bulk Order Request Submitted!',
        description: "We'll contact you within 24 hours with a custom quote.",
        duration: 10000,
      });
      methods.reset(defaultValues);
    },
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = async (data: BulkOrderFormData) => {
    setIsSubmitting(true);

    try {
      // Here you would normally send to your backend
      console.log('Bulk order submitted:', { data });

      // Simulate API call
      await mutate(data);

      // Reset form
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description:
          'There was an error submitting your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log('methods.formState.errors', methods.formState.errors);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8"></div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Corporate <span className="gradient-text">Bulk Orders</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Equip your entire team with premium NFC business cards. Get custom
              branding, bulk pricing, and dedicated support.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Benefits */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      Corporate Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">Bulk Pricing</div>
                        <div className="text-sm text-muted-foreground">
                          Significant discounts for orders of 10+
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">Custom Branding</div>
                        <div className="text-sm text-muted-foreground">
                          Company logo and brand colors
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">Dedicated Support</div>
                        <div className="text-sm text-muted-foreground">
                          Personal account manager
                        </div>
                      </div>
                    </div>
                    {/* <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">CSV Upload</div>
                        <div className="text-sm text-muted-foreground">
                          Easy employee data import
                        </div>
                      </div>
                    </div> */}
                  </CardContent>
                </Card>

                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Pricing Tiers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>1-49 cards</span>
                      <span>15 JOD</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>50-99 cards</span>
                      <span>13 JOD</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>100+ cards</span>
                      <span>12 JOD</span>
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                      * Prices include custom branding and free delivery
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Request Bulk Order Quote</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you with a
                      custom quote
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormProvider {...methods}>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        {/* Company Information */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">
                            Company Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomInput
                              name="companyInfo.companyName"
                              label="Company Name"
                              placeholder="Your company name"
                              required={true}
                              type="text"
                            />
                            <CustomInput
                              name="companyInfo.contactPerson"
                              label="Contact Person"
                              placeholder="Your full name"
                              required={true}
                              type="text"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomInput
                              name="companyInfo.email"
                              label="Email Address"
                              placeholder="your@company.com"
                              required={true}
                              type="email"
                            />
                            <CustomInput
                              name="companyInfo.phone"
                              label="Phone Number"
                              placeholder="+962 XX XXX XXXX"
                              required={true}
                              type="text"
                            />
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">
                            Order Details
                          </h3>
                          <CustomInput
                            name="orderDetails.employeeCount"
                            label="Number of Employees/Cards Needed"
                            placeholder="e.g., 50"
                            required={true}
                            type="number"
                          />
                        </div>

                        {/* CSV Upload */}
                        {/* <div className="space-y-4">
                          <h3 className="text-lg font-semibold">
                            Employee Data (Optional)
                          </h3>
                          <CustomFileUpload
                            name="csvFile"
                            label="Upload CSV File"
                            required={false}
                          />
                        </div> */}

                        {/* Additional Message */}
                        <div>
                          <CustomInput
                            name="orderDetails.message"
                            label="Additional Comments or Requirements"
                            placeholder="Any specific requirements, timeline, or questions..."
                            required={false}
                            type="text"
                          />
                        </div>

                        {/* Submit Button */}
                        <SubmitButton
                          disabled={isSubmitting}
                          className="w-full py-3 text-lg"
                        >
                          {isSubmitting
                            ? 'Submitting Request...'
                            : 'Request Custom Quote'}
                        </SubmitButton>

                        <p className="text-xs text-muted-foreground text-center">
                          We'll review your request and get back to you within
                          24 hours with a custom quote and timeline.
                        </p>
                      </form>
                    </FormProvider>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BulkOrders;

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PageHeader from './_components/pageHeader';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomInput from '@/components/form/CustomInput';
import CustomTextarea from '@/components/form/CustomTextarea';
import CustomSwitch from '@/components/form/CustomSwitch';
import CustomFileUpload from '@/components/form/CustomFileUpload';
import SubmitButton from '@/components/ui/SubmitButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProduct, updateProduct } from '@/lib/service/endpoints';
import CustomSelect from '@/components/form/CustomSelect';
import CustomColorInput from '@/components/form/CustomColorInput';

// Define the schema for product form
const productSchema = z.object({
  title: z
    .string()
    .min(3, 'Product title must be at least 3 characters')
    .max(100, 'Product title must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Product description must be at least 10 characters')
    .max(1000, 'Product description must be less than 1000 characters'),
  price: z.number().min(0, 'Price must be a positive number'),
  isMainProduct: z.boolean(),
  cardDesigns: z
    .array(
      z.object({
        color: z.string().min(1, 'Color is required'),
        image: z.any().optional(),
      })
    )
    .min(1, 'At least one card design is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductPage = () => {
  const { toast } = useToast();

  const defaultValues: ProductFormData = {
    title: '',
    description: '',
    price: undefined,
    isMainProduct: undefined,
    cardDesigns: [
      { color: 'black', image: null },
      { color: 'white', image: null },
    ],
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return updateProduct(data);
    },
    onSuccess: () => {
      toast({
        title: 'Product Updated!',
        description: 'Product information has been saved successfully.',
        duration: 10000,
      });
      refetch();
      // methods.reset(defaultValues);
    },
  });

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues,
    mode: 'onTouched',
  });

  const { handleSubmit, watch, setValue, getValues } = methods;
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['getOneProduct'],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    queryFn: () => getProduct('689f857545ca4e292e013f13'),
  });

  // Handle data loading and form reset
  useEffect(() => {
    if (data?.data?.data?.data) {
      methods.reset(data.data.data.data);
    }
  }, [data]);
  const onSubmit = async (data: ProductFormData) => {
    try {
      // Create FormData object to match the Postman structure
      console.log('data...', data);
      const formData = new FormData();

      // Add basic product information
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('isMainProduct', data.isMainProduct.toString());

      // Add card designs with proper array notation
      data.cardDesigns.forEach((design, index) => {
        formData.append(`cardDesigns[${index}][color]`, design.color);

        // Handle image files
        if (design.image instanceof File) {
          // formData.append(`cardDesigns[${index}][image]`, null);
        } else if (typeof design.image === 'string' && design.image) {
          formData.append(`cardDesigns[${index}][image]`, design.image);
        }
      });

      // Add images array (extract files from card designs)
      const imageFiles = data.cardDesigns
        .map((design) => design.image)
        .filter((image) => image instanceof File) as File[];

      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      console.log('FormData entries:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Send FormData to backend
      await mutate(formData);
    } catch (error) {
      toast({
        title: 'Update Failed',
        description:
          'There was an error updating the product. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const addCardDesign = () => {
    const currentDesigns = getValues('cardDesigns');
    setValue('cardDesigns', [...currentDesigns, { color: '', image: null }]);
  };

  const removeCardDesign = (index: number) => {
    const currentDesigns = getValues('cardDesigns');
    if (currentDesigns.length > 1) {
      setValue(
        'cardDesigns',
        currentDesigns.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <div className="p-6 !w-full">
      <PageHeader
        title="Product Management"
        description="Edit product details and configuration"
      />

      <Card className="card-premium">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Edit product title, price, description, and card designs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Product Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomInput
                    name="title"
                    label="Product Title"
                    placeholder="Enter product title"
                    required={true}
                    type="text"
                  />
                  <CustomInput
                    name="price"
                    label="Price (JOD)"
                    placeholder="0"
                    required={true}
                    type="number"
                  />
                </div>

                <CustomTextarea
                  name="description"
                  label="Product Description"
                  placeholder="Enter product description"
                  required={true}
                  rows={3}
                />

                {/* <CustomSwitch
                  name="isMainProduct"
                  label="Main Product"
                  required={false}
                /> */}
              </div>

              {/* Card Designs Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Card Designs</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCardDesign}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Design
                  </Button>
                </div>

                <div className="space-y-4">
                  {Array.isArray(watch('cardDesigns')) &&
                    watch('cardDesigns')?.map((design, index) => (
                      <Card key={index} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="font-medium">Design {index + 1}</h4>
                            {watch('cardDesigns').length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCardDesign(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CustomColorInput
                              name={`cardDesigns.${index}.color`}
                              label="Color"
                              placeholder="#000000"
                              required={true}
                            />

                            <CustomFileUpload
                              name={`cardDesigns.${index}.image`}
                              label="Card Image"
                              required={false}
                              accept="image/*"
                              preview={true}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Submit Button */}
              <SubmitButton
                disabled={isPending}
                className="w-full py-3 text-lg"
              >
                {isPending ? 'Saving Changes...' : 'Save Changes'}
              </SubmitButton>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;

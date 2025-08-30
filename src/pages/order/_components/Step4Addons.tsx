import { getAddons } from '@/lib/service/endpoints';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Package, DollarSign, Plus, X, Upload } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface Addon {
  _id: string;
  title: string;
  price: number;
  options?: string[];
  inputType: 'text' | 'number' | 'radio' | 'select' | 'image';
  createdAt: string;
  updatedAt: string;
}

interface AddonSelection {
  addon: string; // Addon ID
  addonValue: string;
}

interface Step4AddonsProps {
  product: any;
}

function Step4Addons({ product }: Step4AddonsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getAddons'],
    queryFn: () => getAddons(),
  });

  const { setValue, watch } = useFormContext();
  const selectedAddons = watch('addons') || [];
  const addonImages = watch('addonImages') || [];

  const [newImage, setNewImage] = useState('');

  const addons = data?.data?.data?.data || [];

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

  const handleAddonSelection = (
    addonId: string,
    value: string | File,
    isImage: boolean = false,
    inputType: string = '',
    price: number = 0
  ) => {
    if (isImage && value) {
      setValue('addonImages', [...addonImages, value]);
      if (inputType) {
        setValue('addons', [
          ...selectedAddons,
          {
            addon: addonId,
            addonValue: value,
            inputType: inputType,
            price: price,
          },
        ]);
      }
      return;
    }

    const existingIndex = selectedAddons.findIndex(
      (item: AddonSelection) => item.addon === addonId
    );

    if (existingIndex >= 0) {
      // Update existing selection
      const updatedAddons = [...selectedAddons];
      updatedAddons[existingIndex].addonValue = value;
      setValue('addons', updatedAddons);
      if (inputType) {
        setValue('addons', [
          ...selectedAddons,
          {
            addon: addonId,
            addonValue: value,
            inputType: inputType,
            price: price,
          },
        ]);
      }
    } else {
      // Add new selection
      setValue('addons', [
        ...selectedAddons,
        { addon: addonId, addonValue: value, price: price },
      ]);
    }

    // If it's an image, also save to addonImages array
    if (inputType) {
      setValue('addons', [
        ...selectedAddons,
        {
          addon: addonId,
          addonValue: value,
          inputType: inputType,
          price: price,
        },
      ]);
    }
  };

  const handleRemoveAddon = (addonId: string) => {
    const updatedAddons = selectedAddons.filter(
      (item: AddonSelection) => item.addon !== addonId
    );
    setValue('addons', updatedAddons);
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setValue('addonImages', [...addonImages, newImage.trim()]);
      setNewImage('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = addonImages.filter(
      (_: string, i: number) => i !== index
    );
    setValue('addonImages', updatedImages);
  };

  console.log('watch...', watch());
  const renderAddonInput = (addon: Addon) => {
    const selectedValue =
      selectedAddons.find((item: AddonSelection) => item.addon === addon._id)
        ?.addonValue || '';

    switch (addon.inputType) {
      case 'text':
        return (
          <Input
            placeholder="Enter text"
            value={selectedValue}
            onChange={(e) =>
              handleAddonSelection(
                addon._id,
                e.target.value,
                false,
                addon.inputType,
                addon.price
              )
            }
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder="Enter number"
            value={selectedValue}
            onChange={(e) =>
              handleAddonSelection(
                addon._id,
                e.target.value,
                false,
                addon.inputType,
                addon.price
              )
            }
          />
        );

      case 'radio':
        return (
          <RadioGroup
            value={selectedValue}
            onValueChange={(value) =>
              handleAddonSelection(
                addon._id,
                value,
                false,
                addon.inputType,
                addon.price
              )
            }
          >
            {addon.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${addon._id}-${index}`} />
                <Label htmlFor={`${addon._id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'select':
        return (
          <Select
            value={selectedValue}
            onValueChange={(value) =>
              handleAddonSelection(
                addon._id,
                value,
                false,
                addon.inputType,
                addon.price
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {addon.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              max={1}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle file upload logic here
                  handleAddonSelection(
                    addon._id,
                    file,
                    true,
                    addon.inputType,
                    addon.price
                  );
                }
              }}
            />
            {selectedValue && (
              <img
                src={URL.createObjectURL(selectedValue)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Add-ons & Customizations</h2>
          <p className="text-muted-foreground">Loading available add-ons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Add-ons & Customizations</h2>
          <p className="text-muted-foreground">
            Failed to load add-ons. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Add-ons & Customizations</h2>
        <p className="text-muted-foreground">
          Enhance your order with additional features and customizations
        </p>
      </div>

      {/* Available Add-ons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Add-ons</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {addons.map((addon: Addon) => {
            const isSelected = selectedAddons.some(
              (item: AddonSelection) => item.addon === addon._id
            );

            return (
              <Card
                key={addon._id}
                className={`${isSelected ? 'ring-2 ring-primary' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {addon.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getInputTypeColor(
                          addon.inputType
                        )} text-white`}
                      >
                        {addon.inputType.charAt(0).toUpperCase() +
                          addon.inputType.slice(1)}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-green-600 text-sm">JOD</span>
                        <span className="font-semibold">
                          {addon.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderAddonInput(addon)}

                  {isSelected && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveAddon(addon._id)}
                      className="w-full text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove Addon
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Step4Addons;

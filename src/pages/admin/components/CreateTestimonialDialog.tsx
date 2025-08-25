import React, { useState } from 'react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTestimonial } from '@/lib/service/endpoints';
import { Star, Building, Image, X } from 'lucide-react';
import SubmitButton from '@/components/ui/SubmitButton';
import { toast } from 'sonner';

interface CreateTestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateTestimonialDialog = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateTestimonialDialogProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    quote: '',
    rating: 5,
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: createTestimonialMutation, isPending: isCreating } =
    useMutation({
      mutationFn: (formDataObj: FormData) => createTestimonial(formDataObj),
      onSuccess: () => {
        toast.success('The testimonial has been created successfully.');
        queryClient.invalidateQueries({ queryKey: ['getTestimonials'] });
        onSuccess?.();
        onClose();
        // Reset form
        setFormData({
          name: '',
          title: '',
          company: '',
          quote: '',
          rating: 5,
          image: null,
        });
      },
      onError: (error: any) => {
        console.error('Create error:', error);
        toast.error(
          error?.response?.data?.message || 'Failed to create testimonial.'
        );
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('title', formData.title);
    formDataObj.append('company', formData.company);
    formDataObj.append('quote', formData.quote);
    formDataObj.append('rating', formData.rating.toString());
    if (formData.image) {
      formDataObj.append('image', formData.image);
    }

    createTestimonialMutation(formDataObj);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    // Create preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: '',
      title: '',
      company: '',
      quote: '',
      rating: 5,
      image: null,
    });
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Create New Testimonial
          </DialogTitle>
          <DialogDescription>Add a new customer testimonial</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select
              value={formData.rating.toString()}
              onValueChange={(value) =>
                handleInputChange('rating', parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    <div className="flex items-center gap-2">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} fill="yellow" className="w-4 h-4" />
                      ))}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  placeholder="Enter job title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                  placeholder="Enter company name"
                />
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Testimonial Content</h3>
            <div className="space-y-2">
              <Label htmlFor="quote">Quote *</Label>
              <Textarea
                id="quote"
                value={formData.quote}
                onChange={(e) => handleInputChange('quote', e.target.value)}
                className="min-h-[120px]"
                required
                placeholder="Enter testimonial quote"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Image</h3>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
            </div>
            {imagePreview && (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-lg object-cover border border-border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, image: null }));
                    setImagePreview(null);
                    // Reset the file input
                    const fileInput = document.getElementById(
                      'image'
                    ) as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
                <span className="block text-sm text-muted-foreground mt-2">
                  Image preview
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <SubmitButton disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Testimonial'}
            </SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestimonialDialog;

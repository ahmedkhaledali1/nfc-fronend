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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Building,
  Calendar,
  User,
  MessageSquare,
  Star,
  Image,
  Phone,
} from 'lucide-react';

interface ViewTestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: any;
}

const ViewTestimonialDialog = ({
  isOpen,
  onClose,
  testimonial,
}: ViewTestimonialDialogProps) => {
  if (!testimonial) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Testimonial Details
          </DialogTitle>
          <DialogDescription>
            View customer testimonial information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Rating Display */}
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">Rating:</span>
            <div className="flex items-center gap-1">
              {[...Array(testimonial.rating || 0)].map((_, i) => (
                <Star key={i} fill="yellow" className="w-4 h-4" />
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={testimonial.name || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={testimonial.title || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    value={testimonial.company || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Created At</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    value={new Date(testimonial.createdAt).toLocaleString()}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Testimonial Content
            </h3>
            <div className="space-y-2">
              <Label htmlFor="quote">Quote</Label>
              <Textarea
                id="quote"
                value={testimonial.quote || ''}
                disabled
                className="bg-muted min-h-[120px] resize-none"
                readOnly
              />
            </div>
          </div>

          {/* Image Display */}
          {testimonial.image && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Image className="h-4 w-4" />
                Profile Image
              </h3>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div className="flex items-center gap-4">
                  <img
                    crossOrigin="anonymous"
                    src={`${import.meta.env.VITE_BACKEND_DOMAIN}${
                      testimonial.image
                    }`}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-lg object-cover border border-border"
                  />
                  <Input
                    id="image"
                    value={testimonial.image}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="createdAt">Created At</Label>
                <Input
                  id="createdAt"
                  value={new Date(testimonial.createdAt).toLocaleString()}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="updatedAt">Last Updated</Label>
                <Input
                  id="updatedAt"
                  value={new Date(testimonial.updatedAt).toLocaleString()}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTestimonialDialog;

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
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMessage } from '@/lib/service/endpoints';
import { Mail, Phone, Calendar, User, MessageSquare } from 'lucide-react';

interface ViewMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: any;
  onUpdate?: () => void;
}

const ViewMessageDialog = ({
  isOpen,
  onClose,
  message,
  onUpdate,
}: ViewMessageDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(message?.status || 'New');

  const { mutate: updateMessageMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      updateMessage(data.id, data.status),
    onSuccess: () => {
      toast({
        title: 'Message Updated',
        description: 'The message status has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['getMessages'] });
      onUpdate?.();
      onClose();
    },
    onError: (error: any) => {
      console.error('Update error:', error);
      toast({
        title: 'Update Failed',
        description:
          error?.response?.data?.message || 'Failed to update message status.',
        variant: 'destructive',
      });
    },
  });

  const handleStatusUpdate = () => {
    if (message?.id && status !== message.status) {
      updateMessageMutation({
        id: message.id,
        status,
      });
    } else {
      onClose();
    }
  };

  if (!message) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message Details
          </DialogTitle>
          <DialogDescription>
            View and manage customer inquiry details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Section */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">
                  <Badge variant="destructive">New</Badge>
                </SelectItem>
                <SelectItem value="In Progress">
                  <Badge variant="secondary">In Progress</Badge>
                </SelectItem>
                <SelectItem value="Responded">
                  <Badge variant="default">Responded</Badge>
                </SelectItem>
                <SelectItem value="Closed">
                  <Badge variant="outline">Closed</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={message.fullName || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    value={message.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={message.phone || 'N/A'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    value={`${message.date} ${message.time}`}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message Content
            </h3>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={message.subject || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message.message || ''}
                disabled
                className="bg-muted min-h-[120px] resize-none"
                readOnly
              />
            </div>
          </div>

          {/* Current Status Display */}
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">Current Status:</span>
            <Badge
              variant={
                message.status === 'New'
                  ? 'destructive'
                  : message.status === 'Read'
                  ? 'secondary'
                  : message.status === 'Replied'
                  ? 'default'
                  : 'outline'
              }
            >
              {message.status}
            </Badge>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            disabled={isUpdating || status === message.status}
          >
            {isUpdating ? 'Updating...' : 'Update Status'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMessageDialog;

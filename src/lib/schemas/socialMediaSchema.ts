import z from 'zod';

export const socialMediaSchema = z.object({
  platform: z.string().min(1, 'Please select a platform'),
  url: z.string().url('Please enter a valid URL'),
  isActive: z.boolean(),
  displayOrder: z.number().min(0, 'Display order must be 0 or greater'),
});

export type SocialMediaFormData = z.infer<typeof socialMediaSchema>;

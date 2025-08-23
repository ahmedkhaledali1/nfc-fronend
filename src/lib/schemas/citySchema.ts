import z from 'zod';

export const citySchema = z.object({
  name: z
    .string()
    .min(1, 'City name is required')
    .max(100, 'City name cannot exceed 100 characters'),
  country: z.string().min(1, 'Country is required'),
  deliveryFee: z.number().min(0, 'Delivery fee cannot be negative'),
  isActive: z.boolean(),
  displayOrder: z.number().min(0, 'Display order must be 0 or greater'),
});

export type CityFormData = z.infer<typeof citySchema>;

import z from 'zod';

export const countrySchema = z.object({
  name: z
    .string()
    .min(1, 'Country name is required')
    .max(100, 'Country name cannot exceed 100 characters'),
  code: z
    .string()
    .min(2, 'Country code must be at least 2 characters')
    .max(3, 'Country code cannot exceed 3 characters')
    .toUpperCase(),
  isActive: z.boolean(),
  displayOrder: z.number().min(0, 'Display order must be 0 or greater'),
});

export type CountryFormData = z.infer<typeof countrySchema>;

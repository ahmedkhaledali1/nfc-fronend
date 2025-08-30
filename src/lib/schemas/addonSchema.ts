import z from 'zod';

export const addonSchema = z.object({
  title: z
    .string()
    .min(1, 'Addon title is required')
    .max(100, 'Addon title cannot exceed 100 characters'),
  price: z
    .number()
    .min(0, 'Price must be 0 or greater')
    .max(999999, 'Price cannot exceed 999,999'),
  options: z.array(z.string()).optional(),
  inputType: z.enum(['text', 'number', 'radio', 'select', 'image'], {
    required_error: 'Input type is required',
    invalid_type_error:
      'Input type must be one of: text, number, radio, select, image',
  }),
});

export type AddonFormData = z.infer<typeof addonSchema>;

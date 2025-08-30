import z from 'zod';

export const orderFormSchema = z.object({
  // Personal Info (Step 1)
  personalInfo: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    position: z.string().min(2, 'Position must be at least 2 characters'),
    organization: z
      .string()
      .min(2, 'Organization must be at least 2 characters'),
    phoneNumbers: z.array(
      z.string().min(8, 'Phone number must be at least 8 characters')
    ),
    email: z.string().email('Invalid email address'),
    businessEmail: z.string().optional().nullable(),
    linkedinUrl: z.string().optional().nullable(),
    instagramUrl: z.string().optional().nullable(),
    // personalPicture: z.any().optional(),
  }),

  // Card Design (Step 2)
  cardDesign: z.object({
    nameOnCard: z.string().min(2, 'Name on card must be at least 2 characters'),
    companyLogo: z.any().optional(),
    includePrintedLogo: z.boolean(),
    color: z.string(),
  }),

  // Addons (Step 3)
  addons: z.array(z.any()),
  addonImages: z.array(z.any()),

  // Delivery (Step 3)

  deliveryInfo: z.object({
    country: z.string().min(1, 'Please select a country'),
    city: z.string().min(1, 'Please select a city'),
    addressLine1: z.string().min(5, 'Address must be at least 5 characters'),
    addressLine2: z.string().optional(),
    useSameContact: z.boolean(),
    deliveryPhone: z
      .string()
      .min(8, 'Phone number must be at least 8 characters'),
    deliveryEmail: z.string().email('Invalid email address'),
    postcode: z.string().optional().nullable(),
  }),

  // Product & Payment
  paymentMethod: z.string(),
  despositeTransactionImg: z.any().optional(),
});

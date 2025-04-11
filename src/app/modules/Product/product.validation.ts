import { z } from 'zod';

export const productSchema = z.object({
  body: z.object({
    productName: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    discountPrice: z
      .number()
      .min(0, 'Discount price must be a positive number')
      .optional(),
    material: z.string().min(1, 'Material is required'),
    brand: z.string().min(1, 'Brand is required'),
    category: z.string().min(1, 'Category is required'),
    subcategory: z.string().min(1, 'Subcategory is required'),
    stockAvailability: z
      .number()
      .min(0, 'Stock availability must be a positive number'),
    images: z.array(z.string()).min(1, 'At least one image is required'),
    thumbnail: z.string().min(1, 'Thumbnail is required'),
  }),
});

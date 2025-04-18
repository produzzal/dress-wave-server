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
    color: z.array(z.string()).min(1, 'At least one color is required'),
    size: z.array(z.string()).min(1, 'At least one size is required'),
    stockAvailability: z
      .number()
      .min(0, 'Stock availability must be a positive number'),
    images: z.array(z.string()).min(1, 'At least one image is required'),
    thumbnail: z.string().min(1, 'Thumbnail is required'),
  }),
});

export const productUpdateSchema = z.object({
  body: z.object({
    productName: z.string().min(1, 'Product name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    price: z.number().min(0, 'Price must be a positive number').optional(),
    discountPrice: z
      .number()
      .min(0, 'Discount price must be a positive number')
      .optional(),
    material: z.string().min(1, 'Material is required').optional(),
    brand: z.string().min(1, 'Brand is required').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    subcategory: z.string().min(1, 'Subcategory is required').optional(),
    color: z
      .array(z.string())
      .min(1, 'At least one color is required')
      .optional(),
    size: z
      .array(z.string())
      .min(1, 'At least one size is required')
      .optional(),
    stockAvailability: z
      .number()
      .min(0, 'Stock availability must be a positive number')
      .optional(),
    images: z
      .array(z.string())
      .min(1, 'At least one image is required')
      .optional(),
    thumbnail: z.string().min(1, 'Thumbnail is required').optional(),
  }),
});

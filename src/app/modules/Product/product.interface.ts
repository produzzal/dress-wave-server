export type TProduct = {
  productName: string;
  description: string;
  price: number;
  discountPrice?: number;
  material: string;
  brand: string;
  category: string;
  subcategory: string;
  color: string[];
  size: string[];
  stockAvailability: number;
  images: string[];
  thumbnail: string;
};

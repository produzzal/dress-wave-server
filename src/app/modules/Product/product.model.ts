import mongoose, { Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    material: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    color: { type: [String], required: true },
    size: { type: [String], required: true },
    stockAvailability: { type: Number, required: true },
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true },
);

const Product = mongoose.model<TProduct>('Product', productSchema);

export default Product;

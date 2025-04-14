import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { productSchema, productUpdateSchema } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(productSchema),
  ProductControllers.createProduct,
);

router.get('/', ProductControllers.getAllProducts);

router.get('/:productId', ProductControllers.getSingleProduct);
router.patch(
  '/:productId',
  auth(USER_ROLE.admin),
  validateRequest(productUpdateSchema),
  ProductControllers.updateProduct,
);

export const ProductRoutes = router;

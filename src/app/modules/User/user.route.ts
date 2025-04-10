import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import { auth } from '../../middleware/auth';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get('/', userControllers.getAllUsers);
router.put(
  '/:id',
  validateRequest(UserValidation.UpdateUserRoleValidationSchema),
  userControllers.userUpdateRole,
);
router.delete('/:id', userControllers.deleteUser);
export const UserRoutes = router;

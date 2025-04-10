import { z } from 'zod';
import { USER_ROLE } from './user.constant';

const UserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).trim(),
    email: z.string().email({ message: 'Invalid email address' }).trim(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .trim(),
    phone: z.string().min(1, { message: 'Phone number is required' }).trim(),
    address: z.string().optional(),
    role: z
      .nativeEnum(USER_ROLE, {
        message: "Role must be either 'admin' or 'user'",
      })
      .default(USER_ROLE.user),

    profilePicture: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const UpdateUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.nativeEnum(USER_ROLE, {
      message: "Role must be either 'admin' or 'user'",
    }),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  UpdateUserRoleValidationSchema,
};

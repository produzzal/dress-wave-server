// validations/user.validation.ts
import { z } from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    address: z.string().optional(),
    role: z.enum(["admin", "user"]).default("user"), // default to "user" if not provided
    profilePicture: z.string().optional(),
  }),
});

// For login, only email and password are required
export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

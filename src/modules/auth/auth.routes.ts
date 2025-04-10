import { Router } from "express";
import { authControllers } from "./authController";
import validateRequest from "../../middlewares/validateRequest";
import {
  loginValidationSchema,
  userValidationSchema,
} from "../user/user.validation";
import catchAsync from "../../utils/catchAsync";

const router = Router();

// Signup route
router.post(
  "/signup",
  validateRequest(userValidationSchema),
  catchAsync(authControllers.signup)
);

// Login route
router.post(
  "/login",
  validateRequest(loginValidationSchema),
  authControllers.login
);

export const authRoutes = router;

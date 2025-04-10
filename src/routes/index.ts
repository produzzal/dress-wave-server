import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

// All routes here under /api
router.use("/auth", authRoutes);

export default router;

// src/routes/auth.routes.js
import { Router } from "express"; // Use import
import {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
} from "../controllers/user.controller.js"; // Use import and include .js extension
import { verifyJWT } from "../middlewares/auth.middleware.js"; // Use import and include .js extension

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);

// protected routes
router.get("/me", verifyJWT, getCurrentUser); // Corrected middleware name from file (authMiddleware -> verifyJWT)
router.post("/logout", verifyJWT, logoutUser); // Corrected middleware name

export default router; // Use default export
import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    getUserPublicProfile,
    getTravelHistory
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/* ===============================
   🔓 PUBLIC ROUTES
================================ */

// REGISTER
router.route("/register").post(registerUser);

// LOGIN
router.route("/login").post(loginUser);

// REFRESH ACCESS TOKEN
router.route("/refresh-token").post(refreshAccessToken);



/* ===============================
   🔐 PROTECTED USER ROUTES 
================================ */

// LOGOUT
router.route("/logout").post(verifyJWT, logoutUser);

// CHANGE PASSWORD
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

// GET CURRENT USER PROFILE
router.route("/current-user").get(verifyJWT, getCurrentUser);

// UPDATE ACCOUNT DETAILS (name, email, age, conditions etc.)
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

// PUBLIC PROFILE BASED ON USERNAME
router.route("/u/:username").get(verifyJWT, getUserPublicProfile);

// USER TRAVEL / SYSTEM USAGE HISTORY
router.route("/history").get(verifyJWT, getTravelHistory);


export default router;

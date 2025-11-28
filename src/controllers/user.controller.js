// src/controllers/user.controller.js
import bcrypt from "bcrypt"; // Used 'bcrypt' from package.json instead of 'bcryptjs'
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { User } from "../models/user.model.js"; // Correct named import
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "1d";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "10d";

const generateAccessToken = (userId) =>
  jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

/**
 * POST /api/users/register
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, age, gender } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const userId = uuidv4();

  const user = await User.create({
    userId,
    name,
    email,
    passwordHash,
    age,
    gender,
  });

  const accessToken = generateAccessToken(user.userId);
  const refreshToken = generateRefreshToken(user.userId);

  // store refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  return res.status(201).json(
    new ApiResponse(201, {
      accessToken,
      refreshToken,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
      },
    }, "User registered successfully")
  );
});

/**
 * POST /api/users/login
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user.userId);
  const refreshToken = generateRefreshToken(user.userId);

  user.refreshToken = refreshToken;
  await user.save();

  return res.json(
    new ApiResponse(200, {
      accessToken,
      refreshToken,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
      },
    }, "Login successful")
  );
});

/**
 * GET /api/users/current-user  (protected)
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const u = req.user;
  return res.json(
    new ApiResponse(200, {
      user: {
        userId: u.userId,
        name: u.name,
        email: u.email,
        age: u.age,
        gender: u.gender,
        conditions: u.conditions,
        medications: u.medications,
        smoker: u.smoker,
        riskSensitivity: u.riskSensitivity,
      },
    }, "Current user")
  );
});

/**
 * POST /api/users/refresh-token  (optional – refresh access token)
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  // verify refresh token
  const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  const user = await User.findOne({ userId: decoded.userId });
  
  if (!user || user.refreshToken !== refreshToken) {
    // Attempt to clear a potentially stale/stolen token if user exists
    if (user && user.refreshToken !== undefined) {
        await User.updateOne({ userId: user.userId }, { $unset: { refreshToken: "" } });
    }
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const newAccessToken = generateAccessToken(user.userId);

  return res.json(
    new ApiResponse(200, {
      accessToken: newAccessToken,
    }, "Access token refreshed")
  );
});

/**
 * POST /api/users/logout
 */
const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  await User.updateOne({ userId: user.userId }, { $unset: { refreshToken: "" } });

  return res.json(new ApiResponse(200, {}, "Logged out successfully"));
});

// Stubs for functions imported in user.routes.js but not defined here
const changeCurrentPassword = asyncHandler(async (req, res) => {
  throw new ApiError(501, "changeCurrentPassword not implemented");
});
const updateAccountDetails = asyncHandler(async (req, res) => {
  throw new ApiError(501, "updateAccountDetails not implemented");
});
const getUserPublicProfile = asyncHandler(async (req, res) => {
  throw new ApiError(501, "getUserPublicProfile not implemented");
});
const getTravelHistory = asyncHandler(async (req, res) => {
  throw new ApiError(501, "getTravelHistory not implemented");
});

export {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
  changeCurrentPassword,
  updateAccountDetails,
  getUserPublicProfile,
  getTravelHistory,
};
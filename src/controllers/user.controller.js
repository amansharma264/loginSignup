// src/controllers/auth.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

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
 * POST /api/auth/signup
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

  // store refresh token in DB (optional)
  user.refreshToken = refreshToken;
  await user.save();

  return res.status(201).json(
    new ApiResponse(true, "User registered successfully", {
      accessToken,
      refreshToken,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
      },
    })
  );
});

/**
 * POST /api/auth/login
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
    new ApiResponse(true, "Login successful", {
      accessToken,
      refreshToken,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
      },
    })
  );
});

/**
 * GET /api/auth/me  (protected)
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const u = req.user;
  return res.json(
    new ApiResponse(true, "Current user", {
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
    })
  );
});

/**
 * POST /api/auth/refresh  (optional – refresh access token)
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
    throw new ApiError(401, "Invalid refresh token");
  }

  const newAccessToken = generateAccessToken(user.userId);

  return res.json(
    new ApiResponse(true, "Access token refreshed", {
      accessToken: newAccessToken,
    })
  );
});

/**
 * POST /api/auth/logout
 */
const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  await User.updateOne({ userId: user.userId }, { $unset: { refreshToken: "" } });

  return res.json(new ApiResponse(true, "Logged out successfully"));
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
};

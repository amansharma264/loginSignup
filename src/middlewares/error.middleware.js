// src/middlewares/error.middleware.js
import { ApiError } from "../utils/ApiError.js"; // Use import and include .js extension

const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err);

  // Check if the error is a custom ApiError instance
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  // Handle all other unhandled errors (500 Internal Server Error)
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [err.message || "Something went wrong"],
  });
};

export default errorMiddleware; // Use default export
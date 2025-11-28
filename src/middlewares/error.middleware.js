// src/middlewares/error.middleware.js
const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [err.message || "Something went wrong"],
  });
};

module.exports = errorMiddleware;

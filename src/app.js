// src/app.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";  // 👈 IMPORTANT: .js + correct path
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// mount routes
app.use("/api/users", userRoutes);

// health check
app.get("/ping", (req, res) => {
  res.json({ success: true, message: "pong" });
});

// global error handler (last)
app.use(errorMiddleware);

export default app;

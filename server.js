// import dotenv from "dotenv";
import "dotenv/config";
// dotenv.config();

// Import Dependencies
import cors from "cors";
import express from "express";

// Import modules
import connectDB from "./src/config/database.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import authRoutes from "./src/routes/authRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

// Connect to the database
connectDB();

// Initialize the Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler); // Error Handler

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

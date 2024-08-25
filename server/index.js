const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const connectDB = require("./db/connectDB.js");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",  // Use environment variable for frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],  // Restrict allowed methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Restrict allowed headers
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Database connection and server start
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);  // Exit process with failure code
  });

// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Closing server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);  // Exit process successfully
  });
});

process.on("SIGINT", () => {  // Handling Ctrl+C for graceful shutdown
  console.log("SIGINT signal received. Closing server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

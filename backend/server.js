require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require('./routes/authRoutes')
const app = express();
const PORT = 5000;  

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Routes
app.use(router)
// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern-rooms";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test API Route
app.get("/test", (req, res) => {
  res.send("API is working!");
});

// Global Error Handler (for better debugging)
app.use((err, req, res, next) => {
  console.error(" Error:", err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});



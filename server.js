const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Import Routes
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactionroutes");

dotenv.config();
const app = express();

// ✅ CORS Configuration
const allowedOrigins = ['http://localhost:3000', 'https://your-frontend-domain.com']; // Add production domain too if needed
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

// Middleware
app.use(express.json());

// Handle preflight requests
app.options("*", cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

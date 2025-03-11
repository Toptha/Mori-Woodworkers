const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("✅ 'uploads/' directory created.");
} else {
    console.log("📂 'uploads/' directory already exists.");
}

// Serve static files (profile pictures)
app.use("/uploads", express.static(uploadDir));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

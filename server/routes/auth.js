const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const normalizedEmail = email.toLowerCase().trim();
        
        const existingUser = await User.findOne({ 
            email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            username, 
            email: normalizedEmail, 
            password: hashedPassword 
        });
        
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for email:", email);

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ 
            email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } 
        });
        
        if (!user) {
            console.log("User not found for email:", normalizedEmail);

            const allUsers = await User.find({}, 'email');
            console.log("All emails in database:", allUsers.map(u => u.email));
            
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid password for user:", normalizedEmail);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Login successful for user:", normalizedEmail);

        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email
        };
        
        res.json({ token, user: userResponse });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message });
    }
});

router.get("/profile", async (req, res) => {
    try {
        // Extract token from headers
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Fetch user data from MongoDB
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
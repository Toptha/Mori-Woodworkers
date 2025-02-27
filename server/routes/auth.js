const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Store email in lowercase to ensure consistency
        const normalizedEmail = email.toLowerCase().trim();
        
        // Check if user already exists
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
        
        // Normalize the email for consistent comparison
        const normalizedEmail = email.toLowerCase().trim();
        
        // Use case-insensitive query with regex
        const user = await User.findOne({ 
            email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } 
        });
        
        if (!user) {
            console.log("User not found for email:", normalizedEmail);
            
            // Additional debugging to see what's in the database
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
        
        // Don't send password in the response
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



module.exports = router;
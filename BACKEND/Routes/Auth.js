// BACKEND/Routes/Auth.js (Additions needed)
const express = require("express");
const router = express.Router();
const User = require("../Models/User"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/Auth"); // 👈 NEW: Import Auth Middleware

// BACKEND/Routes/Auth.js (Add this block)

// @route   POST /api/Auth/Register
// @desc    Register a new user, hash password, and save to DB
// @access  Public
router.post("/Register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists.' });
        }

        // 2. Hash the Password (Ensure 'bcrypt' is installed: npm install bcryptjs)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Create a new User instance with default gamification stats
        user = new User({
            name,
            email,
            passwordHash,
            points: 0, 
            level: 1,
            streak: 0,
            badges: [],
        });

        // 4. Save the user to MongoDB
        await user.save(); 

        // 5. Send a success response
        res.status(201).json({ 
            msg: 'Registration successful! Proceed to login.',
            user: { id: user._id, name: user.name }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error during registration.' });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User Not Found" });
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });
        const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "7d" }); 

        res.json({
            msg: "Login Successful ✅",
            token,
            user: { // This structure is why the frontend needs 'res.data.user.name'
                id: user._id,
                name: user.name,
                email: user.email,
                points: user.points,
                level: user.level,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// --- 3. Secure GET User Stats Route (NEW) ---
// @route   GET /api/Auth/user
// @desc    Get the current authenticated user's stats
// @access  Private (Requires JWT token)
router.get("/user", auth, async (req, res) => { // 👈 Use the 'auth' middleware here
    try {
        // Find user by ID stored in the token payload (req.user.id)
        const user = await User.findById(req.user.id).select(
            "-passwordHash" // Exclude the sensitive field
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Return the user object (contains level, points, streak, etc.)
        res.json(user); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
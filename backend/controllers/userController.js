const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
const register = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !email || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            email,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });  // Return 500 for server errors
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });  // Use 404 for user not found
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });  // Use 401 for invalid credentials
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200)
            .cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24 })
            .json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                profilePhoto: user.profilePhoto,
                gender: user.gender
            });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout user
const logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get other users excluding the logged-in user
const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        console.log("Logged-in user ID:", loggedInUserId); 
        

        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        return res.status(200).json(otherUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login, logout, getOtherUsers };

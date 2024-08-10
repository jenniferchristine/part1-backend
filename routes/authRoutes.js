const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user"); // modell för användare

// anslutning
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB...");
}).catch((error) => {
    console.error("Error when connecting to database...", error);
});

// login för användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; // inloggningsuppgifter
        if (!username || !password) { // validering
            return res.status(400).json({ error: "All fields required" });
        }
        const user = await User.findOne({ username });
        if (!user) { // kontrollera om användaren finns
            return res.status(401).json({ error: "Incorrect username or password" });
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) { // kontrollerar matchat lösenord
            return res.status(401).json({ error: "Incorrect username or password" });
        } else {
            const payload = { username: username }; // jwt med namnet payload
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // signerar med nyckel
            const response = {
                message: "Login successful",
                token: token
            }
            res.status(200).json({ response });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
});

module.exports = router; 
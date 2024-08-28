const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ny användare
router.post("/register", async (req, res) => {
    try {
        const user = new User(req.body); // ny användare med data från req body
        await user.validate(); // validerar mot mongoose schemat
        const result = await user.save();

        return res.status(201).json({ message: "User created" });
    } catch (error) {
        if (error.name === "ValidationError") { // kontrollerar valieringsfel
            const errors = {}; // vid valideringsfel skapas error
            for (let field in error.errors) { // loopar över fält med valideringsfel
                errors[field] = error.errors[field].message; // och lägger till felmeddelande
            }
            return res.status(400).json({ errors });
        }
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// login för användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; // inloggningsuppgifter
        if (!username || !password) { // validering
            return res.status(400).json({ error: "Username and password are required" });
        }
        const user = await User.findOne({ username });
        if (!user) { // kontrollera om användaren finns
            return res.status(401).json({ error: "Incorrect username or password" }); // 401 om användare ej finns
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) { // kontrollerar matchat lösenord
            return res.status(401).json({ error: "Incorrect username or password" }); // ej matchat lösenord
        } else {
            const payload = { username: username }; // jwt med namnet payload
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // signerar med nyckel
            const response = {
                message: "Login successful",
                token: token
            }
            res.status(200).json({ message: "Login successful", response });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
});

module.exports = router; 
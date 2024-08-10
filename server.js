const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require('path'); // absolut väg för user då den inte kunde nås
const User = require(path.join(__dirname, 'models', 'user'));

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

// validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: "Token missing - Not authorized" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Not correct token" });

        req.user = user;
        next();
    });
}

// routes
app.use("/api", authRoutes);

app.get("/", async (req, res) => {
    res.json({ message: "Moment 4.1" });
});

// skyddad route
app.get("/api/protected", authenticateToken, async (req, res) => {
    res.json({ message: "Protected route..." });
});

// starta
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
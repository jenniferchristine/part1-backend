const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token missing - Not authorized" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Not correct token" });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken; // exportera middleware
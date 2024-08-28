const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // hämta header från request
    const token = authHeader && authHeader.split(' ')[1]; // extrahera den

    if (!token) {
        return res.status(401).json({ message: "Token is missing: Access denied" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {

        if (err) {
            return res.status(403).json({ message: "Invalid token - Access denied" }); // kod för åtkomst förbjuden
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken; // exportera middleware
/*


// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = "super_secret_key";

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Accès refusé" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide" });
    }
};



*/
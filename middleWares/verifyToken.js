const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.WhatIsYourName;

const verifyToken = (req, res, next) => {
    const token = req.headers.token; // Can also use Authorization Bearer <token>

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log("Decoded JWT:", decoded);

        req.vendorId = decoded.vendorId; // ✅ Pass vendorId to controllers
        next();
    } catch (error) {
        console.error("JWT Decode Error:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        }
        return res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;

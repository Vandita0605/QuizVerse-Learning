// BACKEND/Middleware/Auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // Check for the token in the 'Authorization' header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
        // 401 Unauthorized
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        // Verify the token using the same secret key used in the login route
        const decoded = jwt.verify(token, "secret123"); 
        
        // Attach the user's ID (which is in the token payload) to the request object
        req.user = decoded;
        next(); // Move on to the route handler
    } catch (e) {
        // 401 Unauthorized
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = auth;
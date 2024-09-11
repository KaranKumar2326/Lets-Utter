const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;  // Ensure cookie-parser is applied

        if (!token) {
            return res.status(401).json({ error: 'Please karan login to continue' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token
        
        console.log("Decoded JWT:", decoded);  // Debugging log to inspect decoded token

        // Access userId from decoded token (ensure correct key casing)
        req.id = decoded.userId;  // Correct field: likely 'userId' instead of 'UserId'

        console.log("User ID:", req.id);
        
        next();  // Proceed to next middleware or route handler
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        res.status(401).json({ error: 'Please karan login to continue' });
    }
};

module.exports = isAuthenticated;

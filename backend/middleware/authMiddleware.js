const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Protect routes
// This function will be used in the userRoutes.js file
const protect = asyncHandler(async (req, res, next) => {
    let token;
    // console.log(req.headers.authorization);
    // Check if the token is in the request header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the request header
            token = req.headers.authorization.split(' ')[1];
            // Verify/Decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from token
            // We don't want to return the password so we use select('-password')
            req.user = await User.findById(decoded.id).select('-password');
            // console.log(req.user);
            next();
        } catch (error) {
            console.error(error);
            //401 is unauthorized
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    // If there is no token
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

module.exports = { protect };
// Desc: User controller

// Import the async handler
// The asyncHandler is a wrapper function that will wrap around the async functions and catch any errors that occur
const asyncHandler = require('express-async-handler');
// Import Bcrypt to hash passwords
const bcrypt = require('bcryptjs');
// Import the generateToken function
const jwt = require('jsonwebtoken');
// Import the User model
const User = require('../models/userModel');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // Get the data from the request body (user input)
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    // Check if user already exists
    // Check if the user exists by checking the email
    const userExists = await User.findOne({ email });
    // If the user exists, throw an error
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    // Hash the password
    // Generate a salt to hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create the user
    // Create the user with the hashed password
    // User.
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    // If the user is created, send back the user data and a token
    if (user) {
        res.status(201).json({
            //_id is how mongoDB stores the id
            _id: user._id,
            name: user.name,
            email: user.email,
            // generateToken is a function that takes in the user id and generates a token
            token: generateToken(user._id),
        })
    } else {
        // If the user is not created, throw an error
        res.status(400);
        throw new Error('Invalid user data');
    }

})


// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    // Get the data from the request body (user input)
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    // If the user exists and the password matches, send back the user data and a token
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            //_id is how mongoDB stores the id
            _id: user._id,
            name: user.name,
            email: user.email,
            // generateToken is a function that takes in the user id and generates a token
            token: generateToken(user._id),
        })
    } else {
        // If the user credentials are incorrect, throw an error
        res.status(401);
        throw new Error('Invalid credentials');
    }
})

// Generate a token
const generateToken = (id) => {
    // Generate a token with the user id and the secret
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        // Token expires in 30 days
        expiresIn: '30d'
    })
}
module.exports = {
    registerUser,
    loginUser
}

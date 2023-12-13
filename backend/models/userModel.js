// Schema for user
// Import mongoose
const mongoose = require('mongoose');

// Create the schema
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            trim: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    // Add timestamps
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
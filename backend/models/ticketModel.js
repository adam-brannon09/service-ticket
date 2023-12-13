// Schema for user
// Import mongoose
const mongoose = require('mongoose');

// Create the schema
const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            // Reference the User model with the ref keyword. 
            ref: 'User',
        },
        product: {
            type: String,
            required: [true, 'Please select a product'],
            // Add an enum validator to make sure the product is one of the following
            enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad', 'Apple Watch', 'AirPods'],
        },
        description: {
            type: String,
            required: [true, 'Please enter a description of the issue'],
        },
        status: {
            type: String,
            enum: ['New', 'Open', 'Closed'],
            default: 'New',
        },
    },
    // Add timestamps
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Ticket', ticketSchema);
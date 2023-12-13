// Schema for user
// Import mongoose
const mongoose = require('mongoose');

// Create the schema
const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: String,
            required: [true, 'Please select a product'],
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
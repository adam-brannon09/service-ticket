const asyncHandler = require('express-async-handler');
// Import the models
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');



// @desc    Get user Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'getTickets' })
})

// @desc    Create New Ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'createNewTicket' })
})


module.exports = {
    getTickets,
    createTicket
}
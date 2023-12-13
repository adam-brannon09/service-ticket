const asyncHandler = require('express-async-handler');
// Import the models
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');



// @desc    Get user Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
    // Get the user from the database using the id from JWT
    const user = await User.findById(req.user.id)
    // If the user is not found, throw an error
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})

// @desc    Create New Ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    //destructure the request body, get the product and description
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    // Get the user from the database using the id from JWT
    const user = await User.findById(req.user.id)
    // If the user is not found, throw an error
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Create the ticket
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'New'
    })


    res.status(200).json(ticket)
})


module.exports = {
    getTickets,
    createTicket
}
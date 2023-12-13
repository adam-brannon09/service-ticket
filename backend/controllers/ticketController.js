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

// @desc    Get Individual Ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
    // Get the user from the database using the id from JWT
    const user = await User.findById(req.user.id)
    // If the user is not found, throw an error
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Get the ticket from the database using the id from the params
    const ticket = await Ticket.findById(req.params.id)
    // If the ticket is not found, throw an error
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    // If the ticket does not belong to the user, throw an error
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')

    }
    res.status(200).json(ticket)
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

// @desc    Delete Individual Ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get the user from the database using the id from JWT
    const user = await User.findById(req.user.id)
    // If the user is not found, throw an error
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Get the ticket from the database using the id from the params
    const ticket = await Ticket.findById(req.params.id)
    // If the ticket is not found, throw an error
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    // If the ticket does not belong to the user, throw an error
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    // Delete the ticket
    await ticket.deleteOne()
    res.status(200).json({ success: true, })
})

// @desc    Update Individual Ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
    // Get the user from the database using the id from JWT
    const user = await User.findById(req.user.id)
    // If the user is not found, throw an error
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Get the ticket from the database using the id from the params
    const ticket = await Ticket.findById(req.params.id)
    // If the ticket is not found, throw an error
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }
    // If the ticket does not belong to the user, throw an error
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')

    }
    // Update the ticket
    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, }
    )
    // Return the updated ticket
    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}
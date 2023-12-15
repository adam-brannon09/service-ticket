const express = require('express');
const router = express.Router();
const { getTickets, getTicket, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')
//protect middleware makes sure user is logged in before accessing route
const { protect } = require('../middleware/authMiddleware')

//re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)
//if /api/tickets/ is used for a get route it will use getTickets function from ticketController
router.route('/').get(protect, getTickets).post(protect, createTicket)
// .get, .post, .delete, .put are all methods that can be chained to a route
//if /api/tickets/:id is used for a get route it will use getTicket function from ticketController
// if /api/tickets/:id is used for a delete route it will use deleteTicket function from ticketController
// if /api/tickets/:id is used for a put route it will use updateTicket function from ticketController
router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)


module.exports = router;
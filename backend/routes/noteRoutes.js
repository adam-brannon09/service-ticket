const express = require('express')
// mergeParams: true allows us to access the ticketId from the ticketRoutes
const router = express.Router({ mergeParams: true })
const { getNotes, addNote } = require('../controllers/noteController')

const { protect } = require('../middleware/authMiddleware')
// .get, .post, .delete, .put are all methods that can be chained to a route
router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router
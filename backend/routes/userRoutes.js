const express = require('express');
const router = express.Router();
// pulls registerUser and loginUser from userController
const { registerUser, loginUser, getMe } = require('../controllers/userController');

//import protect from authMiddleware
//protect is a middleware that checks if the user is logged in
const { protect } = require('../middleware/authMiddleware');
// if the route is /, run registerUser from userController
router.post('/', registerUser);
// if the route is /login, run loginUser from userController
router.post('/login', loginUser);
// if the route is /me, run getMe from userController
router.get('/me', protect, getMe);

module.exports = router;
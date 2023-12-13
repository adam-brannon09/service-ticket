const express = require('express');
const router = express.Router();
// pulls registerUser and loginUser from userController
const { registerUser, loginUser } = require('../controllers/userController');

// if the route is /, run registerUser from userController
router.post('/', registerUser);
// if the route is /login, run loginUser from userController
router.post('/login', loginUser);

module.exports = router;
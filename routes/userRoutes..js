const express = require('express');
const { getRegister, registerUser, getLogin, loginUser, logoutUser } = require('../controller/userController');
const router = express.Router();

// Register routes
router.get('/register', getRegister);
router.post('/register', registerUser);

// Login routes
router.get('/login', getLogin);
router.post('/login', loginUser);

// Logout route
router.get('/logout', logoutUser);

module.exports = router;

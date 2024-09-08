const router = require('express').Router();
const {
  registerUser,
  loginUser,
} = require('../controllers/authControllers');

// Register a new user
router.post('/register', registerUser);

// Log in user
router.post('/login', loginUser);

module.exports = router;

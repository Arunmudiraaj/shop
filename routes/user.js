const router = require('express').Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const { getAllUsers, UserDelete } = require('../controllers/user');
const constants = require('../constants/constants');

// Route to get all users
router.get('/getAll', ensureAuth(constants.AUTH_ACCESS.ADMIN_ACCESS), getAllUsers);

// Route to delete a user
router.delete('/delete/:id', ensureAuth(constants.AUTH_ACCESS.ADMIN_ACCESS), UserDelete);

module.exports = router;

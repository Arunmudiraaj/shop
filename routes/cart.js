const express = require('express');
const router = express.Router();
const {addItemToCart, clearCart, getCartItems, removeCartItem, updateCartItem} = require('../controllers/cart');
const { ensureAuth } = require('../middleware/authMiddleware');
const {AUTH_ACCESS} = require('../constants/constants');

router.get('/get/:userId', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), getCartItems); 
router.post('/add/:userId', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), addItemToCart); 
router.put('/update/:userId', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), updateCartItem);
router.delete('/delete/:userId/:productId', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), removeCartItem);
router.delete('/clear/:userId', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), clearCart);

module.exports = router;

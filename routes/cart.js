const express = require('express');
const router = express.Router();
const {addItemToCart, clearCart, getCartItems, removeCartItem, updateCartItem} = require('../controllers/cart');
const { ensureAuth } = require('../middleware/authMiddleware');
const {AUTH_ACCESS} = require('../constants/constants');

router.get('/get', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), getCartItems); 
router.post('/add', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), addItemToCart); 
router.put('/update', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), updateCartItem);
router.delete('/delete/:productId', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), removeCartItem);
router.delete('/clear', ensureAuth(AUTH_ACCESS.OPEN_ACCESS), clearCart);

module.exports = router;

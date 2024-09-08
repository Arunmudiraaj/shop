const router = require('express').Router();
const constants = require('../constants/constants');
const {
  createProduct, deleteProduct, getAllProducts, getProductById
} = require('../controllers/product');
const { ensureAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/all', getAllProducts);
router.get('/get/:id', getProductById);
router.post('/create', ensureAuth(constants.AUTH_ACCESS.ADMIN_ACCESS), upload.single('image'), createProduct);
router.delete('/delete/:id', ensureAuth(constants.AUTH_ACCESS.ADMIN_ACCESS), deleteProduct);

module.exports = router;
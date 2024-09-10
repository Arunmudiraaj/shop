const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders } = require("../controllers/order");
const { ensureAuth } = require("../middleware/authMiddleware");
const { AUTH_ACCESS } = require("../constants/constants");

router.post("/create", ensureAuth(AUTH_ACCESS.OPEN_ACCESS), createOrder);
router.get("/get/:userId", ensureAuth(AUTH_ACCESS.OPEN_ACCESS), getUserOrders);

module.exports = router;

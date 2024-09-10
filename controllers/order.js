const { ORDER_STATUS } = require('../constants/constants');
const { sendOrderPlacedMail } = require('../helpers/mailHelper');
const CartItem = require('../models/cartItem');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Product = require('../models/product');
const User = require('../models/user');
const { CustomError, sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');
const { createOrderValidation } = require('../utils/validation');

const createOrder = async (req, res) => {
  try {
    const {isValid, error_msg} = await createOrderValidation(req.body)
    if(!isValid) {
      throw new CustomError(400, error_msg);
    }
    const  userId  = req.user.id;
    const { paymentMethod, shippingAddress } = req.body;
    // Get all items in the user's cart
    const cartItems = await CartItem.findAll({
      where: { userId },
    });
    await Promise.all(cartItems.map(async (item) => {
      const product = await Product.findByPk(item.productId);
      item.dataValues.product = product;
    }));

    if (!cartItems.length) {
      throw new CustomError(400, 'Cart is empty');
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => {
      return total + (item?.quantity * item?.dataValues?.product?.dataValues?.price);
    }, 0);

    // Create a new order
    const newOrder = await Order.create({
      userId,
      totalAmount,
      paymentMethod,
      shippingAddress,
      status: ORDER_STATUS.DELIVERED // setting status to delivered directly
    });

    // Add items to the order
    const orderedItems = await Promise.all(cartItems.map(async (item) => {
      return await OrderItem.create({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item?.dataValues?.product?.dataValues?.price,
      });
    }));

    // Remove items from the cart
    await CartItem.destroy({
      where: { userId },
    });
    newOrder.dataValues.orderedItems = orderedItems;
    sendOrderPlacedMail(req.user, totalAmount, cartItems, shippingAddress, paymentMethod);
    sendSuccessResponse(res, 201, newOrder, 'Order created successfully');
  } catch (error) {
    console.error("Error in createOrder", error);
    sendErrorResponse(res, error);
  }
};


const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
      const orders = await Order.findAll({
        where: { userId },
        include: [{ model: Product }],
      });
  
      sendSuccessResponse(res, 200, orders);
    } catch (error) {
      console.error("Error in getUserOrders", error);
      sendErrorResponse(res, error);
    }
  };

  module.exports = { createOrder, getUserOrders };
  

const CartItem = require("../models/cartItem");
const Product = require("../models/product");
const User = require("../models/user");
const { sendSuccessResponse, CustomError, sendErrorResponse } = require("../utils/responseHandler");
const { addItemToCartValidation } = require("../utils/validation");

const getCartItems = async (req, res) => {
    
    try {
        const { userId } = req.params;
      const cartItems = await CartItem.findAll({
        where: { userId },
        // include: [{ model: Product }] // Include product details
      });
  
      if (!cartItems.length) {
        return sendSuccessResponse(res, 200, {}, "Cart is empty");
      } else {
        return sendSuccessResponse(res, 200, cartItems, "Cart items fetched successfully");
      }
    } catch (error) {
      console.error("Error in getCartItems", error);
      sendErrorResponse(res, error);
    }
  };

const addItemToCart = async (req, res) => {
  
    try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const { isValid, error_msg } = await addItemToCartValidation(req.body)
    if(!isValid) {
        throw new CustomError(400, error_msg);
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }
      // Check if the product exists
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new CustomError(404, "Product not found");
      }
  
      // Check if the product is already in the cart
      const existingCartItem = await CartItem.findOne({
        where: { userId, productId }
      });
      // If the product is already in the cart, update its quantity
      if (existingCartItem) {
        await existingCartItem.update({
          quantity: existingCartItem.quantity + quantity
        });
        return sendSuccessResponse(res, 200, existingCartItem, "Item added to cart successfully");
      } 
        // If not, add a new item to the cart
      else{
        const newCartItem = await CartItem.create({
            userId,
            productId,
            quantity
        });

        return sendSuccessResponse(res, 201, newCartItem, "Item added to cart successfully");
      }
  
      
    } catch (error) {
      console.error("Error in addItemToCart", error);
      sendErrorResponse(res, error);
    }
  };

  const updateCartItem = async (req, res) => {
  
    try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const { isValid, error_msg } = await addItemToCartValidation(req.body)
    if(!isValid) {
        throw new CustomError(400, error_msg);
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

      const cartItem = await Cart.findOne({
        where: { userId, productId }
      });
  
      if (!cartItem) {
        throw new CustomError(404, "Cart item not found");
      }
  
      // Update the quantity
      await cartItem.update({ quantity });
      return sendSuccessResponse(res, 200, cartItem, "Cart item updated successfully");
    } catch (error) {
      console.error("Error in updateCartItem", error);
      sendErrorResponse(res, error);
    }
  };

  const removeCartItem = async (req, res) => {
    const { userId, productId } = req.params;
  
    try {
      const cartItem = await Cart.findOne({
        where: { userId, productId }
      });
  
      if (!cartItem) {
        throw new CustomError(404, 'Cart item not found');
      }
  
      await cartItem.destroy();
      sendSuccessResponse(res, 200, null, 'Cart item removed successfully');
    } catch (error) {
      console.error('Error in removeCartItem', error);
      sendErrorResponse(res, error);
    }
  };

  const clearCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cartItems = await Cart.findAll({
        where: { userId }
      });
      if (!cartItems.length) {
        throw new CustomError(404, 'Cart is already empty');
      }
      await Cart.destroy({
        where: { userId }
      });
  
      sendSuccessResponse(res, 200, null, 'Cart cleared successfully');
    } catch (error) {
      console.error('Error in clearCart', error);
      sendErrorResponse(res, error);
    }
  };

  module.exports = {
    getCartItems,
    addItemToCart,
    updateCartItem,
    removeCartItem,
    clearCart
  };
  
  
  
  
  
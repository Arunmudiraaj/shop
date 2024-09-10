const CartItem = require("../models/cartItem");
const Product = require("../models/product");
const User = require("../models/user");
const { sendSuccessResponse, CustomError, sendErrorResponse } = require("../utils/responseHandler");
const { addItemToCartValidation } = require("../utils/validation");

const getCartItems = async (req, res) => {
    
    try {
        const userId  = req.user.id;
      const cartItems = await CartItem.findAll({
        where: { userId },
      });
      await Promise.all(cartItems.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        item.dataValues.product = product;
      }));
      if (!cartItems.length) {
        return sendSuccessResponse(res, 200, null, "Cart is empty");
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
      const userId  = req.user.id;
    const { productId, quantity } = req.body;
    const { isValid, error_msg } = await addItemToCartValidation(req.body)
    if(!isValid) {
        throw new CustomError(400, error_msg);
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
        const updatedCartItem = await existingCartItem.update({
          quantity: existingCartItem.quantity + quantity
        });
        updatedCartItem.dataValues.product = product;
        return sendSuccessResponse(res, 200, updatedCartItem, "Item added to cart successfully");
      } 
        // If not, add a new item to the cart
      else{
        const newCartItem = await CartItem.create({
            userId,
            productId,
            quantity
        },);
        newCartItem.dataValues.product = product;
        return sendSuccessResponse(res, 201, newCartItem, "Item added to cart successfully");
      }
  
      
    } catch (error) {
      console.error("Error in addItemToCart", error);
      sendErrorResponse(res, error);
    }
  };

  const updateCartItem = async (req, res) => {
  
    try {
    const userId  = req.user.id;
    const { productId, quantity } = req.body;
    const { isValid, error_msg } = await addItemToCartValidation(req.body)
    if(!isValid) {
        throw new CustomError(400, error_msg);
    }

      const cartItem = await CartItem.findOne({
        where: { userId, productId }
      });
  
      if (!cartItem) {
        throw new CustomError(404, "Cart item not found");
      }
  
      // Update the quantity
      if (quantity === 0) {
        await cartItem.destroy();
        return sendSuccessResponse(res, 200, null, "Cart item removed successfully");
      } else {
        await cartItem.update({ quantity });
        return sendSuccessResponse(res, 200, cartItem, "Cart item updated successfully");
      }
    } catch (error) {
      console.error("Error in updateCartItem", error);
      sendErrorResponse(res, error);
    }
  };

  const removeCartItem = async (req, res) => {
    try {
      const { productId } = req.params;
      const userId  = req.user.id;
      const cartItem = await CartItem.findOne({
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
  
    try {
    const userId  = req.user.id;
      const cartItems = await CartItem.findAll({
        where: { userId }
      });
      if (!cartItems.length) {
        throw new CustomError(404, 'Cart is already empty');
      }
      await CartItem.destroy({
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
  
  
  
  
  
const Product = require("../models/product");
const { Op } = require("sequelize");
const {
  sendSuccessResponse,
  sendErrorResponse,
  CustomError,
} = require("../utils/responseHandler");
const {
  createProductValidation,
} = require("../utils/validation");
const uploadProductImage = require("../utils/uploadImages");

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query; // Default page, limit, and search term
    const offset = (page - 1) * limit;
    const products = await Product.findAndCountAll({
      where: {
        // search condition for name or description
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
        ],
      },
      limit: parseInt(limit), // Number of products per page
      offset: parseInt(offset), // Skip products for pagination
    });
    const result = {
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit), // calculate total number of pages
      currentPage: parseInt(page),
      products: products.rows,
    };
    return sendSuccessResponse(res, 200, result);
  } catch (error) {
    console.error("Error in getAllProducts", error);
    sendErrorResponse(res, error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CustomError(400, "Product ID is invalid");
    }
    const product = await Product.findByPk(id);
    if (!product) {
      throw new CustomError(404, "Product not found");
    }
    return sendSuccessResponse(res, 200, product);
  } catch (error) {
    console.error("Error in getProductById", error);
    sendErrorResponse(res, error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const { isValid, error_msg } = await createProductValidation( req.body);
    if (!isValid) {
      throw new CustomError(400, error_msg);
    }
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadProductImage(req.file); // Upload image and get the URL
    }
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl,
    });
    return sendSuccessResponse(res, 201, newProduct);
  } catch (error) {
    console.error("Error in createProduct", error);
    sendErrorResponse(res, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CustomError(400, "Product ID is invalid");
    }
    const product = await Product.findByPk(id);
    if (!product) {
      throw new CustomError(404, "Product not found");
    }

    await product.destroy();

    return sendSuccessResponse(res, 200, null, "Product deleted successfully");
  } catch (error) {
    console.error("Error in deleteProduct", error);
    sendErrorResponse(res, error);
  }
};

module.exports = {
  getAllProducts,
  deleteProduct,
  getProductById,
  createProduct,
};

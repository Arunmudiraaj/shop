const constants = require('../constants/constants');
const User = require('../models/user');
const { sendErrorResponse, sendSuccessResponse, CustomError } = require('../utils/responseHandler');

const getAllUsers = async (req, res, next) => {
  try {
    const totalUsers = await User.findAll();
    return sendSuccessResponse(res, 200, totalUsers);
  } catch (err) {
    console.error("Error in getAllUsers", err);
    return sendErrorResponse(res, err);
  }
};

const UserDelete = async (req, res, next) => {
  try {
    // Checks if the user is an admin before proceeding with the operation
    let user = await User.findByPk(req.user.id)
    if ((user === null) || (user?.dataValues && user?.dataValues?.roleId !== constants.ROLE_ID.ADMIN)) {
      throw new CustomError(401, "You are not authorized to perform this operation!")
    }
    if (req.user.id == req.params.id) {
      throw new CustomError(400, "As an admin, you cannot delete yourself!")
    }
    const userDelete = await User.destroy({ where: { id: req.params.id } });
    return sendSuccessResponse(res, 200, null, "User deleted successfully")
  } catch (err) {
    console.error("Error in UserDelete", err);
    return sendErrorResponse(res, err);
  }
};

module.exports = { getAllUsers, UserDelete };

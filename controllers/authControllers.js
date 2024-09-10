const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../utils/validation");
const { passwordEncrypt } = require("../utils/utils");
const {
  sendErrorResponse,
  sendSuccessResponse,
  CustomError
} = require("../utils/responseHandler");

const registerUser = async (req, res) => {
  try {
    const { isValid, error_msg } = await registerValidation(req.body);
    if (!isValid) {
      throw new CustomError(400, error_msg);
    }
    // Checking if the user is already in the db
    const emailExist = await User.findOne({ where: { email: req.body.email } });
    if (emailExist) {
      throw new CustomError(400, "E-Mail already exists");
    }

    req.body.password = await passwordEncrypt(req.body.password);
    // Create a new user
    const user = new User(req.body);
    const savedUser = await user.save();
    savedUser.password = undefined;

    return sendSuccessResponse(res, 201, savedUser, "User created successfully",);
  } catch (err) {
    console.log("Error: ", err);
    return sendErrorResponse(res, err);
  }
};

const loginUser = async (req, res) => {
  try {
    // Validate data before creating a user
    const { isValid, error_msg } = await loginValidation(req.body);
    if (!isValid) {
      throw new CustomError(400, error_msg);
    }
    // Checking if the user is already in the db
    const user = await User.findOne({ where: {email: req.body.email} });
    // User check
    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);
      // Password check
      if (!validPass) {
        throw new CustomError(400, "Invalid password");
      }
      // Create and assign a token
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
      }
      const token = jwt.sign(userData,
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN || "30d" }
      );
      return sendSuccessResponse(res, 200, {
        accessToken: token,
        user: userData
      }, "User logged in successfully");
    } else {
      throw new CustomError(400, "User not found");
    }
  } catch (err) {
    console.log("Error: ", err);
    return sendErrorResponse(res, err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};

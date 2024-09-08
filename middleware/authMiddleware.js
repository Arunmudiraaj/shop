const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendErrorResponse, CustomError } = require("../utils/responseHandler");

function ensureAuth(accessRoles) {
  return async (req, res, next) => {
    try {
      
    // Gather the jwt access token from the request header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) throw new CustomError(401, "Invalid token!");
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);

      const userData = await User.findByPk(verified.id);
      if (userData === null) {
        throw new CustomError(
          401,
          "You are not authorized to perform this operation!"
        );
      }

      if (accessRoles.includes(userData.dataValues.roleId)) {
        req.user = verified;
        return next();
      } else {
        throw new CustomError(
          401,
          "You are not authorized to perform this operation!"
        );
      }
    } catch (error) {
      return sendErrorResponse(res, error);
    }
  };
}

function checkAdmin(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  return next(
    sendErrorResponse("You are not authorized to perform this operation!", 401)
  );
}

module.exports = { ensureAuth, checkAdmin };

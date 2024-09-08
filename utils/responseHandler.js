const sendErrorResponse = (res, err) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const error = err.error || null;
  return res.status(statusCode).json({
    success: false,
    message: message,
    error: error ? error.toString() : undefined
  });
};

const sendSuccessResponse = (res, statusCode=200, data=null, message = 'Success') => {
  return res.status(statusCode).json({
      success: true,
      message: message,
      data: data
  });
};

class CustomError extends Error {
  constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
  }
}

module.exports = {sendSuccessResponse, sendErrorResponse, CustomError};

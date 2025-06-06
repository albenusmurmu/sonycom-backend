// backend/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Check if a status code has already been set, otherwise default to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);

  res.json({
    message: err.message,
    // IMPORTANT: Only show the error stack in development mode for security reasons
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
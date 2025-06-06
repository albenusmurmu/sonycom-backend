// backend/middleware/logger.js

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  
  // Log the request as it comes in
  console.log(`[${timestamp}] ${method} request to ${url}`);
  
  // Pass control to the next middleware in the chain
  next();
};

module.exports = logger;
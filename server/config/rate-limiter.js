const setRateLimit = require("express-rate-limit");

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 60 * 1000,
  max: 150,
  message: "Has fet masses peticions de login en una hora (ets un robot???)",
  headers: true,
});

module.exports = rateLimitMiddleware;
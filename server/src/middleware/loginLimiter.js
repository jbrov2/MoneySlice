const rateLimit = require("express-rate-limit");

const loginLimitter = rateLimit({
  windowsMs: 60 * 1000,
  max: 5, // Limit each IP to 5 login requests per window min.
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimitter;

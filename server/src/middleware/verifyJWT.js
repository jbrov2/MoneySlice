const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyjwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err || !decoded) {
      console.error("JWT verification failed or token is not defined: ", err);
      return res.sendStatus(403); // Forbidden
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyjwt;

const jwt = require("jsonwebtoken");

const addAccessToken = (req, res, next) => {
  //Extract the access token from cookes or headers
  const accessToken =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (accessToken) {
    //add the access token to the request headers
    req.headers.authorization = `Bearer ${accessToken}`;
  }
  next();
};

module.exports = addAccessToken;

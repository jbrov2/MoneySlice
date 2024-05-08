const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // Evalute jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.userName !== decoded.userName)
      return res.sendStatus(403); //forbidden

    const accessToken = jwt.sign(
      { userName: decoded.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };

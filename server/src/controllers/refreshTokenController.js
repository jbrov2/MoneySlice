const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    //Checking refreshToken Value
    console.log("Received refreshToken:", refreshToken);

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
      console.error("Failed to find the user");
      return res.sendStatus(403); //Forbidden
    }

    // Evalute jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.userName !== decoded.userName) {
          console.error(
            "JWT verification failed or token is not defined: ",
            err
          );
          return res.sendStatus(403); //forbidden
        }
        const accessToken = jwt.sign(
          { userName: decoded.userName },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500); //internal error
  }
};

module.exports = { handleRefreshToken };

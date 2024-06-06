const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password)
    return res
      .status(400)
      .json({ message: "Username and password is required." });

  const foundUser = await User.findOne({ userName: userName }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // Evalute password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //create JWTs
    const accessToken = jwt.sign(
      { userName: foundUser.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { userName: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //saving refresh token

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    //Create secure cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

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
          { expiresIn: "5m" }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500); //internal error
  }
};

const handleLogout = async (req, res) => {
  //On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  try {
    //is refreshtoken in db

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (foundUser) {
      //Delete refreshToken in db

      foundUser.refreshToken = "";
      const result = await foundUser.save();
      console.log(result);
    }
    // clear cookie on client
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  } catch (error) {
    console.log("Error:", error);
    res.sendStatus(500); //internal error
  }
};

module.exports = { handleLogin, handleRefreshToken, handleLogout };

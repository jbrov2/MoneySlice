const User = require("../models/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
c;

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
      { expiresIn: "300s" }
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

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };

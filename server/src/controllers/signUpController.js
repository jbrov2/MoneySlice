const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure this path is correct

const handleNewUser = async (req, res) => {
  const { email, userName, password } = req.body;

  if (!email || !userName || !password) {
    return res
      .status(400)
      .json({ message: "Email, Username and password are required." });
  }

  try {
    // Check for duplicate email or username
    const duplicateEmail = await User.findOne({ email }).exec();
    const duplicateUserName = await User.findOne({ userName }).exec();

    if (duplicateEmail || duplicateUserName) {
      return res
        .status(409)
        .json({ message: "Username or email is currently in use" });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and store the new user
    const newUser = await User.create({
      email,
      userName,
      password: hashedPassword,
    });

    // Create JWT for the new user
    const accessToken = jwt.sign(
      { userName: newUser.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { userName: newUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Save the refresh token to the user
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Set the refresh token as a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };

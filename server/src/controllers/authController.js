const User = require("../models/login");
const bcrypt = require("bcrypt");

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
    res.json({ success: `User ${userName} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };

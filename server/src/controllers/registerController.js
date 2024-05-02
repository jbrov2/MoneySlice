const { Model } = require("mongoose");
const User = require("../models/login");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, userName, password } = req.body;
  if (!email || !user || !pwd)
    return res
      .status(400)
      .json({ message: "Email, Username and password is required." });
  //check for duplicate username in db

  const duplicate = await User.findOne({ email: email }).exec();

  if (duplicate) return res.sendStatus(409);
  try {
    //encrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //create and store
    const result = await User.create({
      email: email,
      userName: userName,
      password: hashedPassword,
    });

    console.log(result);

    res.status(201).json({ sucess: `New User ${userName} created!` });
  } catch (error) {
    res.status(500).json({ messge: error.message });
  }
};

module.exports = { handleNewUser };

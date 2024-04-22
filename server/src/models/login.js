const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  valid_password: {
    type: String,
    require: true,
  },
});

const LoginModel = mongoose.model("Login", LoginSchema);

module.exports = LoginModel;

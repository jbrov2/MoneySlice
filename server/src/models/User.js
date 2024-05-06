const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Budget" }],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

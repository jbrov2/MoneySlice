const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
  budgets: [
    {
      Category: String,
      Budgeted_Amount: Number,
      Actual_Spending: Number,
      Remaining_Budget: Number,
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

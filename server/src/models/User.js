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
  AssignedBudgets: [{ type: Schema.Types.ObjectId, ref: "Budget" }],

  refreshToken: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

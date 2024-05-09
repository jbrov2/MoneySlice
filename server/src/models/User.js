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
      Remaining_Budget: {
        type: Number,
        default: function () {
          return this.Budgeted_Amount || 0;
        },
      },
    },
  ],
});

UserSchema.pre("save", function (next) {
  this.budgets.forEach((budget) => {
    budget.Remaining_Budget = budget.Budgeted_Amount - budget.Actual_Spending;
  });
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

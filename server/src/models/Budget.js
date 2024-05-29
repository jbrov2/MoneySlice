const mongoose = require("mongoose");
const UserModel = require("./User");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const BudgetSchema = new Schema({
  Category: { type: String, required: true, unique: true },
  Item: [
    {
      Name: { type: String, required: true },
      Amount_Spent: { type: Number, required: true },
      ID: { type: Number, required: true },
    },
  ],
  Budgeted_Amount: Number,
  Actual_Spending: { type: Number, default: 0 },
  Remaining_Budget: {
    type: Number,
    default: function () {
      //Set default value to Budgeted Amount if not provided
      return this.Budgeted_Amount || 0;
    },
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // id: mongoose.Schema.Types.ObjectId,
});

//Pre-save hook to calculate actual spending
BudgetSchema.pre("save", function (next) {
  //Calculate the sum of Amount_Spent in the Item Array
  this.Actual_Spending = this.Item.reduce((total, item) => {
    return total + item.Amount_Spent;
  }, 0);
  this.Remaining_Budget = this.Budgeted_Amount - this.Actual_Spending;

  next();
});

const BudgetModel = mongoose.model("Budget", BudgetSchema);

module.exports = { BudgetModel };

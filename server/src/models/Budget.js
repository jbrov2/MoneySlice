const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  Category: { type: String, required: true },
  Item: [
    {
      Name: { type: String, required: true },
      Amount_Spent: { type: Number, required: true },
      ID: { type: Number },
    },
  ],
  Budgeted_Amount: Number,
  Actual_Spending: { type: Number, default: 0 },
  Remaining_Budget: {
    type: Number,
    default: function () {
      // Set default value to Budgeted Amount if not provided
      return this.Budgeted_Amount || 0;
    },
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Pre-save hook to calculate actual spending and auto-generate item IDs
BudgetSchema.pre("save", function (next) {
  // Calculate the sum of Amount_Spent in the Item array
  this.Actual_Spending = this.Item.reduce((total, item) => {
    return total + item.Amount_Spent;
  }, 0);

  // Calculate Remaining_Budget
  this.Remaining_Budget = this.Budgeted_Amount - this.Actual_Spending;

  // Auto-generate IDs for items if not already present
  this.Item.forEach((item, index) => {
    if (!item.ID) {
      item.ID = index + 1;
    }
  });

  next();
});

const BudgetModel = mongoose.model("Budget", BudgetSchema);

module.exports = BudgetModel;

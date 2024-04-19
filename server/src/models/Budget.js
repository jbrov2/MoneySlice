const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const BudgetSchema = new Schema({
  Category: String,
  Budgeted_Amount: Number,
  Actual_Spending: Number,
  Remaining_Budget: Number,
});

const BudgetModel = mongoose.model("Budget", BudgetSchema);

module.exports = BudgetModel;

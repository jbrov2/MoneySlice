const mongoose = require("mongoose");
const User = require("../models/User");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const BudgetSchema = new Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Category: String,
  Budgeted_Amount: Number,
  Actual_Spending: Number,
  Remaining_Budget: Number,
});

const BudgetModel = mongoose.model("Budget", BudgetSchema);

module.exports = BudgetModel;

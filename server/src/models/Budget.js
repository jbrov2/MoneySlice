const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const BudgetSchema = new Schema({
  Category: String,
  Budgeted_Amount: Number,
  Actual_Spending: Number,
  Remaining_Budget: {
    type: Number,
    default: function () {
      //Set default value to Budgeted Amount if not provided
      return this.Budgeted_Amount || 0;
    },
  },
  // id: mongoose.Schema.Types.ObjectId,
});

const BudgetModel = mongoose.model("Budget", BudgetSchema);

module.exports = BudgetModel;

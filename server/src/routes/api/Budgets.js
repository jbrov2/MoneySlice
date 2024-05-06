const express = require("express");
const router = express.Router();
const BudgetController = require("../../controllers/budgetController");

router
  .route("/")
  .get(BudgetController.getAllBudgets)
  .post(BudgetController.createNewBudget)
  .put(BudgetController.updateBudget)
  .delete(BudgetController.deleteBudget);

module.exports = router;

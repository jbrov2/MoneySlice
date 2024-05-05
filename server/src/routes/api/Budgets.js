const express = require("express");
const router = express.Router();
const BudgetController = require("../../controllers/budgetController");
const verifyjwt = require("../../middleware/verifyJWT");

router
  .route("/")
  .get(verifyjwt, BudgetController.getAllBudgets)
  .post(BudgetController.createNewBudget)
  .put(BudgetController.updateBudget)
  .delete(BudgetController.deleteBudget);

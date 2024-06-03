const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const User = require("../models/User");

const {
  getAllBudgets,
  createNewBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");

router
  .route("/")
  .get(getAllBudgets)
  .post(createNewBudget)
  .patch(updateBudget)
  .delete(deleteBudget);

router.route("/:id").get((req, res) => res.json({ id: req.params }));
module.exports = router;

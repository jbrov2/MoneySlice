const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const User = require("../models/User");
const verifyJWTs = require("../middleware/verifyJWT");
const {
  getAllBudgets,
  createNewBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");

router
  .route("/")
  .get(verifyJWTs, getAllBudgets)
  .post(verifyJWTs, createNewBudget)
  .put(verifyJWTs, updateBudget)
  .delete(verifyJWTs, deleteBudget);

router.route("/:id").get((req, res) => res.json({ id: req.params }));
module.exports = router;

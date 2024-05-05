const express = require("express");
const router = express.Router();
const budgets = require("../models/Budget");

router
  .route("/")
  .get((req, res) => {
    res.json(budgets);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const newBudget = new Budget({
      Category: req.body.Category,
      Budgeted_Amount: req.body.Budgeted_Amount,
      Actual_Spending: req.body.Actual_Spending,
      Remaining_Budget: req.body.Remaining_Budget,
    });
    const createdBudget = await newBudget.save();
    res.json(createdBudget);
  });
//add put and delete request once you link budget to the user

router.route("/:id").get((req, res) => res.json({ id: req.params }));
module.exports = router;

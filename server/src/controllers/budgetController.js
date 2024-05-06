const Budget = require("../models/Budget");
const User = require("../models/User");
const mongoose = require("mongoose");

const getAllBudgets = async (req, res) => {
  //verify the user check to see userID
  try {
    const userId = req.user.id;
    const budget = await Budget.find({ user: userId });

    res.json({
      sucess: `Congrats ${req.user.userName} you can now see your budets`,
      budget,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve budgets" });
  }
};

const createNewBudget = async (req, res) => {
  //checking to see if you are logged in
  try {
    // Check if user is logged in
    const userId = req.user._id;
    console.log("this is the", userId);
    // Create a new budget and associate it with the current user
    const newBudget = new Budget({
      Category: req.body.Category,
      Budgeted_Amount: req.body.Budgeted_Amount,
      Actual_Spending: req.body.Actual_Spending,
      Remaining_Budget: req.body.Remaining_Budget,
      owner: userId, // Use 'Owner' instead of 'owner'
    });

    const createdBudget = await newBudget.save();

    // Update the User model to include the budget ID
    await User.findByIdAndUpdate(userId, {
      $push: { budgets: createdBudget._id },
    });

    res.json(createdBudget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create budget" });
  }
};

const updateBudget = async (req, res) => {};

const deleteBudget = async (req, res) => {};

module.exports = { getAllBudgets, createNewBudget, updateBudget, deleteBudget };

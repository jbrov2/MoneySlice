const UserModel = require("../models/User");
const mongoose = require("mongoose");

const getAllBudgets = async (req, res) => {
  //verify the user check to see userID
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.budgets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve budgets" });
  }
};

const createNewBudget = async (req, res) => {
  try {
    // Check if user is logged in
    const userName = req.user.userName; // Access userId from req.user
    const user = await UserModel.findOne({ userName });

    //checking if the user is found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create a new budget and associate it with the current user
    const newBudget = {
      Category: req.body.Category,
      Budgeted_Amount: req.body.Budgeted_Amount,
      Actual_Spending: req.body.Actual_Spending,
      Remaining_Budget: req.body.Remaining_Budget,
    };

    user.budgets.push(newBudget);
    await user.save();
    res.json(newBudget);
    console.log("Budget has been created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create budget" });
  }
};

const updateBudget = async (req, res) => {
  //verify the user
  const userName = req.user.userName; //Grabbing username from the req
  const user = UserModel.findOne({ userName }); //grabbing username from db
  const budgetName = UserModel.findOne({ Category });

  try {
    //checking for user
    if (!user) {
      return res.sendStatus(404).json({ message: "user has not been found" });
    }
    //checking for budget
    if (!budgetName) {
      return res
        .sendStatus(404)
        .json({ message: "That budget does not exist" });
    }
  } catch (error) {}
};

const deleteBudget = async (req, res) => {};

module.exports = { getAllBudgets, createNewBudget, updateBudget, deleteBudget };

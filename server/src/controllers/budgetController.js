const UserModel = require("../models/User");
const BudgetModel = require("../models/Budget");
const mongoose = require("mongoose");

const getAllBudgets = async (req, res) => {
  try {
    const userName = req.user.userName;
    const user = await UserModel.findOne({ userName });
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
  try {
    //verify the user
    const userName = req.user.userName; //Grabbing username from the req
    const user = await UserModel.findOne({ userName }); //grabbing username from db

    //checking for user
    if (!user) {
      return res.sendStatus(404).json({ message: "user has not been found" });
    }
    //Grabbing the Category, Budgeted_Amount, and the Actual_Spending
    const { Category, Budgeted_Amount, Actual_Spending } = req.body;

    //checks the index of the element and tries to find a matching Category, if not it returns -1
    const editBudgetIndex = user.budgets.findIndex(
      (budget) => budget.Category === Category
    );

    if (editBudgetIndex === -1) {
      return res.status(404).json({ message: "Budget has not been found" });
    }
    //updating
    user.budgets[editBudgetIndex].Budgeted_Amount = Budgeted_Amount;
    user.budgets[editBudgetIndex].Actual_Spending = Actual_Spending;
    user.budgets[editBudgetIndex].Remaining_Budget =
      Budgeted_Amount - Actual_Spending;

    //save budget
    await user.save();
    res.json(user.budgets[editBudgetIndex]);
    console.log("Budget has been updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update budget" });
  }
};

const deleteBudget = async (req, res) => {
  try {
    //verify the user
    const userName = req.user.userName;
    const user = await UserModel.findOne({ userName }); //grabbing username from db
    //grab the category name that the user wants to delete
    const { Category } = req.body;
    //checking for the user
    if (!user)
      return res.sendStatus(404).json({ message: "User is not found" });

    const result = await UserModel.updateOne(
      { userName: userName },
      { $pull: { budgets: { Category: Category } } }
    );

    //Check if any docs were modified
    if (result.nModified === 0) {
      return res.status(404).json({ message: "Budget not found for deletion" });
    }

    res.json({ message: "Budget was deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete budget" });
  }
};

module.exports = { getAllBudgets, createNewBudget, updateBudget, deleteBudget };

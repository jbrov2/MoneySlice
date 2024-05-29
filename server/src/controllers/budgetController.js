const UserModel = require("../models/User");
const BudgetModel = require("../models/Budget");
const mongoose = require("mongoose");

const getAllBudgets = async (req, res) => {
  try {
    const userName = req.user.userName;
    const user = await UserModel.findOne({ userName }).populate(
      "AssignedBudgets"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.AssignedBudgets);
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
    const newBudget = new BudgetModel({
      Category: req.body.Category,
      Budgeted_Amount: req.body.Budgeted_Amount,
      User: user.userName,
      Item: req.body.item,
    });

    await newBudget.save();

    user.AssignedBudgets.push(newBudget._id);

    await user.save();

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

    //Find the budget by Category and User
    const budget = await BudgetModel.findone({ Category, User: user._id });
    //updating
    budget.budgets[editBudgetIndex].Budgeted_Amount = Budgeted_Amount;
    budget.budgets[editBudgetIndex].Actual_Spending = Actual_Spending;
    budget.budgets[editBudgetIndex].Remaining_Budget =
      Budgeted_Amount - Actual_Spending;

    if (Item && Array.isArray(Item)) {
      budget.Item = Item.map((item, index));
    }

    //save budget
    await budget.save();
    res.json(budget);
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

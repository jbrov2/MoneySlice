const UserModel = require("../models/User");
const BudgetModel = require("../models/Budget");

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

    // Check if the user is found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract data from request body
    const { Category, Budgeted_Amount, Actual_Spending, Item } = req.body;

    // Create a new budget and associate it with the current user
    const newBudget = new BudgetModel({
      Category,
      Budgeted_Amount,
      Actual_Spending,
      User: user._id,
      Item: Array.isArray(Item)
        ? Item.map((item, index) => ({
            Name: item.Name,
            Amount_Spent: item.Amount_Spent,
            ID: item.ID || index + 1,
          }))
        : [],
    });

    await newBudget.save();

    user.AssignedBudgets.push(newBudget._id);
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
    // Verify the user
    const userName = req.user.userName; // Grabbing username from the req
    const user = await UserModel.findOne({ userName }); // Grabbing username from db

    // Checking for user
    if (!user) {
      return res.status(404).json({ message: "User has not been found" });
    }

    // Grabbing the Category, Budgeted_Amount, Actual_Spending, and Items
    const { Category, Budgeted_Amount, Actual_Spending, Item } = req.body;

    // Find the budget by Category and User
    const budget = await BudgetModel.findOne({ Category, User: user._id });

    if (!budget) {
      return res.status(404).json({ message: "Budget has not been found" });
    }

    // Updating budget fields
    budget.Budgeted_Amount = Budgeted_Amount;
    budget.Actual_Spending = Actual_Spending;
    budget.Remaining_Budget = Budgeted_Amount - Actual_Spending;

    // Updating Items section
    if (Item && Array.isArray(Item)) {
      // Clear existing items
      budget.Item = [];
      // Add new items
      Item.forEach((item, index) => {
        budget.Item.push({
          Name: item.Name,
          Amount_Spent: item.Amount_Spent,
          ID: item.ID || index + 1,
        });
      });
    }

    // Save updated budget
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
    // Verify the user
    const userName = req.user.userName;
    const user = await UserModel.findOne({ userName }); // Grabbing username from db

    // Grab the category name that the user wants to delete
    const { Category } = req.body;

    // Checking for the user
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const budget = await BudgetModel.findOneAndDelete({
      Category,
      User: user._id,
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found for deletion" });
    }

    // Remove the budget from the user's AssignedBudgets array
    user.AssignedBudgets.pull(budget._id);
    await user.save();

    res.json({ message: "Budget was deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete budget" });
  }
};

module.exports = { getAllBudgets, createNewBudget, updateBudget, deleteBudget };

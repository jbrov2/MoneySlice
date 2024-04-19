const express = require("express");
const mongoose = require("mongoose");
const Budget = require("./models/Budget");

const app = express();
const PORT = 5000;

app.post("/budget", async (req, res) => {
  const newBudget = new Budget({
    Category: "Dining",
    Budgeted_Amount: 100,
    Actual_Spending: 120,
    Remaining_Budget: -20,
  });
  const createdBudget = await newBudget.save();
  res.json(createdBudget);
});

mongoose
  .connect(
    "mongodb+srv://jbrown:GOJOv2123!@cluster0.evrsull.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`We are listening on PORT ${PORT}`);
    });
  });

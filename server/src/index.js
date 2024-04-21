const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const mongoose = require("mongoose");
const Budget = require("./models/Budget");
const url = process.env.MONGODB_URL;
const app = express();
const PORT = 5000;

//MIDDLEWARE
app.use(express.json());

app.post("/budget", async (req, res) => {
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

mongoose.connect(url).then(() => {
  app.listen(PORT, () => {
    console.log(`We are listening on PORT ${PORT}`);
  });
});

const express = require("express");
const mongoose = require("mongoose");
const Budget = require("./models/Budget");

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

mongoose
  .connect(
    "mongodb+srv://jbrown:GOJOv2123!@cluster0.evrsull.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`We are listening on PORT ${PORT}`);
    });
  });

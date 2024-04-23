const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//MODELS
const Budget = require("./models/Budget");
const Login = require("./models/login");
const { createRequire } = require("module");
const LoginModel = require("./models/login");

const url = process.env.MONGODB_URL;
const PORT = 5000;

//MIDDLEWARE
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ROUTES
app.get("/login", cors(), (req, res) => {});

app.post("/login", async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    const check = await LoginModel.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("does not exist");
    }
  } catch (e) {
    res.json("not exist");
  }
});

app.post("/signUp", async (req, res) => {
  const { email, userName, password } = req.body;

  const data = {
    email: email,
    userName: userName,
    password: password,
  };

  try {
    const check = await LoginModel.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("does not exist");
      await LoginModel.insertMany([data]);
    }
  } catch (e) {
    res.json("not exist");
  }

  // const newRegister = new Register({
  //   email: req.body.email,
  //   userName: req.body.userName,
  //   password: req.body.password,
  //   valid_password: req.body.valid_password,
  // });

  // const createdRegister = await newRegister.save();
  // res.json(createdRegister);
});

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
    console.log(
      `We are listening on PORT and the Database is connected ${PORT}`
    );
  });
});

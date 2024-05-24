const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const addAccessToken = require("./middleware/addAccessToken");
//MODELS

const url = process.env.MONGODB_URL;
const PORT = 5000;

//MIDDLEWARE
//built in middleware for json
app.use(express.json());

//built in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

//Cross Origin Resource Sharing
app.use(cors());

//middleware for cookies
app.use(cookieParser());

//Apply middleware to add access token
app.use(addAccessToken);

//ROUTES

app.use("/signUp", require("./routes/signUp"));
app.use("/login", require("./routes/auth"));

app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/user", require("./routes/users"));
app.use("/budget", require("./routes/budget"));
app.get("/login", cors(), (req, res) => {});
// app.post("/login", async (req, res) => {
//   const { userName, password } = req.body;

//   try {
//     // const existingUser = await Login.findOne({ userName });
//     const existingUser = await Login.find({ userName, password });
//     //add some logic where it checks for username and password before moving to next page
//     //Watch JWT video

//     if (existingUser) {
//       res.json("exist");
//     } else {
//       res.json("does not exist");
//     }
//   } catch (e) {
//     res.json("not exist");
//   }
// });

app.get("/signUp", (req, res) => {
  res.send("Welcome to the signUp page");
});

// app.post("/signUp", async (req, res) => {
//   const { email, userName, password } = req.body;

//   const newUser = new Login({
//     email: email,
//     userName: userName,
//     password: password,
//   });

//   try {
//     const existingUser = await Login.findOne({ email });

//     if (existingUser) {
//       return res.json("This user exists");
//     } else {
//       await newUser.save();
//       res.json("Made new user");
//       console.log("User has been created");
//     }
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json("Internal Server Error");
//   }

//   // const newRegister = new Register({
//   //   email: req.body.email,
//   //   userName: req.body.userName,
//   //   password: req.body.password,
//   //   valid_password: req.body.valid_password,
//   // });

//   // const createdRegister = await newRegister.save();
//   // res.json(createdRegister);
// });

// app.post("/budget", async (req, res) => {
//   console.log(req.body);
//   const newBudget = new Budget({
//     Category: req.body.Category,
//     Budgeted_Amount: req.body.Budgeted_Amount,
//     Actual_Spending: req.body.Actual_Spending,
//     Remaining_Budget: req.body.Remaining_Budget,
//   });
//   const createdBudget = await newBudget.save();
//   res.json(createdBudget);
// });

mongoose.connect(url).then(() => {
  app.listen(PORT, () => {
    console.log(
      `We are listening on PORT and the Database is connected ${PORT}`
    );
  });
});

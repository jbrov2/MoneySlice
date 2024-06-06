const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");

//MODELS

const url = process.env.MONGODB_URL;
const PORT = 5000;

//MIDDLEWARE
//built in middleware for json
app.use(express.json());

//built in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

//Cross Origin Resource Sharing
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//middleware for cookies
app.use(cookieParser());

//ROUTES

app.use("/signUp", require("./routes/signUp"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/auth"));
app.use("/logout", require("./routes/auth"));
app.use("/auth", require("./routes/auth"));

app.use(verifyJWT);
app.use("/user", require("./routes/users"));
app.use("/budget", require("./routes/budget"));

mongoose.connect(url).then(() => {
  app.listen(PORT, () => {
    console.log(
      `We are listening on PORT and the Database is connected ${PORT}`
    );
  });
});

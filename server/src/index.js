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

mongoose.connect(url).then(() => {
  app.listen(PORT, () => {
    console.log(
      `We are listening on PORT and the Database is connected ${PORT}`
    );
  });
});

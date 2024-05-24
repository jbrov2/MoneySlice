const express = require("express");
const router = express.Router();
const User = require("../models/User");

//this gives the user data

router.get("/info", async (req, res) => {
  try {
    const userName = req.user.userName;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Return the user's username and the budget count will upgrade later
    res.json({
      userName: user.userName,
      budgetCount: user.budgets.length,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { registerUser } = require("../controller/authController");

// Register new user
router.post("/", async (req, res) => {
  try {
    let item = await registerUser(req);
    res.status(200).json({
      status: 200,
      data: item,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;

module.exports = router;

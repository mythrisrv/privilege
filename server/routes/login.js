const express = require("express");
const router = express.Router();
const { loginUser } = require("../controller/authController");

// Login
router.post("/", async (req, res) => {
  try {
    let item = await loginUser(req);
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

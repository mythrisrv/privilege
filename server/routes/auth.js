const express = require("express");
const router = express.Router();
const { jwtauth } = require("../lib/jwtlib");

// Check token expired or not
router.post("/", [jwtauth], async (req, res) => {
  try {
    console.log(req.user, "");
    let user = req.user;
    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;

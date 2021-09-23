const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");

const { registerUser } = require("../controller/authController");
const {
  getUsersList,
  getUserData,
  updateUser,
  deleteUser,
} = require("../controller/userController");

// Add new user
router.post("/", [jwtauth], async (req, res) => {
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

// Get users list
router.get("/list", [jwtauth], async (req, res) => {
  try {
    let item = await getUsersList(req);
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

// Get user data
router.get("/:userId", [jwtauth], async (req, res) => {
  try {
    let item = await getUserData(req);
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

// Updata user data
router.put("/:userId", [jwtauth], async (req, res) => {
  try {
    let item = await updateUser(req);
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

router.delete("/:userId", [jwtauth], async (req, res) => {
  try {
    let item = await deleteUser(req);
    res.status(200).json({
      status: 200,
      message: "Item deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;

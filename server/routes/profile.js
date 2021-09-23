const express = require("express");
const router = express.Router();
const models = require("../model");
const { jwtauth } = require("../lib/jwtlib");

router.get("/public/:userId", async (req, res) => {
  try {
    let user = await models.User.findOne({
      _id: req.params.userId,
    });
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/", [jwtauth], async (req, res) => {
  try {
    let user = await models.User.findOne({
      _id: req.user._id,
    });
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

router.put("/", [jwtauth], async (req, res) => {
  try {
    let user = await models.User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

router.delete("/", [jwtauth], async (req, res) => {
  try {
    let user = await models.User.findByIdAndUpdate(
      req.user._id,
      { isListed: false },
      { new: true }
    );
    res.status(200).json({
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
